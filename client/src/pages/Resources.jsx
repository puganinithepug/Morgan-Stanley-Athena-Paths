import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  FileText, 
  Video, 
  Scale, 
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Resources() {
  const { language } = useLanguage();

  const resources = [
    {
      icon: FileText,
      title: language === 'fr' ? 'Publications' : 'Publications',
      description: language === 'fr'
        ? 'Téléchargez des dépliants, guides et trousses d\'information en plusieurs langues'
        : 'Download brochures, guides, and information packages in multiple languages',
      color: 'text-highlight',
      bgColor: 'bg-highlight/20',
      items: [
        language === 'fr' ? 'Dépliants multilingues' : 'Multilingual brochures',
        language === 'fr' ? 'Guides d\'information' : 'Information guides',
        language === 'fr' ? 'Trousses d\'information' : 'Information packages'
      ]
    },
    {
      icon: Video,
      title: language === 'fr' ? 'Vidéos' : 'Videos',
      description: language === 'fr'
        ? 'Vidéos éducatives et segments d\'information en arabe, créole, espagnol, mandarin et vietnamien'
        : 'Educational videos and information segments in Arabic, Creole, Spanish, Mandarin, and Vietnamese',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
      items: [
        language === 'fr' ? 'Vidéos éducatives' : 'Educational videos',
        language === 'fr' ? 'Segments d\'information' : 'Information segments',
        language === 'fr' ? 'Plusieurs langues disponibles' : 'Multiple languages available'
      ]
    },
    {
      icon: Scale,
      title: language === 'fr' ? 'Information Juridique' : 'Legal Information',
      description: language === 'fr'
        ? 'Information sur les droits légaux, les processus judiciaires et les références aux services juridiques'
        : 'Information about legal rights, court processes, and referrals to legal services',
      color: 'text-primary',
      bgColor: 'bg-primary/15',
      items: [
        language === 'fr' ? 'Droits légaux' : 'Legal rights',
        language === 'fr' ? 'Processus judiciaires' : 'Court processes',
        language === 'fr' ? 'Références aux services juridiques' : 'Referrals to legal services'
      ]
    },
    {
      icon: GraduationCap,
      title: language === 'fr' ? 'Ressources Éducatives' : 'Educational Resources',
      description: language === 'fr'
        ? 'Matériel de sensibilisation, guides de prévention et ressources d\'éducation communautaire'
        : 'Awareness materials, prevention guides, and community education resources',
      color: 'text-accent',
      bgColor: 'bg-accent/30',
      items: [
        language === 'fr' ? 'Matériel de sensibilisation' : 'Awareness materials',
        language === 'fr' ? 'Guides de prévention' : 'Prevention guides',
        language === 'fr' ? 'Ressources d\'éducation communautaire' : 'Community education resources'
      ]
    }
  ];

  const videoLanguages = [
    { name: 'Arabic', flag: '🇸🇦' },
    { name: 'Creole', flag: '🇭🇹' },
    { name: 'Spanish', flag: '🇪🇸' },
    { name: 'Mandarin', flag: '🇨🇳' },
    { name: 'Vietnamese', flag: '🇻🇳' }
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
              <FileText className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'fr' ? 'Ressources & Information' : 'Resources & Information'}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Accédez aux publications, vidéos, informations juridiques et ressources éducatives'
                : 'Access publications, videos, legal information, and educational resources'}
            </p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all h-full">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex p-4 ${resource.bgColor} rounded-full mb-4`}>
                        <Icon className={`w-6 h-6 ${resource.color}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                      <p className="text-sm text-foreground/70 mb-4">{resource.description}</p>
                      <ul className="text-sm text-foreground/60 space-y-1 text-left">
                        {resource.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
              <Video className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Vidéos Éducatives' : 'Educational Videos'}
            </h2>
            <p className="text-lg text-foreground/70">
              {language === 'fr'
                ? 'Vidéos d\'information disponibles en plusieurs langues'
                : 'Information videos available in multiple languages'}
            </p>
          </div>
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {language === 'fr' ? 'Langues Disponibles' : 'Available Languages'}
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {videoLanguages.map((lang, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium text-foreground">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  <Video className="w-5 h-5 mr-2" />
                  {language === 'fr' ? 'Voir les Vidéos' : 'View Videos'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Violence Hurts Us All Section */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
                  <Video className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {language === 'fr' ? 'La Violence Nous Blesse Tous!' : 'Violence Hurts Us All!'}
                </h2>
                <p className="text-lg text-foreground/70 mb-6">
                  {language === 'fr'
                    ? 'Regardez notre vidéo éducative et accédez à plus d\'outils audiovisuels'
                    : 'Watch our educational video and access more audiovisual tools'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <Video className="w-5 h-5 mr-2" />
                    {language === 'fr' ? 'Voir la vidéo' : 'See the video'}
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    {language === 'fr' ? 'Plus d\'outils audiovisuels' : 'More audiovisual tools'}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Legal Information Online */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
              <Scale className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {language === 'fr' ? 'Information Juridique en Ligne' : 'Legal Information Online'}
            </h2>
            <p className="text-lg text-foreground/70">
              {language === 'fr'
                ? 'Ressources juridiques et informations sur vos droits'
                : 'Legal resources and information about your rights'}
            </p>
          </div>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {language === 'fr' ? 'Informations Disponibles' : 'Available Information'}
                  </h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>{language === 'fr' ? 'Droits légaux des victimes' : 'Legal rights of victims'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>{language === 'fr' ? 'Processus judiciaires' : 'Court processes'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>{language === 'fr' ? 'Ordres de protection' : 'Protection orders'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      <span>{language === 'fr' ? 'Références aux services juridiques' : 'Referrals to legal services'}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {language === 'fr' ? 'Comment Accéder' : 'How to Access'}
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {language === 'fr'
                      ? 'Contactez-nous pour obtenir des informations juridiques et des références aux services appropriés.'
                      : 'Contact us to get legal information and referrals to appropriate services.'}
                  </p>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'En Savoir Plus' : 'Learn More'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

