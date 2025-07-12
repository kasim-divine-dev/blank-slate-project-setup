
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

    // Check if page is fully loaded
    const checkPageLoad = () => {
      const images = document.querySelectorAll('img');
      const promises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(promises).then(() => {
        setTimeout(() => {
          setLoadingProgress(100);
          setTimeout(() => setLoading(false), 500);
        }, 300);
      });
    };

    // Start checking after a short delay
    const timer = setTimeout(checkPageLoad, 500);

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
