import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { Phone, Heart, Home, ArrowRight, HandHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const PATH_ICONS = {
  WISDOM: Phone,
  COURAGE: Heart,
  PROTECTION: Home,
  SERVICE: HandHeart, 
};

const PATH_COLORS = {
  WISDOM: {
    bg: 'from-highlight to-secondary',
    light: 'bg-highlight/15',
    border: 'border-highlight/40',
  },
  COURAGE: {
    bg: 'from-muted to-primary',
    light: 'bg-muted/15',
    border: 'border-muted/40',
  },
  PROTECTION: {
    bg: 'from-secondary to-primary-dark',
    light: 'bg-secondary/15',
    border: 'border-secondary/40',
  },
   SERVICE: {
    bg: 'from-accent to-primary',      // to do: change gradient
    light: 'bg-accent/40',
    border: 'border-accent/40',
  },
};

export default function FindYourPathQuiz() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultPath, setResultPath] = useState(null);

  const questions = [
    {
      id: 'q1',
      text: {
        en: 'When you think about helping, what speaks to you the most?',
        fr: 'Quand vous pensez à aider, qu\'est-ce qui vous parle le plus?'
      },
      options: [
        {
          id: 'wisdom',
          label: {
            en: 'Being there when someone first reaches out for help',
            fr: 'Être là quand quelqu\'un demande de l\'aide pour la première fois'
          },
          description: {
            en: 'Making sure information and support are available when a woman decides to call',
            fr: 'S\'assurer que l\'information et le soutien sont disponibles quand une femme décide d\'appeler'
          },
          weights: { WISDOM: 1 }
        },
        {
          id: 'courage',
          label: {
            en: 'Supporting long-term healing and emotional recovery',
            fr: 'Soutenir la guérison à long terme et le rétablissement émotionnel'
          },
          description: {
            en: 'Helping women and children rebuild through counseling and follow-up',
            fr: 'Aider les femmes et les enfants à se reconstruire grâce au counseling'
          },
          weights: { COURAGE: 1 }
        },
        {
          id: 'protection',
          label: {
            en: 'Providing immediate safety when someone needs to leave right now',
            fr: 'Fournir une sécurité immédiate quand quelqu\'un doit partir maintenant'
          },
          description: {
            en: 'Funding safe shelter nights so families can sleep without fear',
            fr: 'Financer des nuits d\'hébergement sûres pour que les familles puissent dormir sans peur'
          },
          weights: { PROTECTION: 1 }
        },
        {
          id: 'service',
          label: {
            en: 'Supporting behind the scenes so every service stays running',
            fr: 'Soutenir en coulisses pour que tous les services puissent fonctionner',
          },
          description: {
            en: 'Helping with tasks, logistics, or volunteer shifts that keep the organization strong.',
            fr: 'Aider aux tâches, à la logistique ou aux quarts de bénévolat qui renforcent l’organisation.',
          },
          weights: { SERVICE: 1 }
        }
      ]
    },
    {
      id: 'q2',
      text: {
        en: 'Which impact feels closest to your heart?',
        fr: 'Quel impact vous touche le plus?'
      },
      options: [
        {
          id: 'wisdom',
          label: {
            en: 'Making sure no one feels alone when they ask for help',
            fr: 'S\'assurer que personne ne se sente seul quand on demande de l\'aide'
          },
          weights: { WISDOM: 1 }
        },
        {
          id: 'courage',
          label: {
            en: 'Helping children and teens process what they\'ve lived through',
            fr: 'Aider les enfants et les adolescents à traiter ce qu\'ils ont vécu'
          },
          weights: { COURAGE: 1 }
        },
        {
          id: 'protection',
          label: {
            en: 'Knowing that tonight, a family has a safe place to stay',
            fr: 'Savoir que ce soir, une famille a un endroit sûr où rester'
          },
          weights: { PROTECTION: 1 }
        },
        {
          id: 'service_q2',
          label: {
            en: 'Showing up physically when support is needed',
            fr: 'Être présent physiquement quand on a besoin de soutien',
          },
          description: {
            en: 'I feel most helpful when I can offer my time and presence.',
            fr: 'Je me sens le plus utile lorsque je peux offrir mon temps et ma présence.',
          },
          weights: { SERVICE: 1 }
        }
      ]
    },
    {
      id: 'q3',
      text: {
        en: 'How do you imagine your support making a difference?',
        fr: 'Comment imaginez-vous que votre soutien fasse la différence?'
      },
      options: [
        {
          id: 'wisdom',
          label: {
            en: 'Opening the door: information, listening, and first contact',
            fr: 'Ouvrir la porte: information, écoute et premier contact'
          },
          weights: { WISDOM: 1 }
        },
        {
          id: 'courage',
          label: {
            en: 'Walking alongside: regular support, therapy, and programs',
            fr: 'Marcher aux côtés: soutien régulier, thérapie et programmes'
          },
          weights: { COURAGE: 1 }
        },
        {
          id: 'protection',
          label: {
            en: 'Creating a shield: emergency shelter and safe housing',
            fr: 'Créer un bouclier: refuge d\'urgence et logement sûr'
          },
          weights: { PROTECTION: 1 }
        },
        {
          id: 'service_q3',
          label: {
            en: 'Taking action through volunteering and day-to-day help',
            fr: 'Agir par le bénévolat et l’aide quotidienne',
          },
          description: {
            en: 'I like contributing through practical tasks, events, or shifts that support the mission.',
            fr: 'J’aime contribuer par des tâches pratiques, des événements ou des quarts qui soutiennent la mission.',
          },
          weights: { SERVICE: 1 }
        }
      ]
    }
  ];

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const progressValue = ((currentIndex + (resultPath ? 1 : 0)) / totalQuestions) * 100;

  const handleSelectOption = (questionId, optionId, weights) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { optionId, weights }
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      computeResult();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const computeResult = () => {
    const scores = { WISDOM: 0, COURAGE: 0, PROTECTION: 0, SERVICE: 0 };

    Object.values(answers).forEach(answer => {
      Object.entries(answer.weights).forEach(([path, weight]) => {
        scores[path] += weight;
      });
    });

    let bestPath = 'WISDOM';
    let bestScore = -Infinity;

    Object.entries(scores).forEach(([path, score]) => {
      if (score > bestScore) {
        bestScore = score;
        bestPath = path;
      }
    });

    setResultPath(bestPath);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResultPath(null);
  };

  if (resultPath) {
    const Icon = PATH_ICONS[resultPath];
    const colors = PATH_COLORS[resultPath];

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`overflow-hidden border-2 ${colors.border}`}>
          <div className={`bg-gradient-to-r ${colors.bg} p-8 pb-10 text-white text-center`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-flex p-4 rounded-full bg-white/20 mb-4"
            >
              <Icon className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">
              {language === 'en' ? 'Your Athena Path' : 'Votre Parcours Athéna'}
            </h2>
            <p className="text-lg opacity-90">
              {t(`paths.${resultPath.toLowerCase()}.name`)}
            </p>
          </div>

          <CardContent className="px-8 pb-8 pt-7 space-y-6">
            <div className={`rounded-lg border-2 ${colors.border} ${colors.light} p-6`}>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {t(`paths.${resultPath.toLowerCase()}.desc`)}
              </p>
            </div>

            <p className="text-sm text-foreground/70 text-center">
              {language === 'en' 
                ? 'Based on your answers, this Path reflects where your values and instincts are especially strong. You can still support any area!'
                : 'Basé sur vos réponses, ce Parcours reflète où vos valeurs et instincts sont particulièrement forts. Vous pouvez toujours soutenir n\'importe quel domaine!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate(`/path-results?path=${resultPath}`)}
                className={`w-full bg-gradient-to-r ${colors.bg} hover:opacity-90 text-white`}
              >
                {language === 'en' 
                  ? `Explore ${t(`paths.${resultPath.toLowerCase()}.name`)} donations`
                  : `Explorer les dons ${t(`paths.${resultPath.toLowerCase()}.name`)}`}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={handleRestart}>
                {language === 'en' ? 'Retake quiz' : 'Refaire le quiz'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const selectedAnswer = answers[currentQuestion.id];

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-7 pb-8 px-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {language === 'en' ? 'Find Your Path' : 'Trouvez Votre Parcours'}
            </h2>
            <p className="text-sm text-foreground/70">
              {language === 'en' 
                ? 'Answer a few quick questions to explore which area of support resonates most with you.'
                : 'Répondez à quelques questions rapides pour explorer quel domaine de soutien résonne le plus avec vous.'}
            </p>
          </div>
          <div className="text-sm font-semibold text-foreground/60">
            {currentIndex + 1} / {totalQuestions}
          </div>
        </div>

        <Progress value={progressValue} className="h-2" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p className="text-lg font-semibold text-foreground">
              {currentQuestion.text[language]}
            </p>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer?.optionId === option.id;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, option.id, option.weights)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left rounded-lg border-2 p-4 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-foreground/10 hover:border-primary/40 hover:bg-background-dark'
                    }`}
                  >
                    <span className="font-medium text-foreground block mb-1">
                      {option.label[language]}
                    </span>
                    {option.description && (
                      <p className="text-sm text-foreground/70">
                        {option.description[language]}
                      </p>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center pt-4 border-t border-foreground/10">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            {language === 'en' ? 'Back' : 'Retour'}
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="shadow-sm hover:shadow-md"
          >
            {currentIndex === totalQuestions - 1 
              ? (language === 'en' ? 'See my Path' : 'Voir mon Parcours')
              : (language === 'en' ? 'Next' : 'Suivant')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

