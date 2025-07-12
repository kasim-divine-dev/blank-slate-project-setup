
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Calendar, Clock, Copy, Facebook, Linkedin, Share2, Tag, Twitter, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { enhancedSeoService } from '../services/enhancedSeoService';

const BlogPost: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const blogPost = slug ? enhancedSeoService.getBlogPost(slug) : null;
  const relatedPosts = enhancedSeoService.getBlogPosts().filter(post =>
    post.id !== blogPost?.id &&
    (post.category === blogPost?.category ||
      post.tags.some(tag => blogPost?.tags.includes(tag)))
  ).slice(0, 3);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Progress bar animation
    gsap.fromTo('.progress-bar', {
      scaleX: 0
    }, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".article-content",
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost?.title || '';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        });
        break;
    }
    setShowShareMenu(false);
  };

  if (!blogPost) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <DynamicSEO
        pageName="blogPost"
        customData={{
          title: blogPost.title,
          description: blogPost.excerpt,
          keywords: blogPost.tags.join(', '),
          articleData: {
            author: blogPost.author,
            publishedTime: blogPost.publishedAt,
            modifiedTime: blogPost.updatedAt,
            section: blogPost.category
          }
        }}
      />

      <div ref={containerRef} className="bg-black text-[#F5E7D3] font-boska overflow-x-hidden">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-[#484440]/30 z-50">
          <div className="progress-bar h-full bg-[#F5E7D3] origin-left"></div>
        </div>

        {/* Hidden SEO Content */}
        <div className="sr-only">
          <h1>{blogPost.title} - MkRonix Blog Expert Insights</h1>
          <p>{blogPost.excerpt}</p>
          <span>Article by {blogPost.author}, published on {blogPost.publishedAt}</span>
          <span>Tags: {blogPost.tags.join(', ')}</span>
          <span>Category: {blogPost.category}</span>
          <span>Read time: {blogPost.readTime}</span>
        </div>

        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              y: backgroundY,
              background: `radial-gradient(circle at 30% 70%, rgba(72, 68, 64, 0.4), transparent 50%),
                         radial-gradient(circle at 70% 30%, rgba(72, 68, 64, 0.3), transparent 50%)`
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Back Button */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#F5E7D3]/80 hover:text-[#F5E7D3] transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Article Meta */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 text-[#F5E7D3]/60 text-sm mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(blogPost.publishedAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {blogPost.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {blogPost.author}
              </span>
              <span className="bg-[#484440]/30 px-3 py-1 rounded-full">
                {blogPost.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {blogPost.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {blogPost.excerpt}
            </motion.p>

            {/* Share Button */}
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 bg-[#F5E7D3] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
                Share Article
              </button>

              {showShareMenu && (
                <motion.div
                  className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-[#1D1C1C] border border-[#484440]/30 rounded-2xl p-4 min-w-[200px]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-[#484440]/30 rounded-xl transition-colors duration-300"
                    >
                      <Twitter className="w-5 h-5 text-blue-400" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-[#484440]/30 rounded-xl transition-colors duration-300"
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-[#484440]/30 rounded-xl transition-colors duration-300"
                    >
                      <Linkedin className="w-5 h-5 text-blue-500" />
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-[#484440]/30 rounded-xl transition-colors duration-300"
                    >
                      <Copy className="w-5 h-5" />
                      {copySuccess ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Image */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="article-content prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-[#F5E7D3]/90 leading-relaxed space-y-6">
                {blogPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              className="mt-16 pt-8 border-t border-[#484440]/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 bg-[#484440]/30 px-4 py-2 rounded-full text-sm hover:bg-[#484440]/50 transition-colors duration-300"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-32 px-4 bg-[#1D1C1C]/30">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Related <span className="text-[#484440]">Articles</span>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative overflow-hidden rounded-3xl mb-6">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="bg-[#484440]/30 px-3 py-1 rounded-full text-xs inline-block">
                          {post.category}
                        </div>

                        <h3 className="text-xl font-bold group-hover:text-white transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-[#F5E7D3]/80 text-sm leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-[#F5E7D3]/60 text-xs">
                          <span>{post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPost;
