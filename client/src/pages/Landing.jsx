import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import dataService from "../services/dataService";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { ArrowRight, Heart, Shield, Phone, Home, Clock, Quote, Users, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImpactMetrics from "../components/ImpactMetrics";
import ImpactStories from "../components/ImpactStories";
import PathGoals from "../components/PathGoals";
import DonationSuccessModal from "../components/DonationSuccessModal";
import CommunityGoals from "../components/CommunityGoals";
import FirstTimeVisitorModal from "../components/FirstTimeVisitorModal";
import VolunteerCard from "../components/VolunteerCard";
import PathTransitionSection from "../components/PathTransitionSection";


export default function Landing() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedPath, setSelectedPath] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null); // { item, customAmount }

  const impactItems = dataService.getImpactItems();

  const [hasVisited, setHasVisited] = useState(false);
  const [referralCode, setReferralCode] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");
    if (refCode && user) {
      setReferralCode(refCode);
    }

    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, hasVisited]);

  const handleDonate = async (item, customAmount = null, triggeredAfterLogin = false) => {
    if (!user && !triggeredAfterLogin) {
      // Remember what the user wanted to donate, then open login popup
      setPendingDonation({ item, customAmount });
      window.dispatchEvent(new CustomEvent("open-login-modal"));
      return;
    }

    setProcessing(true);
    const amount = customAmount || item.suggested_amount;
    let points = amount;
    if (item.path === "PROTECTION") points = Math.floor(amount * 1.5);
    else if (item.path === "COURAGE") points = Math.floor(amount * 1.2);

    try {
      // Record donation in backend
      try {
        await fetch("http://localhost:8000/donate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            amount,
            path: item.path,
            uuid: user.id,
            impact: points,
            referral_code: referralCode,
          }),
        });
      } catch (err) {
        console.error("Backend donation error:", err);
      }

      // Donation is stored in backend only now; UI stats and badges
      // will be driven from backend in future steps.

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
  };

  const handleVolunteer = async (hours = null) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("open-login-modal"));
      return;
    }
    
    if (hours) {
      // Record volunteer hours in backend
      try {
        await fetch("http://localhost:8000/volunteer", {
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
    
    // Navigate to volunteer schedule page
    window.location.href = "/volunteer-schedule";
  };

  // When login succeeds and there is a pending donation, resume it
  useEffect(() => {
    const handler = () => {
      if (pendingDonation) {
        const { item, customAmount } = pendingDonation;
        setPendingDonation(null);
        handleDonate(item, customAmount, true);
      }
    };

    window.addEventListener("login-success", handler);
    return () => window.removeEventListener("login-success", handler);
  }, [pendingDonation]);

  const pathConfig = {
    WISDOM: {
      icon: Phone,
      color: "bg-gradient-to-br from-highlight/20 to-highlight/10", // calm blue
      border: 'border-highlight/40',
      iconColor: 'text-highlight',
      iconBg: 'bg-highlight/30',
      shadowColor: 'shadow-highlight-glow',
      hoverColor: 'hover:shadow-highlight-glow-strong',
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
    },
    COURAGE: {
      icon: Heart,
      color: "bg-gradient-to-br from-muted/20 to-muted/10", // warm brown
      border: 'border-muted/40',
      iconColor: 'text-muted',
      iconBg: 'bg-muted/30',
      shadowColor: 'shadow-muted-glow',
      hoverColor: 'hover:shadow-muted-glow-strong',
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
    },
    PROTECTION: {
      icon: Shield,
      color: "bg-gradient-to-br from-secondary/20 to-secondary/10", // brand purple
      border: 'border-secondary/40',
      iconColor: 'text-secondary',
      iconBg: 'bg-secondary/30',
      shadowColor: 'shadow-secondary-glow',
      hoverColor: 'hover:shadow-secondary-glow-strong',
      image:
        "https://images.unsplash.com/photo-1560264280-88b68371db39?w=800&h=600&fit=crop",
    },
    SERVICE: {
      icon: HandHeart,
      color: "bg-gradient-to-br from-accent/20 to-accent/10", // mint color
      border: 'border-accent/40',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/30',
      shadowColor: 'shadow-accent-glow',
      hoverColor: 'hover:shadow-accent-glow-strong',
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop",
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FirstTimeVisitorModal
        isOpen={showWelcomeModal}
        onClose={() => {
          setShowWelcomeModal(false);
          setHasVisited(true);
        }}
      />

      <DonationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        donation={lastDonation}
      />

      <PathTransitionSection />

      <section id="ways-to-help" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Path to Make a Difference
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Every contribution directly supports women and children on their
              journey to safety and healing
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
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

                      {path === "SERVICE" ? ( // SPECIAL HANDLING FOR SERVICE PATH
                      <div className="space-y-4">
                        {/* One Hour Volunteer Session */}
                        <div className="mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-foreground/80">
                              Volunteer Session
                            </span>
                            <span className="text-lg font-bold text-foreground/80">
                              1 hour
                            </span>
                          </div>
                          <Button
                            variant="unstyled"
                            onClick={() => handleVolunteer(1)}
                            className={`w-full ${config.color} text-foreground/70 shadow-md hover:brightness-80 ${config.shadowColor} ${config.hoverColor} transition-all hover:scale-[1.02] border-2 ${config.border}  transition-all duration-200`}
                          >
                            Volunteer 1 Hour
                          </Button>
                        </div>

                        {/* Three Hour Volunteer Session */}
                        <div className="mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-foreground/80">
                              Volunteer Session
                            </span>
                            <span className="text-lg font-bold text-foreground/80">
                              3 hours
                            </span>
                          </div>
                          <Button
                            variant="unstyled"
                            onClick={() => handleVolunteer(3)}
                            className={`w-full ${config.color} text-foreground/70 shadow-md hover:brightness-80 ${config.shadowColor} ${config.hoverColor} transition-all hover:scale-[1.02] border-2 ${config.border}  transition-all duration-200`}
                          >
                            Volunteer 3 Hours
                          </Button>
                        </div>
                        <div className="pt-4 border-t border-foreground/10">
                          <label className="text-sm font-medium text-foreground/80 block mb-2">
                            Or choose custom hours:
                          </label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                type="number"
                                placeholder="0"
                                value={selectedPath === path ? donationAmount : ""}
                                onChange={(e) => {
                                  setDonationAmount(e.target.value);
                                  setSelectedPath(path);
                                }}
                                className="border-foreground/20 focus:border-primary focus:ring-primary/30"
                                min="1"
                              />
                              <span className="absolute right-10 top-1/2 -translate-y-1/2 text-foreground/50">
                                hours
                              </span>
                            </div>
                            <Button
                              onClick={() =>
                                donationAmount &&
                                handleVolunteer(parseInt(donationAmount))
                              }
                              disabled={
                                processing ||
                                !donationAmount ||
                                selectedPath !== path
                              }
                              variant="outline"
                              className="whitespace-nowrap min-w-[100px]"
                            >
                              Volunteer
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // REGULAR DONATION PATHS (WISDOM, COURAGE, PROTECTION)
                      <div className="space-y-4">
                          {pathItems.slice(0, 2).map((item) => (
                            <div key={item.id} className="mb-4">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-medium text-foreground/80">
                                  {language === "fr"
                                    ? item.title_fr
                                    : item.title_en}
                                </span>
                                <span className="text-lg font-bold text-foreground/80">
                                  ${item.suggested_amount}
                                </span>
                              </div>
                              <Button
                                variant="unstyled"
                                onClick={() => handleDonate(item)}
                                disabled={processing}
                                className={`w-full ${config.color} text-foreground/70 shadow-md hover:brightness-80 ${config.shadowColor} ${config.hoverColor} transition-all hover:scale-[1.02] border-2 ${config.border}  transition-all duration-200`}
                              >
                                Donate ${item.suggested_amount}
                              </Button>
                            </div>
                          ))}

                          <div className="pt-4 border-t border-foreground/10">
                            <label className="text-sm font-medium text-foreground/80 block mb-2">
                              Or choose your amount:
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
                                  className="pl-7 border-foreground/20 focus:border-primary focus:ring-primary/30"
                                  min="1"
                                />
                              </div>
                              <Button
                                onClick={() =>
                                  donationAmount &&
                                  pathItems[0] &&
                                  handleDonate(
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
                                className="whitespace-nowrap min-w-[100px]"
                              >
                                Give Now
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
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                {language === "fr"
                  ? "À propos de Shield of Athena"
                  : "About Shield of Athena"}
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                {language === "fr"
                  ? "Depuis plus de 30 ans, Shield of Athena offre un refuge sûr et des services complets aux femmes et aux enfants fuyant la violence familiale à Montréal."
                  : "For over 30 years, Shield of Athena has provided safe shelter and comprehensive services to women and children fleeing family violence in Montreal."}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/30">
                  <div className="text-3xl font-bold text-primary mb-1">
                    2,000+
                  </div>
                  <div className="text-sm text-foreground/70">
                    {language === "fr"
                      ? "Femmes et enfants aidés/an"
                      : "Women & children helped/year"}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-muted/10 to-muted/5 rounded-lg p-4 border border-muted/40">
                  <div className="text-3xl font-bold text-muted mb-1">24/7</div>
                  <div className="text-sm text-foreground/70">
                    {language === "fr" ? "Ligne de crise" : "Crisis line"}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-highlight/20 to-highlight/10 rounded-lg p-4 border border-highlight/40">
                  <div className="text-3xl font-bold text-highlight mb-1">
                    30+
                  </div>
                  <div className="text-sm text-foreground/70">
                    {language === "fr"
                      ? "Années de service"
                      : "Years of service"}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg p-4 border border-accent/50">
                  <div className="text-3xl font-bold text-secondary mb-1">
                    100%
                  </div>
                  <div className="text-sm text-foreground/70">
                    {language === "fr" ? "Services gratuits" : "Free services"}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button
                    size="lg"
                    className="shadow-md hover:shadow-[0_0_20px_rgba(111,106,168,0.6)] hover:scale-[1.02] transition-all duration-200"
                  >
                    {language === "fr"
                      ? "Découvrir Nos Services"
                      : "Discover Our Services"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/find-your-path">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/40 text-primary hover:border-primary hover:text-primary-dark"
                  >
                    {language === "fr" ? "Commencer à Aider" : "Start Helping"}
                    <Heart className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop"
                  alt={
                    language === "fr" ? "Shield of Athena" : "Shield of Athena"
                  }
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-semibold mb-2">
                    {language === "fr"
                      ? "Un refuge sûr pour chaque femme et enfant"
                      : "A safe haven for every woman and child"}
                  </p>
                  <p className="text-sm opacity-90">
                    {language === "fr"
                      ? "Ensemble, nous créons un avenir sans violence"
                      : "Together, we create a future free from violence"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ImpactMetrics />

      <PathGoals />

      <ImpactStories />

      <CommunityGoals
        onDonate={(goal) => {
          document
            .getElementById("ways-to-help")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <section className="py-20 bg-gradient-to-br from-foreground via-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex p-4 rounded-full bg-white/10 border border-highlight/40 mb-8"
            >
              <Heart className="w-10 h-10 text-highlight" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">
              {language === "fr" ? "Témoignages" : "Testimonials"}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {language === "fr"
                ? "Voici ce que disent les survivantes et notre équipe sur l'impact de votre soutien"
                : "Hear from survivors and our team about the impact of your support"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                quote: "A mother and her daughter arrived safely at a shelter last night. Your support made that moment of safety possible.",
                author: "Shield of Athena Team",
                impact: "5,000+ women & children helped this year",
                number: "5,000+"
              },
              {
                quote: "Every donation directly funds critical services. Last month alone, your contributions provided 247 shelter nights and 89 counseling sessions.",
                author: "Program Director",
                impact: "247 shelter nights funded last month",
                number: "247"
              },
              {
                quote: "The community's generosity has enabled us to answer over 1,200 crisis calls this year. Each call represents a life that matters.",
                author: "Crisis Line Coordinator",
                impact: "1,200+ crisis calls answered",
                number: "1,200+"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-8 h-8 text-highlight/60 mb-4" />
                    <blockquote className="text-lg font-light leading-relaxed mb-6 italic flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-highlight font-semibold mb-2">
                        {testimonial.author}
                      </p>
                      <div className="bg-white/20 px-4 py-2 rounded-full inline-block">
                        <p className="text-sm font-semibold">
                          {testimonial.impact}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: language === "fr" ? "Familles aidées" : "Families Helped", value: "1,247", icon: Users },
                { label: language === "fr" ? "Nuits d'hébergement" : "Shelter Nights", value: "3,892", icon: Home },
                { label: language === "fr" ? "Heures de counseling" : "Counseling Hours", value: "2,156", icon: Heart },
                { label: language === "fr" ? "Appels de crise" : "Crisis Calls", value: "1,200+", icon: Phone }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1, type: "spring" }}
                    className="text-center"
                  >
                    <div className="inline-flex p-3 rounded-full bg-white/10 mb-3">
                      <Icon className="w-6 h-6 text-highlight" />
                    </div>
                    <div className="text-3xl font-bold text-highlight mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
