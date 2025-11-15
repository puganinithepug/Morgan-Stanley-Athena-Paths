import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import dataService from '../services/dataService';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowRight, Heart, Shield, Phone, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImpactMetrics from '../components/ImpactMetrics';
import ImpactStories from '../components/ImpactStories';
import PathGoals from '../components/PathGoals';
import DonationSuccessModal from '../components/DonationSuccessModal';
import CommunityGoals from '../components/CommunityGoals';
import FirstTimeVisitorModal from '../components/FirstTimeVisitorModal';
import { checkAndAwardBadges } from '../components/BadgeChecker';

export default function Landing() {
  const { t, language } = useLanguage();
  const { user, login } = useAuth();
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedPath, setSelectedPath] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const impactItems = dataService.getImpactItems();
  const donations = dataService.getDonations();

  const [hasVisited, setHasVisited] = useState(false);
  const [referralCode, setReferralCode] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
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

  const handleDonate = async (item, customAmount = null) => {
    if (!user) {
      login({});
      return;
    }

    setProcessing(true);
    const amount = customAmount || item.suggested_amount;
    let points = amount;
    if (item.path === 'PROTECTION') points = Math.floor(amount * 1.5);
    else if (item.path === 'COURAGE') points = Math.floor(amount * 1.2);

    try {
      dataService.createDonation({
        user_id: user.id,
        user_name: user.full_name || 'Anonymous',
        path: item.path,
        amount: amount,
        points_awarded: points,
        impact_item_id: item.id,
        impact_item_title: language === 'fr' ? item.title_fr : item.title_en
      });

      const newPoints = (user.total_points || 0) + points;
      dataService.updateUser(user.id, {
        total_points: newPoints,
        primary_path: user.primary_path || item.path
      });

      const userDonationsBefore = donations.filter(d => d.user_id === user.id);
      if (referralCode && userDonationsBefore.length === 0) {
        const referrer = dataService.getAllUsers().find(u => u.referral_code === referralCode);
        if (referrer && referrer.id !== user.id) {
          const referrerBonus = 10;
          const referrerUpdated = {
            ...referrer,
            total_points: (referrer.total_points || 0) + referrerBonus
          };
          dataService.updateUser(referrer.id, referrerUpdated);
          
          dataService.createReferral({
            referrer_id: referrer.id,
            referred_id: user.id,
            referral_code: referralCode,
            has_donated: true
          });
          
          setReferralCode(null);
        }
      }

      const updatedUser = dataService.getCurrentUser();
      if (updatedUser) {
        checkAndAwardBadges(updatedUser);
      }

      setLastDonation({
        amount,
        path: item.path,
        points_awarded: points
      });
      setShowSuccessModal(true);
      setDonationAmount('');
      setSelectedPath(null);
    } catch (error) {
      console.error('Donation error:', error);
      alert('Unable to process donation. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const pathConfig = {
    WISDOM: {
      icon: Phone,
      color: 'bg-secondary', // calm blue
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    },
    COURAGE: {
      icon: Heart,
      color: 'bg-muted', // warm brown
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
    },
    PROTECTION: {
      icon: Home,
      color: 'bg-primary', // brand purple
      image: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=800&h=600&fit=crop',
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

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&h=900&fit=crop)',
            filter: 'brightness(0.4)'
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant='unstyled'
              size="lg"
              onClick={() => document.getElementById('ways-to-help')?.scrollIntoView({ behavior: 'smooth' })}
              // className="bg-highlight !text-gray-900 hover:bg-white hover:shadow-highlight text-lg px-8 py-6"
              className="relative overflow-hidden bg-highlight text-foreground text-lg px-8 py-6 font-semibold rounded-full shadow-[0_0_25px_rgba(210,194,150,0.65)] hover:shadow-[0_0_35px_rgba(210,194,150,0.9)] hover:bg-highlight/95 hover:scale-[1.03] transition-all duration-500 ease-out"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      <section id="ways-to-help" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Choose How You Want to Help
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Every contribution directly supports women and children on their journey to safety and healing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {['WISDOM', 'COURAGE', 'PROTECTION'].map((path, idx) => {
              const config = pathConfig[path];
              const Icon = config.icon;
              const pathItems = impactItems.filter(item => item.path === path);
              
              return (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="h-48 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${config.image})` }}>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`${config.color} p-2 rounded-lg`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">
                            {t(`paths.${path.toLowerCase()}.name`)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  
                    <CardContent className="p-6">
                      <p className="text-foreground/70 mb-6 leading-relaxed">
                        {t(`paths.${path.toLowerCase()}.desc`)}
                      </p>

                      {pathItems.length > 0 && (
                        <div className="space-y-4">
                          {pathItems.slice(0, 2).map(item => (
                            <div key={item.id} className="mb-4">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-medium text-foreground/80">
                                  {language === 'fr' ? item.title_fr : item.title_en}
                                </span>
                                <span className="text-lg font-bold text-gray-900">
                                  ${item.suggested_amount}
                                </span>
                              </div>
                              <Button
                                variant="unstyled"
                                onClick={() => handleDonate(item)}
                                disabled={processing}
                                className={`w-full ${config.color} text-white shadow-md hover:brightness-80 hover:shadow-[0_0_20px_rgba(111,106,168,0.6)] hover:scale-[1.02]  transition-all duration-200`}
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
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">$</span>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={selectedPath === path ? donationAmount : ''}
                                  onChange={(e) => {
                                    setDonationAmount(e.target.value);
                                    setSelectedPath(path);
                                  }}
                                  className="pl-7 border-foreground/20 focus:border-primary focus:ring-primary/30"
                                  min="1"
                                />
                              </div>
                              <Button
                                onClick={() => donationAmount && pathItems[0] && handleDonate(pathItems[0], parseInt(donationAmount))}
                                disabled={processing || !donationAmount || selectedPath !== path}
                                variant="outline"
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
                {language === 'fr' ? 'À propos de Shield of Athena' : 'About Shield of Athena'}
              </h2>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                {language === 'fr'
                  ? 'Depuis plus de 40 ans, Shield of Athena offre un refuge sûr et des services complets aux femmes et aux enfants fuyant la violence familiale à Montréal.'
                  : 'For over 40 years, Shield of Athena has provided safe shelter and comprehensive services to women and children fleeing family violence in Montreal.'}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/30">
                  <div className="text-3xl font-bold text-primary mb-1">5,000+</div>
                  <div className="text-sm text-foreground/70">
                    {language === 'fr' ? 'Femmes et enfants aidés/an' : 'Women & children helped/year'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-muted/10 to-muted/5 rounded-lg p-4 border border-muted/40">
                  <div className="text-3xl font-bold text-muted mb-1">24/7</div>
                  <div className="text-sm text-foreground/70">
                    {language === 'fr' ? 'Ligne de crise' : 'Crisis line'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-highlight/20 to-highlight/10 rounded-lg p-4 border border-highlight/40">
                  <div className="text-3xl font-bold text-highlight mb-1">40+</div>
                  <div className="text-sm text-foreground/70">
                    {language === 'fr' ? 'Années de service' : 'Years of service'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg p-4 border border-accent/50">
                  <div className="text-3xl font-bold text-secondary mb-1">100%</div>
                  <div className="text-sm text-foreground/70">
                    {language === 'fr' ? 'Services gratuits' : 'Free services'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button
                    size="lg"
                    className="shadow-md hover:shadow-[0_0_20px_rgba(111,106,168,0.6)] hover:scale-[1.02] transition-all duration-200"
                  >
                    {language === 'fr' ? 'Découvrir Nos Services' : 'Discover Our Services'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/find-your-path">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/40 text-primary hover:border-primary hover:text-primary-dark"
                  >
                    {language === 'fr' ? 'Commencer à Aider' : 'Start Helping'}
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
                  alt={language === 'fr' ? 'Shield of Athena' : 'Shield of Athena'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-semibold mb-2">
                    {language === 'fr' 
                      ? 'Un refuge sûr pour chaque femme et enfant'
                      : 'A safe haven for every woman and child'}
                  </p>
                  <p className="text-sm opacity-90">
                    {language === 'fr'
                      ? 'Ensemble, nous créons un avenir sans violence'
                      : 'Together, we create a future free from violence'}
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

      <CommunityGoals onDonate={(goal) => {
        document.getElementById('ways-to-help')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      <section className="py-20 bg-gradient-to-br from-foreground via-primary-dark to-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex p-4 rounded-full bg-white/10 border border-highlight/40 mb-8"
          >
            <Heart className="w-10 h-10 text-highlight" />
          </motion.div>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl font-light leading-relaxed mb-6 italic"
          >
            "A mother and her daughter arrived safely at a shelter last night. Your support made that moment of safety possible."
          </motion.blockquote>
          <div className="w-24 h-px bg-white/30 mx-auto mb-6" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-highlight"
          >
            — Shield of Athena Team
          </motion.p>
        </div>
      </section>
    </div>
  );
}

