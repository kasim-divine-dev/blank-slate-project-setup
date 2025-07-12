
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import Pagination from '../components/Pagination/Pagination';
import { DynamicSEO } from '../components/SEO/DynamicSEO';

const Projects: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const currentProjects = projectsData.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <>
      <DynamicSEO pageName="projects" />

      <div className="min-h-screen bg-black text-[#F5E7D3]">
        <h1 className="sr-only">MkRonix - Creative Digital Agency in India for Web Development, UI/UX Design, and Digital Marketing</h1>

        {/* Hero Section */}
        <motion.section
          className="pt-32 pb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-16">
              <p className="text-sm text-[#F5E7D3]/60 mb-4 uppercase tracking-wider">Our Work</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Our Projects
              </h1>
              <p className="text-lg text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Learn more about the projects and the team behind it
              </p>
            </div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {currentProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
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
