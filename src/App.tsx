import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LenisProvider } from '@studio-freight/react-lenis'
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CustomCursor from './components/CustomCursor/CustomCursor';
import GlobalLoader from './components/GlobalLoader/GlobalLoader';
import { LoadingProvider } from './components/LoadingContext/LoadingContext';
import BlogPost from './pages/BlogPost';
import CaseStudyDetail from './pages/CaseStudyDetail';

function App() {
  return (
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
              <Route path="/projects" element={<Projects />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            </Routes>
          </Layout>
        </LoadingProvider>
      </HelmetProvider>
    </LenisProvider>
  );
}

export default App;
