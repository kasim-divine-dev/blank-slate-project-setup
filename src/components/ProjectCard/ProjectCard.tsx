
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { LazyImage } from '../../utils/lazyLoad';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    category: string;
    year: string;
    image: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.article
      className={`project-card group relative overflow-hidden rounded-2xl aspect-[4/3]`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative h-full">
        <LazyImage
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
  );
};

export default ProjectCard;
