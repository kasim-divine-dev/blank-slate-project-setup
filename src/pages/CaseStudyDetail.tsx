
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, ExternalLink, Star, Users } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import BoxesLayer from '../components/BoxesLayer/BoxesLayer';
import { DynamicSEO } from '../components/SEO/DynamicSEO';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Mock data - in real app, this would come from API or context
  const caseStudy = {
    id: "eleve-fashion-platform",
    title: "Elevé: Redefining Fashion in the Digital Age",
    subtitle: "The Future of Lifestyle Fashion",
    client: "Elevé Fashion",
    industry: "Fashion & Lifestyle",
    duration: "4 months",
    teamSize: "8 members",
    technologies: ["React", "Node.js", "AI/ML", "Firebase", "Stripe"],
    challenge: "Create an AI-driven fashion platform that personalizes outfit recommendations based on user mood, schedule, and style preferences while maintaining sustainability focus.",
    solution: "Developed a comprehensive platform with AI-powered styling, sustainable fashion marketplace, and real-time trend analysis.",
    results: {
      userEngagement: "+250%",
      conversionRate: "+180%",
      userRetention: "+165%",
      sustainability: "40% sustainable purchases"
    },
    image: "/images/projects/p1.png",
    gallery: [
      "/images/projects/p1.png",
      "/images/projects/p2.png",
      "/images/projects/p3.png",
      "/images/projects/p4.png"
    ],
    testimonial: {
      quote: "MkRonix transformed our vision into reality. The AI-powered platform has revolutionized how our customers discover and purchase fashion.",
      author: "Sarah Chen",
      position: "CEO, Elevé Fashion",
      rating: 5
    }
  };

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
  }, []);

  return (
    <>
      <DynamicSEO 
        pageName="caseStudyDetail" 
        customData={{
          title: `${caseStudy.title} - Case Study | MkRonix`,
          description: `Detailed case study of ${caseStudy.title}. Learn how MkRonix helped ${caseStudy.client} achieve ${caseStudy.results.userEngagement} increase in user engagement through innovative ${caseStudy.industry.toLowerCase()} solutions.`,
          keywords: `${caseStudy.title.toLowerCase()}, ${caseStudy.industry.toLowerCase()} case study, ${caseStudy.technologies.join(', ').toLowerCase()}, user engagement, digital transformation`,
          url: `https://mkronix.com/case-studies/${slug}`,
          image: `https://mkronix.com${caseStudy.image}`,
          articleData: {
            publishedTime: "2024-01-15T08:00:00Z",
            modifiedTime: "2024-01-20T10:30:00Z",
            author: "MkRonix Team",
            section: "Case Studies"
          }
        }}
      />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h1>{caseStudy.title} - Case Study by MkRonix</h1>
        <p>Detailed analysis of {caseStudy.title} project showing {caseStudy.results.userEngagement} increase in user engagement and {caseStudy.results.conversionRate} boost in conversions.</p>
        <span>Client: {caseStudy.client} | Industry: {caseStudy.industry} | Duration: {caseStudy.duration}</span>
        <span>Technologies: {caseStudy.technologies.join(', ')}</span>
        <span>Results: User Engagement {caseStudy.results.userEngagement}, Conversion Rate {caseStudy.results.conversionRate}, User Retention {caseStudy.results.userRetention}</span>
        <span>Challenge: {caseStudy.challenge}</span>
        <span>Solution: {caseStudy.solution}</span>
      </div>

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
              background: `radial-gradient(circle at 30% 70%, rgba(72, 68, 64, 0.4), transparent 50%),
                         radial-gradient(circle at 70% 30%, rgba(72, 68, 64, 0.3), transparent 50%)`
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
                className="flex items-center gap-2 text-[#F5E7D3]/80 hover:text-[#F5E7D3] transition-colors duration-300"
                whileHover={{ x: -5 }}
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Case Studies
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
                {caseStudy.title}
              </h1>
              <p className="text-2xl md:text-3xl text-[#484440] mb-8">
                [ {caseStudy.subtitle} ]
              </p>

              {/* Project Meta */}
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Users, label: "Client", value: caseStudy.client },
                  { icon: Calendar, label: "Duration", value: caseStudy.duration },
                  { icon: Clock, label: "Industry", value: caseStudy.industry },
                  { icon: Star, label: "Team Size", value: caseStudy.teamSize }
                ].map((meta, index) => (
                  <motion.div
                    key={meta.label}
                    className="bg-[#1D1C1C]/50 backdrop-blur-sm border border-[#484440]/30 p-4 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <meta.icon className="w-6 h-6 text-[#484440] mx-auto mb-2" />
                    <p className="text-[#F5E7D3]/60 text-sm mb-1">{meta.label}</p>
                    <p className="font-bold">{meta.value}</p>
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
              className="relative rounded-3xl overflow-hidden aspect-video"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Tech Stack Pills */}
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-black/70 backdrop-blur-sm text-[#F5E7D3] rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="px-4 py-20 bg-[#1D1C1C]/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                className="content-section"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#484440]">
                  The Challenge
                </h2>
                <p className="text-lg leading-relaxed text-[#F5E7D3]/80">
                  {caseStudy.challenge}
                </p>
              </motion.div>

              <motion.div
                className="content-section"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#484440]">
                  Our Solution
                </h2>
                <p className="text-lg leading-relaxed text-[#F5E7D3]/80">
                  {caseStudy.solution}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Measurable <span className="text-[#484440]">Results</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80">
                Data-driven outcomes that exceeded expectations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(caseStudy.results).map(([key, value], index) => (
                <motion.div
                  key={key}
                  className="content-section relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl text-center group hover:border-[#F5E7D3]/50 transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-black text-[#F5E7D3] mb-4 group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {value}
                  </motion.div>
                  <h3 className="text-lg font-bold capitalize text-[#F5E7D3]/80 group-hover:text-[#F5E7D3] transition-colors duration-300">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-4 py-20 bg-[#1D1C1C]/30">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-black text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Project <span className="text-[#484440]">Gallery</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudy.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  className="content-section relative rounded-2xl overflow-hidden aspect-video group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={image}
                    alt={`${caseStudy.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="content-section relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-[#484440]/30 p-12 rounded-3xl text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-6">
                {Array.from({ length: caseStudy.testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <blockquote className="text-2xl md:text-3xl font-medium mb-8 italic text-[#F5E7D3] leading-relaxed">
                "{caseStudy.testimonial.quote}"
              </blockquote>

              <div>
                <p className="text-xl font-bold text-[#F5E7D3] mb-2">
                  {caseStudy.testimonial.author}
                </p>
                <p className="text-[#F5E7D3]/70">
                  {caseStudy.testimonial.position}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-32 bg-[#1D1C1C]/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8">
                Ready for Your <span className="text-[#484440]">Success Story?</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 mb-12">
                Let's create something extraordinary together
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  className="group relative bg-[#F5E7D3] text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
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
                    <ExternalLink className="w-5 h-5" />
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
