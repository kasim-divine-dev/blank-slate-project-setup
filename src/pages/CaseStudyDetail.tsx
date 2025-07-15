
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, ArrowLeft, ArrowUpRight, Award, Calendar, CheckCircle, Eye, Home, Share2, Target, Users, Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BoxesLayer from '../components/BoxesLayer/BoxesLayer';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { useLoading } from '../contexts/LoadingContext';
import { getCaseStudyBySlug, getRelatedCaseStudies } from '../data/caseStudiesData';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setLoading: setGlobalLoading } = useLoading();

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 300], [0, 50]);

  // Get case study data with error handling
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [relatedStudies, setRelatedStudies] = useState<any[]>([]);

  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        setGlobalLoading(true);
        setIsLoading(true);
        setError(null);

        if (!slug) {
          throw new Error('Case study not found');
        }

        const study = getCaseStudyBySlug(slug);
        if (!study) {
          throw new Error('Case study not found');
        }

        setCaseStudy(study);
        setRelatedStudies(getRelatedCaseStudies(slug, 3));

        // Simulate loading for smooth transition
        await new Promise(resolve => setTimeout(resolve, 500));

        setIsLoading(false);
        setGlobalLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load case study');
        setIsLoading(false);
        setGlobalLoading(false);
      }
    };

    loadCaseStudy();
  }, [slug, setGlobalLoading]);

  useEffect(() => {
    if (!isLoading && !error && caseStudy) {
      gsap.registerPlugin(ScrollTrigger);

      // Hero floating animation
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          y: -20,
          duration: 4,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      // Content sections animation
      gsap.utils.toArray('.content-section').forEach((section: any, index) => {
        gsap.fromTo(section, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [isLoading, error, caseStudy]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-darkText flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lightBg mx-auto mb-4"></div>
          <p className="text-xl">Loading case study...</p>
        </div>
      </div>
    );
  }

  // Error state with better UX
  if (error || !caseStudy) {
    return (
      <>
        <DynamicSEO
          pageName="caseStudyDetail"
          customData={{
            title: "Case Study Not Found | MkRonix",
            description: "The requested case study could not be found. Explore our other successful projects and case studies.",
          }}
        />
        <div className="min-h-screen bg-black text-darkText flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-black mb-4">Case Study Not Found</h1>
            <p className="text-darkText80 mb-8">
              The case study you're looking for doesn't exist or may have been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/case-studies')}
                className="bg-lightBg text-brown-text px-6 py-3 rounded-full font-bold hover:bg-white transition-colors duration-300 flex items-center gap-2 justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </motion.button>
              <Link
                to="/"
                className="border border-darkText20 text-darkText px-6 py-3 rounded-full font-bold hover:border-lightBg hover:text-lightBg transition-colors duration-300 flex items-center gap-2 justify-center"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  console.log("caseStudy:", caseStudy);

  return (
    <>
      <DynamicSEO
        pageName="caseStudyDetail"
        customData={{
          title: `${caseStudy.title} - Case Study | MkRonix`,
          description: `${caseStudy.shortDescription || caseStudy.description} Learn how MkRonix helped ${caseStudy.client} achieve remarkable results in ${caseStudy.industry?.toLowerCase() || caseStudy.category.toLowerCase()}.`,
          keywords: `${caseStudy.title.toLowerCase()}, ${(caseStudy.industry || caseStudy.category).toLowerCase()} case study, ${caseStudy.technologies.join(', ').toLowerCase()}`,
          url: `https://mkronix.com/case-studies/${slug}`,
          image: `https://mkronix.com${caseStudy.image}`,
          articleData: {
            publishedTime: `${caseStudy.year}-01-01T08:00:00Z`,
            modifiedTime: new Date().toISOString(),
            author: "MkRonix Team",
            section: "Case Studies"
          }
        }}
      />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h1>{caseStudy.title} - Detailed Case Study by MkRonix</h1>
        <p>{caseStudy.description}</p>
        <span>Client: {caseStudy.client} | Category: {caseStudy.category} | Year: {caseStudy.year}</span>
        <span>Technologies: {caseStudy.technologies.join(', ')}</span>
      </div>

      <div ref={containerRef} className="bg-black text-darkText font-boska overflow-x-hidden">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center px-4"
          style={{ y: textY }}
        >
          <BoxesLayer gridColor="#484440" />
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              y: backgroundY,
              background: `radial-gradient(circle at 30% 70%, rgba(245, 231, 211, 0.1), transparent 50%),
                         radial-gradient(circle at 70% 30%, rgba(245, 231, 211, 0.05), transparent 50%)`
            }}
          />

          <div ref={heroRef} className="relative z-10 text-center max-w-6xl mx-auto">
            {/* Back Navigation */}
            <motion.div
              className="flex justify-start mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                className="flex items-center gap-2 text-darkText80 hover:text-darkText transition-colors duration-300 group"
                whileHover={{ x: -5 }}
                onClick={() => navigate('/case-studies')}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Case Studies
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.div
                className="inline-block px-4 py-2 bg-lightBg/10 border border-lightBg/20 rounded-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-lightBg text-sm font-medium">{caseStudy.category}</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-darkText">
                {caseStudy.title}
              </h1>
              <p className="text-2xl md:text-3xl text-lightBg mb-8 font-medium">
                {caseStudy.subtitle}
              </p>

              {/* Project Meta */}
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Users, label: "Client", value: caseStudy.client },
                  { icon: Calendar, label: "Year", value: caseStudy.year },
                  { icon: Award, label: "Category", value: caseStudy.category },
                  { icon: Target, label: "Technologies", value: `${caseStudy.technologies.length}+` }
                ].map((meta, index) => (
                  <motion.div
                    key={meta.label}
                    className="bg-darkText20 backdrop-blur-sm border border-darkText20 p-4 rounded-2xl hover:border-lightBg/50 transition-colors duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <meta.icon className="w-6 h-6 text-lightBg mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-darkText60 text-sm mb-1">{meta.label}</p>
                    <p className="font-bold text-darkText group-hover:text-white transition-colors duration-300">{meta.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Hero Image */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="relative rounded-3xl overflow-hidden aspect-video group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Tech Stack Pills */}
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                {caseStudy.technologies.slice(0, 6).map((tech: string, index: number) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-black/70 backdrop-blur-sm text-darkText rounded-full text-sm font-medium border border-darkText20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Share Button */}
              <div className="absolute top-6 right-6">
                <motion.button
                  className="w-12 h-12 bg-black/70 backdrop-blur-sm border border-darkText20 rounded-full flex items-center justify-center text-darkText hover:text-lightBg hover:border-lightBg/50 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: caseStudy.title,
                        text: caseStudy.description,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="px-4 py-20 bg-darkBg/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="content-section text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-darkText">
                Project <span className="text-lightBg">Overview</span>
              </h2>
              <p className="text-xl text-darkText80 max-w-3xl mx-auto leading-relaxed">
                {caseStudy.description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                className="content-section"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-darkText20 border border-darkText20 p-8 rounded-3xl h-full hover:border-lightBg/50 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-black text-lightBg">The Challenge</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-darkText80">
                    {caseStudy.challenge || "This project presented unique challenges that required innovative solutions and strategic thinking to overcome technical and business obstacles."}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="content-section"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-darkText20 border border-darkText20 p-8 rounded-3xl h-full hover:border-lightBg/50 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-black text-lightBg">Our Solution</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-darkText80">
                    {caseStudy.solution || "We developed a comprehensive solution that addressed all challenges through innovative design, cutting-edge technology, and user-centered approach."}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-black text-center mb-16 text-darkText"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Technologies <span className="text-lightBg">Used</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {caseStudy.technologies.map((tech: string, index: number) => (
                <motion.div
                  key={index}
                  className="content-section bg-darkText20 border border-darkText20 p-6 rounded-2xl text-center hover:border-lightBg/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-lightBg/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-lightBg/20 transition-colors duration-300">
                    <Zap className="w-6 h-6 text-lightBg" />
                  </div>
                  <span className="font-bold text-darkText group-hover:text-white transition-colors duration-300">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 bg-darkBg/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-darkText">
                Measurable <span className="text-lightBg">Results</span>
              </h2>
              <p className="text-xl text-darkText80">
                Data-driven outcomes that exceeded expectations
              </p>
            </motion.div>

            {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudy.results.map((result: string, index: number) => (
                <motion.div
                  key={index}
                  className="content-section bg-gradient-to-br from-lightBg/10 to-lightBg/5 backdrop-blur-sm border border-darkText20 p-8 rounded-3xl group hover:border-lightBg/50 transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-lightBg/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <TrendingUp className="w-4 h-4 text-lightBg" />
                    </div>
                    <div>
                      <p className="text-darkText group-hover:text-white transition-colors duration-300 leading-relaxed">
                        {result}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div> */}
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="px-4 py-20 bg-black">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-black text-center mb-16 text-darkText"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Related <span className="text-lightBg">Projects</span>
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedStudies.map((study: any, index: number) => (
                  <motion.div
                    key={study.id}
                    className="content-section bg-darkText20 border border-darkText20 rounded-2xl overflow-hidden hover:border-lightBg/50 transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => {
                      setGlobalLoading(true);
                      navigate(`/case-studies/${study.url?.split('/').pop() || study.id}`);
                    }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-lightBg/10 border border-lightBg/20 rounded-full text-lightBg text-xs font-medium">
                          {study.category}
                        </span>
                        <span className="text-darkText60 text-sm">{study.year}</span>
                      </div>
                      <h3 className="text-xl font-black text-darkText mb-2 group-hover:text-white transition-colors duration-300">
                        {study.title}
                      </h3>
                      <p className="text-darkText80 text-sm mb-4 line-clamp-2">
                        {study.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-darkText60 text-sm">
                          {study.client}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-darkText60 group-hover:text-lightBg transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="px-4 py-32 bg-darkBg/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-darkText">
                Ready for Your <span className="text-lightBg">Success Story?</span>
              </h2>
              <p className="text-xl text-darkText80 mb-12">
                Let's create something extraordinary together
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  className="group relative bg-lightBg text-brown-text px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setGlobalLoading(true);
                    navigate('/contact');
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Start Your Project
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </motion.button>

                <motion.button
                  className="group border-2 border-darkText20 text-darkText px-8 py-4 rounded-full font-bold hover:border-lightBg hover:bg-lightBg hover:text-brown-text transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setGlobalLoading(true);
                    navigate('/case-studies');
                  }}
                >
                  <span className="flex items-center gap-2 justify-center">
                    <Eye className="w-5 h-5" />
                    View More Cases
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudyDetail;
