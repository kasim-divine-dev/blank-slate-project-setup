import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Sparkles, Zap } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import BoxesLayer from '../components/BoxesLayer/BoxesLayer';
import { DrawCircleText } from '../components/DrawCircleText/DrawCircleText';

const AboutUs: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
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
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Stats counter animation
    if (statsRef.current) {
      const counters = statsRef.current.querySelectorAll('.counter');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        gsap.fromTo(counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
            }
          }
        );
      });
    }

    // Parallax cards
    gsap.utils.toArray('.parallax-card').forEach((card: any, index) => {
      gsap.fromTo(card, {
        y: 100,
        opacity: 0,
        scale: 0.8
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const teamMembers = [
    {
      name: "Arjun Sharma",
      role: "Creative Director",
      image: "/api/placeholder/300/300",
      skills: ["Strategy", "Leadership", "Vision"],
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Priya Patel",
      role: "Lead Designer",
      image: "/api/placeholder/300/300",
      skills: ["UI/UX", "Branding", "Motion"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Rajesh Kumar",
      role: "Development Head",
      image: "/api/placeholder/300/300",
      skills: ["Frontend", "Backend", "DevOps"],
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Sneha Gupta",
      role: "Strategy Manager",
      image: "/api/placeholder/300/300",
      skills: ["Analytics", "Growth", "Marketing"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Innovation",
      desc: "We push boundaries and embrace cutting-edge technologies to create extraordinary solutions.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Code,
      title: "Precision",
      desc: "Every pixel, every line of code matters. We obsess over details to achieve perfection.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Palette,
      title: "Creativity",
      desc: "We blend artistry with functionality to create designs that inspire and engage.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Zap,
      title: "Impact",
      desc: "We create solutions that drive real results and make a lasting difference.",
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <>
// Enhanced SEO for AboutUs.tsx - Add this to your existing Helmet section

      <Helmet>
        {/* Primary Meta Tags */}
        <title>About MkRonix | Leading Creative Digital Agency Team India - Our Story & Mission</title>
        <meta name="description" content="Meet the MkRonix team - India's premier creative digital agency with 5+ years experience, 300+ successful projects, and 50+ expert professionals. Discover our story, values, and passion for digital innovation." />

        {/* Enhanced Keywords */}
        <meta name="keywords" content="about mkronix, creative agency team India, digital agency Mumbai, web development team, UI UX designers India, mobile app developers, digital marketing experts, creative professionals Mumbai, agency story, mkronix mission vision, best digital agency team India, creative studio about us" />

        {/* Enhanced Open Graph */}
        <meta property="og:title" content="About MkRonix | Meet India's Leading Creative Digital Agency Team" />
        <meta property="og:description" content="Discover the passionate team behind MkRonix - 50+ creative professionals delivering exceptional digital solutions across India and worldwide. 300+ successful projects, 5+ years of innovation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mkronix.com/about" />
        <meta property="og:image" content="https://mkronix.com/assets/about-team-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MkRonix Creative Team - Digital Agency India" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="MkRonix" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About MkRonix | Creative Digital Agency Team India" />
        <meta name="twitter:description" content="Meet the passionate team behind 300+ successful digital projects. Discover our story, values, and commitment to creative excellence." />
        <meta name="twitter:image" content="https://mkronix.com/assets/about-team-twitter.jpg" />
        <meta name="twitter:image:alt" content="MkRonix Team - Creative Digital Agency" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mkronix.com/about" />

        {/* Additional SEO Meta */}
        <meta name="author" content="MkRonix Digital Solutions" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="revisit-after" content="7 days" />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MkRonix Digital Solutions",
            "url": "https://mkronix.com",
            "logo": "https://mkronix.com/assets/logo.png",
            "description": "Leading creative digital agency in India with 5+ years experience, 300+ successful projects, and 50+ expert professionals specializing in web development, UI/UX design, and digital marketing.",
            "foundingDate": "2020-01-01",
            "numberOfEmployees": "50-100",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "kadiwala compund",
              "addressLocality": "rasulpur, sidhpur",
              "addressRegion": "Gujarat",
              "postalCode": "384290",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-84-59258801",
              "contactType": "customer service",
              "availableLanguage": ["English", "Hindi"]
            },
            "sameAs": [
              "https://www.facebook.com/mkronix",
              "https://www.linkedin.com/company/mkronix",
              "https://twitter.com/mkronix",
              "https://www.instagram.com/mkronix"
            ],
            "employee": [
              {
                "@type": "Person",
                "name": "Arjun Sharma",
                "jobTitle": "Creative Director",
                "worksFor": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions"
                }
              },
              {
                "@type": "Person",
                "name": "Priya Patel",
                "jobTitle": "Lead Designer",
                "worksFor": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions"
                }
              }
            ],
            "award": [
              "Best Creative Agency India 2024",
              "Top Digital Marketing Company Gujarat 2023"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5"
            }
          })}
        </script>

        {/* AboutPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About MkRonix - Creative Digital Agency",
            "description": "Learn about MkRonix's mission, vision, team, and our journey as India's leading creative digital agency.",
            "url": "https://mkronix.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "MkRonix Digital Solutions"
            },
            "breadcrumb": {
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
                  "name": "About Us",
                  "item": "https://mkronix.com/about"
                }
              ]
            }
          })}
        </script>

        {/* Team Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "MkRonix Team Members",
            "description": "Meet the creative professionals behind MkRonix's success",
            "itemListElement": [
              {
                "@type": "Person",
                "position": 1,
                "name": "Arjun Sharma",
                "jobTitle": "Creative Director",
                "description": "Strategic leader with expertise in creative direction and business development",
                "knowsAbout": ["Strategy", "Leadership", "Vision"],
                "worksFor": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions"
                }
              },
              {
                "@type": "Person",
                "position": 2,
                "name": "Priya Patel",
                "jobTitle": "Lead Designer",
                "description": "Award-winning designer specializing in UI/UX and brand identity",
                "knowsAbout": ["UI/UX", "Branding", "Motion Design"],
                "worksFor": {
                  "@type": "Organization",
                  "name": "MkRonix Digital Solutions"
                }
              }
            ]
          })}
        </script>

        {/* FAQ Schema for About Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long has MkRonix been in business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix has been delivering exceptional digital solutions for over 5 years, with 300+ successful projects and a growing team of 50+ professionals."
                }
              },
              {
                "@type": "Question",
                "name": "What makes MkRonix different from other agencies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix combines creativity with technology, offering comprehensive digital solutions with a proven track record of 95% client satisfaction and measurable business results."
                }
              },
              {
                "@type": "Question",
                "name": "Where is MkRonix located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix is headquartered in Gujarat, India, with team members across multiple cities. We serve clients globally while maintaining strong roots in the Indian market."
                }
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
              background: `radial-gradient(circle at 20% 80%, rgba(72, 68, 64, 0.3), transparent 50%),
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
                normalText="We are the architects of "
                normalText2="experiences that inspire and transform."
                circleText="digital"
              />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              A passionate creative digital agency based in India, crafting extraordinary digital experiences for brands worldwide. We blend creativity with technology to deliver solutions that inspire and engage.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section ref={statsRef} className="relative py-32 px-4 bg-[#1D1C1C]/50">
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#484440] rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 150, label: "Projects Completed", suffix: "+" },
                { value: 50, label: "Happy Clients", suffix: "+" },
                { value: 5, label: "Years Experience", suffix: "" },
                { value: 24, label: "Countries Served", suffix: "" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <div className="counter text-4xl md:text-6xl font-black text-[#F5E7D3] group-hover:text-white transition-colors duration-300" data-target={stat.value}>
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
                  <p className="text-[#F5E7D3]/60 mt-4 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Our Core <span className="text-[#484440]">Values</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                These principles guide every project we undertake and every relationship we build.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className={`parallax-card relative bg-gradient-to-br ${value.gradient} backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500`}
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
                    <motion.div
                      className="w-16 h-16 bg-[#1D1C1C] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="w-8 h-8 text-[#F5E7D3]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-[#F5E7D3]/70 leading-relaxed group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                Meet Our <span className="text-[#484440]">Dream Team</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                The creative minds behind every pixel, every line of code, and every strategic decision.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative overflow-hidden rounded-3xl mb-6">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20 group-hover:opacity-40`}
                      transition={{ duration: 0.3 }}
                    />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-end p-6"
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            className="bg-[#F5E7D3]/20 backdrop-blur-sm text-[#F5E7D3] px-3 py-1 rounded-full text-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: skillIndex * 0.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[#484440] font-medium group-hover:text-[#F5E7D3]/80 transition-colors duration-300">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8">
                Ready to Start Your <span className="text-[#484440]">Journey?</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 mb-12 max-w-2xl mx-auto">
                Let's create something extraordinary together. Your vision combined with our expertise equals magic.
              </p>

              <motion.button
                className="group relative bg-[#F5E7D3] text-black px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#484440] to-[#1D1C1C] opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 group-hover:text-[#F5E7D3] transition-colors duration-300">
                  Let's Work Together
                </span>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;