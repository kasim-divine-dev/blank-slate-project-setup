import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Award, Code, Palette, Play, Smartphone, Target, TrendingUp, Users, Zap } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import BoxesLayer from '../components/BoxesLayer/BoxesLayer';
import { DrawCircleText } from '../components/DrawCircleText/DrawCircleText';

const Services: React.FC = () => {
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
        y: -20,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Service card stagger animation
    gsap.utils.toArray('.service-card').forEach((card: any, index) => {
      gsap.fromTo(card, {
        y: 100,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 80%"
        }
      });
    });

    // Process cards animation
    gsap.utils.toArray('.process-card').forEach((card: any, index) => {
      gsap.fromTo(card, {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      number: "01",
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies. From responsive designs to complex e-commerce platforms.",
      image: "/images/carousel/architect.png",
      icon: Code,
      technologies: ["React", "Next.js", "Node.js", "TypeScript"],
      gradient: "from-purple-500/20 to-pink-500/20",
      projects: "120+"
    },
    {
      number: "02",
      title: "UI/UX Design",
      description: "User-centered design solutions that create meaningful experiences. From wireframes to interactive prototypes.",
      image: "/images/carousel/architect.png",
      icon: Palette,
      technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
      gradient: "from-blue-500/20 to-cyan-500/20",
      projects: "85+"
    },
    {
      number: "03",
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences on all devices.",
      image: "/images/carousel/architect.png",
      icon: Smartphone,
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
      gradient: "from-green-500/20 to-emerald-500/20",
      projects: "65+"
    },
    {
      number: "04",
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns that drive growth and build brand awareness across all platforms.",
      image: "/images/carousel/architect.png",
      icon: TrendingUp,
      technologies: ["SEO", "PPC", "Social Media", "Analytics"],
      gradient: "from-orange-500/20 to-red-500/20",
      projects: "200+"
    }
  ];

  const workProcess = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We start by understanding your business, goals, and target audience. Through comprehensive research and analysis, we develop a strategic roadmap for success.",
      icon: Target,
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      number: "02",
      title: "Design & Prototype",
      description: "Our creative team brings your vision to life through innovative designs and interactive prototypes, ensuring every detail aligns with your brand.",
      icon: Palette,
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      number: "03",
      title: "Development & Testing",
      description: "Using cutting-edge technologies, we build robust solutions while maintaining the highest quality standards through rigorous testing processes.",
      icon: Code,
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      number: "04",
      title: "Launch & Optimize",
      description: "We ensure a smooth launch and provide ongoing support, continuously optimizing performance based on real-world data and user feedback.",
      icon: Zap,
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <>
// Enhanced SEO for Services.tsx - Replace existing Helmet content

      <Helmet>
        {/* Primary Meta Tags */}
        <title>Digital Services | MkRonix - Web Development, UI/UX Design, Mobile Apps & Digital Marketing India</title>
        <meta name="description" content="Comprehensive digital services by MkRonix India: Custom web development, stunning UI/UX design, mobile app development, and results-driven digital marketing. 300+ successful projects. Free consultation available." />

        {/* Enhanced Keywords */}
        <meta name="keywords" content="digital services India, web development services Mumbai, UI UX design agency, mobile app development company, digital marketing services, custom website development, responsive web design, ecommerce development, SEO services India, PPC management, social media marketing, brand identity design, graphic design services, digital transformation, technology consulting, software development India" />

        {/* Enhanced Open Graph */}
        <meta property="og:title" content="Digital Services | MkRonix - Complete Web Development & Design Solutions India" />
        <meta property="og:description" content="Transform your business with MkRonix's comprehensive digital services. Expert web development, UI/UX design, mobile apps, and digital marketing. 300+ successful projects across India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mkronix.com/services" />
        <meta property="og:image" content="https://mkronix.com/assets/services-portfolio-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MkRonix Digital Services - Web Development, Design & Marketing" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="MkRonix" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Services | MkRonix - Web Development & Design India" />
        <meta name="twitter:description" content="Comprehensive digital solutions: Web development, UI/UX design, mobile apps & digital marketing. 300+ successful projects." />
        <meta name="twitter:image" content="https://mkronix.com/assets/services-twitter.jpg" />
        <meta name="twitter:image:alt" content="MkRonix Digital Services Portfolio" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mkronix.com/services" />

        {/* Additional SEO Meta */}
        <meta name="author" content="MkRonix Digital Solutions" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="revisit-after" content="3 days" />

        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Digital Services by MkRonix",
            "description": "Comprehensive digital solutions including web development, UI/UX design, mobile app development, and digital marketing services.",
            "provider": {
              "@type": "Organization",
              "name": "MkRonix Digital Solutions",
              "url": "https://mkronix.com"
            },
            "serviceType": "Digital Marketing and Web Development",
            "areaServed": {
              "@type": "Country",
              "name": "India"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digital Services Portfolio",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom websites and web applications built with cutting-edge technologies like React, Next.js, and Node.js",
                    "category": "Web Development",
                    "provider": {
                      "@type": "Organization",
                      "name": "MkRonix Digital Solutions"
                    }
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "priceCurrency": "INR",
                    "price": "50000",
                    "description": "Starting from ₹50,000"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX Design",
                    "description": "User-centered design solutions that create meaningful experiences from wireframes to interactive prototypes",
                    "category": "Design",
                    "provider": {
                      "@type": "Organization",
                      "name": "MkRonix Digital Solutions"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development",
                    "description": "Native and cross-platform mobile applications using React Native, Flutter, Swift, and Kotlin",
                    "category": "Mobile Development",
                    "provider": {
                      "@type": "Organization",
                      "name": "MkRonix Digital Solutions"
                    }
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Marketing",
                    "description": "Strategic digital marketing campaigns including SEO, PPC, social media marketing, and analytics",
                    "category": "Digital Marketing",
                    "provider": {
                      "@type": "Organization",
                      "name": "MkRonix Digital Solutions"
                    }
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5"
            }
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
                "name": "Services",
                "item": "https://mkronix.com/services"
              }
            ]
          })}
        </script>

        {/* FAQ Schema for Services */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What web development services does MkRonix offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix offers comprehensive web development services including custom websites, e-commerce platforms, web applications, responsive design, and CMS development using technologies like React, Next.js, Node.js, and TypeScript."
                }
              },
              {
                "@type": "Question",
                "name": "How much do MkRonix digital services cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our services start from ₹50,000 for basic websites, with custom pricing based on project complexity and requirements. We offer free consultations to provide accurate quotes for your specific needs."
                }
              },
              {
                "@type": "Question",
                "name": "Does MkRonix provide ongoing support after project completion?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide comprehensive ongoing support including maintenance, updates, security monitoring, and optimization services to ensure your digital solutions continue performing at their best."
                }
              },
              {
                "@type": "Question",
                "name": "What makes MkRonix different from other digital agencies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix combines creativity with cutting-edge technology, offers transparent pricing, maintains 95% client satisfaction rate, and provides end-to-end digital solutions with a proven track record of 300+ successful projects."
                }
              }
            ]
          })}
        </script>

        {/* HowTo Schema for Our Process */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "MkRonix Digital Project Process",
            "description": "Our proven 4-step methodology for delivering exceptional digital solutions",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Discovery & Strategy",
                "text": "Understanding your business, goals, and target audience through comprehensive research and analysis to develop a strategic roadmap for success."
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Design & Prototype",
                "text": "Creating innovative designs and interactive prototypes, ensuring every detail aligns with your brand and user expectations."
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Development & Testing",
                "text": "Building robust solutions using cutting-edge technologies while maintaining highest quality standards through rigorous testing processes."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Launch & Optimize",
                "text": "Ensuring smooth launch with ongoing support and continuous optimization based on real-world data and user feedback."
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
              background: `radial-gradient(circle at 25% 75%, rgba(72, 68, 64, 0.4), transparent 50%),
                         radial-gradient(circle at 75% 25%, rgba(72, 68, 64, 0.3), transparent 50%)`
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
                normalText="We craft digital "
                normalText2="that drive results and inspire growth."
                circleText="solutions"
              />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              From concept to execution, we deliver comprehensive digital services that transform your vision into powerful, user-centric solutions.
            </motion.p>
          </div>
        </motion.section>

        {/* Hero Video Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 aspect-video group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
              <motion.div
                className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className="w-20 h-20 bg-[#F5E7D3] text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-8 h-8 ml-1" />
                </motion.button>
              </div>

              {/* Floating elements */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#F5E7D3]/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {["Design", "Development", "Digital Marketing", "SEO", "Branding", "Strategy"].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-6 py-3 bg-[#1D1C1C]/50 backdrop-blur-sm border border-[#484440]/30 rounded-full text-sm font-medium hover:border-[#F5E7D3]/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Our <span className="text-[#484440]">Services</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Comprehensive digital solutions tailored to your business needs
              </p>
            </motion.div>

            <div className="space-y-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.number}
                  className={`service-card group relative bg-gradient-to-br ${service.gradient} backdrop-blur-sm border border-[#484440]/30 rounded-3xl overflow-hidden hover:border-[#F5E7D3]/50 transition-all duration-500`}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F5E7D3]/5 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 p-8 flex items-center justify-between">
                    <div className="flex items-center gap-8 flex-1">
                      <motion.div
                        className="flex items-center gap-6"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-5xl font-black text-[#484440] group-hover:text-[#F5E7D3] transition-colors duration-300">
                          {service.number}
                        </span>
                        <div className="w-16 h-16 bg-[#1D1C1C] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-8 h-8 text-[#F5E7D3]" />
                        </div>
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-[#F5E7D3]/70 mb-4 max-w-2xl group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-6">
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, techIndex) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-[#1D1C1C]/50 text-[#F5E7D3]/80 rounded-full text-sm border border-[#484440]/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="text-sm text-[#F5E7D3]/60">
                            {service.projects} projects
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-20 h-20 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#F5E7D3]" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Process Section */}
        <section className="px-4 py-32 bg-[#1D1C1C]/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Our <span className="text-[#484440]">Process</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                A proven methodology that delivers exceptional results every time
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workProcess.map((process, index) => (
                <motion.div
                  key={process.number}
                  className={`process-card relative bg-gradient-to-br ${process.gradient} backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F5E7D3]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className="w-14 h-14 bg-[#1D1C1C] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <process.icon className="w-7 h-7 text-[#F5E7D3]" />
                      </motion.div>
                      <span className="text-3xl font-black text-[#484440] group-hover:text-[#F5E7D3] transition-colors duration-300">
                        {process.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                      {process.title}
                    </h3>
                    <p className="text-[#F5E7D3]/70 text-sm leading-relaxed group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                      {process.description}
                    </p>

                    <motion.div
                      className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-[#F5E7D3]" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-4 py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Why Choose <span className="text-[#484440]">Mkronix?</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                We're not just service providers – we're your strategic partners in digital success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Expert Team",
                  description: "Our skilled professionals bring years of experience and cutting-edge expertise to every project.",
                  stat: "50+ Experts"
                },
                {
                  icon: Award,
                  title: "Proven Results",
                  description: "We've helped hundreds of businesses achieve their digital goals with measurable success.",
                  stat: "300+ Projects"
                },
                {
                  icon: Zap,
                  title: "Fast Delivery",
                  description: "We deliver high-quality solutions on time, every time, without compromising on excellence.",
                  stat: "2x Faster"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="relative bg-[#1D1C1C]/50 backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#484440]/50 to-transparent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-10 h-10 text-[#F5E7D3]" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[#F5E7D3]/70 mb-6 group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <motion.div
                    className="text-3xl font-black text-[#484440] group-hover:text-[#F5E7D3] transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {feature.stat}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter/CTA Section */}
        <section className="py-32 px-4 bg-[#1D1C1C]/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Ready to Get <span className="text-[#484440]">Started?</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 mb-12 max-w-2xl mx-auto">
                Let's discuss your project and create something amazing together. Your success is our mission.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <motion.button
                  className="group relative bg-[#F5E7D3] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#484440] to-[#1D1C1C] opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 group-hover:text-[#F5E7D3] transition-colors duration-300 flex items-center gap-2">
                    Start Your Project
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </motion.button>

                <motion.button
                  className="group border-2 border-[#484440] text-[#F5E7D3] px-8 py-4 rounded-full font-bold hover:border-[#F5E7D3] hover:bg-[#F5E7D3] hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    View Our Work
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>

              {/* Newsletter Signup */}
              <motion.div
                className="bg-black/30 backdrop-blur-sm border border-[#484440]/30 rounded-3xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-[#F5E7D3]/80 mb-6">
                  Get insights, tips, and industry updates delivered to your inbox
                </p>

                <div className="flex gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-black/50 border border-[#484440]/50 rounded-2xl text-[#F5E7D3] placeholder:text-[#F5E7D3]/50 focus:border-[#F5E7D3] focus:outline-none transition-all duration-300"
                  />
                  <motion.button
                    className="bg-[#F5E7D3] text-black px-6 py-3 rounded-2xl font-bold hover:bg-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>

                <p className="text-xs text-[#F5E7D3]/60 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;