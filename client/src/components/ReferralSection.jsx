import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Users, Copy, Check, Share2, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import dataService from '../services/dataService';
import { motion } from 'framer-motion';

export default function ReferralSection() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const referrals = dataService.getReferrals();
  const userReferrals = referrals.filter(r => r.referrer_id === user.id);
  const referralCode = user.referral_code || `REF-${user.id.slice(0, 8).toUpperCase()}`;
  const referralLink = `${window.location.origin}/landing?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = language === 'fr'
      ? `Rejoignez-moi pour soutenir Shield of Athena et aidez les femmes et les enfants à trouver la sécurité et l'espoir. ${referralLink}`
      : `Join me in supporting Shield of Athena and help women and children find safety and hope. ${referralLink}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'fr' ? 'Soutenez Shield of Athena' : 'Support Shield of Athena',
          text,
          url: referralLink,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
      <CardHeader className="bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/20">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-white">
              {language === 'fr' ? 'Programme de Parrainage' : 'Referral Program'}
            </CardTitle>
            <p className="text-sm text-white/90 mt-1">
              {language === 'fr'
                ? 'Invitez vos amis et gagnez des récompenses'
                : 'Invite friends and earn rewards'}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 pb-6 px-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4 text-center border border-primary/10">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{userReferrals.length}</div>
            <div className="text-sm text-foreground/70">
              {language === 'fr' ? 'Amis Référés' : 'Friends Referred'}
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 text-center border border-primary/10">
            <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {userReferrals.length * 10}
            </div>
            <div className="text-sm text-foreground/70">
              {language === 'fr' ? 'Points Bonus' : 'Bonus Points'}
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 text-center border border-primary/10">
            <Share2 className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {userReferrals.filter(r => r.has_donated).length}
            </div>
            <div className="text-sm text-foreground/70">
              {language === 'fr' ? 'Ont Donné' : 'Have Donated'}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground/80 block">
            {language === 'fr' ? 'Votre Lien de Parrainage' : 'Your Referral Link'}
          </label>
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="flex-1 bg-background"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="border-primary/40 hover:bg-primary/10"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Copié!' : 'Copied!'}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    {language === 'fr' ? 'Copier' : 'Copy'}
                  </>
                )}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleShare}
                className="bg-gradient-to-r from-primary-dark to-primary hover:brightness-110 text-white shadow-md"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Partager' : 'Share'}
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-primary/10">
          <h4 className="font-semibold text-foreground mb-2">
            {language === 'fr' ? 'Comment ça fonctionne' : 'How it works'}
          </h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>
                {language === 'fr'
                  ? 'Partagez votre lien unique avec vos amis'
                  : 'Share your unique link with friends'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>
                {language === 'fr'
                  ? "Ils s'inscrivent et font leur premier don"
                  : 'They sign up and make their first donation'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>
                {language === 'fr'
                  ? 'Vous gagnez 10 points bonus pour chaque ami qui donne'
                  : 'You earn 10 bonus points for each friend who donates'}
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}