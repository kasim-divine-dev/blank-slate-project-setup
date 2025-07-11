
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { projectsData } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  useGSAP(() => {
    gsap.fromTo(
      '.project-card',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Our Portfolio | MkRonix - 300+ Successful Web Development & Design Projects India</title>
        <meta name="description" content="Explore MkRonix's portfolio of 300+ successful projects. Stunning websites, mobile apps, UI/UX designs, and digital marketing campaigns across various industries in India and globally." />

        {/* Enhanced Keywords */}
        <meta name="keywords" content="mkronix portfolio, web development projects India, UI UX design portfolio, mobile app projects, digital marketing case studies, website design examples, creative agency work, project showcase India, successful digital projects, client work portfolio, design agency projects Mumbai, web development showcase" />

        {/* Enhanced Open Graph */}
        <meta property="og:title" content="Portfolio | MkRonix - 300+ Successful Digital Projects & Creative Work" />
        <meta property="og:description" content="Discover our award-winning portfolio of web development, design, and digital marketing projects. See how we've helped 150+ clients achieve their digital goals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mkronix.com/projects" />
        <meta property="og:image" content="https://mkronix.com/assets/portfolio-showcase-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MkRonix Portfolio - Web Development and Design Projects" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="MkRonix" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | MkRonix - 300+ Successful Digital Projects" />
        <meta name="twitter:description" content="Explore our award-winning portfolio of web development, UI/UX design, and digital marketing projects across diverse industries." />
        <meta name="twitter:image" content="https://mkronix.com/assets/portfolio-twitter.jpg" />
        <meta name="twitter:image:alt" content="MkRonix Creative Portfolio Showcase" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mkronix.com/projects" />

        {/* Additional SEO Meta */}
        <meta name="author" content="MkRonix Digital Solutions" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="revisit-after" content="7 days" />

        {/* Portfolio Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": "MkRonix Portfolio",
            "description": "A collection of 300+ successful digital projects including web development, UI/UX design, mobile applications, and digital marketing campaigns",
            "creator": {
              "@type": "Organization",
              "name": "MkRonix Digital Solutions",
              "url": "https://mkronix.com"
            },
            "dateCreated": "2020-01-01",
            "dateModified": "2025-01-11",
            "genre": ["Web Development", "UI/UX Design", "Mobile Development", "Digital Marketing"],
            "keywords": "portfolio, web development, UI/UX design, mobile apps, digital marketing, creative projects",
            "inLanguage": "en-IN",
            "workExample": [
              {
                "@type": "CreativeWork",
                "name": "E-commerce Platform Development",
                "description": "Custom e-commerce solution with advanced features and responsive design",
                "genre": "Web Development",
                "dateCreated": "2024"
              },
              {
                "@type": "CreativeWork",
                "name": "Mobile Banking App UI/UX",
                "description": "User-friendly mobile banking application design with seamless user experience",
                "genre": "UI/UX Design",
                "dateCreated": "2024"
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
                "name": "Portfolio",
                "item": "https://mkronix.com/projects"
              }
            ]
          })}
        </script>

        {/* ItemList Schema for Projects */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "MkRonix Project Portfolio",
            "description": "Featured projects showcasing our expertise in web development, design, and digital marketing",
            "numberOfItems": 300,
            "itemListElement": [
              {
                "@type": "CreativeWork",
                "position": 1,
                "name": "E-commerce Redesign Project",
                "description": "Complete redesign and development of e-commerce platform with 150% increase in conversions",
                "genre": "Web Development",
                "creator": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions"
                }
              },
              {
                "@type": "CreativeWork",
                "position": 2,
                "name": "Mobile App UI/UX Design",
                "description": "Award-winning mobile application design with focus on user experience and accessibility",
                "genre": "UI/UX Design",
                "creator": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions"
                }
              }
            ]
          })}
        </script>

        {/* FAQ Schema for Portfolio */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How many projects has MkRonix completed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix has successfully completed over 300 projects across various industries including web development, UI/UX design, mobile applications, and digital marketing campaigns."
                }
              },
              {
                "@type": "Question",
                "name": "What types of projects does MkRonix specialize in?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We specialize in custom web development, responsive website design, mobile app development, e-commerce platforms, UI/UX design, digital marketing campaigns, and brand identity projects."
                }
              },
              {
                "@type": "Question",
                "name": "Can I see detailed case studies of MkRonix projects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide detailed case studies showcasing our process, challenges, solutions, and results for selected projects. Visit our case studies section for in-depth project analysis."
                }
              },
              {
                "@type": "Question",
                "name": "What industries has MkRonix worked with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We've worked across diverse industries including technology, healthcare, e-commerce, education, real estate, finance, hospitality, and many more sectors across India and internationally."
                }
              }
            ]
          })}
        </script>

        {/* Portfolio Statistics Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": "MkRonix Portfolio Statistics",
            "description": "Performance metrics and statistics from our project portfolio",
            "creator": {
              "@type": "Organization",
              "name": "MkRonix Digital Solutions"
            },
            "measurementTechnique": "Portfolio Analysis",
            "variableMeasured": [
              {
                "@type": "PropertyValue",
                "name": "Projects Completed",
                "value": "300+",
                "description": "Total number of successful projects delivered"
              },
              {
                "@type": "PropertyValue",
                "name": "Client Satisfaction Rate",
                "value": "95%",
                "description": "Percentage of satisfied clients"
              },
              {
                "@type": "PropertyValue",
                "name": "Industries Served",
                "value": "25+",
                "description": "Number of different industries we've worked with"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-black text-[#F5E7D3]">
        {/* Hero Section */}
        <motion.section
          className="pt-32 pb-16 px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              className="mb-16"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-sm text-[#F5E7D3]/60 mb-4 uppercase tracking-wider">Our Work</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Our Projects
              </h1>
              <p className="text-lg text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Learn more about the projects and the team behind it
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {projectsData.slice(0, 4).map((project, index) => (
                <motion.article
                  key={project.id}
                  className={`project-card group relative overflow-hidden rounded-2xl ${index === 0 || index === 3 ? 'md:aspect-[4/3]' : 'md:aspect-[4/3]'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span>{project.category}</span>
                          <span>•</span>
                          <span>{project.year}</span>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4">
              <button className="flex items-center gap-2 text-[#F5E7D3]/60 hover:text-[#F5E7D3] transition-colors">
                <ArrowUpRight className="w-4 h-4 rotate-180" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page, index) => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded-full text-sm transition-colors ${index === 0
                      ? 'bg-white text-black'
                      : 'text-[#F5E7D3]/60 hover:text-[#F5E7D3]'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-2 text-[#F5E7D3]/60 hover:text-[#F5E7D3] transition-colors">
                Next
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <motion.section
          className="py-20 px-4 bg-[#1D1C1C]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Join 2,000+ subscribers
                </h2>
                <p className="text-[#F5E7D3]/80">
                  Stay in the loop with everything you need to know.
                </p>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-80 px-4 py-3 bg-white text-black rounded-full placeholder:text-gray-500 focus:outline-none"
                />
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <p className="text-xs text-[#F5E7D3]/60 mt-4">
              We care about your data in our{' '}
              <a href="#" className="underline hover:no-underline">
                privacy policy
              </a>
            </p>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Projects;
