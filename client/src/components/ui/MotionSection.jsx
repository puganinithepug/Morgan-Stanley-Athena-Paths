import { forwardRef } from "react";
import { motion } from "framer-motion";

const baseVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MotionSection = forwardRef(function MotionSection(
  { children, className = "", variants = baseVariants, ...rest },
  ref
) {
  return (
    <motion.section
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: false }}
      {...rest}
    >
      {children}
    </motion.section>
  );
});

export default MotionSection;
