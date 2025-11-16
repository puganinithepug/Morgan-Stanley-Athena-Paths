import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Award, Heart, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const milestones = [
    { year: '1991', event: 'Shield of Athena founded' },
    { year: '2011', event: '20th Anniversary Gala raises $200,000' },
    { year: '2012', event: 'Excellence Award from Ministry of Health and Social Services' },
    { year: '2017', event: 'City of Laval donates $200,000 for Second Step Shelter' },
    { year: '2018', event: 'Executive Director presents at United Nations' },
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

  const partnerships = [
    { name: 'Avon Canada', description: 'Donated a new van to replace the stolen vehicle' },
    { name: 'City of Laval', description: 'Donated $200,000 for the Second Step Resource shelter' },
    { name: 'Silverstar Mercedes', description: 'Lent a van during the period when our vehicle was stolen' },
    { name: 'Global Television', description: 'Media partner providing coverage and support' },
    { name: 'The Suburban', description: 'Ongoing media support and coverage' },
    { name: 'CJAD', description: 'Radio partner supporting our cause' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - visible but dimmed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Window */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="bg-background rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary-dark via-primary to-secondary p-8 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="absolute right-6 top-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">About Shield of Athena</h2>
                    <p className="text-white/80 mt-1">34 years of supporting survivors</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-8 md:p-12 space-y-12">
                  {/* Mission & Vision */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="!p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Heart className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
                        </div>
                        <p className="text-foreground/70 leading-relaxed">
                          The Shield of Athena Family Services is a non-profit community organization offering culturally and linguistically adapted professional support, intervention, and prevention services to women victims of family violence and their children, as well as members of ethnocultural communities.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="!p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Shield className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
                        </div>
                        <p className="text-foreground/70 leading-relaxed">
                          To create a world where all women and children affected by family violence have access to culturally appropriate support, safe shelter, and the resources they need to rebuild their lives with dignity and hope.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 text-center">Our History</h3>
                    <p className="text-foreground/70 text-center mb-10">Founded in 1991, we've been serving the community for over 34 years.</p>
                    
                    <div className="relative max-w-4xl mx-auto px-4">
                      {/* Central vertical line */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary"></div>
                      
                      <div className="space-y-10">
                        {milestones.map((milestone, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-6 ${
                              idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                            }`}
                          >
                            {/* Card */}
                            <div className={`flex-1 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                              <Card className="bg-gray-50 border-gray-200 shadow-sm">
                                <CardContent className="!p-4 !pt-4">
                                  <div className="text-2xl font-bold text-primary mb-1">
                                    {milestone.year}
                                  </div>
                                  <p className="text-foreground/70 text-sm leading-relaxed">
                                    {milestone.event}
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                            
                            {/* Purple dot on timeline */}
                            <div className="relative z-10 flex-shrink-0 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                            
                            {/* Empty space on other side */}
                            <div className="flex-1"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Leadership */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Our Leadership</h3>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {team.map((member, idx) => (
                        <Card key={idx}>
                          <CardContent className="!p-5 !pt-5">
                            <h4 className="text-lg font-bold text-foreground mb-1">{member.name}</h4>
                            <p className="text-primary font-semibold mb-2 text-sm">{member.role}</p>
                            <p className="text-foreground/70 text-sm leading-relaxed">{member.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Awards */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Awards & Recognition</h3>
                    <div className="flex justify-center">
                      <div className="max-w-md w-full">
                        {awards.map((award, idx) => {
                          const Icon = award.icon;
                          return (
                            <Card key={idx} className="w-full">
                              <CardContent className="!p-5 !pt-5 text-center">
                                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-3">
                                  <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2 text-base">{award.title}</h4>
                                <p className="text-primary font-semibold mb-2 text-sm">{award.organization}</p>
                                <p className="text-foreground/70 text-sm">{award.description}</p>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Partnerships */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Our Partners</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                      {partnerships.map((partner, idx) => (
                        <Card key={idx} className="hover:shadow-md transition-shadow">
                          <CardContent className="!p-4 !pt-4 text-center">
                            <h4 className="font-semibold text-foreground mb-1.5 text-sm">{partner.name}</h4>
                            <p className="text-foreground/70 text-xs leading-relaxed">{partner.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Financial Transparency */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Financial Transparency</h3>
                    <Card className="bg-gray-50 max-w-4xl mx-auto">
                      <CardContent className="!p-6 !pt-6">
                        <div className="flex items-center justify-center gap-3 mb-5">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 text-base">Registered Charity</h4>
                            <p className="text-foreground/70 text-sm mb-2 leading-relaxed">
                              <strong>Registration Number:</strong> 138823471RR0001
                            </p>
                            <p className="text-foreground/70 text-sm leading-relaxed">
                              The Shield of Athena Family Services is a registered charity in Canada. We are committed to transparency and accountability in all our financial operations.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 text-base">Annual Reports</h4>
                            <p className="text-foreground/70 text-sm leading-relaxed">
                              Our annual reports detail our financial activities, program outcomes, and impact. Contact us to request a copy of our most recent annual report.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Call to Action Banner */}
                  <div className="mt-8 -mx-6 -mb-6">
                    <div className="bg-gradient-to-r from-primary-dark via-primary to-secondary py-12 px-6 text-center">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Join Us in Making a Difference
                      </h3>
                      <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Your support helps us continue our mission of supporting survivors of family violence
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/find-your-path" onClick={onClose}>
                          <Button
                            size="lg"
                            className="bg-primary-dark text-white hover:bg-primary-dark/90 border-2 border-primary-light flex items-center gap-2 px-6 py-3 rounded-lg"
                          >
                            Get Involved
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </Link>
                        <Link to="/services" onClick={onClose}>
                          <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/10 text-white border-2 border-primary-light hover:bg-white/20 flex items-center gap-2 px-6 py-3 rounded-lg"
                          >
                            Learn About Our Services
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

