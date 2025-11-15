import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import wisdomImg from "../assets/hero_wisdom.jpg";
import protectionImg from "../assets/hero_protection.jpg";

export default function PathTransitionSection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const handlePathClick = (path) => {
    navigate(`/path-results?path=${path}`);
  };

  // Triangles fade + move down as you scroll past hero
  const trianglesOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const trianglesY = useTransform(scrollYProgress, [0, 0.4], [0, 80]);

  // Stripes fade + slide in, then stay visible
  const stripesOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const stripesX = useTransform(scrollYProgress, [0.15, 0.45], [-80, 0]);

  // Stripes grow and then keep full height
  const stripe1Height = useTransform(scrollYProgress, [0.2, 0.8], [16, 120]);
  const stripe2Height = useTransform(scrollYProgress, [0.2, 0.8], [24, 160]);
  const stripe3Height = useTransform(scrollYProgress, [0.2, 0.8], [12, 110]);

  const scrollToWaysToHelp = () => {
    const el = document.getElementById("ways-to-help");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[110vh] flex flex-col items-center bg-white overflow-hidden pt-24 pb-16"
    >
      {/* TEXT + CTA */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl max-w-2xl md:text-5xl font-bold text-gray-900 mb-3">
          Help women and children find safety, healing, and hope.
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Athena Paths transforms donating into a guided journey—Wisdom, Courage, and Protection—that mirrors the real stages of a survivor's healing.
        </p>
        <Button
          size="lg"
          onClick={scrollToWaysToHelp}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-5 rounded-full shadow-lg flex items-center gap-2"
        >
          Donate
          {/* <ArrowRight className="w-5 h-5" /> */}
        </Button>
      </div>

      {/* TRIANGLES (first state) */}
      <motion.div
        style={{ opacity: trianglesOpacity, y: trianglesY }}
        className="
          relative w-full -mt-56
          flex items-end justify-center -gap-[1vw]
        "
      >
        {/*TODO: 
        - Support mobile view (currently not implemented)*/}
        {/* LEFT – Wisdom */}
        <div
            onClick={() => handlePathClick("WISDOM")}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePathClick("WISDOM");
            }}
            role="button"
            tabIndex={0}
            aria-label="View Wisdom path"
            className="relative w-[24rem] md:w-[130rem] h-[30rem] md:h-[45rem] shadow-2xl origin-bottom translate-x-[100px] translate-y-[-40px]"
            style={{
                clipPath: "polygon(0% 30%, 21% 0, 100% 100%, 4% 75%)",
                backgroundImage: `url(${wisdomImg})`,
                backgroundSize: "cover",
                backgroundPosition: "40% center",
            }}
            >
        </div>

        {/* MIDDLE – Courage */}
        <div
            onClick={() => handlePathClick("COURAGE")}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePathClick("COURAGE");
            }}
            role="button"
            tabIndex={0}
            aria-label="View Courage path"
            className="relative w-[18rem] md:w-[110rem] h-[24rem] md:h-[28rem] shadow-2xl origin-bottom z-10"
            style={{
                clipPath: "polygon(16% 0%, 84% 0%, 100% 24%, 50% 100%, 2% 24%)",
                backgroundImage: `url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
        </div>

        {/* RIGHT – Protection */}
        <div
            onClick={() => handlePathClick("PROTECTION")}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePathClick("PROTECTION");
            }}
            role="button"
            tabIndex={0}
            aria-label="View Protection path"
            className="relative w-[24rem] md:w-[130rem] h-[30rem] md:h-[45rem] shadow-2xl origin-bottom translate-x-[-100px] translate-y-[-40px]"
            style={{
                clipPath: "polygon(100% 30%, 79% 0, 0% 100%, 96% 75%)",
                backgroundImage: `url(${protectionImg})`,
                backgroundSize: "cover",
                backgroundPosition: "15% center",
                }}
            >
        </div>
      </motion.div>

      {/* STRIPES – fixed so they persist across the page */}
      <motion.div
        style={{ opacity: stripesOpacity, x: stripesX }}
        className="fixed left-6 top-1/3 z-10 pointer-events-none"
      >
        <div className="flex flex-col gap-3">
          <motion.div
            className="w-2 bg-orange-500 rounded-full"
            style={{ height: stripe1Height }}
          />
          <motion.div
            className="w-2 bg-rose-500 rounded-full"
            style={{ height: stripe2Height }}
          />
          <motion.div
            className="w-2 bg-indigo-500 rounded-full"
            style={{ height: stripe3Height }}
          />
        </div>
      </motion.div>
    </section>
  );
}
