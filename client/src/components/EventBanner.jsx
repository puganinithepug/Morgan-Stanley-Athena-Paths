import { motion } from "framer-motion";

export default function EventBanner() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ originX: 0 }}
      className="rounded-xl bg-[#6f6bb8] text-white shadow-lg px-4 py-3
                 flex flex-col gap-2 text-xs sm:text-sm w-full max-w-md"
    >
      {/* TOP ROW — title (forced to one line) */}
      <h3 className="font-semibold text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">
        2025 Annual Lilac Gala – November 29th
      </h3>

      {/* BOTTOM ROW — subtitle + button */}
      <div className="flex items-center justify-between gap-4">
        <p className="opacity-90 text-[0.7rem] sm:text-xs leading-snug">
          Join us to celebrate 34 years of service. Buy your tickets now!
        </p>

        <a
          href="/lilac-gala"
          className="bg-white text-[#6f6bb8] font-semibold px-3 py-1.5
                     rounded-lg shadow-sm whitespace-nowrap text-xs sm:text-sm
                     hover:shadow-md transition-all"
        >
          Buy Tickets
        </a>
      </div>
    </motion.div>
  );
}
