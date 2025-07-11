import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BarChart3, Calendar, ExternalLink, Target, TrendingUp, Users, Zap } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { caseStudiesData } from '@/data/caseStudiesData';
import BoxesLayer from '@/components/BoxesLayer/BoxesLayer';
import { DrawCircleText } from '@/components/DrawCircleText/DrawCircleText';
const CaseStudies: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero floating animation
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: -15,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Case study cards stagger animation
    gsap.utils.toArray('.case-study-card').forEach((card: any, index) => {
      gsap.fromTo(card, {
        y: 100,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach((stat: any) => {
      const target = stat.getAttribute('data-target');
      gsap.fromTo(stat, {
        innerText: 0
      }, {
        innerText: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 80%"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { value: 300, label: "Successful Projects", suffix: "+" },
    { value: 150, label: "Happy Clients", suffix: "+" },
    { value: 95, label: "Success Rate", suffix: "%" },
    { value: 24, label: "Countries Served", suffix: "" }
  ];

  return (
    <>
// Enhanced SEO for CaseStudies.tsx - Replace existing Helmet content

      <Helmet>
        {/* Primary Meta Tags */}
        <title>Case Studies | MkRonix - Proven Results & Success Stories from 300+ Digital Projects India</title>
        <meta name="description" content="Explore MkRonix's detailed case studies showcasing measurable results from our web development, UI/UX design, and digital marketing projects. Real data, proven ROI, client success stories from India." />

        {/* Enhanced Keywords */}
        <meta name="keywords" content="mkronix case studies, digital marketing success stories, web development results, UI UX design case studies, project outcomes India, client success stories, ROI digital projects, before after results, project analysis, digital transformation case studies, website redesign results, app development success" />

        {/* Enhanced Open Graph */}
        <meta property="og:title" content="Case Studies | MkRonix - Real Results from 300+ Successful Digital Projects" />
        <meta property="og:description" content="Discover how we've helped clients achieve 300% growth, 150% conversion increases, and measurable business success through strategic digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mkronix.com/case-studies" />
        <meta property="og:image" content="https://mkronix.com/assets/case-studies-results-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MkRonix Case Studies - Proven Digital Results" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="MkRonix" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Case Studies | MkRonix - Proven Digital Success Stories" />
        <meta name="twitter:description" content="See real results from our digital projects: 300% growth, 150% conversion increases, and measurable business success stories." />
        <meta name="twitter:image" content="https://mkronix.com/assets/case-studies-twitter.jpg" />
        <meta name="twitter:image:alt" content="MkRonix Success Stories and Results" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mkronix.com/case-studies" />

        {/* Additional SEO Meta */}
        <meta name="author" content="MkRonix Digital Solutions" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="revisit-after" content="7 days" />

        {/* Case Studies Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "MkRonix Case Studies",
            "description": "Detailed case studies showcasing proven results and success stories from our digital projects",
            "url": "https://mkronix.com/case-studies",
            "numberOfItems": 50,
            "itemListElement": [
              {
                "@type": "Article",
                "position": 1,
                "headline": "E-commerce Platform Transformation - 300% Revenue Growth",
                "description": "Complete redesign and development of e-commerce platform resulting in 300% revenue increase and 150% improvement in user engagement",
                "author": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://mkronix.com/assets/logo.png"
                  }
                },
                "datePublished": "2024-12-01",
                "dateModified": "2024-12-01",
                "image": "https://mkronix.com/assets/case-study-ecommerce.jpg",
                "articleSection": "Case Studies",
                "keywords": ["e-commerce", "web development", "revenue growth", "user experience"]
              },
              {
                "@type": "Article",
                "position": 2,
                "headline": "Mobile Banking App UI/UX Redesign - 95% User Satisfaction",
                "description": "Complete UI/UX redesign of mobile banking application achieving 95% user satisfaction and 40% increase in app usage",
                "author": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://mkronix.com/assets/logo.png"
                  }
                },
                "datePublished": "2024-11-15",
                "dateModified": "2024-11-15",
                "image": "https://mkronix.com/assets/case-study-banking.jpg",
                "articleSection": "Case Studies",
                "keywords": ["mobile app", "UI/UX design", "banking", "user satisfaction"]
              }
            ]
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://mkronix.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Case Studies",
                "item": "https://mkronix.com/case-studies"
              }
            ]
          })}
        </script>

        {/* Statistics Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": "MkRonix Case Study Results",
            "description": "Performance metrics and results from our successful digital projects",
            "creator": {
              "@type": "Organization",
              "name": "MkRonix Digital Solutions"
            },
            "dateModified": "2025-01-11",
            "measurementTechnique": "Project Analysis and Client Reporting",
            "variableMeasured": [
              {
                "@type": "PropertyValue",
                "name": "Successful Projects",
                "value": "300+",
                "description": "Total number of successful projects completed"
              },
              {
                "@type": "PropertyValue",
                "name": "Client Success Rate",
                "value": "95%",
                "description": "Percentage of projects achieving or exceeding client goals"
              },
              {
                "@type": "PropertyValue",
                "name": "Average ROI Improvement",
                "value": "250%",
                "description": "Average return on investment improvement across projects"
              },
              {
                "@type": "PropertyValue",
                "name": "Countries Served",
                "value": "24",
                "description": "Number of countries where we've delivered successful projects"
              }
            ]
          })}
        </script>

        {/* FAQ Schema for Case Studies */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What kind of results has MkRonix achieved for clients?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix has achieved remarkable results including 300% revenue growth for e-commerce clients, 150% increase in conversions, 95% user satisfaction rates, and consistent ROI improvements across 300+ successful projects."
                }
              },
              {
                "@type": "Question",
                "name": "How does MkRonix measure project success?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We measure success through specific KPIs including revenue growth, conversion rates, user engagement metrics, website performance, search rankings, and overall business impact based on each client's unique goals."
                }
              },
              {
                "@type": "Question",
                "name": "Can I see detailed case studies before starting a project?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide detailed case studies showing our process, challenges faced, solutions implemented, and measurable results achieved. We can also share relevant case studies specific to your industry during consultation."
                }
              },
              {
                "@type": "Question",
                "name": "What industries has MkRonix delivered successful results for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We've delivered successful results across diverse industries including e-commerce, healthcare, finance, education, real estate, technology, hospitality, and many more sectors across 24 countries."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it typically take to see results from MkRonix projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Results timeline varies by project type. Website redesigns typically show improvements within 30-60 days, SEO results in 3-6 months, while comprehensive digital marketing campaigns show significant results within 2-4 months."
                }
              }
            ]
          })}
        </script>

        {/* Review Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Organization",
              "name": "MkRonix Digital Solutions"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "name": "Outstanding Digital Results",
            "author": {
              "@type": "Person",
              "name": "Sarah Johnson"
            },
            "reviewBody": "MkRonix transformed our digital presence completely. The results exceeded our expectations by 300%. Their strategic approach and attention to detail helped us achieve unprecedented user engagement.",
            "publisher": {
              "@type": "Organization",
              "name": "MkRonix Digital Solutions"
            }
          })}
        </script>

        {/* Methodology Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "MkRonix Success Methodology",
            "description": "Our proven 4-step methodology for delivering exceptional results in every digital project",
            "image": "https://mkronix.com/assets/methodology-process.jpg",
            "totalTime": "PT8W",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "INR",
              "value": "50000"
            },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Research & Analysis",
                "text": "Deep dive into market research, user behavior, competitive analysis, and business objectives to develop data-driven strategies",
                "image": "https://mkronix.com/assets/research-analysis.jpg"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Strategy Development",
                "text": "Crafting comprehensive strategies aligned with business objectives, user needs, and market opportunities",
                "image": "https://mkronix.com/assets/strategy-development.jpg"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Implementation",
                "text": "Executing the strategy with precision, using cutting-edge technologies and best practices for optimal results",
                "image": "https://mkronix.com/assets/implementation.jpg"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Optimization",
                "text": "Continuous monitoring, testing, and improvement based on real data and user feedback to maximize performance",
                "image": "https://mkronix.com/assets/optimization.jpg"
              }
            ]
          })}
        </script>
      </Helmet>

      <div ref={containerRef} className="bg-black text-[#F5E7D3] font-boska overflow-x-hidden">
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
              background: `radial-gradient(circle at 20% 80%, rgba(72, 68, 64, 0.4), transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(72, 68, 64, 0.3), transparent 50%)`
            }}
          />

          <div ref={heroRef} className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <DrawCircleText
                normalText="Real projects, real "
                normalText2="measurable success stories."
                circleText="impact,"
              />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Dive deep into our most impactful projects and discover how we transform challenges into extraordinary digital experiences that drive business growth.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-[#1D1C1C]/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <div
                      className="stat-number text-4xl md:text-6xl font-black text-[#F5E7D3] group-hover:text-white transition-colors duration-300"
                      data-target={stat.value}
                    >
                      0
                    </div>
                    <span className="text-4xl md:text-6xl font-black text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                      {stat.suffix}
                    </span>
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-transparent via-[#484440]/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-[#F5E7D3]/60 mt-4 font-medium group-hover:text-[#F5E7D3]/80 transition-colors duration-300">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Featured <span className="text-[#484440]">Case Studies</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                In-depth analysis of our most successful projects and the strategies behind their success
              </p>
            </motion.div>

            <div className="space-y-32">
              {caseStudiesData.map((study, index) => (
                <motion.article
                  key={study.id}
                  className={`case-study-card ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } flex flex-col lg:flex gap-12 items-center relative`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Background decoration */}
                  <motion.div
                    className="absolute -inset-8 bg-gradient-to-br from-[#484440]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />

                  {/* Image Section */}
                  <div className="lg:w-1/2 relative group">
                    <motion.div
                      className="relative overflow-hidden rounded-3xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay with category */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div
                        className="absolute top-6 left-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        <span className="bg-[#F5E7D3] text-black px-4 py-2 rounded-full text-sm font-bold">
                          {study.category}
                        </span>
                      </motion.div>

                      {/* Quick stats overlay */}
                      <motion.div
                        className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-white">
                            <div className="text-2xl font-bold">{study.year}</div>
                            <div className="text-sm opacity-80">{study.client}</div>
                          </div>
                          <motion.button
                            className="w-12 h-12 bg-[#F5E7D3] text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                            whileHover={{ rotate: 45 }}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 space-y-8">
                    <div>
                      <motion.h2
                        className="text-3xl md:text-4xl font-black mb-4 text-[#F5E7D3] hover:text-white transition-colors duration-300"
                        whileHover={{ x: 10 }}
                      >
                        {study.title}
                      </motion.h2>
                      <p className="text-lg text-[#484440] font-bold mb-4">
                        {study.subtitle}
                      </p>
                      <p className="text-[#F5E7D3]/80 leading-relaxed text-lg">
                        {study.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-sm font-bold text-[#F5E7D3]/80 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {study.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="bg-[#1D1C1C]/50 border border-[#484440]/30 text-[#F5E7D3] px-4 py-2 rounded-full text-sm font-medium hover:border-[#F5E7D3]/50 transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: techIndex * 0.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Results */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-sm font-bold text-[#F5E7D3]/80 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Key Results
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {study.results.map((result, resultIndex) => (
                          <motion.div
                            key={resultIndex}
                            className="bg-[#1D1C1C]/30 border border-[#484440]/30 p-4 rounded-2xl group hover:border-[#F5E7D3]/50 transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: resultIndex * 0.1 + 0.3 }}
                          >
                            <div className="flex items-start gap-3">
                              <TrendingUp className="w-5 h-5 text-[#484440] group-hover:text-[#F5E7D3] transition-colors duration-300 mt-0.5 flex-shrink-0" />
                              <span className="text-[#F5E7D3]/80 group-hover:text-[#F5E7D3] transition-colors duration-300 text-sm">
                                {result}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Client Info & CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-[#484440]/30">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-[#F5E7D3]/80">
                          <Users className="w-4 h-4" />
                          <span>{study.client}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#F5E7D3]/80">
                          <Calendar className="w-4 h-4" />
                          <span>{study.year}</span>
                        </div>
                      </div>

                      <motion.button
                        className="group flex items-center gap-3 bg-[#F5E7D3] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Full Case Study
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Process Overview Section */}
        <section className="py-32 px-4 bg-[#1D1C1C]/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Our <span className="text-[#484440]">Methodology</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Every successful project follows our proven framework for delivering exceptional results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Research & Analysis",
                  description: "Deep dive into market research, user behavior, and competitive analysis",
                  icon: Target,
                  gradient: "from-purple-500/20 to-pink-500/20"
                },
                {
                  number: "02",
                  title: "Strategy Development",
                  description: "Crafting comprehensive strategies aligned with business objectives",
                  icon: BarChart3,
                  gradient: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  number: "03",
                  title: "Implementation",
                  description: "Executing the strategy with precision and attention to detail",
                  icon: Zap,
                  gradient: "from-green-500/20 to-emerald-500/20"
                },
                {
                  number: "04",
                  title: "Optimization",
                  description: "Continuous monitoring and improvement based on real data",
                  icon: TrendingUp,
                  gradient: "from-orange-500/20 to-red-500/20"
                }
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  className={`relative bg-gradient-to-br ${step.gradient} backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F5E7D3]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 text-center">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <motion.div
                        className="w-14 h-14 bg-[#1D1C1C] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <step.icon className="w-7 h-7 text-[#F5E7D3]" />
                      </motion.div>
                      <span className="text-3xl font-black text-[#484440] group-hover:text-[#F5E7D3] transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-[#F5E7D3]/70 text-sm leading-relaxed group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Client <span className="text-[#484440]">Success Stories</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80">
                Hear from the clients behind our most successful projects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Mkronix transformed our digital presence completely. The results exceeded our expectations by 300%.",
                  author: "Sarah Johnson",
                  role: "CEO, TechStart Inc",
                  project: "Digital Platform Redesign"
                },
                {
                  quote: "Their strategic approach and attention to detail helped us achieve unprecedented user engagement.",
                  author: "Michael Chen",
                  role: "Product Manager, InnovateCorp",
                  project: "UX Optimization"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-[#1D1C1C]/50 backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F5E7D3]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    <div className="text-4xl text-[#484440] mb-4">"</div>
                    <p className="text-[#F5E7D3]/90 text-lg mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {testimonial.quote}
                    </p>
                    <div className="border-t border-[#484440]/30 pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                            {testimonial.author}
                          </div>
                          <div className="text-[#F5E7D3]/60 text-sm">
                            {testimonial.role}
                          </div>
                        </div>
                        <div className="text-[#484440] text-sm font-medium">
                          {testimonial.project}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default CaseStudies;