
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
        <section
          className="relative min-h-screen flex items-center justify-center px-4"
        >

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Back Button */}
            <div
              className="mb-8"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#F5E7D3]/80 hover:text-[#F5E7D3] transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </Link>
            </div>

            {/* Article Meta */}
            <div
              className="flex flex-wrap items-center justify-center gap-6 text-[#F5E7D3]/60 text-sm mb-8"
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
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
            >
              {blogPost.title}
            </h1>

            {/* Excerpt */}
            <p
              className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              {blogPost.excerpt}
            </p>

            {/* Share Button */}
            <div
              className="relative inline-block"
            >
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 bg-[#F5E7D3] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
                Share Article
              </button>

              {showShareMenu && (
                <div
                  className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-[#1D1C1C] border border-[#484440]/30 rounded-2xl p-4 min-w-[200px]"
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
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className="relative overflow-hidden rounded-3xl"
            >
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="article-content prose prose-lg max-w-none"
            >
              <div className="text-[#F5E7D3]/90 leading-relaxed space-y-6">
                {blogPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div
              className="mt-16 pt-8 border-t border-[#484440]/30"
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
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-32 px-4 bg-[#1D1C1C]/30">
            <div className="max-w-6xl mx-auto">
              <div
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Related <span className="text-[#484440]">Articles</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className="group cursor-pointer"
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
                  </article>
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
