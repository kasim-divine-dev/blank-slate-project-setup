import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Grid, List, Tag } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { carouselItems } from '../../data/carouselItems';
import { DrawCircleText } from '../DrawCircleText/DrawCircleText';
import { Link } from 'react-router-dom';
import MagneticButton from '../MagneticButton/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate project cards on scroll
        gsap.utils.toArray('.project-card').forEach((card: any, index) => {
            gsap.fromTo(card, {
                y: 60,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [selectedCategory, viewMode]);

    // Extract categories from projects
    const categories = ['All', ...Array.from(new Set(carouselItems.map(item =>
        item.title.includes('Agency') ? 'Agency' :
            item.title.includes('Portfolio') ? 'Portfolio' :
                item.title.includes('Studio') ? 'Studio' : 'Website'
    )))] as string[];

    const filteredProjects = carouselItems.filter(project => {
        if (selectedCategory === 'All') return true;
        return project.title.toLowerCase().includes(selectedCategory.toLowerCase());
    });

    return (
        <div ref={containerRef} className="relative bg-black text-[#F5E7D3]">
            {/* Hero Section */}
            <motion.section
                className="h-screen flex justify-center items-center px-4 relative overflow-hidden"
                style={{ y: backgroundY }}
            >
                {/* Subtle background animation */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 40% 60%, rgba(72, 68, 64, 0.2), transparent 50%),
                                   radial-gradient(circle at 60% 40%, rgba(72, 68, 64, 0.1), transparent 50%)`
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <DrawCircleText
                        normalText="Crafting innovative digital experiences for "
                        normalText2="that inspire, engage, and drive impact."
                        circleText="businesses"
                    />
                </motion.div>
            </motion.section>

            {/* Project Showcase Section */}
            <section className="py-20 px-4" ref={sectionRef}>
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-6">
                            Featured <span className="text-[#484440]">Projects</span>
                        </h2>
                        <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                            Explore our portfolio of successful digital projects that showcase our expertise and creativity
                        </p>
                    </motion.div>

                    {/* Filters and Controls */}
                    <motion.div
                        className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-[#F5E7D3] text-black'
                                        : 'bg-[#1D1C1C]/50 border border-[#484440]/30 text-[#F5E7D3] hover:border-[#F5E7D3]/50'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-2 bg-[#1D1C1C]/50 border border-[#484440]/30 rounded-2xl p-2">
                            <motion.button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'grid' ? 'bg-[#F5E7D3] text-black' : 'text-[#F5E7D3] hover:bg-[#484440]/30'
                                    }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Grid className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                onClick={() => setViewMode('masonry')}
                                className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'masonry' ? 'bg-[#F5E7D3] text-black' : 'text-[#F5E7D3] hover:bg-[#484440]/30'
                                    }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <List className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Projects Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${selectedCategory}-${viewMode}`}
                            className={`grid gap-8 ${viewMode === 'grid'
                                ? 'md:grid-cols-2 lg:grid-cols-3'
                                : 'md:grid-cols-2 lg:grid-cols-4'
                                }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.article
                                    key={project.id}
                                    className={`project-card group relative bg-[#1D1C1C]/30 border border-[#484440]/30 rounded-3xl overflow-hidden hover:border-[#F5E7D3]/50 transition-all duration-500 ${viewMode === 'masonry' && index % 3 === 1 ? 'lg:row-span-2' : ''
                                        }`}
                                    layoutId={`project-${project.id}`}
                                    onHoverStart={() => setHoveredProject(project.id)}
                                    onHoverEnd={() => setHoveredProject(null)}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {/* Project Image */}
                                    <div className={`relative overflow-hidden ${viewMode === 'masonry' && index % 3 === 1 ? 'h-96' : 'h-64'
                                        }`}>
                                        <img
                                            src={project.bg}
                                            alt={`${project.title} - Digital Project Showcase`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Project ID Badge */}
                                        <div className="absolute top-4 left-4 bg-[#F5E7D3]/10 backdrop-blur-sm border border-[#F5E7D3]/20 text-[#F5E7D3] px-3 py-1 rounded-full text-sm font-medium">
                                            #{project.id}
                                        </div>

                                        {/* View Project Button */}
                                        <motion.div
                                            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                                            initial={{ scale: 0 }}
                                            whileHover={{ scale: 1.1 }}
                                            animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 bg-[#F5E7D3] text-black rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
                                                aria-label={`View ${project.title} project`}
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </motion.div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300 line-clamp-2">
                                            {project.title}
                                        </h3>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-sm text-[#F5E7D3]/60">
                                                <span className="flex items-center gap-1">
                                                    <Tag className="w-4 h-4" />
                                                    {project.title.includes('Agency') ? 'Agency' :
                                                        project.title.includes('Portfolio') ? 'Portfolio' :
                                                            project.title.includes('Studio') ? 'Studio' : 'Website'}
                                                </span>
                                            </div>

                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 45 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ArrowUpRight className="w-5 h-5 text-[#484440] group-hover:text-[#F5E7D3] transition-colors duration-300" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    <div className='flex justify-center mt-16'>
                        <MagneticButton
                        >
                            <Link
                                to="/projects"
                                className="group bg-[#F5E7D3] text-black px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 inline-flex items-center gap-3"

                            >
                                View All Projects
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectShowcase;