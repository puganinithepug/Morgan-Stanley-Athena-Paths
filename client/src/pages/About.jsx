import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/Card';
import { 
  Shield, 
  Award, 
  Users, 
  Heart, 
  Calendar,
  Building2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const { language } = useLanguage();

  const milestones = [
    { year: '1991', event: language === 'fr' ? 'Fondation du Bouclier d\'Athéna' : 'Shield of Athena founded' },
    { year: '2011', event: language === 'fr' ? 'Gala du 20e anniversaire amasse 200 000$' : '20th Anniversary Gala raises $200,000' },
    { year: '2012', event: language === 'fr' ? 'Prix d\'Excellence du Ministère de la Santé et des Services sociaux' : 'Excellence Award from Ministry of Health and Social Services' },
    { year: '2017', event: language === 'fr' ? 'Ville de Laval fait un don de 200 000$ pour le refuge Second Step' : 'City of Laval donates $200,000 for Second Step Shelter' },
    { year: '2018', event: language === 'fr' ? 'Directrice générale présente aux Nations Unies' : 'Executive Director presents at United Nations' },
    { year: '2025', event: language === 'fr' ? '34 ans de service, continuant à soutenir les survivantes' : '34 years of service, continuing to support survivors' }
  ];

  const team = [
    {
      name: 'Melpa Kamateros',
      role: language === 'fr' ? 'Directrice générale' : 'Executive Director',
      description: language === 'fr'
        ? 'Dirige l\'organisation depuis plus de 20 ans, a présenté aux Nations Unies sur "L\'égalité pour les femmes rurales et éloignées au Canada"'
        : 'Led the organization for over 20 years, presented at the United Nations on "Equality for Rural & Remote Women in Canada"'
    },
    {
      name: 'Maud Pontel',
      role: language === 'fr' ? 'Coordonnatrice' : 'Coordinator',
      description: language === 'fr'
        ? 'Fait partie de la Délégation des femmes canadiennes, présentant aux Nations Unies'
        : 'Part of the Canadian Women\'s Delegation, presenting at the United Nations'
    }
  ];

  const awards = [
    {
      title: language === 'fr' ? 'Prix d\'Excellence 2012' : 'Excellence Award 2012',
      organization: language === 'fr' ? 'Ministère de la Santé et des Services sociaux du Québec' : 'Ministry of Health and Social Services of Québec',
      category: language === 'fr' ? 'Soutien aux personnes et groupes vulnérables' : 'Support to vulnerable persons and groups',
      description: language === 'fr'
        ? 'Décerné au Département de sensibilisation communautaire multilingue pour service exceptionnel'
        : 'Awarded to the Multilingual Community Outreach Department for outstanding service',
      icon: Award
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
              <Shield className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'fr' ? 'Qui Nous Sommes' : 'Who We Are'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Le Bouclier d\'Athéna Services familiaux est un organisme communautaire sans but lucratif offrant des services professionnels de soutien, d\'intervention et de prévention culturellement et linguistiquement adaptés.'
                : 'The Shield of Athena Family Services is a non-profit community organization offering culturally and linguistically adapted professional support, intervention, and prevention services.'}
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
                  <Heart className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {language === 'fr' ? 'Notre Mission' : 'Our Mission'}
                </h2>
                <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                  {language === 'fr'
                    ? 'Créer un monde où toutes les femmes et enfants touchés par la violence familiale ont accès à un soutien culturellement approprié, un refuge sûr et les ressources nécessaires pour reconstruire leur vie avec dignité et espoir.'
                    : 'To create a world where all women and children affected by family violence have access to culturally appropriate support, safe shelter, and the resources they need to rebuild their lives with dignity and hope.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* History & Milestones */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Notre Histoire' : 'Our History'}
            </h2>
            <p className="text-lg text-foreground/70">
              {language === 'fr'
                ? '34 ans de service dédié aux femmes et enfants victimes de violence familiale'
                : '34 years of dedicated service to women and children victims of family violence'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-primary mb-2">
                          {milestone.year}
                        </div>
                        <p className="text-foreground/70">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {member.name}
                        </h3>
                        <p className="text-primary font-semibold mb-3">
                          {member.role}
                        </p>
                        <p className="text-foreground/70 leading-relaxed">
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Reconnaissance' : 'Recognition'}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {awards.map((award, idx) => {
              const Icon = award.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="p-4 rounded-lg bg-primary/20">
                          <Icon className="w-10 h-10 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {award.title}
                          </h3>
                          <p className="text-lg font-semibold text-primary mb-2">
                            {award.organization}
                          </p>
                          <p className="text-foreground/70 mb-3">
                            {award.category}
                          </p>
                          <p className="text-foreground/70 leading-relaxed">
                            {award.description}
                          </p>
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

      {/* Impact Stats */}
      <div className="py-16 bg-gradient-to-br from-primary-dark via-primary to-secondary text-white">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {language === 'fr' ? 'Notre Impact' : 'Our Impact'}
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                value: '1,229', 
                label: language === 'fr' ? 'Clients aidés en une année' : 'Clients helped in a single year',
                icon: Users 
              },
              { 
                value: '100', 
                label: language === 'fr' ? 'Femmes et enfants à Athena\'s House' : 'Women & children at Athena\'s House',
                icon: Building2 
              },
              { 
                value: '34', 
                label: language === 'fr' ? 'Années de service (fondé en 1991)' : 'Years of service (founded 1991)',
                icon: Calendar 
              },
              { 
                value: '10+', 
                label: language === 'fr' ? 'Langues disponibles' : 'Languages available',
                icon: Heart 
              }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 rounded-full bg-white/10 mb-4">
                    <Icon className="w-8 h-8 text-highlight" />
                  </div>
                  <div className="text-4xl font-bold text-highlight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

