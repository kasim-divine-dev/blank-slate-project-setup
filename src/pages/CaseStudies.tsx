
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Users, Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { detailedCaseStudiesData } from '../data/caseStudiesData';
import { CaseStudiesProps, CaseStudy } from '../types/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const CaseStudies: React.FC<CaseStudiesProps> = ({ isFromHome = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>(detailedCaseStudiesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const itemsPerPage = isFromHome ? 3 : 6;
  const categories = ['All', ...Array.from(new Set(detailedCaseStudiesData.map(study => study.category)))];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredCaseStudies(detailedCaseStudiesData);
    } else {
      setFilteredCaseStudies(
        detailedCaseStudiesData.filter(study => study.category === selectedCategory)
      );
    }
    setCurrentPage(1);
  }, [selectedCategory]);

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  const getImageSrc = (imageUrl: string) => {
    if (imageErrors.has(imageUrl)) {
      return '/api/placeholder/600/400';
    }
    return imageUrl;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCaseStudies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCaseStudies = filteredCaseStudies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Empty state handling
  if (filteredCaseStudies.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Award className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Case Studies Found</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            We couldn't find any case studies matching your criteria. Try selecting a different category.
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Case Studies
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <DynamicSEO pageName="caseStudies" />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative py-20 px-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5" />
          <div className="relative container mx-auto text-center">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Our Success Stories
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Discover how we've transformed businesses through innovative digital solutions, 
              delivering measurable results and exceptional user experiences.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>20+ Successful Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>99% Client Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>3+ Years Experience</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Category Filter */}
        {!isFromHome && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="py-8 px-4"
          >
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Case Studies Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="py-16 px-4"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {currentCaseStudies.map((study, index) => (
                  <motion.article
                    key={study.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={getImageSrc(study.mainImage)}
                        alt={study.title}
                        onError={() => handleImageError(study.mainImage)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                          {study.category}
                        </span>
                      </div>
                      {study.featured && (
                        <div className="absolute top-4 right-4">
                          <Award className="w-6 h-6 text-yellow-400 fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{study.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{study.duration}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {study.shortDescription}
                      </p>

                      {/* Metrics - Handle results as object */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {study.metrics.slice(0, 2).map((metric, idx) => (
                          <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-primary">{metric.value}</div>
                            <div className="text-xs text-gray-600">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            +{study.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <a
                        href={`/case-studies/${study.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 group/link"
                      >
                        <span>View Case Study</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {!isFromHome && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center items-center gap-2 mt-12"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* View All CTA for Home */}
            {isFromHome && (
              <motion.div
                variants={itemVariants}
                className="text-center mt-12"
              >
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors group"
                >
                  <span>View All Case Studies</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default CaseStudies;
