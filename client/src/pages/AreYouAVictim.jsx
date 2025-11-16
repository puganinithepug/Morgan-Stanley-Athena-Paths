import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Phone, 
  Shield, 
  Home, 
  AlertTriangle, 
  Users, 
  ArrowRight,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AreYouAVictim() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState(null);

  // Quick Exit function
  const quickExit = () => {
    window.open('https://www.google.com', '_blank', 'noopener,noreferrer');
    window.location.replace('https://www.google.com');
  };

  // ESC keyboard shortcut
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        quickExit();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Reordered emergency numbers - 911 first, then others
  const emergencyNumbers = [
    {
      name: 'Police',
      number: '9-1-1',
      tel: 'tel:911',
      description: language === 'fr' ? 'Si vous êtes en danger immédiat, appelez le 9-1-1 maintenant.' : 'If you are in immediate danger, call 9-1-1 now.',
      color: '#DC2626',
      bgColor: '#FDECEA',
      borderColor: '#F8C6C3',
      isProminent: true
    },
    {
      name: 'S.O.S. Violence conjugale',
      number: '514-873-9010',
      tel: 'tel:514-873-9010',
      altNumber: '1-800-363-9010',
      altTel: 'tel:1-800-363-9010',
      description: language === 'fr' ? 'Ligne d\'aide 24/7' : '24/7 help line',
      color: '#6A6CF6',
      bgColor: '#F7F5FF',
      borderColor: '#D8D3FF'
    },
    {
      name: language === 'fr' ? 'Bouclier d\'Athéna - Bureau de Montréal' : 'Shield of Athena Montreal office',
      number: '514-274-8117',
      tel: 'tel:514-274-8117',
      altNumber: '1-877-274-8117',
      altTel: 'tel:1-877-274-8117',
      description: language === 'fr' ? 'Services multilingues' : 'Multilingual services',
      color: '#6A6CF6',
      bgColor: '#F7F5FF',
      borderColor: '#D8D3FF'
    },
    {
      name: language === 'fr' ? 'Bouclier d\'Athéna - Bureau de Laval' : 'Shield of Athena Laval office',
      number: '450-688-6584',
      tel: 'tel:450-688-6584',
      description: language === 'fr' ? 'Services multilingues' : 'Multilingual services',
      color: '#6A6CF6',
      bgColor: '#F7F5FF',
      borderColor: '#D8D3FF'
    },
    {
      name: language === 'fr' ? 'Lignes d\'aide multilingues - Violence sexuelle' : 'Multilingual Sexual Violence Help Lines',
      montreal: '514-270-2900',
      montrealTel: 'tel:514-270-2900',
      laval: '450-688-2117',
      lavalTel: 'tel:450-688-2117',
      description: language === 'fr' ? 'Montréal et Laval' : 'Montreal and Laval',
      color: '#6A6CF6',
      bgColor: '#F7F5FF',
      borderColor: '#D8D3FF'
    }
  ];

  const helpSections = [
    {
      id: 'emergency',
      icon: AlertTriangle,
      emoji: '🚨',
      title: language === 'fr' ? 'Comment savoir si c\'est une urgence?' : 'How do I know if this is an emergency?',
      content: language === 'fr'
        ? 'Si vous êtes en danger immédiat ou si vous craignez pour votre sécurité ou celle de vos enfants, appelez le 9-1-1 immédiatement. La police peut vous aider à vous mettre en sécurité. Si vous avez besoin d\'un refuge d\'urgence, contactez-nous au 514-274-8117 (Montréal) ou 450-688-6584 (Laval). Votre sécurité est la priorité.'
        : 'If you are in immediate danger or fear for your safety or your children\'s safety, call 9-1-1 immediately. Police can help you get to safety. If you need emergency shelter, contact us at 514-274-8117 (Montreal) or 450-688-6584 (Laval). Your safety is the priority.',
      color: '#DC2626',
      bgColor: '#FDECEA',
      borderColor: '#F8C6C3'
    },
    {
      id: 'shelter',
      icon: Home,
      emoji: '🛡️',
      title: language === 'fr' ? 'Où puis-je aller maintenant pour être en sécurité?' : 'Where can I go right now to be safe?',
      content: language === 'fr'
        ? 'Athena\'s House offre un refuge d\'urgence 24/7 pour les femmes et les enfants victimes de violence familiale. Nous fournissons un environnement sûr et réhabilitant avec des services de soutien professionnels multilingues. Vous pouvez nous contacter à tout moment au 514-274-8117 (Montréal) ou 450-688-6584 (Laval).'
        : 'Athena\'s House offers 24/7 emergency shelter for women and children victims of family violence. We provide a safe and rehabilitative environment with multilingual professional support services. You can contact us anytime at 514-274-8117 (Montreal) or 450-688-6584 (Laval).',
      color: '#6A6CF6',
      bgColor: '#F7F5FF',
      borderColor: '#D8D3FF'
    },
    {
      id: 'planning',
      icon: Shield,
      emoji: 'ℹ️',
      title: language === 'fr' ? 'Comment créer un plan de sécurité?' : 'How do I create a safety plan?',
      content: language === 'fr'
        ? '• Identifiez un moment sûr pour partir lorsque l\'agresseur n\'est pas à la maison.\n• Gardez des documents essentiels dans un endroit caché mais facile d\'accès.\n• Préparez un petit sac d\'urgence pour vous et vos enfants.\n• Apprenez aux enfants comment composer le 9-1-1 s\'ils en sont capables.\n• Décidez d\'un ami ou voisin de confiance à alerter si vous signalez un danger.\n• Planifiez des options de transport: taxi, transport en commun, ami ou services d\'urgence.\n• Mémorisez les numéros clés au cas où votre téléphone serait confisqué.\n• Si possible, évitez les pièces comme la cuisine ou la salle de bain pendant un épisode violent.\n• Faites toujours confiance à vos instincts—votre sécurité passe en premier.'
        : '• Identify a safe time to leave when the aggressor is not home.\n• Keep essential documents in a hidden but quick-to-reach location.\n• Prepare a small emergency bag for yourself and your children.\n• Teach children how to dial 911 if they are able.\n• Decide on a trusted friend or neighbor to alert if you signal danger.\n• Plan transportation options: taxi, public transit, friend, or emergency services.\n• Memorize key numbers in case your phone is taken away.\n• If possible, avoid rooms like the kitchen or bathroom during a violent episode.\n• Always trust your instincts—your safety comes first.',
      color: '#6A6CF6',
      bgColor: '#F7F5FF',
      borderColor: '#D8D3FF'
    },
    {
      id: 'talk',
      icon: Phone,
      emoji: '📞',
      title: language === 'fr' ? 'À qui puis-je parler en toute confidentialité?' : 'Who can I talk to confidentially?',
      content: language === 'fr'
        ? 'Nos travailleuses sociales professionnelles multilingues sont disponibles pour vous écouter et vous soutenir de manière confidentielle. Appelez-nous au 514-274-8117 (Montréal) ou 450-688-6584 (Laval). Nous offrons des services dans plus de 10 langues. Toutes les conversations sont confidentielles et vous pouvez parler librement de votre situation.'
        : 'Our multilingual professional social workers are available to listen and support you confidentially. Call us at 514-274-8117 (Montreal) or 450-688-6584 (Laval). We offer services in over 10 languages. All conversations are confidential and you can speak freely about your situation.',
      color: '#6A6CF6',
      bgColor: '#F7F5FF',
      borderColor: '#D8D3FF'
    },
    {
      id: 'children',
      icon: Users,
      emoji: 'ℹ️',
      title: language === 'fr' ? 'Mes enfants sont-ils affectés par cette situation?' : 'Are my children affected by this situation?',
      content: language === 'fr'
        ? 'Nous offrons des programmes spécialisés pour les enfants exposés à la violence familiale. Les enfants reçoivent un soutien adapté à leur âge et à leur culture à Athena\'s House et dans nos bureaux. Nous comprenons que les enfants peuvent être profondément affectés et nous offrons un environnement sûr où ils peuvent exprimer leurs sentiments et recevoir le soutien dont ils ont besoin. Contactez-nous pour plus d\'informations.'
        : 'We offer specialized programs for children exposed to family violence. Children receive age and culturally appropriate support at Athena\'s House and in our offices. We understand that children can be deeply affected and we provide a safe environment where they can express their feelings and receive the support they need. Contact us for more information.',
      color: '#6A6CF6',
      bgColor: '#F7F5FF',
      borderColor: '#D8D3FF'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Quick Exit Button */}
      <button
        onClick={quickExit}
        className="fixed top-20 right-4 z-[60] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-semibold text-sm md:text-base"
        aria-label={language === 'fr' ? 'Sortie rapide' : 'Quick Exit'}
      >
        <X className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden sm:inline">{language === 'fr' ? 'Sortie Rapide' : 'Quick Exit'}</span>
      </button>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-secondary py-16 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex p-4 rounded-full bg-white/30 backdrop-blur-md mb-6 shadow-xl"
            >
              <Shield className="w-12 h-12 md:w-14 md:h-14 text-white stroke-2" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white"
            >
              {language === 'fr' 
                ? 'Vous sentez-vous en danger à la maison?' 
                : 'Do you feel unsafe at home?'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-3 font-medium text-white/90"
            >
              {language === 'fr'
                ? 'Si vous vivez de la violence conjugale ou familiale—ou si vous n\'êtes pas sûr(e)—ces étapes et ressources peuvent vous guider.'
                : 'If you are experiencing conjugal or family violence—or if you\'re unsure—these steps and resources can guide you.'}
            </motion.p>
            
            {/* Safety Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs md:text-sm max-w-2xl mx-auto mb-4 italic text-white/80"
            >
              {language === 'fr'
                ? 'Votre visite sur cette page ne sera pas enregistrée dans votre historique de navigation, mais veuillez effacer votre historique si vous craignez que quelqu\'un le voie.'
                : 'Your visit to this page will not be saved in your browsing history, but please clear your history if you are worried about someone seeing it.'}
            </motion.p>

            {/* 24/7 Support Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <p className="text-sm md:text-base max-w-2xl mx-auto font-medium text-white/90">
                {language === 'fr'
                  ? '💬 Vous pouvez appeler ou envoyer un SMS au numéro 24/7: 514-873-9010 ou 1-800-363-9010'
                  : '💬 You can call or text the 24/7 number: 514-873-9010 or 1-800-363-9010'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <a href="tel:911">
                <Button 
                  variant='unstyled'
                  className="bg-white text-red-600 hover:bg-primary-dark hover:text-white px-6 py-3 font-bold shadow-lg hover:shadow-xl transition-all flex items-center rounded-md"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  EMERGENCY - 9-1-1
                </Button>
              </a>
              <Link to="/services">
                <Button className="bg-white/20 text-white border-2 border-white hover:bg-white/30 text-base px-6 py-3 font-bold shadow-lg hover:shadow-xl transition-all flex items-center">
                  {language === 'fr' ? 'Nos Services' : 'Our Services'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Help Sections */}
      <div className="py-20 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Cliquez sur une question pour en savoir plus'
                : 'Click on a question to learn more'}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpSections.map((section, idx) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 border-2 ${isActive && section.id !== 'emergency' ? 'ring-2 ring-offset-2' : ''}`}
                    style={{
                      backgroundColor: section.bgColor,
                      borderColor: section.borderColor,
                      ...(isActive && section.id !== 'emergency' ? { 
                        boxShadow: '0 0 0 2px #6A6CF6'
                      } : {})
                    }}
                    onMouseEnter={(e) => {
                      if (section.id !== 'emergency') {
                        e.currentTarget.style.backgroundColor = '#EEE8FF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (section.id !== 'emergency') {
                        e.currentTarget.style.backgroundColor = '#F7F5FF';
                      }
                    }}
                    onClick={() => setActiveSection(isActive ? null : section.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className=" rounded-xl flex-shrink-0 flex items-center gap-2 mt-6">
                          <Icon className="w-5 h-5" style={{ color: section.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground mb-3 text-lg leading-tight mt-6">
                            {section.title}
                          </h3>
                          <motion.div
                            initial={false}
                            animate={{
                              height: isActive ? 'auto' : 0,
                              opacity: isActive ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-foreground/70 leading-relaxed pt-2 whitespace-pre-line">
                              {section.content}
                            </p>
                          </motion.div>
                          {!isActive && (
                            <p className="text-sm text-foreground/50 mt-2 italic">
                              {language === 'fr' ? 'Cliquez pour en savoir plus' : 'Click to learn more'}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Important Numbers */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex p-4 rounded-full mb-6 bg-highlight/20">
              <Phone className="w-10 h-10 text-highlight" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Numéros Importants' : 'Important Numbers'}
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-4">
              {language === 'fr' 
                ? 'Appelez-nous - Nous sommes là pour vous aider 24/7'
                : 'Call us - We are here to help you 24/7'}
            </p>
            <p className="text-sm text-foreground/60 max-w-2xl mx-auto italic">
              {language === 'fr'
                ? 'Ces numéros n\'apparaîtront pas comme "Bouclier d\'Athéna" sur l\'affichage de l\'appelant.'
                : 'These numbers will not appear as "Shield of Athena" on caller ID.'}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyNumbers.map((number, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={number.isProminent ? 'md:col-span-2 lg:col-span-3' : ''}
              >
                <Card className={`border-2 hover:shadow-lg transition-all ${number.isProminent ? 'border-4 shadow-xl' : ''}`}
                  style={{
                    backgroundColor: number.bgColor,
                    borderColor: number.borderColor
                  }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 flex-shrink-0 mt-6" style={{ color: number.color }} />
                      <div className="flex-1">
                        <h3 className={`font-bold mb-2 ${number.isProminent ? 'text-xl' : ''} mt-6`} style={{ color: number.color }}>
                          {number.name}
                        </h3>
                        <div className="space-y-1">
                          {number.number && (
                            <a
                              href={number.tel}
                              className={`${number.isProminent ? 'text-4xl' : 'text-2xl'} font-bold hover:underline block`}
                              style={{ color: number.color }}
                            >
                              {number.number}
                            </a>
                          )}
                          {number.altNumber && (
                            <a
                              href={number.altTel}
                              className="text-lg hover:underline block"
                              style={{ color: number.color }}
                            >
                              {number.altNumber}
                            </a>
                          )}
                          {number.montreal && (
                            <div className="space-y-1">
                              <div>
                                <span className="text-sm text-foreground/70">Montreal: </span>
                                <a href={number.montrealTel} className="text-lg font-semibold hover:underline" style={{ color: '#6A6CF6' }}>
                                  {number.montreal}
                                </a>
                              </div>
                              <div>
                                <span className="text-sm text-foreground/70">Laval: </span>
                                <a href={number.lavalTel} className="text-lg font-semibold hover:underline" style={{ color: '#6A6CF6' }}>
                                  {number.laval}
                                </a>
                              </div>
                            </div>
                          )}
                          <p className={`text-sm text-foreground/60 mt-2 ${number.isProminent ? 'font-semibold' : ''}`}>
                            {number.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="py-16 bg-gradient-to-br from-primary-dark via-primary to-secondary text-white">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              {language === 'fr' ? 'Vous n\'êtes pas seul(e)' : 'You are not alone'}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {language === 'fr'
                ? 'Le Bouclier d\'Athéna est là pour vous soutenir. Contactez-nous pour obtenir de l\'aide confidentielle et multilingue.'
                : 'The Shield of Athena is here to support you. Contact us for confidential, multilingual help.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button className="bg-highlight text-foreground hover:bg-highlight/90 text-lg px-8 py-6">
                  {language === 'fr' ? 'Découvrir Nos Services' : 'Discover Our Services'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="bg-white/20 text-white border-2 border-white hover:bg-white/30 text-lg px-8 py-6">
                  {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
