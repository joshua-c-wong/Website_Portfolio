import { createPortal } from "react-dom";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";

type Props = { src: string | null; x: MotionValue<number>; y: MotionValue<number> };

/** Floating image card that trails the cursor while a project row is hovered. */
const ProjectHoverPreview = ({ src, x, y }: Props) =>
  createPortal(
  <motion.div
    className="pointer-events-none fixed left-0 top-0 z-40"
    style={{ x, y }}
    aria-hidden
  >
    <AnimatePresence mode="popLayout">
      {src && (
        <motion.div
          key={src}
          className="ml-6 mt-6 h-[190px] w-[280px] overflow-hidden rounded-sm border border-border bg-muted shadow-[0_12px_40px_-12px_rgba(20,23,28,0.25)]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>,
  document.body,
);

export default ProjectHoverPreview;
