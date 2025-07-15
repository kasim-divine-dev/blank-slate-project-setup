import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
  loadingMessage: string;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

interface AssetLoadingProgress {
  total: number;
  loaded: number;
  failed: number;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const location = useLocation();
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (loading) {
      setLoadingProgress(0);
      setLoadingMessage('Initializing...');
    }
  };

  const updateProgress = (progress: number, message: string) => {
    setLoadingProgress(Math.min(progress, 100));
    setLoadingMessage(message);
  };

  const preloadAssets = async (): Promise<void> => {
    return new Promise((resolve) => {
      const assetProgress: AssetLoadingProgress = { total: 0, loaded: 0, failed: 0 };

      // Wait for DOM to be ready
      const checkDOMReady = () => {
        if (document.readyState === 'loading') {
          setTimeout(checkDOMReady, 50);
          return;
        }

        updateProgress(20, 'Loading assets...');

        // Get all assets that need to be loaded
        const images = Array.from(document.querySelectorAll('img[src]')) as HTMLImageElement[];
        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
        const scripts = Array.from(document.querySelectorAll('script[src]')) as HTMLScriptElement[];

        // Filter out already loaded assets
        const pendingImages = images.filter(img => !img.complete || img.naturalHeight === 0);
        const pendingStylesheets = stylesheets.filter(link => !link.sheet);
        const pendingScripts = scripts.filter(script => !script.getAttribute('data-loaded'));

        assetProgress.total = pendingImages.length + pendingStylesheets.length + pendingScripts.length;

        if (assetProgress.total === 0) {
          updateProgress(100, 'Ready!');
          setTimeout(resolve, 200);
          return;
        }

        updateProgress(30, `Loading ${assetProgress.total} assets...`);

        const onAssetLoad = (type: string) => {
          assetProgress.loaded++;
          const progressPercent = 30 + ((assetProgress.loaded / assetProgress.total) * 60);
          updateProgress(progressPercent, `Loading assets... ${assetProgress.loaded}/${assetProgress.total}`);

          if (assetProgress.loaded + assetProgress.failed >= assetProgress.total) {
            updateProgress(100, 'Ready!');
            setTimeout(resolve, 200);
          }
        };

        const onAssetError = (type: string, src: string) => {
          assetProgress.failed++;
          console.warn(`Failed to load ${type}: ${src}`);

          if (assetProgress.loaded + assetProgress.failed >= assetProgress.total) {
            updateProgress(100, 'Ready!');
            setTimeout(resolve, 200);
          }
        };

        // Load images
        pendingImages.forEach(img => {
          if (img.complete && img.naturalHeight !== 0) {
            onAssetLoad('image');
            return;
          }

          const handleImageLoad = () => {
            img.removeEventListener('load', handleImageLoad);
            img.removeEventListener('error', handleImageError);
            onAssetLoad('image');
          };

          const handleImageError = () => {
            img.removeEventListener('load', handleImageLoad);
            img.removeEventListener('error', handleImageError);
            onAssetError('image', img.src);
          };

          img.addEventListener('load', handleImageLoad);
          img.addEventListener('error', handleImageError);

          // Timeout for stuck images
          setTimeout(() => {
            if (!img.complete) {
              img.removeEventListener('load', handleImageLoad);
              img.removeEventListener('error', handleImageError);
              onAssetError('image', img.src);
            }
          }, 5000);
        });

        // Load stylesheets
        pendingStylesheets.forEach(link => {
          if (link.sheet) {
            onAssetLoad('stylesheet');
            return;
          }

          const handleStyleLoad = () => {
            link.removeEventListener('load', handleStyleLoad);
            link.removeEventListener('error', handleStyleError);
            onAssetLoad('stylesheet');
          };

          const handleStyleError = () => {
            link.removeEventListener('load', handleStyleLoad);
            link.removeEventListener('error', handleStyleError);
            onAssetError('stylesheet', link.href);
          };

          link.addEventListener('load', handleStyleLoad);
          link.addEventListener('error', handleStyleError);

          // Timeout for stuck stylesheets
          setTimeout(() => {
            if (!link.sheet) {
              link.removeEventListener('load', handleStyleLoad);
              link.removeEventListener('error', handleStyleError);
              onAssetError('stylesheet', link.href);
            }
          }, 3000);
        });

        // Load scripts
        pendingScripts.forEach(script => {
          const handleScriptLoad = () => {
            script.removeEventListener('load', handleScriptLoad);
            script.removeEventListener('error', handleScriptError);
            script.setAttribute('data-loaded', 'true');
            onAssetLoad('script');
          };

          const handleScriptError = () => {
            script.removeEventListener('load', handleScriptLoad);
            script.removeEventListener('error', handleScriptError);
            onAssetError('script', script.src);
          };

          script.addEventListener('load', handleScriptLoad);
          script.addEventListener('error', handleScriptError);

          // Timeout for stuck scripts
          setTimeout(() => {
            if (!script.getAttribute('data-loaded')) {
              script.removeEventListener('load', handleScriptLoad);
              script.removeEventListener('error', handleScriptError);
              onAssetError('script', script.src);
            }
          }, 4000);
        });
      };

      checkDOMReady();
    });
  };

  const startLoading = async () => {
    setLoading(true);

    // Clear any existing timeouts
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Initial progress simulation
    updateProgress(10, 'Preparing...');

    // Progressive loading with real asset detection
    try {
      await preloadAssets();
    } catch (error) {
      console.error('Asset loading error:', error);
      updateProgress(100, 'Ready!');
    }

    // Final step
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // Handle route changes
  useEffect(() => {
    startLoading();

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [location.pathname]);

  // Additional asset detection for dynamically loaded content
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      if (isLoading) return;

      let hasNewAssets = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              const newImages = element.querySelectorAll?.('img[src]') || [];
              const newStyles = element.querySelectorAll?.('link[rel="stylesheet"]') || [];

              if (newImages.length > 0 || newStyles.length > 0) {
                hasNewAssets = true;
              }
            }
          });
        }
      });

      if (hasNewAssets) {
        // Briefly show loading for new assets
        startLoading();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setLoading,
      loadingProgress,
      setLoadingProgress,
      loadingMessage
    }}>
      {children}
    </LoadingContext.Provider>
  );
};