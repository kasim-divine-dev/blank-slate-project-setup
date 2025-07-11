
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
        <title>Our Projects | Mkronix - Creative Design Agency</title>
        <meta name="description" content="Explore our portfolio of innovative design projects. From architecture to digital solutions, discover how Mkronix transforms ideas into reality." />
        <meta name="keywords" content="design projects, portfolio, architecture, digital design, creative agency, mkronix projects" />
        <meta property="og:title" content="Our Projects | Mkronix - Creative Design Agency" />
        <meta property="og:description" content="Explore our portfolio of innovative design projects and creative solutions." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/projects" />
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
                  className={`project-card group relative overflow-hidden rounded-2xl ${
                    index === 0 || index === 3 ? 'md:aspect-[4/3]' : 'md:aspect-[4/3]'
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
                    className={`w-8 h-8 rounded-full text-sm transition-colors ${
                      index === 0 
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
