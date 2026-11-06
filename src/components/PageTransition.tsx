import { motion } from "framer-motion";

/** Soft fade + slide used when moving between pages. */
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }}
    exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
