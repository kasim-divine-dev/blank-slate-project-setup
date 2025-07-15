import { DynamicSEO } from '@/components/SEO/DynamicSEO';
import { caseStudiesData } from '@/data/caseStudiesData';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  ChevronDown,
  Eye,
  Filter,
  Grid3X3,
  List,
  Quote,
  Rocket,
  Search,
  Target,
  TrendingUp,
  User,
  Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const CaseStudies = ({ isFromHome = false }: { isFromHome?: boolean }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Get unique categories
  const categories = ['All', ...new Set(caseStudiesData.map(study => study.category))] as string[];

  // Filter case studies based on category and search
  const filteredStudies = caseStudiesData.filter(study => {
    const matchesCategory = selectedCategory === 'All' || study.category === selectedCategory;
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { value: 50, label: "Projects Completed", suffix: "+" },
    { value: 35, label: "Happy Clients", suffix: "+" },
    { value: 99, label: "Success Rate", suffix: "%" },
    { value: 5, label: "Countries Served", suffix: "+" }
  ];

  const testimonials = [
    {
      quote: "MkRonix transformed our digital presence completely. The results exceeded our expectations by 300%. Their strategic approach and attention to detail is unmatched.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      project: "E-commerce Platform Redesign",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      quote: "Their strategic approach and attention to detail helped us achieve unprecedented user engagement. The ROI was immediate and substantial.",
      author: "Michael Chen",
      role: "Product Manager, InnovateCorp",
      project: "Mobile App UX Optimization",
      avatar: "/api/placeholder/60/60",
      rating: 5
    },
    {
      quote: "Working with MkRonix was a game-changer. They delivered beyond our expectations and the results speak for themselves - 250% increase in conversions.",
      author: "Emma Rodriguez",
      role: "Marketing Director, GrowthTech",
      project: "Digital Marketing Campaign",
      avatar: "/api/placeholder/60/60",
      rating: 5
    }
  ];

  // Animate stats on scroll
  useEffect(() => {
    if (!statsRef.current) return;

    const statNumbers = statsRef.current.querySelectorAll('.stat-number');

    statNumbers.forEach((element, index) => {
      const targetValue = stats[index].value;

      gsap.fromTo(element,
        { textContent: 0 },
        {
          textContent: targetValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <>
      {!isFromHome && (
        <DynamicSEO pageName="caseStudies" />
      )}

      <div className="min-h-screen bg-black text-[#F5E7D3]">
        {/* Hidden SEO Content */}
        <div className="sr-only">
          <h1>Case Studies | MkRonix - Proven Results & Success Stories from 50+ Digital Projects India</h1>
          <p>Explore MkRonix's detailed case studies showcasing measurable results from our web development, UI/UX design, and digital marketing projects. Real data, proven ROI, client success stories from India.</p>
        </div>

        {!isFromHome && (
          <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] overflow-hidden">
              <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-5"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center gap-2 bg-[#F5E7D3]/10 backdrop-blur-sm border border-[#F5E7D3]/20 rounded-full px-6 py-3 mb-8">
                    <Award className="w-4 h-4 text-[#F5E7D3]" />
                    <span className="text-sm text-[#F5E7D3]/80 uppercase tracking-wider font-medium">
                      Real Projects, Real Impact
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[0.9]">
                    Case
                    <span className="block text-transparent bg-gradient-to-r from-[#F5E7D3] via-white to-[#F5E7D3] bg-clip-text">
                      Studies
                    </span>
                  </h1>

                  <p className="text-xl text-[#F5E7D3]/80 max-w-3xl mx-auto leading-relaxed mb-12">
                    Dive deep into our most impactful projects and discover how we transform challenges into extraordinary digital experiences that drive measurable business growth.
                  </p>
                </motion.div>

                {/* Enhanced Stats Section */}
                <motion.div
                  ref={statsRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
                >
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="relative group text-center p-8 rounded-3xl bg-gradient-to-br from-[#F5E7D3]/10 to-[#F5E7D3]/5 backdrop-blur-sm border border-[#F5E7D3]/20 hover:border-[#F5E7D3]/40 transition-all duration-500 hover:transform hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F5E7D3]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-center mb-3">
                          <div className="stat-number text-4xl md:text-5xl font-bold text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                            {stat.value}
                          </div>
                          <span className="text-4xl md:text-5xl font-bold text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                            {stat.suffix}
                          </span>
                        </div>
                        <div className="text-sm text-[#F5E7D3]/60 uppercase tracking-wider font-medium group-hover:text-[#F5E7D3]/80 transition-colors duration-300">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Enhanced Filter Section */}
            <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0a] to-black border-t border-[#F5E7D3]/10">
              <div className="max-w-7xl mx-auto">
                {/* Search and View Controls */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F5E7D3]/60" />
                      <input
                        type="text"
                        placeholder="Search case studies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 w-80 bg-[#1a1a1a] border border-[#F5E7D3]/20 rounded-xl text-[#F5E7D3] placeholder-[#F5E7D3]/50 focus:border-[#F5E7D3]/40 focus:outline-none transition-colors duration-300"
                      />
                    </div>

                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-4 py-3 bg-[#F5E7D3]/10 border border-[#F5E7D3]/20 rounded-xl text-[#F5E7D3] hover:bg-[#F5E7D3]/20 transition-all duration-300"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-sm text-[#F5E7D3]/60">
                      Showing {filteredStudies.length} of {caseStudiesData.length} projects
                    </div>

                    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#F5E7D3]/20 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded transition-colors duration-300 ${viewMode === 'grid'
                          ? 'bg-[#F5E7D3] text-black'
                          : 'text-[#F5E7D3]/60 hover:text-[#F5E7D3]'
                          }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded transition-colors duration-300 ${viewMode === 'list'
                          ? 'bg-[#F5E7D3] text-black'
                          : 'text-[#F5E7D3]/60 hover:text-[#F5E7D3]'
                          }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category Filters */}
                <motion.div
                  initial={false}
                  animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-3 p-6 bg-[#1a1a1a] border border-[#F5E7D3]/20 rounded-xl">
                    <div className="flex items-center gap-2 text-[#F5E7D3]/60 mr-4">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm uppercase tracking-wider">Filter by Industry:</span>
                    </div>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                          ? 'bg-[#F5E7D3] text-black shadow-lg'
                          : 'bg-[#F5E7D3]/10 text-[#F5E7D3]/60 hover:bg-[#F5E7D3]/20 hover:text-[#F5E7D3]'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Enhanced Case Studies Grid */}
            <section className="py-20 px-4 bg-black">
              <div className="max-w-7xl mx-auto">
                <div className={`grid gap-8 ${viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
                  }`}>
                  {filteredStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#333] hover:border-[#F5E7D3]/30 transition-all duration-500 hover:transform hover:scale-105 ${viewMode === 'list' ? 'flex gap-6' : ''
                        }`}
                    >
                      <div className={`overflow-hidden ${viewMode === 'list' ? 'w-80 h-48' : 'aspect-video'
                        }`}>
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-8 flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-[#F5E7D3]/10 text-[#F5E7D3] rounded-full text-sm font-medium">
                            {study.category}
                          </span>
                          <div className="flex items-center text-[#F5E7D3]/60 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {study.year}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-[#F5E7D3] mb-3 group-hover:text-white transition-colors">
                          {study.title}
                        </h3>

                        <p className="text-[#F5E7D3]/70 mb-6 line-clamp-3">
                          {study.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-[#F5E7D3]/60 text-sm">
                            <User className="w-4 h-4 mr-1" />
                            {study.client}
                          </div>

                          <Link
                            to={study.url}
                            className="inline-flex items-center px-4 py-2 bg-[#F5E7D3]/10 hover:bg-[#F5E7D3] text-[#F5E7D3] hover:text-black rounded-lg transition-all duration-300 group"
                          >
                            <span className="mr-2">Read More</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* No Results Message */}
                {filteredStudies.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-6 bg-[#F5E7D3]/10 rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-[#F5E7D3]/60" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#F5E7D3] mb-2">No projects found</h3>
                    <p className="text-[#F5E7D3]/60 mb-6">Try adjusting your search or filter criteria</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                      }}
                      className="px-6 py-3 bg-[#F5E7D3] text-black rounded-lg hover:bg-white transition-colors duration-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Methodology Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-black">
              <div className="max-w-6xl mx-auto">
                <div
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Our Proven <span className="text-[#F5E7D3]">Methodology</span>
                  </h2>
                  <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                    Every successful project follows our proven framework for delivering exceptional results
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      number: "01",
                      title: "Research & Analysis",
                      description: "Deep dive into market research, user behavior, and competitive analysis to understand the landscape",
                      icon: Target,
                      gradient: "from-purple-500/20 to-pink-500/20"
                    },
                    {
                      number: "02",
                      title: "Strategy Development",
                      description: "Crafting comprehensive strategies aligned with business objectives and user needs",
                      icon: BarChart3,
                      gradient: "from-blue-500/20 to-cyan-500/20"
                    },
                    {
                      number: "03",
                      title: "Implementation",
                      description: "Executing the strategy with precision, using cutting-edge technologies and best practices",
                      icon: Zap,
                      gradient: "from-green-500/20 to-emerald-500/20"
                    },
                    {
                      number: "04",
                      title: "Optimization",
                      description: "Continuous monitoring, testing, and improvement based on real data and user feedback",
                      icon: TrendingUp,
                      gradient: "from-orange-500/20 to-red-500/20"
                    }
                  ].map((step, index) => (
                    <div
                      key={step.number}
                      className={`relative bg-gradient-to-br ${step.gradient} backdrop-blur-sm border border-[#F5E7D3]/20 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500 hover:transform hover:scale-105`}
                    >
                      <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <div className="w-14 h-14 bg-[#F5E7D3]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#F5E7D3] group-hover:text-black transition-all duration-300">
                            <step.icon className="w-7 h-7" />
                          </div>
                          <span className="text-3xl font-bold text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                            {step.number}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-[#F5E7D3]/60 text-sm leading-relaxed group-hover:text-[#F5E7D3]/80 transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Enhanced Testimonials Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Client <span className="text-[#F5E7D3]">Success Stories</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Hear from the clients behind our most successful projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-sm border border-[#F5E7D3]/20 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500 hover:transform hover:scale-105"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-[#F5E7D3]" />
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-[#F5E7D3] rounded-full"></div>
                        ))}
                      </div>
                    </div>

                    <p className="text-[#F5E7D3]/80 text-lg mb-6 leading-relaxed group-hover:text-[#F5E7D3] transition-colors duration-300">
                      "{testimonial.quote}"
                    </p>

                    <div className="border-t border-[#F5E7D3]/20 pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F5E7D3] rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-lg">
                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                            {testimonial.author}
                          </div>
                          <div className="text-[#F5E7D3]/60 text-sm">
                            {testimonial.role}
                          </div>
                          <div className="text-[#F5E7D3] text-xs font-medium mt-1">
                            {testimonial.project}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Ready for Your <span className="text-[#F5E7D3]">Success Story?</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 mb-12 max-w-2xl mx-auto">
                Join our growing list of successful clients and transform your digital presence with proven strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative bg-[#F5E7D3] text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group border-2 border-[#F5E7D3]/20 text-[#F5E7D3] px-8 py-4 rounded-full font-bold hover:border-[#F5E7D3] hover:bg-[#F5E7D3] hover:text-black transition-all duration-300 inline-flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  View More Studies
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudies;