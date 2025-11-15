import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Clock, 
  Home, 
  Heart, 
  Phone, 
  Building2, 
  MessageSquare, 
  Users2,
  Scale,
  Baby,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function OurServices() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: '5,000+',
      description: language === 'fr' ? 'Femmes et enfants aidés chaque année' : 'Women and children helped each year',
      color: 'text-primary'
    },
    {
      icon: Clock,
      value: '24/7',
      description: language === 'fr' ? 'Disponibilité de la ligne de crise' : 'Crisis line availability',
      color: 'text-primary'
    },
    {
      icon: Home,
      value: '40+',
      description: language === 'fr' ? 'Années de service' : 'Years of service',
      color: 'text-primary'
    },
    {
      icon: Heart,
      value: '100%',
      description: language === 'fr' ? 'Services gratuits et confidentiels' : 'Free and confidential services',
      color: 'text-primary'
    }
  ];

  const services1 = [
    {
      icon: Phone,
      title: language === 'fr' ? 'Ligne de Crise 24/7' : '24/7 Crisis Line',
      description: language === 'fr'
        ? 'Soutien téléphonique immédiat pour les femmes en crise. Disponible jour et nuit, notre ligne de crise offre écoute, information et planification de sécurité.'
        : 'Immediate phone support for women in crisis. Available day and night, our crisis line provides listening, information, and safety planning.',
      stat: language === 'fr' ? '3,500+ appels annuellement' : '3,500+ calls annually',
      statColor: 'text-highlight',
      iconBg: 'bg-highlight/20',
      iconColor: 'text-highlight'
    },
    {
      icon: Building2,
      title: language === 'fr' ? "Hébergement d'Urgence" : 'Emergency Shelter',
      description: language === 'fr'
        ? 'Logement sûr et confidentiel pour les femmes et leurs enfants fuyant la violence. Comprend les repas, la sécurité et un espace pour respirer.'
        : 'Safe, confidential housing for women and their children fleeing violence. Includes meals, security, and a space to breathe.',
      stat: language === 'fr' ? '200+ familles hébergées annuellement' : '200+ families sheltered annually',
      statColor: 'text-secondary',
      iconBg: 'bg-secondary/20',
      iconColor: 'text-secondary'
    },
    {
      icon: MessageSquare,
      title: language === 'fr' ? 'Counseling Individuel' : 'Individual Counseling',
      description: language === 'fr'
        ? 'Soutien thérapeutique professionnel pour les femmes et les enfants. Nos conseillers aident à traiter le traumatisme, développer des stratégies d\'adaptation et reconstruire la confiance.'
        : 'Professional therapeutic support for women and children. Our counselors help process trauma, develop coping strategies, and rebuild confidence.',
      stat: language === 'fr' ? '1,000+ heures de counseling annuellement' : '1,000+ counseling hours annually',
      statColor: 'text-muted',
      iconBg: 'bg-muted/20',
      iconColor: 'text-muted'
    },
    {
      icon: Users2,
      title: language === 'fr' ? 'Groupes de Soutien' : 'Support Groups',
      description: language === 'fr'
        ? 'Réunions de groupe hebdomadaires où les survivantes partagent leurs expériences, apprennent les unes des autres et construisent une communauté.'
        : 'Weekly group meetings where survivors share experiences, learn from each other, and build community.',
      stat: language === 'fr' ? '15 groupes actifs' : '15 active groups',
      statColor: 'text-primary',
      iconBg: 'bg-primary/15',
      iconColor: 'text-primary'
    }
  ];

  const services2 = [
    {
      icon: Scale,
      title: language === 'fr' ? 'Plaidoyer et Information Juridique' : 'Advocacy & Legal Information',
      description: language === 'fr'
        ? 'Information sur les droits juridiques, références aux services juridiques et soutien dans les processus judiciaires. Nous aidons les femmes à naviguer dans le système.'
        : 'Information about legal rights, referrals to legal services, and support through court processes. We help women navigate the system.',
      stat: language === 'fr' ? '500+ femmes informées annuellement' : '500+ women informed annually',
      statColor: 'text-accent',
      iconBg: 'bg-accent/30',
      iconColor: 'text-accent'
    },
    {
      icon: Baby,
      title: language === 'fr' ? 'Services pour Enfants' : 'Children\'s Services',
      description: language === 'fr'
        ? 'Programmes spécialisés pour les enfants exposés à la violence familiale, notamment counseling, activités récréatives et soutien éducatif.'
        : 'Specialized programs for children exposed to family violence, including counseling, recreational activities, and educational support.',
      stat: language === 'fr' ? '300+ enfants soutenus annuellement' : '300+ children supported annually',
      statColor: 'text-highlight',
      iconBg: 'bg-highlight/20',
      iconColor: 'text-highlight'
    },
    {
      icon: GraduationCap,
      title: language === 'fr' ? 'Programmes Éducatifs' : 'Educational Programs',
      description: language === 'fr'
        ? 'Ateliers sur la violence familiale, les relations saines, la parentalité et le développement personnel pour les survivantes.'
        : 'Workshops on family violence, healthy relationships, parenting, and personal development for survivors.',
      stat: language === 'fr' ? '50+ ateliers annuellement' : '50+ workshops annually',
      statColor: 'text-primary',
      iconBg: 'bg-primary/15',
      iconColor: 'text-primary'
    },
    {
      icon: Home,
      title: language === 'fr' ? 'Logement de Transition' : 'Transitional Housing',
      description: language === 'fr'
        ? 'Soutien au logement à long terme pour aider les femmes à trouver et maintenir un logement stable après avoir quitté le refuge.'
        : 'Long-term housing support to help women find and maintain stable housing after leaving shelter.',
      stat: language === 'fr' ? '100+ familles aidées annuellement' : '100+ families assisted annually',
      statColor: 'text-secondary',
      iconBg: 'bg-secondary/20',
      iconColor: 'text-secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-secondary py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/90 mb-6 shadow-lg">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'fr' ? 'Nos Services' : 'Our Services'}
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Shield of Athena offre un soutien complet aux femmes et aux enfants fuyant la violence familiale. Tous nos services sont gratuits, confidentiels et disponibles en plusieurs langues.'
                : 'Shield of Athena provides comprehensive support to women and children fleeing family violence. All our services are free, confidential, and available in multiple languages.'}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className={`w-12 h-12 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground/70 text-sm">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === 'fr' ? 'Soutien Complet à Chaque Étape' : 'Comprehensive Support at Every Stage'}
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'De la crise à la guérison, nous marchons aux côtés des survivantes tout au long de leur parcours.'
              : 'From crisis to healing, we walk alongside survivors throughout their journey.'}
          </p>
        </div>
      </div>

      <div className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services1.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                  <CardContent className="pt-7 pb-6 px-6">
                    <div className="flex items-start gap-4">
                      <div className={`${service.iconBg} p-2 rounded flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${service.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-foreground/70 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <p className={`font-semibold ${service.statColor}`}>
                          {service.stat}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services2.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                  <CardContent className="pt-7 pb-6 px-6">
                    <div className="flex items-start gap-4">
                      <div className={`${service.iconBg} p-2 rounded flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${service.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {service.title}
                        </h3>
                        <p className="text-foreground/70 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <p className={`font-semibold ${service.statColor}`}>
                          {service.stat}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-primary-dark via-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {language === 'fr' ? 'Votre don maintient ces services en fonctionnement' : 'Your donation keeps these services running'}
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Chaque contribution aide directement les femmes et les enfants à trouver sécurité, guérison et espoir.'
              : 'Every contribution directly helps women and children find safety, healing, and hope.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/find-your-path">
              <Button
                size="lg"
                className="bg-highlight text-foreground hover:bg-highlight/95 flex items-center gap-2 shadow-primary-dark-glow hover:shadow-primary-dark-glow border-2 border-primary-dark hover:scale-[1.02] transition-all"
              >
                {language === 'fr' ? 'Trouvez Votre Parcours' : 'Find Your Path'}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
