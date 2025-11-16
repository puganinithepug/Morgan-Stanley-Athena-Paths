import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Users, 
  Heart, 
  Award,
  Mail,
  Phone,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Membership() {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: Heart,
      title: language === 'fr' ? 'Soutien Continu' : 'Ongoing Support',
      description: language === 'fr'
        ? 'Votre adhésion soutient nos services essentiels toute l\'année'
        : 'Your membership supports our essential services year-round'
    },
    {
      icon: Users,
      title: language === 'fr' ? 'Communauté' : 'Community',
      description: language === 'fr'
        ? 'Rejoignez une communauté dédiée à faire une différence'
        : 'Join a community dedicated to making a difference'
    },
    {
      icon: Award,
      title: language === 'fr' ? 'Reconnaissance' : 'Recognition',
      description: language === 'fr'
        ? 'Reconnaissance dans nos communications et événements'
        : 'Recognition in our communications and events'
    }
  ];

  const membershipLevels = [
    {
      name: language === 'fr' ? 'Membre Individuel' : 'Individual Member',
      amount: language === 'fr' ? '25$' : '$25',
      features: [
        language === 'fr' ? 'Bulletin d\'information' : 'Newsletter',
        language === 'fr' ? 'Invitations aux événements' : 'Event invitations',
        language === 'fr' ? 'Mises à jour sur nos programmes' : 'Program updates'
      ]
    },
    {
      name: language === 'fr' ? 'Membre Famille' : 'Family Member',
      amount: language === 'fr' ? '50$' : '$50',
      features: [
        language === 'fr' ? 'Tous les avantages du membre individuel' : 'All individual member benefits',
        language === 'fr' ? 'Invitations pour toute la famille' : 'Invitations for entire family',
        language === 'fr' ? 'Reconnaissance spéciale' : 'Special recognition'
      ]
    },
    {
      name: language === 'fr' ? 'Membre Organisme' : 'Organization Member',
      amount: language === 'fr' ? '100$+' : '$100+',
      features: [
        language === 'fr' ? 'Tous les avantages précédents' : 'All previous benefits',
        language === 'fr' ? 'Logo sur notre site web' : 'Logo on our website',
        language === 'fr' ? 'Partenariats privilégiés' : 'Preferred partnerships'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
              <Users className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'fr' ? 'Devenir Membre' : 'Become a Member'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Rejoignez notre campagne annuelle d\'adhésion et soutenez notre mission de soutenir les femmes et enfants victimes de violence familiale.'
                : 'Join our annual membership campaign and support our mission of supporting women and children victims of family violence.'}
            </p>
          </div>
        </div>
      </div>

      {/* Why Become a Member */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Pourquoi Devenir Membre?' : 'Why Become a Member?'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Votre adhésion nous permet de maintenir et d\'étendre nos services essentiels'
                : 'Your membership helps us maintain and expand our essential services'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-foreground/70">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Membership Levels */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Niveaux d\'Adhésion' : 'Membership Levels'}
            </h2>
            <p className="text-lg text-foreground/70">
              {language === 'fr'
                ? 'Choisissez le niveau qui vous convient'
                : 'Choose the level that works for you'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {membershipLevels.map((level, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {level.name}
                      </h3>
                      <div className="text-3xl font-bold text-foreground">
                        {level.amount}
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {level.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 bg-primary text-white hover:bg-primary/90">
                      {language === 'fr' ? 'Devenir Membre' : 'Become a Member'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Join */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {language === 'fr' ? 'Comment Devenir Membre' : 'How to Become a Member'}
                </h2>
                <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                  {language === 'fr'
                    ? 'Contactez-nous pour obtenir plus d\'informations ou pour compléter votre adhésion'
                    : 'Contact us to get more information or to complete your membership'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      {language === 'fr' ? 'Téléphone' : 'Phone'}
                    </div>
                    <a href="tel:514-274-8117" className="text-primary hover:underline">
                      514-274-8117
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">
                      {language === 'fr' ? 'Courriel' : 'Email'}
                    </div>
                    <a href="mailto:info@bouclierdathena.com" className="text-primary hover:underline">
                      info@bouclierdathena.com
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-br from-primary-dark via-primary to-secondary text-white">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'fr' ? 'Rejoignez Notre Campagne d\'Adhésion' : 'Join Our Membership Campaign'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Votre adhésion soutient directement nos services essentiels pour les femmes et enfants victimes de violence familiale.'
              : 'Your membership directly supports our essential services for women and children victims of family violence.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-highlight text-foreground hover:bg-highlight/90 text-lg px-8 py-6">
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Button>
            </Link>
            <Link to="/services">
              <Button className="bg-white/20 text-white border-2 border-white hover:bg-white/30 text-lg px-8 py-6">
                {language === 'fr' ? 'En Savoir Plus sur Nos Services' : 'Learn More About Our Services'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


