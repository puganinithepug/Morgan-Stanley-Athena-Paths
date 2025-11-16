import React, { useState } from 'react';
import { Facebook, Instagram, MessageCircle, Share2, Copy, Check, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SocialShare({ 
  url, 
  title, 
  description, 
  variant = "default" // "default" | "compact" | "modal"
}) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Generate shareable URL with referral code if user is logged in
  // If URL is explicitly provided, use it as-is (it may already have ref parameter)
  // Otherwise, add referral code to current URL
  const shareUrl = url || window.location.href;
  const referralUrl = url 
    ? shareUrl // Use provided URL as-is
    : (user?.referral_code 
      ? `${shareUrl}${shareUrl.includes('?') ? '&' : '?'}ref=${user.referral_code}`
      : shareUrl);

  const shareTitle = title || (language === 'fr' 
    ? 'Soutenez Shield of Athena' 
    : 'Support Shield of Athena');
  
  const shareText = description || (language === 'fr'
    ? 'Rejoignez-moi pour soutenir Shield of Athena et aidez les femmes et les enfants à trouver la sécurité et l\'espoir.'
    : 'Join me in supporting Shield of Athena and help women and children find safety and hope.');

  const encodedUrl = encodeURIComponent(referralUrl);
  const encodedText = encodeURIComponent(`${shareText} ${referralUrl}`);
  const encodedTitle = encodeURIComponent(shareTitle);

  // Facebook share
  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      '_blank',
      'width=600,height=400'
    );
  };

  // Instagram (note: Instagram doesn't support direct URL sharing, but we can copy link)
  const shareInstagram = () => {
    // Instagram doesn't have a web share API, so we copy to clipboard
    navigator.clipboard.writeText(`${shareText}\n${referralUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Open Instagram in new tab as fallback
    window.open('https://www.instagram.com/', '_blank');
  };

  // WhatsApp share
  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodedText}`,
      '_blank'
    );
  };

  // Generic share (uses Web Share API if available)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: referralUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compact variant (just icons)
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={shareFacebook}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={shareInstagram}
          className="p-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white hover:opacity-90 transition-opacity"
          aria-label="Share on Instagram"
        >
          <Instagram className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={shareWhatsApp}
          className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </motion.button>
        {navigator.share && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNativeShare}
            className="p-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    );
  }

  // Modal variant
  if (variant === "modal") {
    return (
      <>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-primary-dark to-primary hover:brightness-110 text-white shadow-md"
        >
          <Share2 className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Partager' : 'Share'}
        </Button>

        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full mx-4"
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-foreground/60 hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    {language === 'fr' ? 'Partager' : 'Share'}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <Button
                      onClick={shareFacebook}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start"
                    >
                      <Facebook className="w-5 h-5 mr-3" />
                      {language === 'fr' ? 'Partager sur Facebook' : 'Share on Facebook'}
                    </Button>
                    
                    <Button
                      onClick={shareInstagram}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white justify-start"
                    >
                      <Instagram className="w-5 h-5 mr-3" />
                      {language === 'fr' ? 'Partager sur Instagram' : 'Share on Instagram'}
                    </Button>
                    
                    <Button
                      onClick={shareWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white justify-start"
                    >
                      <MessageCircle className="w-5 h-5 mr-3" />
                      {language === 'fr' ? 'Partager sur WhatsApp' : 'Share on WhatsApp'}
                    </Button>

                    {navigator.share && (
                      <Button
                        onClick={handleNativeShare}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Share2 className="w-5 h-5 mr-3" />
                        {language === 'fr' ? 'Autres options' : 'More Options'}
                      </Button>
                    )}
                  </div>

                  <div className="border-t border-foreground/10 pt-4">
                    <label className="text-sm font-medium text-foreground/80 block mb-2">
                      {language === 'fr' ? 'Lien à partager' : 'Share Link'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={referralUrl}
                        readOnly
                        className="flex-1 px-3 py-2 bg-background border border-foreground/20 rounded-md text-sm"
                      />
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        size="sm"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            {language === 'fr' ? 'Copié!' : 'Copied!'}
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            {language === 'fr' ? 'Copier' : 'Copy'}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Default variant (card with buttons)
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">
            {language === 'fr' ? 'Partager cette cause' : 'Share This Cause'}
          </h3>
        </div>
        
        <p className="text-sm text-foreground/70 mb-6">
          {language === 'fr' 
            ? 'Aidez-nous à répandre l\'espoir en partageant avec vos proches'
            : 'Help us spread hope by sharing with your loved ones'}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            onClick={shareFacebook}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Facebook className="w-4 h-4 mr-2" />
            Facebook
          </Button>
          
          <Button
            onClick={shareInstagram}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white"
          >
            <Instagram className="w-4 h-4 mr-2" />
            Instagram
          </Button>
          
          <Button
            onClick={shareWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>

          {navigator.share && (
            <Button
              onClick={handleNativeShare}
              variant="outline"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Plus' : 'More'}
            </Button>
          )}
        </div>

        <div className="border-t border-foreground/10 pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={referralUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-background border border-foreground/20 rounded-md text-sm"
            />
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  {language === 'fr' ? 'Copié!' : 'Copied!'}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  {language === 'fr' ? 'Copier' : 'Copy'}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

