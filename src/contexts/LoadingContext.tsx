
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
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
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
    // Only show loader for route changes, not initial load
    if (location.pathname !== '/') {
      setLoading(true);
    }
    
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
        setTimeout(checkFullPageLoad, 50);
        return;
      }

      // Check all images
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 2000); // Reduced timeout
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
            setTimeout(() => resolve(null), 1000);
          }
        });
      });

      // Wait for all assets with a maximum timeout
      const allPromises = [...imagePromises, ...stylesheetPromises];
      
      Promise.race([
        Promise.all(allPromises),
        new Promise(resolve => setTimeout(resolve, 2000)) // Reduced max timeout
      ]).then(() => {
        setLoadingProgress(100);
        setTimeout(() => setLoading(false), 300); // Reduced delay
      });
    };

    // Start checking after a short delay to allow components to mount
    const timer = setTimeout(checkFullPageLoad, 400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  // Handle initial page load
  useEffect(() => {
    const handleInitialLoad = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => setLoading(false), 500);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => setLoading(false), 500);
        });
      }
    };

    handleInitialLoad();
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, loadingProgress, setLoadingProgress }}>
      {children}
    </LoadingContext.Provider>
  );
};
