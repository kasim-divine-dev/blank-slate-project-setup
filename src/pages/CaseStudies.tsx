
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, TrendingUp, Users, Award } from 'lucide-react';
import { caseStudiesData } from '../data/caseStudiesData';

gsap.registerPlugin(ScrollTrigger);

const CaseStudies: React.FC = () => {
  useGSAP(() => {
    gsap.fromTo(
      '.case-study-card',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.case-studies-container',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  return (
    <>
      <Helmet>
        <title>Case Studies | Mkronix - Success Stories & Project Results</title>
        <meta name="description" content="Dive deep into our successful projects and discover the impact of our creative solutions. Real results, real stories." />
        <meta name="keywords" content="case studies, project results, success stories, design impact, creative solutions, mkronix portfolio" />
        <meta property="og:title" content="Case Studies | Mkronix - Success Stories" />
        <meta property="og:description" content="Explore detailed case studies showcasing our creative solutions and their real-world impact." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/case-studies" />
      </Helmet>

      <div className="min-h-screen bg-darkBg text-darkText">
        {/* Hero Section */}
        <motion.section
          className="pt-32 pb-16 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Case <span className="text-darkText80">Studies</span>
            </h1>
            <p className="text-xl md:text-2xl text-darkText80 max-w-3xl mx-auto leading-relaxed">
              Deep dive into our most impactful projects and discover how we transform challenges into success stories
            </p>
          </div>
        </motion.section>

        {/* Case Studies */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto case-studies-container">
            {caseStudiesData.map((study, index) => (
              <motion.article
                key={study.id}
                className={`case-study-card mb-20 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex flex-col lg:flex gap-12 items-center`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Image Section */}
                <div className="lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-darkText text-darkBg px-3 py-1 rounded-full text-sm font-medium">
                        {study.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-darkText">
                      {study.title}
                    </h2>
                    <p className="text-lg text-darkText80 mb-4">
                      {study.subtitle}
                    </p>
                    <p className="text-darkText60 leading-relaxed">
                      {study.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-darkText80 mb-2 uppercase tracking-wider">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-darkText20 text-darkText px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <h4 className="text-sm font-semibold text-darkText80 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Key Results
                    </h4>
                    <ul className="space-y-2">
                      {study.results.map((result, resultIndex) => (
                        <li
                          key={resultIndex}
                          className="flex items-center gap-2 text-darkText60"
                        >
                          <Award className="w-4 h-4 text-darkText80 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-darkText20">
                    <div className="flex items-center gap-2 text-sm text-darkText80">
                      <Users className="w-4 h-4" />
                      <span>{study.client}</span>
                    </div>
                    <div className="text-sm text-darkText80">
                      {study.year}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className="flex items-center gap-2 bg-darkText text-darkBg px-6 py-3 rounded-full font-semibold hover:bg-darkText80 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Full Case Study
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="py-20 px-4 bg-darkText20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-darkText">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-darkText80 mb-8">
              Let's work together to achieve remarkable results for your next project
            </p>
            <motion.button
              className="bg-darkText text-darkBg px-8 py-4 rounded-full font-semibold text-lg hover:bg-darkText80 transition-colors duration-300"
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

export default CaseStudies;
