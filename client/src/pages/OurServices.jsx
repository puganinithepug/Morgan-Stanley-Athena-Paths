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
  ArrowRight,
  FileText,
  Video
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function OurServices() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: '1,229',
      description: 'Clients helped in a single year',
      color: 'text-primary'
    },
    {
      icon: Clock,
      value: '24/7',
      description: 'Emergency shelter available',
      color: 'text-primary'
    },
    {
      icon: Home,
      value: '34',
      description: 'Years of service (founded 1991)',
      color: 'text-primary'
    },
    {
      icon: Heart,
      value: '10+',
      description: 'Languages available',
      color: 'text-primary'
    }
  ];

  const services1 = [
    {
      icon: Phone,
      title: 'Multilingual Services',
      description: 'Multilingual services offered by professional social workers, assisted by trained cultural intermediaries at our offices located in Laval and Montréal.',
      stat: 'Montreal: 514-274-8117 or 1-877-274-8117 | Laval: 450-688-6584',
      statColor: 'text-highlight',
      iconBg: 'bg-highlight/20',
      iconColor: 'text-highlight'
      // Source: https://www.canadahelps.org/fr/organismesdebienfaisance/le-bouclier-dathena-the-shield-of-athena/impact/view/ - "Des services multilingues sont offerts par des travailleuses sociales professionnelles, assistées d'intermédiaires culturelles formées à cet effet à nos bureaux situés à Laval et Montréal"
    },
    {
      icon: Building2,
      title: "Athena's House",
      description: 'Our shelter offers emergency housing services 24/7 in a safe and rehabilitative environment for women and children victims of family violence.',
      stat: '100 women & children at Athena\'s House',
      statColor: 'text-secondary',
      iconBg: 'bg-secondary/20',
      iconColor: 'text-secondary'
    },
    {
      icon: MessageSquare,
      title: 'Community Outreach',
      description: 'Our multilingual community outreach program informs the population of Greater Montreal and Laval in their native language about family violence issues.',
      stat: 'Tens of thousands reached annually',
      statColor: 'text-muted',
      iconBg: 'bg-muted/20',
      iconColor: 'text-muted'
    },
    {
      icon: Users2,
      title: 'Multilingual Help Lines',
      description: 'Multilingual sexual violence referral and help lines available in Montreal and Laval to provide support in clients\' native languages.',
      stat: 'Montreal: 514-270-2900 | Laval: 450-688-2117',
      statColor: 'text-primary',
      iconBg: 'bg-primary/15',
      iconColor: 'text-primary'
    }
  ];

  const services2 = [
    {
      icon: Scale,
      title: 'Advocacy & Legal Information',
      description: 'Information about legal rights, referrals to legal services, and support through court processes. Our professional social workers help women navigate the system.',
      stat: 'Included in our multilingual services',
      statColor: 'text-accent',
      iconBg: 'bg-accent/30',
      iconColor: 'text-accent'
    },
    {
      icon: Baby,
      title: 'Children\'s Services',
      description: 'Specialized programs for children exposed to family violence. Children receive age and culturally appropriate support at Athena\'s House and in our offices.',
      stat: '100 women & children at Athena\'s House',
      statColor: 'text-highlight',
      iconBg: 'bg-highlight/20',
      iconColor: 'text-highlight'
    },
    {
      icon: GraduationCap,
      title: 'Awareness & Prevention',
      description: 'Our multilingual community outreach program informs the population of Greater Montreal and Laval in their native language about family violence issues.',
      stat: 'Tens of thousands reached annually',
      statColor: 'text-primary',
      iconBg: 'bg-primary/15',
      iconColor: 'text-primary'
    },
    {
      icon: Home,
      title: 'Athena\'s House - 24/7 Shelter',
      description: 'Our shelter offers emergency housing services 24/7 in a safe and rehabilitative environment for women and children victims of family violence.',
      stat: 'Emergency shelter available 24/7',
      statColor: 'text-secondary',
      iconBg: 'bg-secondary/20',
      iconColor: 'text-secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-secondary py-20 md:py-24">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/90 mb-6 shadow-lg">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              The Shield of Athena Family Services is a non-profit community organization offering culturally and linguistically adapted professional support, intervention, and prevention services to women victims of family violence and their children, as well as members of ethnocultural communities.
              {/* Source: https://www.canadahelps.org/fr/organismesdebienfaisance/le-bouclier-dathena-the-shield-of-athena/impact/view/ */}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
            Our Network of Services
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Our network of services includes three integrated components: multilingual services, emergency shelter, and community outreach.
          </p>
        </div>
      </div>

      <div className="py-12 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Resources Section */}
      <div className="py-20 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Resources & Information
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Access publications, videos, legal information, and educational resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: FileText,
                title: 'Publications',
                description: 'Download brochures, guides, and information packages in multiple languages',
                color: 'text-highlight',
                bgColor: 'bg-highlight/20'
              },
              {
                icon: Video,
                title: 'Videos',
                description: 'Educational videos and information segments in Arabic, Creole, Spanish, Mandarin, and Vietnamese',
                color: 'text-secondary',
                bgColor: 'bg-secondary/20'
              },
              {
                icon: Scale,
                title: 'Legal Information',
                description: 'Information about legal rights, court processes, and referrals to legal services',
                color: 'text-primary',
                bgColor: 'bg-primary/15'
              },
              {
                icon: GraduationCap,
                title: 'Educational Resources',
                description: 'Awareness materials, prevention guides, and community education resources',
                color: 'text-accent',
                bgColor: 'bg-accent/30'
              }
            ].map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-4 ${resource.bgColor} rounded-full mb-4 mt-4`}>
                      <Icon className={`w-6 h-6 ${resource.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-sm text-foreground/70">{resource.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Second Step Resource */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary/20 rounded-lg flex-shrink-0 mt-6">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3 mt-6">
                    Second Step Resource - Laval
                  </h3>
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    We are establishing a second step shelter for women and children in Laval. This facility will provide transitional housing and support services for survivors as they rebuild their lives. The City of Laval has generously donated $200,000 towards this project.
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-primary text-white hover:bg-primary/90">
                      Learn More
                    </Button>
                    <Button variant="outline">
                      Support This Project
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-primary-dark via-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your donation keeps these services running
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Every contribution directly helps women and children find safety, healing, and hope.
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
