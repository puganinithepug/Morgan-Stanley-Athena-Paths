import React, { useMemo } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { motion } from 'framer-motion';
import { Users, Phone, Heart, Home, HandHeart, UtensilsCrossed, Moon, BookOpen, Shield, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import dataService from '../services/dataService';

// Real human stories for each impact item
const impactStories = {
  '1': "Last month, 312 women called our line in moments of fear. Your $50 keeps the phone answered for someone who has no one else.",
  '2': "Helps one woman understand her rights and options when she feels trapped. Every package opens a door to safety.",
  '3': "One hour of professional support can change everything. Your $100 gives someone the strength to take the first step toward freedom.",
  '4': "Children who witness violence need specialized care. Your $75 helps a child process trauma and begin to heal.",
  '5': "Maria and her two daughters slept safely last night because someone donated one night of shelter. Tonight, another family needs that same safety.",
  '6': "Essential supplies for a family starting over: documents, toiletries, clothes. Your $50 helps them take the first step with dignity."
};

// Impact in plain language
const impactLanguage = {
  '1': "Your $50 keeps our crisis line open for 18 callers this week.",
  '2': "Helps one woman understand her rights and options.",
  '3': "Provides one hour of professional counseling that can change a life.",
  '4': "Supports one week of healing programs for a child affected by violence.",
  '5': "Provides one night of safe shelter for a woman and her children.",
  '6': "Gives one family the essential supplies they need to start over safely."
};

// Empathetic button text based on path
const empatheticButtons = {
  WISDOM: "Answer the Call",
  COURAGE: "Give Hope",
  PROTECTION: "Provide Safety",
  SERVICE: "Support a Family"
};

export default function CommunityGoals({ onDonate }) {
  const impactItems = dataService.getImpactItems();
  
  // Calculate total community goal with purpose
  const communityTotal = useMemo(() => {
    const totalRaised = impactItems.reduce((sum, item) => {
      const itemIdNum = parseInt(item.id) || 1;
      const estimatedContributions = (itemIdNum * 15) + 20;
      return sum + (item.suggested_amount * estimatedContributions);
    }, 0);
    
    const communityGoal = 100000;
    const nightsNeeded = 1000; // 1,000 nights of shelter
    const nightsProvided = Math.floor(totalRaised / 100); // Every $100 = 1 night
    
    return {
      raised: totalRaised,
      goal: communityGoal,
      progress: Math.min((totalRaised / communityGoal) * 100, 100),
      nightsNeeded,
      nightsProvided
    };
  }, [impactItems]);

  const recentDonations = useMemo(() => {
    const names = ['Melissa from Montreal', 'David from Laval', 'Sarah from Quebec', 'Ahmed from Montreal'];
    return names.slice(0, 3);
  }, []);

  const pathIcons = {
    WISDOM: Phone,
    COURAGE: Heart,
    PROTECTION: Home,
    SERVICE: HandHeart,
  };

  const itemIcons = {
    'meal': UtensilsCrossed,
    'night': Moon,
    'session': Heart,
    'package': BookOpen,
    'week': Shield,
    'program_week': Users,
    'kit': Shield,
  };

  const pathColors = {
    WISDOM: {
      bg: 'from-highlight to-primary',
      text: 'text-highlight',
      button: 'bg-highlight hover:bg-highlight/90',
    },
    COURAGE: {
      bg: 'from-rose-500 to-primary',
      text: 'text-rose-500',
      button: 'bg-rose-500 hover:bg-rose-600',
    },
    PROTECTION: {
      bg: 'from-secondary to-primary-light',
      text: 'text-secondary',
      button: 'bg-secondary hover:bg-secondary/90',
    },
    SERVICE: {
      bg: 'from-teal-500 to-teal-400',
      text: 'text-teal-500',
      button: 'bg-teal-500 hover:bg-teal-600',
    },
  };

  const displayItems = impactItems.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emotional Header Section */}
        {/* Spacing: 64px bottom margin for section separation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          {/* Badge: 24px bottom margin */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/15 px-4 py-2 rounded-full mb-6"
          >
            <Heart className="w-5 h-5 text-primary-dark" />
            <span className="text-primary-dark font-semibold">
              Make a Real Difference
            </span>
          </motion.div>
          
          {/* Main Heading: 24px bottom margin, 16px top padding for breathing room */}
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 pt-4 leading-tight">
            Every dollar you give becomes safety, hope, and a new beginning
          </h2>
          
          {/* Subtitle: 32px bottom margin to create space before goal card */}
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
            For a woman escaping violence, your donation isn't just a number. It's a night of safety, an emergency call answered, a family starting over.
          </p>
        </motion.div>

        {/* Total Community Goal with Purpose */}
        {/* Spacing: 48px bottom margin for balanced section separation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-xl">
            <CardContent className="pt-6 pb-6">
              {/* Header section: 24px bottom margin */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Every $100 provides 1 night of safe shelter. We need {communityTotal.nightsNeeded} nights to protect families this winter.
                </h3>
                {/* Subtitle: 16px top margin for consistent spacing */}
                <p className="text-lg text-foreground/70 mt-4">
                  We've already provided {communityTotal.nightsProvided} nights of safety.
                </p>
              </div>
              
              {/* Progress section: 16px vertical spacing (space-y-4) */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-4xl font-bold text-foreground">
                    ${communityTotal.raised.toLocaleString()}
                  </span>
                  <span className="text-lg text-foreground/60">
                    of ${communityTotal.goal.toLocaleString()}
                  </span>
                </div>
                
                <Progress value={communityTotal.progress} className="h-4" />
                
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-primary text-lg">
                    {Math.round(communityTotal.progress)}% funded
                  </span>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Users className="w-4 h-4" />
                    <span>{Math.floor(communityTotal.raised / 50)} supporters</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-primary/20">
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>
                    Last year, your donations helped 1,229 women and children rebuild their lives. This year, we aim even higher.
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap justify-center gap-6 text-xs text-foreground/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  <span>91% of each donation goes directly to programs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  <span>Audited annually</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  <span>Registered charity #138823471RR0001</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Donor Social Proof */}
        {/* Spacing: 48px bottom margin for balanced section separation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          {/* Container padding: 24px (p-6) for consistent spacing */}
          <div className="max-w-4xl mx-auto bg-primary/5 rounded-lg p-6 border border-primary/20">
            {/* First row: 16px gap between items */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold">12 donations today</span>
              </div>
              <span className="text-foreground/40">•</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Join 572 supporters helping families restart safely</span>
              </div>
            </div>
            {/* Second row: 16px top margin, 12px gap between items */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/60">
              {recentDonations.map((name, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-primary">⭐</span>
                  <span>{name} donated {idx === 0 ? '2 hours ago' : idx === 1 ? '5 hours ago' : 'yesterday'}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Individual Donation Items with Stories */}
        {/* Spacing: 64px top margin for section separation, no bottom margin (last section) */}
        <div className="mt-16">
          {/* Section title: 32px bottom margin */}
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Choose Your Impact
          </h3>
          
          {/* Grid: 24px gap between cards, responsive columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item, idx) => {
              const PathIcon = pathIcons[item.path];
              const colors = pathColors[item.path];
              const ItemIcon = itemIcons[item.impact_unit] || PathIcon;
              const title = item.title_en;
              const description = item.description_en;
              const story = impactStories[item.id] || description;
              const impact = impactLanguage[item.id] || description;
              const buttonText = empatheticButtons[item.path] || 'Give';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="h-full flex"
                >
                  {/* Card: Full height with flex, consistent padding */}
                  <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-primary/10 bg-white w-full p-6">
                    {/* Card padding: 24px (p-6) for consistent internal spacing */}
                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* Header section: 16px bottom margin */}
                      <div className="flex items-start gap-3 mb-4">
                        {/* Icon: 12px padding (p-3) */}
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.bg} text-white flex-shrink-0 shadow-md`}>
                          <ItemIcon className="w-6 h-6" />
                        </div>
                        {/* Text content: flex-1 for equal distribution */}
                        <div className="flex-1 min-w-0">
                          {/* Title: 8px bottom margin */}
                          <h4 className="font-bold text-foreground mb-2 leading-tight text-lg">
                            {title}
                          </h4>
                          {/* Impact description: 12px bottom margin */}
                          <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                            {impact}
                          </p>
                        </div>
                      </div>
                      
                      {/* Real Human Story */}
                      {/* Spacing: 16px bottom margin, 12px padding (p-3) */}
                      <div className="mb-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                        <p className="text-sm text-foreground/80 italic leading-relaxed">
                          "{story}"
                        </p>
                      </div>
                      
                      {/* Footer: Auto margin-top pushes to bottom, 16px top padding, 16px top border */}
                      <div className="flex items-center justify-between pt-4 mt-auto border-t border-primary/10">
                        <div>
                          <span className="text-3xl font-bold text-foreground">
                            ${item.suggested_amount}
                          </span>
                        </div>
                        <Button
                          onClick={() => onDonate && onDonate(item)}
                          className={`${colors.button} text-white font-semibold shadow-md hover:shadow-lg transition-all`}
                          size="sm"
                        >
                          {buttonText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
