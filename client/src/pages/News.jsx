import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Calendar, 
  Newspaper, 
  Award, 
  Users, 
  Heart,
  ArrowRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function News() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'events', 'news', 'achievements'

  // Past Events (from their website)
  const pastEvents = [
    {
      id: 1,
      type: 'event',
      title: 'International Women\'s Day Celebration',
      date: 'March 22, 2018',
      description: 'The Shield of Athena Family Services would like to invite you to our event in honour of International Women\'s Day. The event showcased the art of women victims of conjugal and family violence that has been done in creative art therapy groups. There was also a presentation of work done by participants in various women\'s centers such as, Le Centre dynamique des femmes de Laval, l\'Association du troisième âge Filia and others.',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      type: 'event',
      title: 'Volunteer Training Workshop',
      date: 'February 08, 2018',
      description: 'Thank you to all the participants of this year volunteer training workshop and your enthusiasm to volunteer your time and help out for the benefit of women and children victims of abuse.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      type: 'event',
      title: '23rd Annual Art Auction',
      date: 'November 12, 2017',
      description: 'Over 400 people gathered at the Bonsecours Market in Old Montreal. The Shield of Athena held their 23rd annual Art Auction, under the High Patronage of His Excellency Orestis Kafopoulos; Consul general of Greece, and raised nearly $105,000 for their services to women and children.',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      type: 'event',
      title: 'Swing into Spring 2017',
      date: 'May 17, 2017',
      description: 'Close to 240 people were gathered at the Shield of Athena\'s "Swing into Spring" event that was held at the historic Rialto Theatre. The fabulous show, coordinated by Sheldon Kagan and replete with a Las Vegas dance, song and musical revue, went until midnight. The event launched the beginning of the Capital Campaign for the new Second Step Resource, for women and children, in Laval.',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    }
  ];

  // Recent News
  const recentNews = [
    {
      id: 1,
      type: 'news',
      title: 'Shield of Athena Receives Excellence Award',
      date: 'October 12, 2012',
      category: 'Achievement',
      description: 'The Shield of Athena\'s Multilingual Community Outreach Department received the 2012 Excellence Award from the Ministry of Health and Social Services of Québec, in the category "Support to vulnerable persons and groups".',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 2,
      type: 'news',
      title: 'Second Step Shelter Capital Campaign Launch',
      date: 'May 17, 2017',
      category: 'Campaign',
      description: 'Close to 240 people gathered at the Shield of Athena\'s "Swing into Spring" event at the historic Rialto Theatre. The event launched the beginning of the Capital Campaign for the new Second Step Resource for women and children in Laval.',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 3,
      type: 'news',
      title: 'City of Laval Donates $200,000 for Second Step Shelter',
      date: 'June 9, 2017',
      category: 'Partnership',
      description: 'Thank you to the city of Laval for their amazing support and donation of $200,000 for the establishment of a 2nd step shelter for victims of family violence!',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 4,
      type: 'news',
      title: 'Avon Canada Donates New Van',
      date: 'April 13, 2017',
      category: 'Partnership',
      description: 'The Shield picked up their new van today! Thank you to Avon Canada for making this happen. We are so thankful and moved by your generosity.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 5,
      type: 'news',
      title: '20th Anniversary Gala Raises $200,000',
      date: 'November 20, 2011',
      category: 'Achievement',
      description: 'The Shield of Athena is pleased to announce that its 20th Anniversary Gala raised approximately $200,000 for its services to victims of family violence.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 6,
      type: 'news',
      title: 'Executive Director Presents at United Nations',
      date: 'March 14, 2018',
      category: 'Achievement',
      description: 'We are so proud of our Executive Director, Melpa Kamateros & Co-ordinator, Maud Pontel for being part of the Canadian Women\'s Delegation and presenting on "Equality for Rural & remote Women in Canada" for the sixty-second session of the Commission on the Status of Women taking place at the United Nations Headquarters in New York from 12 to 23 March 2018.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 7,
      type: 'news',
      title: 'Thank You to Sophie Grégoire Trudeau',
      date: 'November 13, 2017',
      category: 'Recognition',
      description: 'We would like to thank Madame Sophie Grégoire Trudeau for her ongoing support and for the lovely wishes she sent us for our 23rd Annual Art auction.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      link: '#'
    },
    {
      id: 8,
      type: 'news',
      title: 'Thank You to Global Television and The Suburban',
      date: 'November 13, 2017',
      category: 'Partnership',
      description: 'Thank You to Global Television and The Suburban for their support of our cause.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      link: '#'
    }
  ];

  // All items combined
  const allItems = [...pastEvents, ...recentNews].sort((a, b) => {
    // Sort by date (most recent first)
    return new Date(b.date) - new Date(a.date);
  });

  const filteredItems = activeTab === 'all' 
    ? allItems 
    : activeTab === 'events' 
    ? pastEvents 
    : activeTab === 'news'
    ? recentNews.filter(item => item.type === 'news')
    : recentNews.filter(item => item.category === 'Achievement');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-dark via-primary to-secondary py-20 md:py-24">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/90 mb-6 shadow-lg">
              <Newspaper className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              News & Events
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Stay updated with our latest achievements, upcoming events, and community news
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-background border-b border-foreground/10 shadow-sm">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto py-4">
            {[
              { id: 'all', label: 'All', icon: Newspaper },
              { id: 'events', label: 'Past Events', icon: Calendar },
              { id: 'news', label: 'News', icon: Newspaper },
              { id: 'achievements', label: 'Achievements', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sidebar Cards - At the top */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Our Impact</h3>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-foreground">1,229</p>
                    <p className="text-sm text-foreground/70">Clients helped annually</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-foreground">34</p>
                    <p className="text-sm text-foreground/70">Years of service</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Events Summary */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Recent Events</h3>
              </div>
              <div className="space-y-4">
                {pastEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="hover:border-primary-dark transition-colors">
                    <p className="font-semibold text-foreground text-sm mb-1">{event.title}</p>
                    <p className="text-xs text-foreground/70">{event.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card className="bg-gradient-to-br from-primary to-secondary text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-white/80 text-sm mb-4">
                Subscribe to our newsletter for the latest news and events
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-center"
                />
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const isFeatured = idx === 0 && activeTab === 'all';
            const Icon = item.type === 'event' ? Calendar : Newspaper;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  {item.image && (
                    <div 
                      className="relative h-48 md:h-56 overflow-hidden bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url(${item.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="text-xs font-semibold text-primary">
                            {item.category || 'Event'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 text-sm text-foreground/60">
                        <Clock className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <h3 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-foreground/70 leading-relaxed mb-4 ${isFeatured ? 'text-base' : 'text-sm'} line-clamp-3`}>
                        {item.description}
                      </p>
                    </div>
                    {item.link && (
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors"
                      >
                        Read More 
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-primary-dark via-primary to-secondary">
        <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Involved
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join us in supporting women and children affected by family violence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/find-your-path">
              <Button
                size="lg"
                className="bg-highlight text-foreground hover:bg-highlight/95 flex items-center gap-2 shadow-primary-dark-glow hover:shadow-primary-dark-glow border-2 border-primary-dark hover:scale-[1.02] transition-all"
              >
                Find Your Path
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 flex items-center gap-2"
              >
                Learn About Our Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

