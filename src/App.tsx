
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LenisProvider } from './providers/LenisProvider';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Index';
import About from './pages/AboutUs';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import Contact from './pages/ContactUs';
import CustomCursor from './components/Cursor/CustomCursor';
import GlobalLoader from './components/GlobalLoader/GlobalLoader';
import { LoadingProvider } from './contexts/LoadingContext';
import BlogDetail from './pages/BlogDetail';
import CaseStudyDetail from './pages/CaseStudyDetail';

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <HelmetProvider>
          <LoadingProvider>
            <Layout>
              <CustomCursor />
              <GlobalLoader />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          </LoadingProvider>
        </HelmetProvider>
      </LenisProvider>
    </BrowserRouter>
  );
}

export default App;
