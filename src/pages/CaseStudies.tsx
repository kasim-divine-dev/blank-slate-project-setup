import CommonHeaderText from '@/components/CommonHeaderText/CommonHeaderText';
import { RetroGrid } from '@/components/RetroGrid/RetroGrid';
import { DynamicSEO } from '@/components/SEO/DynamicSEO';
import StaggeredText from '@/components/StaggeredText/StaggeredText';
import { caseStudiesData } from '@/data/caseStudiesData';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  Eye,
  Quote,
  Rocket,
  Target,
  TrendingUp,
  User,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const CaseStudies = ({ isFromHome = false }: { isFromHome?: boolean }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(caseStudiesData.map(study => study.category))] as string[];

  // Filter case studies based on category
  const filteredStudies = selectedCategory === 'All'
    ? caseStudiesData
    : caseStudiesData.filter(study => study.category === selectedCategory);


  const stats = [
    { value: 20, label: "Projects Completed", suffix: "+" },
    { value: 15, label: "Happy Clients", suffix: "+" },
    { value: 99, label: "Success Rate", suffix: "%" },
    { value: 1, label: "Countries Served", suffix: "" }
  ];


  const testimonials = [
    {
      quote: "MkRonix transformed our digital presence completely. The results exceeded our expectations by 300%. Their strategic approach and attention to detail is unmatched.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc",
      project: "E-commerce Platform Redesign",
      avatar: "/api/placeholder/60/60"
    },
    {
      quote: "Their strategic approach and attention to detail helped us achieve unprecedented user engagement. The ROI was immediate and substantial.",
      author: "Michael Chen",
      role: "Product Manager, InnovateCorp",
      project: "Mobile App UX Optimization",
      avatar: "/api/placeholder/60/60"
    },
    {
      quote: "Working with MkRonix was a game-changer. They delivered beyond our expectations and the results speak for themselves - 250% increase in conversions.",
      author: "Emma Rodriguez",
      role: "Marketing Director, GrowthTech",
      project: "Digital Marketing Campaign",
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <>
      {!isFromHome && (
        <DynamicSEO pageName="case-studies" />
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
            <section
              className="relative pt-32 pb-20 bg-gradient-to-b from-black to-darkBg"
            >
              <RetroGrid />

              <div className="max-w-7xl mx-auto">
                <div
                  className="text-center mb-16"
                >
                  <p
                    className="hero-element text-sm text-darkText60 mb-6 uppercase tracking-[0.2em] font-medium"
                  >
                    Real Projects, Real Impact
                  </p>
                  <h1
                    className="hero-element text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[0.9]"
                  >
                    Case
                    <span className="block text-transparent bg-gradient-to-r from-darkText via-lightBg to-darkText bg-clip-text">
                      Studies
                    </span>
                  </h1>
                  <p
                    className="hero-element text-xl text-darkText80 max-w-3xl mx-auto leading-relaxed"
                  >
                    Dive deep into our most impactful projects and discover how we transform challenges into extraordinary digital experiences that drive measurable business growth.
                  </p>
                </div>
                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                >
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-2xl bg-darkText20 backdrop-blur-sm border border-darkText20"

                    >
                      <div className="flex items-center justify-center">
                        <div
                          className="stat-number text-3xl md:text-4xl font-bold text-lightBg"
                          data-target={stat.value}
                        >
                          0
                        </div>
                        <span className="text-3xl md:text-4xl font-bold text-lightBg">
                          {stat.suffix}
                        </span>
                      </div>
                      <div className="text-sm text-darkText60 uppercase tracking-wider mt-2">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>


            {/* Filter Section */}
            <section className="py-32 px-4 bg-darkBg border-y border-darkText20">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Category Filters */}
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex items-center gap-2 text-darkText60">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm uppercase tracking-wider">Filter by Industry:</span>
                    </div>
                    <div className='flex flex-wrap items-center gap-3'>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                            ? 'bg-lightBg text-brown-text shadow-lg'
                            : 'bg-darkText20 text-darkText60 hover:bg-darkText20 hover:text-darkText'
                            }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-sm text-darkText60">
                      Showing {filteredStudies.length} case {filteredStudies.length === 1 ? 'study' : 'studies'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-lightBg" />
                      <span className="text-sm text-lightBg font-medium">Award-Winning Results</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#333] hover:border-[#F5E7D3]/30 transition-all duration-500"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 bg-[#F5E7D3]/10 text-[#F5E7D3] rounded-full text-sm font-medium">
                            {study.category}
                          </span>
                          <div className="flex items-center text-[#F5E7D3]/60 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {study.year}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-[#F5E7D3] mb-3 group-hover:text-[#F5E7D3]/90 transition-colors">
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
                            className="inline-flex items-center text-[#F5E7D3] hover:text-[#F5E7D3]/80 transition-colors group"
                          >
                            <span className="mr-2">Read More</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="process-section py-20 px-4 bg-darkBg">
              <div className="max-w-6xl mx-auto">
                <div
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Our Proven <span className="text-lightBg">Methodology</span>
                  </h2>
                  <p className="text-xl text-darkText80 max-w-2xl mx-auto">
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
                      className={`process-card relative bg-gradient-to-br ${step.gradient} backdrop-blur-sm border border-darkText20 p-8 rounded-3xl group hover:border-lightBg/50 transition-all duration-500`}
                    >
                      <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <div className="w-14 h-14 bg-darkText20 rounded-2xl flex items-center justify-center group-hover:bg-lightBg group-hover:text-brown-text transition-all duration-300">
                            <step.icon className="w-7 h-7" />
                          </div>
                          <span className="text-3xl font-bold text-lightBg group-hover:text-white transition-colors duration-300">
                            {step.number}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-darkText60 text-sm leading-relaxed group-hover:text-darkText80 transition-colors duration-300">
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

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Client <span className="text-lightBg">Success Stories</span>
              </h2>
              <p className="text-xl text-darkText80 max-w-2xl mx-auto">
                Hear from the clients behind our most successful projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-darkBg backdrop-blur-sm border border-darkText20 p-8 rounded-3xl group hover:border-lightBg/50 transition-all duration-500"
                >
                  <div className="relative z-10">
                    <Quote className="w-8 h-8 text-lightBg mb-4" />
                    <p className="text-darkText80 text-lg mb-6 leading-relaxed group-hover:text-darkText transition-colors duration-300">
                      {testimonial.quote}
                    </p>
                    <div className="border-t border-darkText20 pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-lightBg rounded-full flex items-center justify-center">
                          <span className="text-brown-text font-bold text-lg">
                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-darkText group-hover:text-white transition-colors duration-300">
                            {testimonial.author}
                          </div>
                          <div className="text-darkText60 text-sm">
                            {testimonial.role}
                          </div>
                          <div className="text-lightBg text-xs font-medium mt-1">
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

        {/* CTA Section */}
        <section className="py-20 px-4 bg-darkBg">
          <div className="max-w-4xl mx-auto text-center">
            <div
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Ready for Your <span className="text-lightBg">Success Story?</span>
              </h2>
              <p className="text-xl text-darkText80 mb-12 max-w-2xl mx-auto">
                Join our growing list of successful clients and transform your digital presence with proven strategies.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="group relative bg-lightBg text-brown-text px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Start Your Project
                </button>

                <button
                  className="group border-2 border-darkText20 text-darkText px-8 py-4 rounded-full font-bold hover:border-lightBg hover:bg-lightBg hover:text-brown-text transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View More Studies
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudies;