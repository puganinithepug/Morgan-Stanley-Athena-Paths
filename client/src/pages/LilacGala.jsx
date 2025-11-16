import React from 'react';
import { Link } from 'react-router-dom';
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
              <Calendar className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              2025 Annual Lilac Gala
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Join us on November 29th, 2025 to celebrate 34 years of service and support women and children victims of family violence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-highlight text-foreground hover:bg-highlight/90 text-lg px-8 py-6 font-bold shadow-lg">
                <Ticket className="w-5 h-5 mr-2" />
                Buy Tickets
              </Button>
              <a href="#sponsor">
                <Button className="bg-white/20 text-white border-2 border-white hover:bg-white/30 text-lg px-8 py-6">
                  Become a Sponsor
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
                Event Details
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      Date
                    </h3>
                    <p className="text-foreground/70">November 29, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      Location
                    </h3>
                    <p className="text-foreground/70">
                      Details to be announced
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Gift className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      Activities
                    </h3>
                    <ul className="text-foreground/70 space-y-1 list-disc list-inside">
                      <li>Elegant dinner</li>
                      <li>Silent auction</li>
                      <li>Raffle</li>
                      <li>Entertainment</li>
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
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Why Attend?
                  </h3>
                  <div className="space-y-4">
                    <p className="text-foreground/70 leading-relaxed">
                      Thanks to you, we have been helping victims of conjugal and family violence for 34 years. This year, all funds raised at the event will go towards maintaining and expanding our services.
                    </p>
                    <p className="text-foreground/70 leading-relaxed">
                      We promise you an evening full of entertainment featuring an elegant dinner, a silent auction, and a raffle on the agenda.
                    </p>
                    <div className="pt-4 border-t border-foreground/10">
                      <p className="text-foreground/70 mb-4">
                        A big thank you to our sponsors to date. We look forward to seeing you there!
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
              Become a Sponsor
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Your support as a sponsor helps us continue our mission of supporting women and children victims of family violence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4 mt-4">
                  <Download className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    Sponsorship Documents
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
                    Sponsorship Solicitation Letter
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="http://shieldofathena.com/sites/shieldofathena.com/files/sponsorship_forms_enfr_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    Sponsorship Forms (EN/FR)
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4 mt-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    Contact Us
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">
                        Phone
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
                        Email
                      </div>
                      <a href="mailto:evenement@bouclierdathena.com" className="text-primary hover:underline">
                        evenement@bouclierdathena.com
                      </a>
                    </div>
                  </div>
                  <p className="text-foreground/70 text-sm pt-2">
                    To become a sponsor, please call us or send us an email.
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
            Join Us on November 29th!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Be there to make a difference in the lives of women and children who need our help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6">
              <Ticket className="w-5 h-5 mr-2" />
              Buy Tickets
            </Button>
            <Link to="/contact">
              <Button className="bg-white/20 text-white border-2 border-white hover:bg-white/30 text-lg px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


