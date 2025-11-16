import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { motion } from 'framer-motion';
import { Target, Clock, Users, Phone, Heart, Home, HandHeart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import dataService from '../services/dataService';
import { format } from 'date-fns';

export default function CommunityGoals({ onDonate }) {
  const { language } = useLanguage();
  const goals = dataService.getGoals(true);

  const pathIcons = {
    WISDOM: Phone,
    COURAGE: Heart,
    PROTECTION: Home,
    SERVICE: HandHeart,
    GENERAL: Target
  };

  const pathColors = {
    WISDOM: {
      // warm, hopeful
      bg: 'from-highlight to-primary',
      text: 'text-highlight',
    },
    COURAGE: {
      // stronger, heart-forward
      bg: 'from-rose-500 to-primary',
      text: 'text-rose-500',
    },
    PROTECTION: {
      // calm but vivid
      bg: 'from-secondary to-primary-light',
      text: 'text-secondary',
    },
    SERVICE:{
      bg: 'from-teal-500 to-teal-400',
      text: 'text-teal-500'
    },

    GENERAL: {
      // classic brand gradient
      bg: 'from-primary-dark to-primary-light',
      text: 'text-primary',
    },
  };

  if (goals.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/15 px-4 py-2 rounded-full mb-4">
            <Target className="w-5 h-5 text-primary-dark" />
            <span className="text-primary-dark font-semibold">Community Fund Goals</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground-900 mb-4">
            Together We Can Achieve More
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Join our community in reaching specific fundraising goals that directly fund life-changing programs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, idx) => {
            const Icon = pathIcons[goal.path];
            const colors = pathColors[goal.path];
            const progress = Math.min((goal.current_amount / goal.target_amount) * 100, 100);
            const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
            const title = language === 'fr' ? (goal.title_fr || goal.title_en) : goal.title_en;
            const description = language === 'fr' ? (goal.description_fr || goal.description_en) : goal.description_en;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden"> */}
                <Card className="h-full hover:shadow-xl hover:-translate-y-1.5 border border-transparent hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  <div className={`bg-gradient-to-r ${colors.bg} p-6 text-white relative overflow-hidden`}>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <Icon className="w-8 h-8" />
                        <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
                          <Clock className="w-4 h-4" />
                          <span>{daysLeft}d left</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold leading-tight">{title}</h3>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <p className="text-foreground/80 text-sm leading-relaxed mt-4">
                      {description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold text-foreground">
                          ${goal.current_amount.toLocaleString()}
                        </span>
                        <span className="text-sm text-foreground/60">
                          of ${goal.target_amount.toLocaleString()}
                        </span>
                      </div>
                      
                      <Progress value={progress} className="h-3" />
                      
                      <div className="flex justify-between text-sm">
                        <span className={`font-semibold ${colors.text}`}>
                          {Math.round(progress)}% funded
                        </span>
                        <span className="text-foreground/60">
                          Deadline: {format(new Date(goal.deadline), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Users className="w-4 h-4" />
                        <span>{Math.floor(goal.current_amount / 50)} supporters</span>
                      </div>
                     <Button
                        onClick={() => onDonate && onDonate(goal)}
                        className={`bg-gradient-to-r ${colors.bg} hover:brightness-110 hover:shadow-md text-white`}
                        size="sm"
                      >
                        Contribute
                    </Button> 
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

