import React from 'react';
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

  const milestones = [
    { year: '1991', event: 'Shield of Athena founded' },
    { year: '2011', event: '20th Anniversary Gala raises $200,000' },
    { year: '2012', event: 'Excellence Award from Ministry of Health and Social Services' },
    { year: '2017', event: 'City of Laval donates $200,000 for Second Step Shelter' },
    { year: '2018', event: 'Executive Director presents at United Nations' },
    { year: '2020-2024', event: 'Pause in events and fundraising due to COVID-19' },
    { year: '2025', event: '34 years of service, continuing to support survivors' }
  ];

  const team = [
    {
      name: 'Melpa Kamateros',
      role: 'Executive Director',
      description: 'Led the organization for over 20 years, presented at the United Nations on "Equality for Rural & Remote Women in Canada"'
    },
    {
      name: 'Maud Pontel',
      role: 'Coordinator',
      description: 'Part of the Canadian Women\'s Delegation, presenting at the United Nations'
    }
  ];

  const awards = [
    {
      title: 'Excellence Award 2012',
      organization: 'Ministry of Health and Social Services of Québec',
      category: 'Support to vulnerable persons and groups',
      description: 'Awarded to the Multilingual Community Outreach Department for outstanding service',
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
              Who We Are
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              The Shield of Athena Family Services is a non-profit community organization offering culturally and linguistically adapted professional support, intervention, and prevention services.
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
                  Our Mission
                </h2>
                <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                  To create a world where all women and children affected by family violence have access to culturally appropriate support, safe shelter, and the resources they need to rebuild their lives with dignity and hope.
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
              Our History
            </h2>
            <p className="text-lg text-foreground/70">
              34 years of dedicated service to women and children victims of family violence
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
              Our Team
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

      {/* COVID-19 Impact Section */}
      <div className="py-16 bg-background">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  COVID-19 Impact
                </h2>
              </div>
              <p className="text-foreground/70 leading-relaxed text-lg max-w-4xl mx-auto text-center">
                Community organizations like ours have suffered during this period as due to COVID-19 restrictions we have also been limited in our events and fundraising activities. The Board of the Shield has taken the perspective that we cannot subject people to possible contamination and have stopped all of these activities in the interests of public health. Despite these challenges, we have continued to provide our essential services to women and children victims of family violence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Awards Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Recognition
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
              Our Impact
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                value: '1,229', 
                label: 'Clients helped in a single year',
                icon: Users 
              },
              { 
                value: '100', 
                label: 'Women & children at Athena\'s House',
                icon: Building2 
              },
              { 
                value: '34', 
                label: 'Years of service (founded 1991)',
                icon: Calendar 
              },
              { 
                value: '10+', 
                label: 'Languages available',
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

