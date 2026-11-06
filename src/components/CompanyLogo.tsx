const CompanyLogo = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <div className="w-20 h-20 flex items-center justify-end shrink-0">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-14 h-14 object-contain transition-all duration-300 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 ${className}`}
    />
  </div>
);

export default CompanyLogo;
