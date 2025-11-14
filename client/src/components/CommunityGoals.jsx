import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { motion } from 'framer-motion';
import { Target, Clock, Users, Phone, Heart, Home } from 'lucide-react';
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
    GENERAL: Target
  };

  const pathColors = {
    WISDOM: { bg: 'from-amber-500 to-orange-500', light: 'bg-amber-50', text: 'text-amber-700' },
    COURAGE: { bg: 'from-rose-500 to-pink-500', light: 'bg-rose-50', text: 'text-rose-700' },
    PROTECTION: { bg: 'from-blue-500 to-cyan-500', light: 'bg-blue-50', text: 'text-blue-700' },
    GENERAL: { bg: 'from-purple-500 to-indigo-500', light: 'bg-purple-50', text: 'text-purple-700' }
  };

  if (goals.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full mb-4">
            <Target className="w-5 h-5 text-purple-600" />
            <span className="text-purple-900 font-semibold">Community Fund Goals</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Together We Can Achieve More
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold text-gray-900">
                          ${goal.current_amount.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          of ${goal.target_amount.toLocaleString()}
                        </span>
                      </div>
                      
                      <Progress value={progress} className="h-3" />
                      
                      <div className="flex justify-between text-sm">
                        <span className={`font-semibold ${colors.text}`}>
                          {Math.round(progress)}% funded
                        </span>
                        <span className="text-gray-500">
                          Deadline: {format(new Date(goal.deadline), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{Math.floor(goal.current_amount / 50)} supporters</span>
                      </div>
                      <Button
                        onClick={() => onDonate && onDonate(goal)}
                        className={`bg-gradient-to-r ${colors.bg} hover:opacity-90 text-white`}
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

