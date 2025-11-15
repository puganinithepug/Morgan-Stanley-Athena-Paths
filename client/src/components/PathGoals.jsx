import React from "react";
import { Card, CardContent } from "./ui/Card";
import { Phone, Heart, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import dataService from "../services/dataService";

export default function PathGoals() {
  const { t, language } = useLanguage();
  const donations = dataService.getDonations();

  const goals = [
    {
      path: "WISDOM",
      name: t("paths.wisdom.name"),
      icon: Phone,
      color: "from-highlight to-secondary",
      bgColor: "bg-highlight/15",
      iconColor: "text-highlight",
      goal: 5000,
      unit:
        language === "fr"
          ? "appels de crise répondus"
          : "crisis calls answered",
    },
    {
      path: "COURAGE",
      name: t("paths.courage.name"),
      icon: Heart,
      color: "from-muted to-primary",
      bgColor: "bg-muted/15",
      iconColor: "text-muted",
      goal: 1000,
      unit:
        language === "fr"
          ? "heures de counseling financées"
          : "counseling hours funded",
    },
    {
      path: "PROTECTION",
      name: t("paths.protection.name"),
      icon: Home,
      color: "from-secondary to-primary-dark",
      bgColor: "bg-secondary/15",
      iconColor: "text-secondary",
      goal: 2000,
      unit:
        language === "fr"
          ? "nuits d'hébergement fournies"
          : "shelter nights provided",
    },
  ];

  const getPathProgress = (path, goal) => {
    const defaultCurrent = {
      WISDOM: 180,
      COURAGE: 120,
      PROTECTION: 250,
    };

    if (!donations || donations.length === 0) {
      const current = defaultCurrent[path] || 0;
      return Math.min((current / goal) * 100, 100);
    }

    const pathDonations = donations.filter((d) => d.path === path);
    const totalAmount = pathDonations.reduce(
      (sum, d) => sum + (d.amount || 0),
      0
    );

    let current;
    if (path === "WISDOM") {
      current = pathDonations.length * 2;
    } else if (path === "COURAGE") {
      current = Math.floor(totalAmount / 50);
    } else {
      current = Math.floor(totalAmount / 20);
    }

    return Math.min((current / goal) * 100, 100);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {language === "fr"
              ? "Nos Objectifs Trimestriels"
              : "Our Quarterly Goals"}
          </h2>
          <p className="text-xl text-foreground/70">
            {language === "fr"
              ? "Ensemble, nous travaillons vers ces jalons"
              : "Together we're working toward these milestones"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {goals.map((goal, idx) => {
            const Icon = goal.icon;
            const progress = getPathProgress(goal.path, goal.goal);

            let current;
            if (!donations || donations.length === 0) {
              const defaults = { WISDOM: 180, COURAGE: 120, PROTECTION: 250 };
              current = defaults[goal.path] || 0;
            } else {
              const pathDonations = donations.filter(
                (d) => d.path === goal.path
              );
              const totalAmount = pathDonations.reduce(
                (sum, d) => sum + (d.amount || 0),
                0
              );

              if (goal.path === "WISDOM") {
                current = pathDonations.length * 2;
              } else if (goal.path === "COURAGE") {
                current = Math.floor(totalAmount / 50);
              } else {
                current = Math.floor(totalAmount / 20);
              }
            }

            return (
              <motion.div
                key={goal.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${goal.bgColor} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${goal.iconColor}`} />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">
                        {goal.name}
                      </h3>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-3xl font-bold text-foreground">
                          {current.toLocaleString()}
                        </span>
                        <span className="text-sm text-foreground/60">
                          / {goal.goal.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-3">
                        {goal.unit}
                      </p>

                      <div className="relative h-3 bg-background-dark rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${goal.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.5,
                            delay: idx * 0.1 + 0.3,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-foreground/10">
                      <p className="text-sm text-foreground/70">
                        <span className="font-semibold text-foreground">
                          {Math.round(progress)}%
                        </span>{" "}
                        {language === "fr"
                          ? "de l'objectif atteint"
                          : "of goal reached"}
                      </p>
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
