import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, ExternalLink } from 'lucide-react';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import CommonHeaderText from '../components/CommonHeaderText/CommonHeaderText';
import { caseStudiesData } from '../data/caseStudiesData';

interface CaseStudiesProps {
  isFromHome?: boolean;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ isFromHome = false }) => {
  
  const displayedCaseStudies = isFromHome 
    ? caseStudiesData.filter(study => study.featured).slice(0, 3)
    : caseStudiesData;

  const showFullPage = !isFromHome;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {showFullPage && <DynamicSEO pageName="case-studies" />}
      
      <div className="font-boska relative overflow-x-hidden bg-black text-[#F5E7D3] min-h-screen">
        {showFullPage && (
          <CommonHeaderText text="Case Studies" />
        )}
        
        {!showFullPage && (
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#F5E7D3] mb-6">
                  Case Studies
                </h2>
                <p className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-3xl mx-auto">
                  Explore our success stories and see how we've helped businesses transform their digital presence.
                </p>
              </motion.div>
            </div>
          </section>
        )}

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedCaseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  variants={itemVariants}
                  className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#333] hover:border-[#F5E7D3]/30 transition-all duration-500"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-[#F5E7D3]/10 text-[#F5E7D3] rounded-full text-sm font-medium">
                        {study.category}
                      </span>
                      <div className="flex items-center text-[#F5E7D3]/60 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {study.date}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#F5E7D3] mb-3 group-hover:text-[#F5E7D3]/90 transition-colors">
                      {study.title}
                    </h3>
                    
                    <p className="text-[#F5E7D3]/70 mb-6 line-clamp-3">
                      {study.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-[#F5E7D3]/60 text-sm">
                        <User className="w-4 h-4 mr-1" />
                        {study.client}
                      </div>
                      
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="inline-flex items-center text-[#F5E7D3] hover:text-[#F5E7D3]/80 transition-colors group"
                      >
                        <span className="mr-2">Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {isFromHome && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center mt-16"
              >
                <Link
                  to="/case-studies"
                  className="inline-flex items-center px-8 py-4 bg-[#F5E7D3] text-black rounded-full font-semibold hover:bg-[#F5E7D3]/90 transition-colors group"
                >
                  <span className="mr-2">View All Case Studies</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {showFullPage && (
          <section className="py-20 px-4 bg-gradient-to-br from-[#1a1a1a] to-black">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-[#F5E7D3] mb-6">
                  Ready to Start Your Success Story?
                </h2>
                <p className="text-xl text-[#F5E7D3]/80 mb-8">
                  Let's discuss how we can help transform your business with innovative digital solutions.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-[#F5E7D3] text-black rounded-full font-semibold hover:bg-[#F5E7D3]/90 transition-colors group"
                >
                  <span className="mr-2">Get Started</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default CaseStudies;
