import { DynamicSEO } from '@/components/SEO/DynamicSEO';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight, Filter, Grid, List } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { projectsData } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);

  const projectsPerPage = 6;

  // Get unique categories
  const categories = ['All', ...new Set(projectsData.map(project => project.category))] as string[];

  // Filter projects based on category
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useGSAP(() => {
    gsap.fromTo(
      '.project-card',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [currentProjects]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsLoading(false);
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 300);
    }
  };

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsLoading(false);
    }, 300);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  return (
    <>
      <DynamicSEO pageName="projects" />

      <div className="min-h-screen bg-black text-[#F5E7D3]">
        <h1 className="sr-only">MkRonix - Creative Digital Agency in India for Web Development, UI/UX Design, and Digital Marketing</h1>

        <motion.section
          className="pt-32 pb-20 px-4 bg-gradient-to-b from-black to-darkBg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.p
                className="text-sm text-darkText60 mb-6 uppercase tracking-[0.2em] font-medium"
                variants={itemVariants}
              >
                Our Creative Work
              </motion.p>
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[0.9]"
                variants={itemVariants}
              >
                Featured
                <span className="block text-transparent bg-gradient-to-r from-darkText via-lightBg to-darkText bg-clip-text">
                  Projects
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-darkText80 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                Discover our portfolio of innovative digital solutions that have transformed
                businesses and created exceptional user experiences across various industries.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              {[
                { number: "20+", label: "Projects Completed" },
                { number: "15+", label: "Happy Clients" },
                { number: "15+", label: "Industries Served" },
                { number: "99%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-darkText20 backdrop-blur-sm border border-darkText20"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 231, 211, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-lightBg">{stat.number}</div>
                  <div className="text-sm text-darkText60 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Filter and View Controls */}
        <section className="py-12 px-4 bg-darkBg border-y border-darkText20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Category Filters */}
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-2 text-darkText60 mr-4 max-md:p-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wider">Filter by:</span>
                </div>
                <div className='flex md:flex-wrap max-md:overflow-x-scroll max-md:whitespace-nowrap items-center gap-3 max-md:w-screen max-md:p-2'>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${selectedCategory === category
                        ? 'bg-lightBg text-brown-text shadow-lg'
                        : 'bg-darkText20 text-darkText60 hover:bg-darkText20 hover:text-darkText'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode and Results */}
              <div className="flex flex-col items-center gap-6">
                <div className="text-sm text-darkText60">
                  Showing {startIndex + 1}-{Math.min(startIndex + projectsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
                </div>

                <div className="flex items-center gap-2 p-1 bg-darkText20 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-lightBg text-brown-text' : 'text-darkText60 hover:text-darkText'
                      }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-lightBg text-brown-text' : 'text-darkText60 hover:text-darkText'
                      }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  className="flex items-center justify-center py-32"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-lightBg border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-darkText60">Loading projects...</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`${selectedCategory}-${currentPage}`}
                  className={`projects-grid ${viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
                    : 'space-y-8'
                    }`}
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  {currentProjects.map((project, index) => (
                    <motion.article
                      key={`${project.id}-${currentPage}`}
                      className={`project-card group relative overflow-hidden rounded-md ${viewMode === 'list' ? 'flex flex-col md:flex-row bg-darkBg' : ''
                        }`}
                      variants={projectVariants}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <div className={`relative ${viewMode === 'list' ? 'md:w-1/2 h-44 md:h-auto' : 'h-full'}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Hover Overlay */}
                        <div className=" absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <ArrowUpRight className="w-12 h-12 text-lightBg mx-auto mb-4" />
                            <p className="text-lightBg font-medium">View Project</p>
                          </div>
                        </div>
                      </div>

                      <div className={`${viewMode === 'list'
                        ? 'md:w-1/2 p-8 flex flex-col justify-center'
                        : 'absolute bottom-0 left-0 right-0 p-6'
                        } max-md:hidden`}>
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 bg-lightBg text-brown-text text-xs font-medium rounded-full mb-3">
                            {project.category}
                          </span>
                          <h3 className={`font-bold text-white ${viewMode === 'list' ? 'text-2xl mb-3' : 'text-xl mb-2'
                            }`}>
                            {project.title}
                          </h3>
                          {viewMode === 'list' && (
                            <p className="text-darkText80 mb-4 line-clamp-2">
                              {project.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-white/80">
                            <span>{project.client}</span>
                            <span>•</span>
                            <span>{project.year}</span>
                          </div>
                          {viewMode === 'grid' && (
                            <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                        </div>

                        {viewMode === 'list' && project.technologies && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-darkText20 text-darkText60 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex items-center justify-center mt-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 p-2 bg-darkBg rounded-2xl border border-darkText20">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === 1
                      ? 'text-darkText60 cursor-not-allowed'
                      : 'text-darkText hover:bg-darkText20 hover:text-lightBg'
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 mx-2">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-darkText60">...</span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page as number)}
                            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${currentPage === page
                              ? 'bg-lightBg text-brown-text shadow-lg'
                              : 'text-darkText60 hover:bg-darkText20 hover:text-darkText'
                              }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === totalPages
                      ? 'text-darkText60 cursor-not-allowed'
                      : 'text-darkText hover:bg-darkText20 hover:text-lightBg'
                      }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

      </div>
    </>
  );
};

export default Projects;
