import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SmoothScrollSectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * SmoothScrollSection - A component that creates a smooth scrolling effect with parallax
 *
 * This component applies a smooth scrolling effect to its children, creating a natural
 * and engaging parallax effect as the user scrolls through the page.
 */
const SmoothScrollSection = ({
  children,
  className = "",
}: SmoothScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create a smooth springy scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 100,
  });

  // Transform the progress into y-position values - reduzimos a amplitude para evitar scroll excessivo
  const y = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`}>
      <motion.div
        style={{ y, position: "relative" }}
        className="overflow-visible"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SmoothScrollSection;
