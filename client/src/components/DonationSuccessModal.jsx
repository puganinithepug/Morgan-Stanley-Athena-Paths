import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { X, Heart, Sparkles, Home, Phone } from 'lucide-react';

export default function DonationSuccessModal({ isOpen, onClose, donation }) {
  if (!donation) return null;

  const getImpactDetails = () => {
    const { path, amount } = donation;
    
    if (path === 'WISDOM') {
      const calls = Math.floor(amount / 5) || 1;
      return {
        icon: Phone,
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50',
        primary: `${calls} Crisis Call${calls > 1 ? 's' : ''}`,
        secondary: 'Your donation helps women reach out for help in their darkest moments',
        detail: `Approximately ${calls} women will receive immediate support and guidance through the crisis line.`
      };
    } else if (path === 'COURAGE') {
      const hours = Math.floor(amount / 50);
      const sessions = Math.floor(amount / 100) || 1;
      return {
        icon: Heart,
        color: 'from-rose-500 to-pink-500',
        bgColor: 'bg-rose-50',
        primary: hours > 0 ? `${hours} Counseling Hour${hours > 1 ? 's' : ''}` : `${sessions} Counseling Session${sessions > 1 ? 's' : ''}`,
        secondary: 'You\'re helping survivors heal from trauma and rebuild their lives',
        detail: hours > 0 
          ? `${hours} hours of professional therapy helping women and children process trauma and develop coping strategies.`
          : `Professional therapeutic support for ${sessions} survivor${sessions > 1 ? 's' : ''}.`
      };
    } else {
      const nights = Math.floor(amount / 20) || 1;
      return {
        icon: Home,
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        primary: `${nights} Safe Shelter Night${nights > 1 ? 's' : ''}`,
        secondary: 'You\'re providing safety when women and children need it most',
        detail: `${nights} night${nights > 1 ? 's' : ''} of emergency shelter, including meals, security, and a safe place to sleep.`
      };
    }
  };

  const impact = getImpactDetails();
  const Icon = impact.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-lg"
            >
              <Card className="overflow-hidden relative">
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"
                      initial={{ 
                        x: '50%', 
                        y: '20%',
                        opacity: 1,
                        scale: 0
                      }}
                      animate={{ 
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        opacity: 0,
                        scale: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: i * 0.05,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                <CardContent className="p-8 relative">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        delay: 0.2
                      }}
                      className={`inline-flex p-4 rounded-full ${impact.bgColor} mb-6 relative`}
                    >
                      <Icon className={`w-12 h-12 bg-gradient-to-br ${impact.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
                      <motion.div
                        className="absolute -top-2 -right-2"
                        animate={{ 
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 0.5,
                          delay: 0.5,
                          repeat: 2
                        }}
                      >
                        <Sparkles className="w-6 h-6 text-yellow-500" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Thank You! 🙏
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Your ${donation.amount} donation just made a real difference
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className={`${impact.bgColor} rounded-xl p-6 mb-6`}
                    >
                      <div className={`inline-block bg-gradient-to-r ${impact.color} text-white px-4 py-2 rounded-full font-bold text-lg mb-3`}>
                        {impact.primary}
                      </div>
                      <p className="font-semibold text-gray-900 mb-2">
                        {impact.secondary}
                      </p>
                      <p className="text-sm text-gray-700">
                        {impact.detail}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center justify-center gap-2 text-purple-600 mb-6"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span className="font-semibold">
                        +{donation.points_awarded} Impact Points Earned
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <Button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                      >
                        Continue Your Journey
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

