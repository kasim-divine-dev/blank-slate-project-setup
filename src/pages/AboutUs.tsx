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
      <Helmet>
        <title>About Us - Mkronix | Creative Digital Agency India</title>
        <meta name="description" content="Mkronix is a leading creative digital agency in India specializing in web design, development, and digital marketing solutions for businesses worldwide." />
        <meta name="keywords" content="creative agency India, digital agency, web design India, creative studio, digital marketing agency" />
        <meta property="og:title" content="About Mkronix - Creative Digital Agency" />
        <meta property="og:description" content="Discover our story, team, and passion for creating exceptional digital experiences." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
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