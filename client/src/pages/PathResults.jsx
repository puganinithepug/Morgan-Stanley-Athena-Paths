import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import dataService from '../services/dataService';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Phone, Heart, Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import DonationSuccessModal from '../components/DonationSuccessModal';
import CommunityGoals from '../components/CommunityGoals';

const PATH_CONFIG = {
  WISDOM: {
    icon: Phone,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700'
  },
  COURAGE: {
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700'
  },
  PROTECTION: {
    icon: Home,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700'
  }
};

export default function PathResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const path = (searchParams.get('path') || 'WISDOM').toUpperCase();
  const { t, language } = useLanguage();
  const { user, login } = useAuth();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);

  const config = PATH_CONFIG[path] || PATH_CONFIG.WISDOM;
  const Icon = config.icon;
  const impactItems = dataService.getImpactItems().filter(item => item.path === path);
  const donations = dataService.getDonations().filter(d => d.path === path);
  const pathGoals = dataService.getGoals(true).filter(g => g.path === path);

  const handleDonate = async (item, customAmount = null) => {
    if (!user) {
      login({});
      return;
    }

    const amount = customAmount || item.suggested_amount;
    let points = amount;
    if (path === 'PROTECTION') points = Math.floor(amount * 1.5);
    else if (path === 'COURAGE') points = Math.floor(amount * 1.2);

    try {
      dataService.createDonation({
        user_id: user.id,
        user_name: user.full_name || 'Anonymous',
        path: path,
        amount: amount,
        points_awarded: points,
        impact_item_id: item.id,
        impact_item_title: language === 'fr' ? item.title_fr : item.title_en
      });

      const newPoints = (user.total_points || 0) + points;
      dataService.updateUser(user.id, {
        total_points: newPoints,
        primary_path: user.primary_path || path
      });

      setLastDonation({
        amount,
        path: path,
        points_awarded: points
      });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Donation error:', error);
      alert('Unable to process donation. Please try again.');
    }
  };

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalDonations = donations.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
      <DonationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        donation={lastDonation}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${config.color} mb-6`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t(`paths.${path.toLowerCase()}.name`)} {language === 'fr' ? 'Parcours' : 'Path'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {t(`paths.${path.toLowerCase()}.desc`)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className={`${config.bgColor} border-2 ${config.borderColor}`}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${totalAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'fr' ? 'Total Collecté' : 'Total Raised'}
              </div>
            </CardContent>
          </Card>

          <Card className={`${config.bgColor} border-2 ${config.borderColor}`}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {totalDonations}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'fr' ? 'Dons Totaux' : 'Total Donations'}
              </div>
            </CardContent>
          </Card>

          <Card className={`${config.bgColor} border-2 ${config.borderColor}`}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {impactItems.length}
              </div>
              <div className="text-sm text-gray-600">
                {language === 'fr' ? 'Options de Don' : 'Donation Options'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'fr' ? 'Comment Vous Pouvez Aider' : 'How You Can Help'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {language === 'fr' ? item.title_fr : item.title_en}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {language === 'fr' ? item.description_fr : item.description_en}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${item.suggested_amount}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.impact_unit}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleDonate(item)}
                      className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 text-white`}
                    >
                      {language === 'fr' ? 'Donner Maintenant' : 'Donate Now'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {pathGoals.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {language === 'fr' ? 'Objectifs Communautaires' : 'Community Goals'}
            </h2>
            <CommunityGoals onDonate={(goal) => {
              const firstItem = impactItems[0];
              if (firstItem) handleDonate(firstItem);
            }} />
          </div>
        )}

        <Card className={`${config.bgColor} border-2 ${config.borderColor}`}>
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'fr' 
                ? 'Votre Soutien Fait la Différence'
                : 'Your Support Makes a Difference'}
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Chaque don contribue directement à aider les femmes et les enfants à trouver la sécurité, la guérison et l\'espoir. Merci de faire partie de cette mission.'
                : 'Every donation directly helps women and children find safety, healing, and hope. Thank you for being part of this mission.'}
            </p>
            <Button
              onClick={() => document.getElementById('ways-to-help')?.scrollIntoView({ behavior: 'smooth' })}
              className={`bg-gradient-to-r ${config.color} hover:opacity-90 text-white`}
              size="lg"
            >
              {language === 'fr' ? 'Faire un Don' : 'Make a Donation'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

