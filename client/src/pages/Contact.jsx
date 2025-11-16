import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Building2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const offices = [
    {
      name: language === 'fr' ? 'Bureau de Montréal' : 'Montreal Office',
      phone: '514-274-8117',
      phoneAlt: '1-877-274-8117',
      address: 'P.O. BOX 25, MONT ROYAL, QC, H3P 3B8',
      hours: language === 'fr' ? 'Lun-Ven: 9h-17h' : 'Mon-Fri: 9am-5pm'
    },
    {
      name: language === 'fr' ? 'Bureau de Laval' : 'Laval Office',
      phone: '450-688-6584',
      address: language === 'fr' ? 'Laval, Québec' : 'Laval, Quebec',
      hours: language === 'fr' ? 'Lun-Ven: 9h-17h' : 'Mon-Fri: 9am-5pm'
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
              <Mail className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'fr' ? 'Contactez-Nous' : 'Contact Us'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Nous sommes là pour vous aider. Contactez-nous pour toute question ou demande d\'information.'
                : 'We are here to help. Contact us with any questions or information requests.'}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                  </h2>
                  {submitted && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      {language === 'fr'
                        ? 'Merci! Votre message a été envoyé. Nous vous répondrons bientôt.'
                        : 'Thank you! Your message has been sent. We will get back to you soon.'}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {language === 'fr' ? 'Nom' : 'Name'} *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {language === 'fr' ? 'Courriel' : 'Email'} *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder={language === 'fr' ? 'votre@email.com' : 'your@email.com'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {language === 'fr' ? 'Téléphone' : 'Phone'}
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={language === 'fr' ? '514-xxx-xxxx' : '514-xxx-xxxx'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {language === 'fr' ? 'Sujet' : 'Subject'} *
                      </label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        placeholder={language === 'fr' ? 'Sujet de votre message' : 'Message subject'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        {language === 'fr' ? 'Message' : 'Message'} *
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        placeholder={language === 'fr' ? 'Votre message...' : 'Your message...'}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                      <Send className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Envoyer' : 'Send'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {offices.map((office, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-lg mb-3">
                          {office.name}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${office.phone.replace(/-/g, '')}`} className="hover:text-primary">
                              {office.phone}
                            </a>
                            {office.phoneAlt && (
                              <>
                                <span className="text-foreground/40">|</span>
                                <a href={`tel:${office.phoneAlt.replace(/-/g, '')}`} className="hover:text-primary">
                                  {office.phoneAlt}
                                </a>
                              </>
                            )}
                          </div>
                          <div className="flex items-start gap-2 text-foreground/70">
                            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-foreground/70">
                            <Clock className="w-4 h-4" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground text-lg mb-4">
                    {language === 'fr' ? 'Autres moyens de contact' : 'Other ways to reach us'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">
                          {language === 'fr' ? 'Courriel général' : 'General Email'}
                        </div>
                        <a href="mailto:info@bouclierdathena.com" className="text-primary hover:underline">
                          info@bouclierdathena.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">
                          {language === 'fr' ? 'Événements & Commandites' : 'Events & Sponsorships'}
                        </div>
                        <a href="mailto:evenement@bouclierdathena.com" className="text-primary hover:underline">
                          evenement@bouclierdathena.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground text-lg mb-4">
                    {language === 'fr' ? 'Besoin d\'aide immédiate?' : 'Need immediate help?'}
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {language === 'fr'
                      ? 'Si vous êtes en danger, appelez le 9-1-1 immédiatement.'
                      : 'If you are in danger, call 9-1-1 immediately.'}
                  </p>
                  <a href="/are-you-a-victim">
                    <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                      {language === 'fr' ? 'Ressources d\'urgence' : 'Emergency Resources'}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


