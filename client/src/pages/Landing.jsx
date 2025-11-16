import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import dataService from "../services/dataService";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { Heart, Shield, Phone, Home, Quote, Users, HandHeart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ImpactMetrics from "../components/ImpactMetrics";
import ImpactStories from "../components/ImpactStories";
import PathGoals from "../components/PathGoals";
import DonationSuccessModal from "../components/DonationSuccessModal";
import CommunityGoals from "../components/CommunityGoals";
import FirstTimeVisitorModal from "../components/FirstTimeVisitorModal";
import PathTransitionSection from "../components/PathTransitionSection";
import AboutModal from "../components/AboutModal";
import MotionSection from "../components/ui/MotionSection";

import wisdomImg from "../assets/hero_wisdom.jpg";
import protectionImg from "../assets/hero_protection.jpg";
import courageImg from "../assets/hero_courage.jpeg";
import aboutImg from "../assets/about_image.jpeg"


export default function Landing() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedPath, setSelectedPath] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null); // { item, customAmount }

  const impactItems = dataService.getImpactItems();

  const [hasVisited, setHasVisited] = useState(false);
  const [referralCode, setReferralCode] = useState(null);


  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fromLeft = {
    hidden: { opacity: 0, x: -80 }, // make it big so you can SEE it clearly
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fromRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

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

  const handleDonate = useCallback(async (item, customAmount = null, triggeredAfterLogin = false) => {
    if (!user && !triggeredAfterLogin) {
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
      try {
        if (item.path !== "SERVICE"){
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
        }
      } catch (err) {
        console.error("Backend donation error:", err);

        // If we're in offline demo admin mode, also record the donation locally
        if (user && user.id === "offline-admin") {
          try {
            dataService.createDonation({
              user_id: user.id,
              user_name: user.full_name || "Admin (Offline Demo)",
              path: item.path,
              amount,
              points_awarded: points,
              impact_item_id: item.id,
              impact_item_title:
                language === "fr" ? item.title_fr : item.title_en,
            });

            const newPoints = (user.total_points || 0) + points;
            dataService.updateUser(user.id, {
              total_points: newPoints,
              primary_path: user.primary_path || item.path,
            });
          } catch (localErr) {
            console.error("Failed to record offline admin donation locally", localErr);
          }
        }
      }

      // Donation is stored in backend only now (and in-memory for offline admin);
      // UI stats and badges will be driven from backend where available.

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
  }, [user, referralCode]);

  const handleVolunteer = async (hours = null) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("open-login-modal"));
      return;
    }
    
    window.location.href = "/volunteer-schedule";
  };

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
  }, [pendingDonation, handleDonate]);

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
        `${wisdomImg}`
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
        `${courageImg}`
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
        `${protectionImg}`
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

/* -------------------- VIDEO EMBED COMPONENT -------------------- */
function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT) {
      resolve(window.YT);
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });
}

function VideoEmbed({ videoId }) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const playerIdRef = useRef(`youtube-player-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    let observer;
    let player;

    loadYouTubeAPI().then((YT) => {
      // Ensure the element has an ID before creating the player
      if (playerRef.current && !playerRef.current.id) {
        playerRef.current.id = playerIdRef.current;
      }

      // Use the element ID string instead of the element directly
      const elementId = playerRef.current?.id || playerIdRef.current;
      
      player = new YT.Player(elementId, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          mute: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    player.playVideo();
                  } else {
                    player.pauseVideo();
                  }
                });
              },
              { threshold: 0.5 }
            );

            observer.observe(containerRef.current);
          },
        },
      });
    });

    return () => {
      observer?.disconnect();
      if (player && player.destroy) {
        try {
          player.destroy();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div
          id={playerIdRef.current}
          ref={playerRef}
          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
}


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

      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />

      <PathTransitionSection onAboutClick={() => setShowAboutModal(true)} />

      <VideoEmbed videoId="WGND5Fvt2NA" />

      <MotionSection id="ways-to-help" className="py-20 bg-gray-50" variants={fromLeft}>
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Path to Make a Difference
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Every contribution directly supports women and children victims of family violence on their journey to safety and healing
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
                  viewport={{ once: false, margin: "-100px" }}
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
                      // <div className="space-y-4">
                      //   {/* One Hour Volunteer Session */}
                      //   <div className="mb-4">
                      //     <div className="flex justify-between items-start mb-2">
                      //       <span className="text-sm font-medium text-foreground/80">
                      //         Volunteer Session
                      //       </span>
                      //       <span className="text-lg font-bold text-foreground/80 text-right min-w-fit">
                      //         1 hour
                      //       </span>
                      //     </div>
                      //     <Button
                      //       variant="unstyled"
                      //       onClick={() => handleVolunteer(1)}
                      //       className={`w-full ${config.color} text-foreground/70 shadow-md hover:brightness-80 ${config.shadowColor} ${config.hoverColor} transition-all hover:scale-[1.02] border-2 ${config.border}  transition-all duration-200`}
                      //     >
                      //       Volunteer 1 Hour
                      //     </Button>
                      //   </div>

                      //   {/* Three Hour Volunteer Session */}
                      //   <div className="mb-4">
                      //     <div className="flex justify-between items-start mb-2">
                      //       <span className="text-sm font-medium text-foreground/80">
                      //         Volunteer Session
                      //       </span>
                      //       <span className="text-lg font-bold text-foreground/80 text-right min-w-fit">
                      //         3 hours
                      //       </span>
                      //     </div>
                      //     <Button
                      //       variant="unstyled"
                      //       onClick={() => handleVolunteer(3)}
                      //       className={`w-full ${config.color} text-foreground/70 shadow-md hover:brightness-80 ${config.shadowColor} ${config.hoverColor} transition-all hover:scale-[1.02] border-2 ${config.border}  transition-all duration-200`}
                      //     >
                      //       Volunteer 3 Hours
                      //     </Button>
                      //   </div>
                      //   <div className="pt-4 border-t border-foreground/10">
                      //     <label className="text-sm font-medium text-foreground/80 block mb-2">
                      //       Or choose custom hours:
                      //     </label>
                      //     <div className="flex gap-2">
                      //       <div className="relative flex-1">
                      //         <Input
                      //           type="number"
                      //           placeholder="0"
                      //           value={selectedPath === path ? donationAmount : ""}
                      //           onChange={(e) => {
                      //             setDonationAmount(e.target.value);
                      //             setSelectedPath(path);
                      //           }}
                      //           className="border-foreground/20 focus:border-primary focus:ring-primary/30 min-w-[30%]"
                      //           min="1"
                      //         />
                      //         <span className="absolute right-10 top-1/2 -translate-y-1/2 text-foreground/50">
                      //           hours
                      //         </span>
                      //       </div>
                      //       <Button
                      //         onClick={() =>
                      //           donationAmount &&
                      //           handleVolunteer(parseInt(donationAmount))
                      //         }
                      //         disabled={
                      //           processing ||
                      //           !donationAmount ||
                      //           selectedPath !== path
                      //         }
                      //         variant="outline"
                      //         className="whitespace-nowrap max-w-[50%] text-wrap"
                      //       >
                      //         Volunteer
                      //       </Button>
                      //     </div>
                      //   </div>
                      // </div>
                    ) : (
                      <div className="space-y-4">
                          {pathItems.slice(0, 2).map((item) => (
                            <div key={item.id} className="mb-4">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-medium text-foreground/80">
                                  {item.title_en}
                                </span>
                                <span className="text-lg font-bold text-foreground/80 text-right min-w-fit">
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
                                  className="pl-7 border-foreground/20 focus:border-primary focus:ring-primary/30 min-w-[30%]"
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
                                className="whitespace-nowrap max-w-[50%] text-wrap"
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
      </MotionSection>

      <section className="py-20 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
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
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutImg}
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

      <MotionSection variants={fromRight}>                 
        <ImpactMetrics />
      </MotionSection>

      <MotionSection variants={fadeUp}>                
        <PathGoals />
      </MotionSection>

      <MotionSection variants={fromLeft}>   
        <ImpactStories />
      </MotionSection>

      <MotionSection variants={fromRight}>
        <CommunityGoals
          onDonate={(goal) => {
            document
              .getElementById("ways-to-help")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </MotionSection>

      <MotionSection className="py-20 bg-gradient-to-br from-foreground via-primary-dark to-primary text-white" variants={fadeUp}>
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex p-4 rounded-full bg-white/10 border border-highlight/40 mb-8"
            >
              <Heart className="w-10 h-10 text-highlight" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Hear from our team about the real difference your support makes in the lives of women and children
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                quote: "Through our extensive network, 1,229 clients were helped in a single year at our Montreal and Laval centers. In addition, 100 women and children found refuge at Athena's House emergency shelter.",
                author: "Shield of Athena Team",
                impact: "1,229 clients helped in a single year",
                number: "1,229"
              },
              {
                quote: "Our multilingual services are offered by professional social workers, assisted by trained cultural intermediaries at our offices in Laval and Montréal. Every donation directly supports these critical services.",
                author: "Program Director",
                impact: "100 women & children at Athena's House",
                number: "100"
              },
              {
                quote: "For 34 years (founded in 1991), we have been helping victims of conjugal and family violence. Our community outreach reaches tens of thousands annually through education, awareness, information sessions, and media engagement.",
                author: "Community Outreach Coordinator",
                impact: "34 years of service (founded 1991)",
                number: "34"
              },
              {
                quote: "Our 24/7 crisis line is a lifeline for women in immediate danger. Last year, we answered over 3,000 crisis calls, providing immediate support, safety planning, and connecting callers with emergency resources when needed.",
                author: "Crisis Line Coordinator",
                impact: "3,000+ crisis calls answered annually",
                number: "3,000+"
              },
              {
                quote: "The children's support programs help young ones process trauma and rebuild their sense of safety. We provide age-appropriate therapy, art programs, and educational support to help children heal and thrive after experiencing violence.",
                author: "Children's Services Manager",
                impact: "Specialized programs for children",
                number: "100%"
              },
              {
                quote: "Legal advocacy is crucial for survivors seeking protection orders and navigating the justice system. Our team provides accompaniment, interpretation services, and helps women understand their rights in multiple languages.",
                author: "Legal Advocacy Coordinator",
                impact: "Comprehensive legal support services",
                number: "10+"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
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
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: "Clients Helped in a Single Year", value: "1,229", icon: Users },
                { label: "Women & Children at Athena's House", value: "100", icon: Home },
                { label: "Years of Service (founded 1991)", value: "34", icon: Heart },
                { label: "Languages Available", value: "10+", icon: Phone }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false }}
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
      </MotionSection>
    </div>
  );
}

