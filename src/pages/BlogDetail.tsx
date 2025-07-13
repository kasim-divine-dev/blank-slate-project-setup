
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Calendar, Clock, User, Share2, Heart, Bookmark, ArrowUpRight, AlertCircle, Home, Tag } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { getBlogBySlug, getRelatedBlogs } from '../data/blogData';
import { useLoading } from '../contexts/LoadingContext';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setLoading: setGlobalLoading } = useLoading();

  // Only initialize scroll if containerRef is available
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Get blog data with error handling
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const loadBlog = () => {
      try {
        setGlobalLoading(true);
        setIsLoading(true);
        setError(null);

        if (!slug) {
          throw new Error('Blog post not found');
        }

        const blogPost = getBlogBySlug(slug);
        if (!blogPost) {
          throw new Error('Blog post not found');
        }

        setBlog(blogPost);
        setRelatedBlogs(getRelatedBlogs(slug, 3));
        
        // Add small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
          setGlobalLoading(false);
        }, 300);
        
      } catch (err) {
        setError(err.message || 'Failed to load blog post');
        setIsLoading(false);
        setGlobalLoading(false);
      }
    };

    loadBlog();
  }, [slug, setGlobalLoading]);

  useEffect(() => {
    if (!isLoading && !error && blog && containerRef.current) {
      gsap.registerPlugin(ScrollTrigger);

      // Content sections animation
      gsap.utils.toArray('.content-section').forEach((section: any, index) => {
        gsap.fromTo(section, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%"
          }
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [isLoading, error, blog]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-darkText flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lightBg mx-auto mb-4"></div>
          <p className="text-xl">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state with better UX
  if (error || !blog) {
    return (
      <>
        <DynamicSEO 
          pageName="blogDetail" 
          customData={{
            title: "Blog Post Not Found | MkRonix",
            description: "The requested blog post could not be found. Explore our other insightful articles and industry expertise.",
          }}
        />
        <div className="min-h-screen bg-black text-darkText flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-darkText80 mb-8">
              The blog post you're looking for doesn't exist or may have been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/blog')}
                className="bg-lightBg text-brown-text px-6 py-3 rounded-full font-bold hover:bg-white transition-colors duration-300 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </button>
              <Link
                to="/"
                className="border border-darkText20 text-darkText px-6 py-3 rounded-full font-bold hover:border-lightBg hover:text-lightBg transition-colors duration-300 flex items-center gap-2 justify-center"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DynamicSEO 
        pageName="blogDetail" 
        customData={{
          title: blog.seo.metaTitle,
          description: blog.seo.metaDescription,
          keywords: blog.seo.keywords,
          url: `https://mkronix.com/blog/${slug}`,
          image: `https://mkronix.com${blog.featuredImage}`,
          type: "article",
          articleData: {
            publishedTime: new Date(blog.publishedAt).toISOString(),
            modifiedTime: new Date().toISOString(),
            author: blog.author.name,
            section: "Blog"
          }
        }}
      />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h1>{blog.title} - MkRonix Blog</h1>
        <p>{blog.excerpt}</p>
        <span>Author: {blog.author.name} | Category: {blog.category} | Published: {blog.publishedAt}</span>
        <span>Tags: {blog.tags.join(', ')}</span>
      </div>

      <div ref={containerRef} className="bg-black text-darkText font-boska overflow-x-hidden">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center px-4 pt-20"
          style={{ y: textY }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              y: backgroundY,
              background: `radial-gradient(circle at 30% 70%, rgba(245, 231, 211, 0.1), transparent 50%),
                         radial-gradient(circle at 70% 30%, rgba(245, 231, 211, 0.05), transparent 50%)`
            }}
          />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Back Navigation */}
            <motion.div
              className="flex justify-start mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                className="flex items-center gap-2 text-darkText80 hover:text-darkText transition-colors duration-300"
                whileHover={{ x: -5 }}
                onClick={() => navigate('/blog')}
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              {/* Category Badge */}
              <motion.div className="mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <span className="inline-block px-4 py-2 bg-lightBg text-brown-text text-sm font-bold rounded-full">
                  {blog.category}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-darkText">
                {blog.title}
              </h1>
              <p className="text-xl md:text-2xl text-lightBg mb-8 leading-relaxed">
                {blog.subtitle}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-darkText80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author.name}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Image */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative rounded-3xl overflow-hidden aspect-video"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  className="content-section prose prose-lg prose-invert max-w-none"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {/* Article Excerpt */}
                  <div className="text-xl text-darkText80 leading-relaxed mb-12 p-8 bg-gradient-to-br from-darkText20 to-darkText10 border border-darkText20 rounded-2xl">
                    {blog.excerpt}
                  </div>

                  {/* Article Content */}
                  <div className="text-lg leading-relaxed text-darkText80 space-y-6">
                    <p>
                      {blog.content}
                    </p>
                    <p>
                      In today's rapidly evolving digital landscape, staying ahead of the curve requires more than just following trends—it demands a deep understanding of emerging technologies and their practical applications. This comprehensive guide explores the key developments that are reshaping our industry and provides actionable insights for leveraging these innovations.
                    </p>
                    <p>
                      From artificial intelligence integration to advanced user experience design, the tools and methodologies we use today will determine tomorrow's success stories. Let's dive into the specific strategies and technologies that forward-thinking companies are using to gain competitive advantages.
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-darkText20">
                    <div className="flex items-center gap-2 text-darkText60 mb-4">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm font-medium">Tags:</span>
                    </div>
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-darkText20 border border-darkText20 text-darkText60 text-sm rounded-full hover:border-lightBg/50 hover:text-darkText transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Author Info */}
                  <motion.div
                    className="content-section bg-gradient-to-br from-darkText20 to-darkText10 border border-darkText20 p-6 rounded-2xl"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-lg font-bold text-darkText mb-4">About the Author</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-lightBg rounded-full flex items-center justify-center">
                        <span className="text-brown-text font-bold">
                          {blog.author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-darkText">{blog.author.name}</div>
                        <div className="text-darkText60 text-sm">{blog.author.role}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Share Buttons */}
                  <motion.div
                    className="content-section bg-gradient-to-br from-darkText20 to-darkText10 border border-darkText20 p-6 rounded-2xl"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-lg font-bold text-darkText mb-4">Share Article</h3>
                    <div className="flex gap-3">
                      <button className="p-2 bg-darkText20 border border-darkText20 rounded-lg hover:border-lightBg/50 transition-colors duration-300">
                        <Share2 className="w-4 h-4 text-darkText60" />
                      </button>
                      <button className="p-2 bg-darkText20 border border-darkText20 rounded-lg hover:border-lightBg/50 transition-colors duration-300">
                        <Heart className="w-4 h-4 text-darkText60" />
                      </button>
                      <button className="p-2 bg-darkText20 border border-darkText20 rounded-lg hover:border-lightBg/50 transition-colors duration-300">
                        <Bookmark className="w-4 h-4 text-darkText60" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="px-4 py-20 bg-darkBg/30">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-black text-center mb-16 text-darkText"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Related <span className="text-lightBg">Articles</span>
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog, index) => (
                  <motion.article
                    key={relatedBlog.id}
                    className="content-section bg-darkText20 border border-darkText20 rounded-2xl overflow-hidden hover:border-lightBg/50 transition-all duration-300 group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => navigate(`/blog/${relatedBlog.slug}`)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedBlog.featuredImage}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-xs text-darkText60">
                        <span className="px-2 py-1 bg-lightBg text-brown-text rounded-full font-bold">
                          {relatedBlog.category}
                        </span>
                        <span>{relatedBlog.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-darkText mb-2 group-hover:text-white transition-colors duration-300">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-darkText80 text-sm mb-4">
                        {relatedBlog.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-darkText60 text-xs">
                          {relatedBlog.author.name}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-darkText60 group-hover:text-lightBg transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="px-4 py-32 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-darkText">
                Ready to <span className="text-lightBg">Transform</span> Your Ideas?
              </h2>
              <p className="text-xl text-darkText80 mb-12">
                Let's discuss how we can help bring your vision to life
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  className="group relative bg-lightBg text-brown-text px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/contact')}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Today
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </motion.button>

                <motion.button
                  className="group border-2 border-darkText20 text-darkText px-8 py-4 rounded-full font-bold hover:border-lightBg hover:bg-lightBg hover:text-brown-text transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/blog')}
                >
                  <span className="flex items-center gap-2">
                    More Articles
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogDetail;
