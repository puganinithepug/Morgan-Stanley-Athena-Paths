import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";
import { Sparkles, X, ArrowRight, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function FirstTimeVisitorModal({
  isOpen = false,
  onClose = () => {},
}) {
  const { language } = useLanguage();

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/70 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl relative"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/30 to-primary-dark/30 mb-4 relative"
                  >
                    <img
                      src={"/logo.svg"}
                      alt="Shield of Athena"
                      className="w-12 h-12 object-contain"
                    />
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5,
                        repeat: 2,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-foreground mb-3"
                  >
                    {language === "fr"
                      ? "Bienvenue sur Athena Paths!"
                      : "Welcome to Athena Paths!"}{" "}
                    👋
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-foreground/70 text-base"
                  >
                    {language === "fr"
                      ? "Est-ce votre première visite? Répondez à un quiz rapide pour découvrir quel parcours résonne le plus avec vos valeurs."
                      : "Is this your first time here? Take a quick quiz to discover which path resonates most with your values."}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3 mb-4"
                >
                  <Button
                    onClick={() => {
                      handleClose();
                      setTimeout(() => {
                        window.location.href = "/find-your-path";
                      }, 300);
                    }}
                    className="flex-1 bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-light text-white hover:text-foreground py-3"
                  >
                    {language === "fr"
                      ? "Oui, commençons!"
                      : "Yes, let's start!"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="border-foreground/20 text-foreground/80 hover:border-primary hover:text-primary"
                  >
                    {language === "fr"
                      ? "Non merci, explorer"
                      : "No thanks, explore"}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-sm text-foreground/60 flex items-center justify-center gap-1"
                >
                  <Clock className="w-4 h-4" />
                  {language === "fr"
                    ? "Prend environ 1 minute"
                    : "Takes about 1 minute"}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
