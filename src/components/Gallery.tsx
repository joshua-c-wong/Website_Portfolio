import { useState } from "react";
import { ImageIcon } from "lucide-react";
import Lightbox from "./Lightbox";

const Gallery = ({ images, title }: { images: string[]; title: string }) => {
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`aspect-[4/3] rounded-sm border border-dashed border-border bg-muted/60 flex flex-col items-center justify-center gap-2 text-muted-foreground ${
              i === 0 ? "col-span-2 aspect-[16/9]" : ""
            }`}
          >
            <ImageIcon className="w-5 h-5 opacity-60" />
            {i === 0 && <span className="text-xs font-mono">Images coming soon</span>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden rounded-sm border border-border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              i === 0 ? "col-span-2 sm:col-span-3 aspect-[16/9]" : "aspect-[4/3]"
            }`}
            aria-label={`Open image ${i + 1}`}
          >
            <img
              src={src}
              alt={`${title} — image ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>
      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} title={title} />
    </>
  );
};

export default Gallery;
