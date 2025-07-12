
import React, { Suspense, lazy, ComponentType } from "react";

export const LazyLoad = <P extends Record<string, any> = {}>(
  Component: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(Component);

  return (props: P) => (
    <Suspense fallback={fallback || <div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
      <LazyComponent {...(props as any)} />
    </Suspense>
  );
};

// Image lazy loading component
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallback = "/api/placeholder/400/300",
  className = "",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          const img = imgRef.current;
          img.src = src;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setHasError(true);
        if (imgRef.current) {
          imgRef.current.src = fallback;
        }
      }}
      {...props}
    />
  );
};

export default LazyLoad;
