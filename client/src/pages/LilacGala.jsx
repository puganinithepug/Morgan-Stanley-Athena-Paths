import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Users, 
  Gift, 
  Mail, 
  Phone,
  Download,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LilacGala() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 py-20 md:py-24">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex p-4 rounded-full bg-white/20 backdrop-blur-sm mb-6"
            >
              <Calendar className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'fr' ? 'Gala Annuel Lilas 2025' : '2025 Annual Lilac Gala'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {language === 'fr'
                ? 'Rejoignez-nous le 29 novembre 2025 pour célébrer 34 ans de service et soutenir les femmes et enfants victimes de violence familiale.'
                : 'Join us on November 29th, 2025 to celebrate 34 years of service and support women and children victims of family violence.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 font-bold shadow-lg">
                <Ticket className="w-5 h-5 mr-2" />
                {language === 'fr' ? 'Acheter des billets' : 'Buy Tickets'}
              </Button>
              <a href="#sponsor">
                <Button className="bg-white/20 text-white border-2 border-white hover:bg-white/30 text-lg px-8 py-6">
                  {language === 'fr' ? 'Devenir Commanditaire' : 'Become a Sponsor'}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-8">
                {language === 'fr' ? 'Détails de l\'Événement' : 'Event Details'}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {language === 'fr' ? 'Date' : 'Date'}
                    </h3>
                    <p className="text-foreground/70">November 29, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {language === 'fr' ? 'Lieu' : 'Location'}
                    </h3>
                    <p className="text-foreground/70">
                      {language === 'fr' 
                        ? 'Détails à venir' 
                        : 'Details to be announced'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Gift className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {language === 'fr' ? 'Activités' : 'Activities'}
                    </h3>
                    <ul className="text-foreground/70 space-y-1 list-disc list-inside">
                      <li>{language === 'fr' ? 'Dîner élégant' : 'Elegant dinner'}</li>
                      <li>{language === 'fr' ? 'Enchères silencieuses' : 'Silent auction'}</li>
                      <li>{language === 'fr' ? 'Tirage' : 'Raffle'}</li>
                      <li>{language === 'fr' ? 'Divertissement' : 'Entertainment'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-purple/10 to-pink/10 border-2 border-purple/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {language === 'fr' ? 'Pourquoi Participer?' : 'Why Attend?'}
                  </h3>
                  <div className="space-y-4">
                    <p className="text-foreground/70 leading-relaxed">
                      {language === 'fr'
                        ? 'Grâce à vous, nous aidons les victimes de violence conjugale et familiale depuis 34 ans. Cette année, tous les fonds recueillis lors de l\'événement iront au maintien et à l\'expansion de nos services.'
                        : 'Thanks to you, we have been helping victims of conjugal and family violence for 34 years. This year, all funds raised at the event will go towards maintaining and expanding our services.'}
                    </p>
                    <p className="text-foreground/70 leading-relaxed">
                      {language === 'fr'
                        ? 'Nous vous promettons une soirée pleine de divertissement avec un dîner élégant, une enchère silencieuse et un tirage au programme.'
                        : 'We promise you an evening full of entertainment featuring an elegant dinner, a silent auction, and a raffle on the agenda.'}
                    </p>
                    <div className="pt-4 border-t border-foreground/10">
                      <p className="text-foreground/70 mb-4">
                        {language === 'fr'
                          ? 'Un grand merci à nos commanditaires à ce jour. Nous avons hâte de vous voir là-bas!'
                          : 'A big thank you to our sponsors to date. We look forward to seeing you there!'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sponsorship Section */}
      <div id="sponsor" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Devenir Commanditaire' : 'Become a Sponsor'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Votre soutien en tant que commanditaire nous aide à continuer notre mission de soutenir les femmes et enfants victimes de violence familiale.'
                : 'Your support as a sponsor helps us continue our mission of supporting women and children victims of family violence.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
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
      <div className="py-16 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'fr' ? 'Rejoignez-Nous le 29 Novembre!' : 'Join Us on November 29th!'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Soyez là pour faire une différence dans la vie des femmes et des enfants qui ont besoin de notre aide.'
              : 'Be there to make a difference in the lives of women and children who need our help.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 font-bold">
              <Ticket className="w-5 h-5 mr-2" style={{ color: '#9333EA' }} />
              {language === 'fr' ? 'Acheter des Billets' : 'Buy Tickets'}
            </Button>
            <Link to="/contact">
              <Button className="bg-white border-2 border-white text-purple-600 hover:bg-white/95 text-lg px-8 py-6 font-bold" style={{ backgroundColor: '#FFFFFF' }}>
                {language === 'fr' ? 'Nous Contacter' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


