
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
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

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const location = useLocation();

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (loading) {
      setLoadingProgress(0);
    }
  };

  // Handle route changes
  useEffect(() => {
    setLoading(true);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Enhanced asset loading detection
    const checkFullPageLoad = () => {
      // Check if DOM is ready
      if (document.readyState !== 'complete') {
        setTimeout(checkFullPageLoad, 100);
        return;
      }

      // Check all images
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to prevent hanging
          // Timeout for images that take too long
          setTimeout(resolve, 3000);
        });
      });

      // Check stylesheets
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const stylesheetPromises = Array.from(stylesheets).map(link => {
        return new Promise(resolve => {
          if ((link as HTMLLinkElement).sheet) {
            resolve(null);
          } else {
            link.addEventListener('load', () => resolve(null));
            link.addEventListener('error', () => resolve(null));
            setTimeout(() => resolve(null), 2000);
          }
        });
      });

      // Wait for all assets with a maximum timeout
      const allPromises = [...imagePromises, ...stylesheetPromises];
      
      Promise.race([
        Promise.all(allPromises),
        new Promise(resolve => setTimeout(resolve, 4000)) // Max 4 seconds
      ]).then(() => {
        setLoadingProgress(100);
        setTimeout(() => setLoading(false), 500);
      });
    };

    // Start checking after a short delay to allow components to mount
    const timer = setTimeout(checkFullPageLoad, 800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, loadingProgress, setLoadingProgress }}>
      {children}
    </LoadingContext.Provider>
  );
};
