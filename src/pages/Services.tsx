import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Award, Target, Code, Palette, Zap, Users } from 'lucide-react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ServicesHero } from '../components/Services/ServicesHero';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { ServicesList } from '@/components/Services/ServicesList';

const Services: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
      <DynamicSEO pageName="services" />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h1>Digital Services | MkRonix - Web Development, UI/UX Design, Mobile Apps & Digital Marketing India</h1>
        <p>Comprehensive digital services by MkRonix India including custom web development, stunning UI/UX design, mobile app development, and results-driven digital marketing. 20+ successful projects completed.</p>
        <span>Services: Web Development (React, Next.js, Node.js), UI/UX Design (Figma, Adobe XD), Mobile Development (React Native, Flutter), Digital Marketing (SEO, PPC, Social Media)</span>
        <span>Pricing: Web Development from ₹50,000, UI/UX Design from ₹30,000, Mobile Apps from ₹80,000, Digital Marketing from ₹25,000/month</span>
        <span>Industries: E-commerce, Healthcare, Education, Finance, Startups, Enterprise</span>
        <span>Technologies: React, Next.js, Node.js, TypeScript, Figma, React Native, Flutter, Google Analytics, Facebook Ads</span>
        <span>Process: Discovery & Strategy, Design & Prototype, Development & Testing, Launch & Optimize</span>
        <span>Location: Gujarat, India | Serving: Mumbai, Delhi, Bangalore, Ahmedabad, Pan India</span>
      </div>

      <div className="text-[#F5E7D3] font-boska overflow-x-hidden">
        <ServicesHero />
        <ServicesList />

        {/* Work Process Section */}
        <section className="px-4 py-32 ">
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
                Why Choose <span className="text-[#484440]">MkRonix?</span>
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
                  stat: "10+ Experts"
                },
                {
                  icon: Award,
                  title: "Proven Results",
                  description: "We've helped hundreds of businesses & startups achieve their digital goals with measurable success.",
                  stat: "20+ Projects"
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
        <section className="py-32 px-4">
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
                <motion.a
                  href='/contact'
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
                </motion.a>

                <motion.a
                  href='/projects'
                  className="group border-2 border-[#484440] text-[#F5E7D3] px-8 py-4 rounded-full font-bold hover:border-[#F5E7D3] hover:bg-[#F5E7D3] hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    View Our Work
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;