import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import dataService from "../services/dataService";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { Heart, Shield, Phone, HandHeart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import DonationSuccessModal from "../components/DonationSuccessModal";
import { API_URL } from "../config";
import { createGuestDonor } from "../utils/guestDonor";

import wisdomImg from "../assets/hero_wisdom.jpg";
import protectionImg from "../assets/hero_protection.jpg";
import courageImg from "../assets/hero_courage.jpeg";

export default function Donate() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedPath, setSelectedPath] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);
  const [pendingDonation, setPendingDonation] = useState(null); // { item, customAmount }
  const [referralCode, setReferralCode] = useState(null);
  const [confirmingDonation, setConfirmingDonation] = useState(null);

  const impactItems = dataService.getImpactItems();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");
    if (refCode && user) {
      setReferralCode(refCode);
    }
  }, [user]);

  const handleDonate = useCallback(
    async (item, customAmount = null, options = {}) => {
      const normalizedOptions =
        typeof options === "boolean" ? { triggeredAfterLogin: options } : options;
      const {
        triggeredAfterLogin = false,
        donorOverride = null,
        skipConfirmation = false,
      } = normalizedOptions;

      if (!skipConfirmation) {
        setConfirmingDonation({ item, customAmount });
        return;
      }

      const actingDonor = donorOverride || user;

      if (!actingDonor && !triggeredAfterLogin) {
        setPendingDonation({ item, customAmount });
        window.dispatchEvent(new CustomEvent("open-login-modal"));
        return;
      }

      if (!actingDonor) {
        console.warn("Donation attempted without donor context.");
        return;
      }

      setProcessing(true);
      const amount = customAmount || item.suggested_amount;
      let points = amount;
      if (item.path === "PROTECTION") points = Math.floor(amount * 1.5);
      else if (item.path === "COURAGE") points = Math.floor(amount * 1.2);

      const referralForRequest = donorOverride ? null : referralCode;

      try {
        try {
          await fetch(`${API_URL}/donate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              amount,
              path: item.path,
              uuid: actingDonor.id,
              impact: points,
              referral_code: referralForRequest,
            }),
          });
        } catch (err) {
          console.error("Backend donation error:", err);
        }

        setLastDonation({
          amount,
          path: item.path,
          points_awarded: points,
        });
        setShowSuccessModal(true);
        setDonationAmount("");
        setSelectedPath(null);
      } catch (error) {
        console.error("Donation error:", error);
        alert("Unable to process donation. Please try again.");
      } finally {
        setProcessing(false);
      }
    },
    [user, referralCode]
  );

  const handleVolunteer = async (hours = null) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("open-login-modal"));
      return;
    }
    
    if (hours) {
      try {
        await fetch(`${API_URL}/volunteer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ uuid: user.id, hours }),
        });
      } catch (err) {
        console.error("Failed to record volunteer hours", err);
      }
    }
    
    window.location.href = "/volunteer-schedule";
  };

  useEffect(() => {
    const handler = () => {
      if (pendingDonation) {
        const { item, customAmount } = pendingDonation;
        setPendingDonation(null);
        handleDonate(item, customAmount, { triggeredAfterLogin: true, skipConfirmation: true });
      }
    };

    window.addEventListener("login-success", handler);
    return () => window.removeEventListener("login-success", handler);
  }, [pendingDonation, handleDonate]);

  useEffect(() => {
    const handler = () => {
      if (!pendingDonation) {
        console.warn("Guest donation requested with no pending donation context.");
        return;
      }
      const { item, customAmount } = pendingDonation;
      setPendingDonation(null);
      handleDonate(item, customAmount, {
        donorOverride: createGuestDonor(),
        triggeredAfterLogin: true,
        skipConfirmation: true,
      });
    };

    window.addEventListener("guest-donation-request", handler);
    return () => window.removeEventListener("guest-donation-request", handler);
  }, [pendingDonation, handleDonate]);

  const pathConfig = {
    WISDOM: {
      icon: Phone,
      color: "bg-gradient-to-br from-highlight/20 to-highlight/10",
      border: 'border-highlight/40',
      iconColor: 'text-highlight',
      iconBg: 'bg-highlight/30',
      shadowColor: 'shadow-highlight-glow',
      hoverColor: 'hover:shadow-highlight-glow-strong',
      image: wisdomImg
    },
    COURAGE: {
      icon: Heart,
      color: "bg-gradient-to-br from-muted/20 to-muted/10",
      border: 'border-muted/40',
      iconColor: 'text-muted',
      iconBg: 'bg-muted/30',
      shadowColor: 'shadow-muted-glow',
      hoverColor: 'hover:shadow-muted-glow-strong',
      image: courageImg
    },
    PROTECTION: {
      icon: Shield,
      color: "bg-gradient-to-br from-secondary/20 to-secondary/10",
      border: 'border-secondary/40',
      iconColor: 'text-secondary',
      iconBg: 'bg-secondary/30',
      shadowColor: 'shadow-secondary-glow',
      hoverColor: 'hover:shadow-secondary-glow-strong',
      image: protectionImg
    },
    SERVICE: {
      icon: HandHeart,
      color: "bg-gradient-to-br from-accent/20 to-accent/10",
      border: 'border-accent/40',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/30',
      shadowColor: 'shadow-accent-glow',
      hoverColor: 'hover:shadow-accent-glow-strong',
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop",
    },
  };

  const promptDonationConfirmation = (item, customAmount = null) => {
    setConfirmingDonation({ item, customAmount });
  };

  const confirmDonation = () => {
    if (!confirmingDonation) return;
    const { item, customAmount } = confirmingDonation;
    setConfirmingDonation(null);
    handleDonate(item, customAmount, { skipConfirmation: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <DonationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        donation={lastDonation}
      />

      {confirmingDonation &&
        (() => {
          const amountToDonate =
            confirmingDonation.customAmount ||
            confirmingDonation.item.suggested_amount;
          const pathName = t(
            `paths.${confirmingDonation.item.path.toLowerCase()}.name`
          );
          const confirmationMessage =
            language === "fr"
              ? `Êtes-vous sûr de vouloir donner $${amountToDonate} pour le chemin ${pathName} ?`
              : `Are you sure you want to donate $${amountToDonate} to the ${pathName} path?`;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {language === "fr" ? "Confirmer le don" : "Confirm Donation"}
                </h3>
                <p className="text-foreground/80 mb-6">{confirmationMessage}</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setConfirmingDonation(null)}
                    className="flex-1"
                  >
                    {language === "fr" ? "Annuler" : "Cancel"}
                  </Button>
                  <Button
                    onClick={confirmDonation}
                    className="flex-1"
                    disabled={processing}
                  >
                    {language === "fr" ? "Oui, continuer" : "Yes, continue"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-secondary py-20 md:py-24">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex p-4 rounded-full bg-white/20 backdrop-blur-sm mb-6"
            >
              <Heart className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'fr' ? 'Faire un Don' : 'Make a Donation'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Choisissez votre chemin pour faire une différence. Chaque contribution soutient directement les femmes et les enfants victimes de violence familiale.'
                : 'Choose your path to make a difference. Every contribution directly supports women and children victims of family violence on their journey to safety and healing.'}
            </p>
          </div>
        </div>
      </div>

      {/* Donation Paths Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Choisissez Votre Chemin' : 'Choose Your Path to Make a Difference'}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Chaque contribution soutient directement les femmes et les enfants victimes de violence familiale dans leur parcours vers la sécurité et la guérison'
                : 'Every contribution directly supports women and children victims of family violence on their journey to safety and healing'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["WISDOM", "COURAGE", "PROTECTION", "SERVICE"].map((path, idx) => {
              const config = pathConfig[path];
              const Icon = config.icon;
              const pathItems = impactItems.filter(
                (item) => item.path === path
              );

              return (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div
                      className="h-48 bg-cover bg-center relative overflow-hidden flex-shrink-0"
                      style={{ backgroundImage: `url(${config.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`bg-white rounded-full`}>
                            <div className={`${config.iconBg} p-2 rounded-full`}>
                              <Icon className={`w-5 h-5 ${config.iconColor}`}/>
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white">
                            {t(`paths.${path.toLowerCase()}.name`)}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex-1 flex flex-col">
                      <p className="text-foreground/70 mt-6 mb-3 leading-relaxed flex-1 min-h-[80px]">
                        {t(`paths.${path.toLowerCase()}.desc`)}
                      </p>

                      {path === "SERVICE" ? (
                        <div className="space-y-4">
                          <div className="mb-4">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-medium text-foreground/80">
                                  Volunteer your time
                                </span>
                                {/* <span className="text-lg font-bold text-foreground/80 text-right min-w-fit">
                                  1 hour
                                </span> */}
                              </div>
                              <Button
                                variant="unstyled"
                                onClick={() => handleVolunteer(1)}
                                className={`w-full ${config.color} text-foreground/70 shadow-md hover:brightness-80 ${config.shadowColor} ${config.hoverColor} transition-all hover:scale-[1.02] border-2 ${config.border}  transition-all duration-200`}
                              >
                                Volunteer 
                              </Button>
                            </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {pathItems.slice(0, 2).map((item) => (
                            <div key={item.id} className="mb-4">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-medium text-foreground/80">
                                  {language === 'fr' ? item.title_fr : item.title_en}
                                </span>
                                <span className="text-lg font-bold text-foreground/80 text-right min-w-fit">
                                  ${item.suggested_amount}
                                </span>
                              </div>
                              <Button
                                variant="unstyled"
                                onClick={() => promptDonationConfirmation(item)}
                                disabled={processing}
                                className={`w-full ${config.color} text-foreground/70 shadow-md hover:brightness-80 ${config.shadowColor} ${config.hoverColor} transition-all hover:scale-[1.02] border-2 ${config.border} transition-all duration-200`}
                              >
                                {language === 'fr' ? `Donner $${item.suggested_amount}` : `Donate $${item.suggested_amount}`}
                              </Button>
                            </div>
                          ))}

                          <div className="pt-4 border-t border-foreground/10">
                            <label className="text-sm font-medium text-foreground/80 block mb-2">
                              {language === 'fr' ? 'Ou choisissez votre montant:' : 'Or choose your amount:'}
                            </label>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
                                  $
                                </span>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={
                                    selectedPath === path ? donationAmount : ""
                                  }
                                  onChange={(e) => {
                                    setDonationAmount(e.target.value);
                                    setSelectedPath(path);
                                  }}
                                  className="pl-7 border-foreground/20 focus:border-primary focus:ring-primary/30 min-w-[30%]"
                                  min="1"
                                />
                              </div>
                              <Button
                                onClick={() =>
                                  donationAmount &&
                                  pathItems[0] &&
                                  promptDonationConfirmation(
                                    pathItems[0],
                                    parseInt(donationAmount)
                                  )
                                }
                                disabled={
                                  processing ||
                                  !donationAmount ||
                                  selectedPath !== path
                                }
                                variant="outline"
                                className="whitespace-nowrap max-w-[50%] text-wrap"
                              >
                                {language === 'fr' ? 'Donner Maintenant' : 'Give Now'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Canada Helps Donation Section */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {language === 'fr' ? 'Autres Façons de Donner' : 'Other Ways to Give'}
              </h3>
              <p className="text-foreground/70 mb-6">
                {language === 'fr'
                  ? 'Vous pouvez également faire un don sécurisé via Canada Helps'
                  : 'You can also make a secure donation via Canada Helps'}
              </p>
              <a
                href="https://www.canadahelps.org/en/dn/27709"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-primary-dark hover:to-secondary-dark transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Heart className="w-5 h-5" />
                {language === 'fr' ? 'Donner via Canada Helps' : 'Donate via Canada Helps'}
                <ExternalLink className="w-5 h-5" />
              </a>
              <p className="text-sm text-foreground/60 mt-4">
                {language === 'fr' ? 'Dons en ligne sécurisés' : 'Secure online donations'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

