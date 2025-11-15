import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Heart, Share2, Home, Flower, Shield, Users, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import dataService from '../services/dataService';

const stories = [
  {
    id: 'story-1',
    text: "After years of fear, I finally found the courage to leave. The shelter gave us a safe place to sleep, and for the first time in years, my daughter smiled.",
    impact: "2 shelter nights funded",
    icon: Home,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
    // warm, hopeful: highlight -> primary
    color: "from-highlight to-primary",
  },
  {
    id: 'story-2',
    text: "The counseling sessions helped me rebuild my confidence. I now have a job and my own apartment. I'm finally free.",
    impact: "8 counseling hours funded",
    icon: Flower,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
    // softer, heart-forward: muted -> primary-light
    color: "from-muted to-primary-light",
  },
  {
    id: 'story-3',
    text: "I called the crisis line at midnight, terrified and alone. The person who answered gave me hope and a plan. That call saved my life.",
    impact: "24 crisis calls answered",
    icon: Phone,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    // urgent but on-brand: secondary -> primary-dark
    color: "from-secondary to-primary-dark",
  },
  {
    id: 'story-4',
    text: "My children are laughing again. The support programs helped them process their trauma and feel safe. They're just kids again.",
    impact: "12 children supported",
    icon: Users,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
    // classic brand gradient: primary-dark -> primary-light
    color: "from-primary-dark to-primary-light",
  },
  {
    id: 'story-5',
    text: "I didn't know where to start. The information services connected me with legal aid, housing support, and therapy. I wasn't alone anymore.",
    impact: "45 families guided to resources",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop",
    // supportive, calm: accent -> primary
    color: "from-accent to-primary",
  },
];

export default function ImpactStories() {
  const [currentStory, setCurrentStory] = useState(0);
  const { user } = useAuth();
  const reactions = dataService.getReactions();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const handleLike = (storyId) => {
    if (!user) return;
    
    dataService.createReaction({
      story_id: storyId,
      user_id: user.id,
      reaction_type: 'heart'
    });
  };

  const handleShare = (story) => {
    const text = encodeURIComponent(`"${story.text}" - Support survivors of domestic violence`);
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
  };

  const currentStoryData = stories[currentStory];
  const Icon = currentStoryData.icon;
  const likes = reactions.filter(r => r.story_id === currentStoryData.id).length;
  const isLiked = user && reactions.some(r => r.story_id === currentStoryData.id && r.user_id === user.id);

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-accent text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Healing Moments</h2>
          <p className="text-white/80 text-lg">Short, anonymized moments that focus on safety and rebuilding—so you can see how support like yours helps women and children move forward.</p>
        </motion.div>

        <div className="relative min-h-[400px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <motion.img
                      src={currentStoryData.image}
                      alt="Impact story"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 8 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentStoryData.color} opacity-30`} />
                    
                    <motion.div
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  <CardContent className="p-8 flex flex-col justify-between">
                    <div>
                      <Quote className="w-12 h-12 text-white/40 mb-4" />
                      <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-6 italic">
                        "{currentStoryData.text}"
                      </blockquote>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-white/60 text-sm">— Anonymous Survivor</p>
                        <div className="bg-white/20 px-4 py-2 rounded-full">
                          <p className="text-sm font-semibold">{currentStoryData.impact}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/20">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => handleLike(currentStoryData.id)}
                          variant="ghost"
                          className={`text-white hover:bg-white/20 flex items-center gap-2 ${
                            isLiked ? 'bg-primary/40' : ''
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-highlight' : ''}`} />
                          <span>{likes}</span>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => handleShare(currentStoryData)}
                          variant="ghost"
                          className="text-white hover:bg-white/20 flex items-center gap-2"
                        >
                          <Share2 className="w-5 h-5" />
                          Share
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStory(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStory ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

