import { motion } from "framer-motion";
import { BADGE_DEFINITIONS } from "../components/BadgeChecker";

const BADGES = Object.values(BADGE_DEFINITIONS);

export function BadgeMarqueeSection({ language = "fr" }) {
  return (
    <section className="py-16 bg-transparent">
      {/* wider container + less padding */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          {language === "fr"
            ? "Faites un don pour commencer à gagner des succès"
            : "Donate to start earning achievements"}
        </h2>

        <p className="mt-2 text-sm md:text-base text-foreground/70 text-center">
          {language === "fr"
            ? "Chaque contribution permet de progresser dans les domaines de la sagesse, du courage, de la protection et du service."
            : "Every contribution unlocks progress across Wisdom, Courage, Protection and Service."}
        </p>

        {/* Scrolling badge strip */}
        <div className="mt-10 relative overflow-hidden">
          {/* smaller side fades so there’s more visible content */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-transparent" />

          <motion.div
            className="flex gap-8 py-4"             
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }}
          >
            {[...BADGES, ...BADGES].map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 min-w-[110px]"
              >
                <img
                  src={badge.icon}
                  alt={badge.name[language] || badge.name.en}
                  className="w-20 h-20 object-contain" // bigger badges
                />
                <p className="text-xs md:text-sm text-center leading-tight">
                  {badge.name[language] || badge.name.en}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
