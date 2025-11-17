import { motion } from "framer-motion";

export default function ShopBanner() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      style={{ originX: 1 }}
      className="rounded-lg md:rounded-xl bg-[#f68d5a] text-white shadow-lg px-2 py-2 md:px-4 md:py-3
                 flex flex-col gap-1 md:gap-2 text-xs w-full max-w-xs md:max-w-md md:text-right"
    >
      <h3 className="font-semibold text-xs md:text-sm lg:text-base whitespace-nowrap overflow-hidden text-ellipsis">
        Athena Art Sale – Shop to Support
      </h3>

      <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4">
        <p className="opacity-90 text-[0.65rem] md:text-xs leading-snug text-left md:text-right">
          Cookbooks, artwork & memorabilia that fund essential services.
        </p>

        <a
          href="https://shield-of-athenas-art-sale-more.myshopify.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#f36b34] font-semibold px-2 py-1 md:px-3 md:py-1.5
                     rounded md:rounded-lg shadow-sm whitespace-nowrap text-[0.65rem] md:text-xs lg:text-sm
                     hover:shadow-md transition-all"
        >
          Shop Now
        </a>
      </div>
    </motion.div>
  );
}

