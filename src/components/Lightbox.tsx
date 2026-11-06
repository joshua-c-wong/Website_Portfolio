import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  title?: string;
};

const Lightbox = ({ images, index, onClose, onIndexChange, title }: Props) => {
  const open = index !== null;
  const count = images.length;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, step]);

  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title ? `${title} images` : "Image viewer"}
        >
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={title ? `${title} — image ${index + 1}` : `Image ${index + 1}`}
            className="max-h-[85vh] max-w-[92vw] object-contain shadow-sm"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {count > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 md:left-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next image"
                className="absolute right-3 md:right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground">
                {index + 1} / {count}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Lightbox;
