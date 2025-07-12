
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LoadingProvider } from "./contexts/LoadingContext";
import { LenisProvider } from "./providers/LenisProvider";
import Layout from "./components/Layout/Layout";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";

// Lazy load pages for better performance
import { LazyLoad } from "./utils/lazyLoad";

const Index = LazyLoad(() => import("./pages/Index"));
const AboutUs = LazyLoad(() => import("./pages/AboutUs"));
const Services = LazyLoad(() => import("./pages/Services"));
const ContactUs = LazyLoad(() => import("./pages/ContactUs"));
const Projects = LazyLoad(() => import("./pages/Projects"));
const CaseStudies = LazyLoad(() => import("./pages/CaseStudies"));
const NotFound = LazyLoad(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <LoadingProvider>
          <BrowserRouter>
            <LenisProvider>
              <GlobalLoader />
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </LenisProvider>
          </BrowserRouter>
        </LoadingProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
