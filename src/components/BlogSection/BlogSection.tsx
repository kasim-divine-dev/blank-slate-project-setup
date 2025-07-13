
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedBlogs } from '../../data/blogData';

const BlogSection = () => {
  const navigate = useNavigate();
  const featuredBlogs = getFeaturedBlogs();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-darkBg/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.p
            className="text-sm text-darkText60 mb-6 uppercase tracking-[0.2em] font-medium"
            variants={itemVariants}
          >
            Insights & Expertise
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[0.9]"
            variants={itemVariants}
          >
            Latest
            <span className="block text-transparent bg-gradient-to-r from-darkText via-lightBg to-darkText bg-clip-text">
              Insights
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-darkText80 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Stay ahead with our latest thoughts on technology, design, and digital transformation.
            Expert insights to fuel your next big idea.
          </motion.p>
        </motion.div>

        {/* Featured Blog Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Main Featured Article */}
          {featuredBlogs[0] && (
            <motion.article
              className="lg:col-span-2 group cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/blog/${featuredBlogs[0].slug}`)}
            >
              <div className="bg-gradient-to-br from-darkText20 to-darkText10 border border-darkText20 rounded-3xl overflow-hidden hover:border-lightBg/50 transition-all duration-500">
                {/* Featured Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={featuredBlogs[0].featuredImage}
                    alt={featuredBlogs[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-lightBg text-brown-text text-sm font-bold rounded-full">
                      {featuredBlogs[0].category}
                    </span>
                  </div>

                  {/* Read More Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <ArrowUpRight className="w-12 h-12 text-lightBg mx-auto mb-4" />
                      <p className="text-lightBg font-bold">Read Full Article</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-6 mb-4 text-sm text-darkText60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredBlogs[0].publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredBlogs[0].readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredBlogs[0].author.name}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-darkText group-hover:text-white transition-colors duration-300 leading-tight">
                    {featuredBlogs[0].title}
                  </h3>

                  <p className="text-darkText80 text-lg leading-relaxed mb-6 group-hover:text-darkText transition-colors duration-300">
                    {featuredBlogs[0].excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredBlogs[0].tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-darkText20 border border-darkText20 text-darkText60 text-sm rounded-full hover:border-lightBg/50 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-6 border-t border-darkText20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-lightBg rounded-full flex items-center justify-center">
                        <span className="text-brown-text font-bold text-sm">
                          {featuredBlogs[0].author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-darkText group-hover:text-white transition-colors duration-300">
                          {featuredBlogs[0].author.name}
                        </div>
                        <div className="text-darkText60 text-sm">
                          {featuredBlogs[0].author.role}
                        </div>
                      </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-6 h-6 text-lightBg" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Side Articles */}
          <div className="space-y-8">
            {featuredBlogs.slice(1, 3).map((blog, index) => (
              <motion.article
                key={blog.id}
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                <div className="bg-gradient-to-br from-darkText20 to-darkText10 border border-darkText20 rounded-2xl overflow-hidden hover:border-lightBg/50 transition-all duration-500">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[5/3]">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Category */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-lightBg text-brown-text text-xs font-bold rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-xs text-darkText60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-darkText group-hover:text-white transition-colors duration-300 leading-tight">
                      {blog.title}
                    </h3>

                    {/* Author & Arrow */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-lightBg rounded-full flex items-center justify-center">
                          <span className="text-brown-text font-bold text-xs">
                            {blog.author.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-darkText60 text-xs font-medium">
                          {blog.author.name}
                        </span>
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-darkText60 group-hover:text-lightBg transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* View All Blogs CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-lightBg to-lightBg/90 text-brown-text px-8 py-4 rounded-full font-bold hover:from-white hover:to-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/blog')}
          >
            <span>Explore All Insights</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
