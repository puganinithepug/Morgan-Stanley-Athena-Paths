import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Users, 
  Download, 
  Mail, 
  Phone,
  ExternalLink,
  Heart,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sponsorship() {
  const { language } = useLanguage();

  const sponsorshipLevels = [
    {
      name: language === 'fr' ? 'Platine' : 'Platinum',
      amount: language === 'fr' ? '10 000$+' : '$10,000+',
      benefits: [
        language === 'fr' ? 'Table de 10 personnes' : 'Table of 10 people',
        language === 'fr' ? 'Reconnaissance sur scène' : 'On-stage recognition',
        language === 'fr' ? 'Logo sur tous les matériaux' : 'Logo on all materials',
        language === 'fr' ? 'Mention dans les médias' : 'Media mention'
      ]
    },
    {
      name: language === 'fr' ? 'Or' : 'Gold',
      amount: language === 'fr' ? '5 000$ - 9 999$' : '$5,000 - $9,999',
      benefits: [
        language === 'fr' ? 'Table de 8 personnes' : 'Table of 8 people',
        language === 'fr' ? 'Reconnaissance sur scène' : 'On-stage recognition',
        language === 'fr' ? 'Logo sur les matériaux' : 'Logo on materials'
      ]
    },
    {
      name: language === 'fr' ? 'Argent' : 'Silver',
      amount: language === 'fr' ? '2 500$ - 4 999$' : '$2,500 - $4,999',
      benefits: [
        language === 'fr' ? 'Table de 6 personnes' : 'Table of 6 people',
        language === 'fr' ? 'Reconnaissance dans le programme' : 'Recognition in program'
      ]
    },
    {
      name: language === 'fr' ? 'Bronze' : 'Bronze',
      amount: language === 'fr' ? '1 000$ - 2 499$' : '$1,000 - $2,499',
      benefits: [
        language === 'fr' ? 'Table de 4 personnes' : 'Table of 4 people',
        language === 'fr' ? 'Mention dans le programme' : 'Mention in program'
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
              <Heart className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'fr' ? 'Commandites' : 'Sponsorships'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Votre soutien en tant que commanditaire nous aide à continuer notre mission de soutenir les femmes et enfants victimes de violence familiale.'
                : 'Your support as a sponsor helps us continue our mission of supporting women and children victims of family violence.'}
            </p>
          </div>
        </div>
      </div>

      {/* Why Sponsor */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
                  <Award className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {language === 'fr' ? 'Pourquoi Devenir Commanditaire?' : 'Why Become a Sponsor?'}
                </h2>
                <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                  {language === 'fr'
                    ? 'En devenant commanditaire, vous contribuez directement à soutenir les services essentiels pour les femmes et enfants victimes de violence familiale. Votre investissement permet de maintenir et d\'étendre nos programmes de soutien multilingues, notre refuge d\'urgence Athena\'s House, et nos services de sensibilisation communautaire.'
                    : 'By becoming a sponsor, you directly contribute to supporting essential services for women and children victims of family violence. Your investment helps maintain and expand our multilingual support programs, our Athena\'s House emergency shelter, and our community outreach services.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sponsorship Levels */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Niveaux de Commandite' : 'Sponsorship Levels'}
            </h2>
            <p className="text-lg text-foreground/70">
              {language === 'fr'
                ? 'Choisissez le niveau qui correspond à votre engagement'
                : 'Choose the level that matches your commitment'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipLevels.map((level, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {level.name}
                      </h3>
                      <p className="text-lg font-semibold text-foreground">
                        {level.amount}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {level.benefits.map((benefit, bidx) => (
                        <li key={bidx} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className="text-primary mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents & Contact */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    {language === 'fr' ? 'Documents de Commandite' : 'Sponsorship Documents'}
                  </h3>
                </div>
                <div className="space-y-3">
                  <a
                    href="http://shieldofathena.com/sites/shieldofathena.com/files/sponsorship_solicitation_letter_-_lilac_gala_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    {language === 'fr' 
                      ? 'Lettre de sollicitation de commandite' 
                      : 'Sponsorship Solicitation Letter'}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="http://shieldofathena.com/sites/shieldofathena.com/files/sponsorship_forms_enfr_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    {language === 'fr' 
                      ? 'Formulaires de commandite (EN/FR)' 
                      : 'Sponsorship Forms (EN/FR)'}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    {language === 'fr' ? 'Contactez-Nous' : 'Contact Us'}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">
                        {language === 'fr' ? 'Téléphone' : 'Phone'}
                      </div>
                      <a href="tel:514-274-8117" className="text-primary hover:underline">
                        514-274-8117
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">
                        {language === 'fr' ? 'Courriel' : 'Email'}
                      </div>
                      <a href="mailto:evenement@bouclierdathena.com" className="text-primary hover:underline">
                        evenement@bouclierdathena.com
                      </a>
                    </div>
                  </div>
                  <p className="text-foreground/70 text-sm pt-2">
                    {language === 'fr'
                      ? 'Pour devenir commanditaire, veuillez nous appeler ou nous envoyer un courriel.'
                      : 'To become a sponsor, please call us or send us an email.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-br from-primary-dark via-primary to-secondary text-white">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'fr' ? 'Rejoignez-Nous en Tant Que Commanditaire' : 'Join Us as a Sponsor'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Votre soutien fait une différence dans la vie des femmes et enfants qui ont besoin de notre aide.'
              : 'Your support makes a difference in the lives of women and children who need our help.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lilac-gala">
              <Button className="bg-highlight text-foreground hover:bg-highlight/90 text-lg px-8 py-6">
                {language === 'fr' ? 'En Savoir Plus sur le Gala' : 'Learn More About the Gala'}
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
  );
}


