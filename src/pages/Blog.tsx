
import { ArrowRight, Calendar, Clock, Search, Tag, User } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BoxesLayer from '../components/BoxesLayer/BoxesLayer';
import { SEOTextReveal } from '../components/TextRevealAnimation';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { enhancedSeoService } from '../services/enhancedSeoService';

const Blog: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const blogPosts = enhancedSeoService.getBlogPosts();
  const featuredPosts = enhancedSeoService.getFeaturedBlogPosts();
  const categories = enhancedSeoService.getBlogCategories();

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <DynamicSEO pageName="blogs" />

      <div ref={containerRef} className="bg-black text-[#F5E7D3] font-boska overflow-x-hidden">
        {/* Hidden SEO Content */}
        <div className="sr-only">
          <h1>MkRonix Blog - Expert Insights on Web Development, UI/UX Design, and Digital Marketing</h1>
          <p>Stay updated with the latest trends in web development, UI/UX design, and digital marketing. Expert insights, tutorials, and industry news from India's leading creative digital agency.</p>
          <span>Latest posts about React development, UI design trends, SEO strategies, mobile app development, and digital transformation insights.</span>
        </div>

        {/* Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center px-4"
        >
          <BoxesLayer gridColor="#484440" />

          <div className="relative z-10 text-center">
            <div
              className="mb-8"
            >
              <SEOTextReveal
                as="h1"
                animationType="character"
                id="blog-hero-title"
                aria-label="Insights that inspire innovation and expertise that transforms"
                className="text-darkText text-start md:text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-snug"
              >
                Insights that inspire innovation and expertise that transforms.
              </SEOTextReveal>
            </div>

            <p
              className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-4xl mx-auto leading-relaxed"
            >
              Discover the latest trends in web development, design, and digital marketing. Expert insights from India's leading creative digital agency.
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-16 px-4 bg-[#1D1C1C]/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div
                className="relative w-full md:w-96"
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F5E7D3]/60" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border border-[#484440]/50 rounded-2xl text-[#F5E7D3] focus:border-[#F5E7D3] focus:outline-none transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {/* Category Filter */}
              <div
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${selectedCategory === 'all'
                    ? 'bg-[#F5E7D3] text-black'
                    : 'bg-[#484440]/30 text-[#F5E7D3] hover:bg-[#484440]/50'
                    }`}
                >
                  All Posts
                </button>
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${selectedCategory === category.slug
                      ? 'bg-[#F5E7D3] text-black'
                      : 'bg-[#484440]/30 text-[#F5E7D3] hover:bg-[#484440]/50'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <div
                className="text-center mb-20"
              >
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  Featured <span className="text-[#484440]">Articles</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <article
                    key={post.id}
                    className="blog-card group cursor-pointer"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="relative overflow-hidden rounded-3xl mb-6">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#F5E7D3]/20 backdrop-blur-sm text-[#F5E7D3] px-4 py-2 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-[#F5E7D3]/60 text-sm">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                          <span className="bg-[#484440]/30 px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold group-hover:text-white transition-colors duration-300">
                          {post.title}
                        </h3>

                        <p className="text-[#F5E7D3]/80 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[#F5E7D3]/60">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>

                          <div className="flex items-center gap-2 text-[#484440] group-hover:text-[#F5E7D3] transition-colors duration-300">
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-32 px-4 bg-[#1D1C1C]/30">
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Latest <span className="text-[#484440]">Insights</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="blog-card group cursor-pointer"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative overflow-hidden rounded-3xl mb-6">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {post.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#F5E7D3]/20 backdrop-blur-sm text-[#F5E7D3] px-3 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[#F5E7D3]/60 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <div className="bg-[#484440]/30 px-3 py-1 rounded-full text-xs inline-block">
                        {post.category}
                      </div>

                      <h3 className="text-lg font-bold group-hover:text-white transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-[#F5E7D3]/80 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#F5E7D3]/60 text-sm">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>

                        <div className="flex items-center gap-1 text-[#484440] group-hover:text-[#F5E7D3] transition-colors duration-300 text-sm">
                          Read
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[#F5E7D3]/60 text-xs flex items-center gap-1"
                          >
                            <Tag className="w-2 h-2" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div
                className="text-center py-20"
              >
                <p className="text-xl text-[#F5E7D3]/60">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
