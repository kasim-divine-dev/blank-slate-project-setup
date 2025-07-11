
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
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
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

      <div className="min-h-screen bg-lightBg text-lightText">
        {/* Hero Section */}
        <motion.section
          className="pt-32 pb-16 px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                Our <span className="text-lightText80">Projects</span>
              </h1>
              <p className="text-xl md:text-2xl text-lightText80 max-w-3xl mx-auto leading-relaxed">
                Transforming visions into reality through innovative design and creative excellence
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="project-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-lightText text-lightBg px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-lightText group-hover:text-lightText80 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-lightText60 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-lightText80">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{project.client}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-lightText">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-lightText80 mb-8">
              Let's collaborate to bring your vision to life with innovative design solutions
            </p>
            <motion.button
              className="bg-lightText text-lightBg px-8 py-4 rounded-full font-semibold text-lg hover:bg-lightText80 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default Projects;
