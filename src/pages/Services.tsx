
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Search, Smartphone, Globe, Zap } from 'lucide-react';

const Services: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
      features: ["React & Next.js", "E-commerce Solutions", "Custom CMS", "Performance Optimization"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that captivate users and drive engagement through thoughtful user experience.",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      icon: Search,
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns that boost your online presence and drive measurable results.",
      features: ["SEO Optimization", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver exceptional performance across all devices.",
      features: ["iOS & Android", "React Native", "App Store Optimization", "Push Notifications"]
    },
    {
      icon: Globe,
      title: "Brand Identity",
      description: "Comprehensive brand identity solutions that establish your unique presence in the digital landscape.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your digital platforms with advanced optimization techniques for maximum efficiency.",
      features: ["Core Web Vitals", "Load Time Optimization", "Mobile Optimization", "SEO Enhancement"]
    }
  ];

  const process = [
    { step: "01", title: "Discovery", desc: "Understanding your vision, goals, and target audience" },
    { step: "02", title: "Strategy", desc: "Crafting a comprehensive plan tailored to your needs" },
    { step: "03", title: "Design", desc: "Creating stunning visuals and user experiences" },
    { step: "04", title: "Development", desc: "Building robust, scalable solutions" },
    { step: "05", title: "Launch", desc: "Deploying your project with ongoing support" }
  ];

  return (
    <>
      <Helmet>
        <title>Services - Mkronix | Web Design & Development Agency India</title>
        <meta name="description" content="Comprehensive digital services including web development, UI/UX design, mobile apps, and digital marketing. Transform your business with Mkronix creative solutions." />
        <meta name="keywords" content="web development India, UI UX design, mobile app development, digital marketing, SEO services, brand identity design" />
        <meta property="og:title" content="Digital Services - Mkronix Creative Agency" />
        <meta property="og:description" content="From web development to digital marketing, explore our comprehensive range of creative digital services." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/services" />
      </Helmet>

      <main className="bg-darkBg text-darkText font-boska overflow-x-hidden">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div ref={heroRef} className="max-w-6xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-boska-black mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our <span className="text-lightText">Services</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-darkText80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Comprehensive digital solutions crafted to elevate your brand and drive meaningful growth in the digital landscape.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-darkText20 p-8 rounded-3xl hover:bg-darkText60 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <service.icon className="w-16 h-16 mb-6 text-lightText group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-boska-bold mb-4">{service.title}</h3>
                  <p className="text-darkText80 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-darkText60 flex items-center">
                        <span className="w-2 h-2 bg-lightText rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-darkText20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 
              className="text-4xl md:text-6xl font-boska-bold text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Process
            </motion.h2>
            <div className="grid md:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-lightText flex items-center justify-center text-darkBg font-boska-bold text-2xl">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-boska-bold mb-3">{item.title}</h3>
                  <p className="text-darkText80 text-sm">{item.desc}</p>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-darkText60 transform -translate-y-1/2"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.h2 
              className="text-4xl md:text-6xl font-boska-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Digital Presence?
            </motion.h2>
            <motion.p 
              className="text-xl text-darkText80 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Let's discuss your project and create something extraordinary together.
            </motion.p>
            <motion.button
              className="bg-lightText text-darkBg px-12 py-4 rounded-full text-lg font-boska-bold hover:bg-lightText80 transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
