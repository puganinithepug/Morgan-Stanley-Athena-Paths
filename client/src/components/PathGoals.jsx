import React from "react";
import { Card, CardContent } from "./ui/Card";
import { Phone, Heart, Home, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function PathGoals() {
  const { t } = useLanguage();

  const goals = [
    {
      path: "WISDOM",
      name: t("paths.wisdom.name"),
      icon: Phone,
      color: "from-highlight to-secondary",
      bgColor: "bg-highlight/15",
      iconColor: "text-highlight",
      current: "Tens of thousands",
      goal: "people reached",
      unit: "via community outreach annually",
      // VERIFIED: Tens of thousands reached annually through community outreach, education, and awareness
    },
    {
      path: "COURAGE",
      name: t("paths.courage.name"),
      icon: Heart,
      color: "from-muted to-primary",
      bgColor: "bg-muted/15",
      iconColor: "text-muted",
      current: "1,229",
      goal: "clients helped",
      unit: "in a single year",
      // VERIFIED: 1,229 clients helped in a single year through Shield of Athena's Montreal and Laval centers
    },
    {
      path: "PROTECTION",
      name: t("paths.protection.name"),
      icon: Home,
      color: "from-secondary to-primary-dark",
      bgColor: "bg-secondary/15",
      iconColor: "text-secondary",
      current: "100",
      goal: "women & children",
      unit: "at Athena's House",
      // VERIFIED: 100 women and children found refuge at Athena's House emergency shelter
    },
    {
      path: "SERVICE",
      name: t("paths.service.name"),
      icon: Clock,
      color: "from-accent to-primary",
      bgColor: "bg-accent/15",
      iconColor: "text-accent",
      current: "34",
      goal: "years of service",
      unit: "founded in 1991",
      // VERIFIED: 34 years of service supporting victims of conjugal and family violence (founded in 1991)
    },
  ];

  const getPathProgress = () => 100;

  return (
    <section className="py-20 bg-background">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Achievements
          </h2>
          <p className="text-xl text-foreground/70">
            Here is the real impact of Shield of Athena in the community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, idx) => {
            const Icon = goal.icon;
            const progress = getPathProgress();

            return (
              <motion.div
                key={goal.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4 mt-4">
                      <div className={`${goal.bgColor} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${goal.iconColor}`} />
                      </div>
                      <h3 className="font-bold text-lg text-foreground">
                        {goal.name}
                      </h3>
                    </div>

                    <div className="mb-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-foreground">
                          {goal.current}
                        </span>
                        <span className="text-lg text-foreground/70 ml-2">
                          {goal.goal}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-3">
                        {goal.unit}
                      </p>

                      <div className="relative h-3 bg-background-dark rounded-full overflow-hidden mt-auto">
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
