
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Target, Award, Globe } from 'lucide-react';

const AboutUs: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const teamMembers = [
    { name: "Arjun Sharma", role: "Creative Director", image: "/api/placeholder/300/300" },
    { name: "Priya Patel", role: "Lead Designer", image: "/api/placeholder/300/300" },
    { name: "Rajesh Kumar", role: "Development Head", image: "/api/placeholder/300/300" },
    { name: "Sneha Gupta", role: "Strategy Manager", image: "/api/placeholder/300/300" }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Mkronix | Creative Digital Agency India</title>
        <meta name="description" content="Mkronix is a leading creative digital agency in India specializing in web design, development, and digital marketing solutions for businesses worldwide." />
        <meta name="keywords" content="creative agency India, digital agency, web design India, creative studio, digital marketing agency" />
        <meta property="og:title" content="About Mkronix - Creative Digital Agency" />
        <meta property="og:description" content="Discover our story, team, and passion for creating exceptional digital experiences." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
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
              We Are <span className="text-lightText">Mkronix</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-darkText80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A passionate creative digital agency based in India, crafting extraordinary digital experiences for brands worldwide. We blend creativity with technology to deliver solutions that inspire and engage.
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 bg-darkText20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-4">
                <div className="counter text-4xl md:text-6xl font-boska-bold text-lightText" data-target="150">0</div>
                <p className="text-darkText60">Projects Completed</p>
              </div>
              <div className="space-y-4">
                <div className="counter text-4xl md:text-6xl font-boska-bold text-lightText" data-target="50">0</div>
                <p className="text-darkText60">Happy Clients</p>
              </div>
              <div className="space-y-4">
                <div className="counter text-4xl md:text-6xl font-boska-bold text-lightText" data-target="5">0</div>
                <p className="text-darkText60">Years Experience</p>
              </div>
              <div className="space-y-4">
                <div className="counter text-4xl md:text-6xl font-boska-bold text-lightText" data-target="24">0</div>
                <p className="text-darkText60">Countries Served</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 
              className="text-4xl md:text-6xl font-boska-bold text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Users, title: "Collaboration", desc: "We work together with our clients as partners in success." },
                { icon: Target, title: "Precision", desc: "Every pixel matters, every interaction is carefully crafted." },
                { icon: Award, title: "Excellence", desc: "We strive for perfection in everything we create." },
                { icon: Globe, title: "Global Impact", desc: "Creating solutions that resonate across cultures." }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-darkText20 p-8 rounded-2xl text-center hover:bg-darkText60 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <value.icon className="w-12 h-12 mx-auto mb-6 text-lightText group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-boska-bold mb-4">{value.title}</h3>
                  <p className="text-darkText80">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-darkText20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 
              className="text-4xl md:text-6xl font-boska-bold text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-lightText opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-boska-bold mb-2">{member.name}</h3>
                  <p className="text-lightText">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutUs;
