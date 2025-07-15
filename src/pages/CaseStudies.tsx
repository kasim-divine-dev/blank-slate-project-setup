import { DynamicSEO } from '@/components/SEO/DynamicSEO';
import { caseStudiesData } from '@/data/caseStudiesData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  ExternalLink,
  Eye,
  Quote,
  Rocket,
  Target,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { useState } from 'react';

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
              className="hero-section pt-32 pb-20 px-4 bg-gradient-to-b from-black to-darkBg"
            >
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
            <section className="py-12 px-4 bg-darkBg border-y border-darkText20">
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
            <section className="py-20 px-4 bg-black">
              <div className="max-w-7xl mx-auto">
                <div
                  className="case-studies-grid space-y-32"
                >
                  {filteredStudies.map((study, index) => (
                    <article
                      key={study.id}
                      className={`case-study-card ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                        } flex flex-col lg:flex gap-12 items-center relative group`}
                    >
                      {/* Background decoration */}
                      <div className="absolute -inset-8 bg-gradient-to-br from-darkText20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Image Section */}
                      <div className="lg:w-1/2 relative">
                        <div
                          className="relative overflow-hidden rounded-3xl"
                        >
                          <img
                            src={study.image}
                            alt={study.title}
                            className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Category Badge */}
                          <div className="absolute top-6 left-6">
                            <span className="inline-block px-3 py-1 bg-lightBg text-brown-text text-xs font-medium rounded-full">
                              {study.category}
                            </span>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <ExternalLink className="w-12 h-12 text-lightBg mx-auto mb-4" />
                              <p className="text-lightBg font-medium">View Full Case Study</p>
                            </div>
                          </div>

                          {/* Quick Info */}
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex justify-between items-center text-white">
                              <div>
                                <div className="text-2xl font-bold">{study.year}</div>
                                <div className="text-sm opacity-80">{study.client}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowUpRight className="w-8 h-8" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="lg:w-1/2 space-y-8 relative z-10">
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-darkText group-hover:text-white transition-colors duration-300">
                            {study.title}
                          </h2>
                          <p className="text-lg text-lightBg font-medium mb-4">
                            {study.subtitle}
                          </p>
                          <p className="text-darkText80 leading-relaxed text-lg group-hover:text-darkText transition-colors duration-300">
                            {study.description}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-bold text-darkText60 mb-3 uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {study.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="bg-darkText20 border border-darkText20 text-darkText60 px-3 py-1 rounded-full text-sm hover:border-lightBg hover:text-darkText transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Results */}
                        <div>
                          <h4 className="text-sm font-bold text-darkText60 mb-4 uppercase tracking-wider flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            Key Results
                          </h4>
                          <div className="grid gap-3">
                            {study.results.map((result, resultIndex) => (
                              <div
                                key={resultIndex}
                                className="bg-darkText20 border border-darkText20 p-4 rounded-xl group-hover:border-lightBg/50 transition-all duration-300"
                              >
                                <div className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-lightBg mt-0.5 flex-shrink-0" />
                                  <span className="text-darkText80 group-hover:text-darkText transition-colors duration-300 text-sm">
                                    {result}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Client Info & CTA */}
                        <div className="flex items-center justify-between pt-6 border-t border-darkText20">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-darkText80">
                              <Users className="w-4 h-4" />
                              <span>{study.client}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-darkText80">
                              <Calendar className="w-4 h-4" />
                              <span>{study.year}</span>
                            </div>
                          </div>

                          <button className="group flex items-center gap-3 bg-lightBg text-brown-text px-6 py-3 rounded-full font-bold hover:bg-white transition-all duration-300">
                            View Details
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    </article>
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