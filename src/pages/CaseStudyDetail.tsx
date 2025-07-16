
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Database,
  Eye,
  Globe,
  Home,
  Lightbulb,
  Monitor,
  Palette,
  Quote,
  Rocket,
  Share2,
  Shield,
  Smartphone,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BoxesLayer from '../components/BoxesLayer/BoxesLayer';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { getCaseStudyBySlug, getRelatedCaseStudies } from '../data/caseStudiesData';
import { CaseStudy } from '../types/types';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [relatedStudies, setRelatedStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!slug) {
          throw new Error('Case study not found');
        }

        const study = getCaseStudyBySlug(slug);
        if (!study) {
          throw new Error('Case study not found');
        }

        setCaseStudy(study);
        setRelatedStudies(getRelatedCaseStudies(slug, 3));

        // Simulate loading for smooth transition
        await new Promise(resolve => setTimeout(resolve, 500));

        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load case study');
        setIsLoading(false);
      }
    };

    loadCaseStudy();
  }, [slug]);

  // Helper function to get technology icon
  const getTechIcon = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react') || techLower.includes('js') || techLower.includes('javascript')) return Code;
    if (techLower.includes('design') || techLower.includes('ui') || techLower.includes('ux')) return Palette;
    if (techLower.includes('database') || techLower.includes('sql') || techLower.includes('mongo')) return Database;
    if (techLower.includes('mobile') || techLower.includes('app') || techLower.includes('ios') || techLower.includes('android')) return Smartphone;
    if (techLower.includes('web') || techLower.includes('frontend') || techLower.includes('backend')) return Monitor;
    if (techLower.includes('security') || techLower.includes('auth')) return Shield;
    return Globe;
  };

  // Helper function to format results data
  const formatResults = (results: { [key: string]: string }) => {
    return Object.entries(results).map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      return {
        key: formattedKey,
        value: value,
        description: getResultDescription(key)
      };
    });
  };

  // Helper function to get result descriptions
  const getResultDescription = (key: string) => {
    const descriptions: { [key: string]: string } = {
      vehicleSales: "Increase in vehicle sales through improved user experience and streamlined processes",
      userEngagement: "Higher user engagement rates with interactive features and optimized user flows",
      dealerSatisfaction: "Dealer satisfaction rate with the new platform and improved functionality",
      conversionRate: "Improvement in conversion rates through better design and user experience",
      pageViews: "Increase in page views and user interaction with the redesigned interface",
      loadTime: "Reduction in page load times through optimized code and performance improvements",
      userRetention: "Better user retention rates with improved functionality and user experience",
      revenue: "Revenue growth achieved through digital transformation and optimized processes"
    };
    return descriptions[key] || "Significant improvement in key performance metrics";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-[#F5E7D3] flex items-center justify-center">
        <div className="md:text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#F5E7D3] mx-auto mb-4"></div>
          <p className="text-xl">Loading case study...</p>
        </div>
      </div>
    );
  }

  // Error state with better UX
  if (error || !caseStudy) {
    return (
      <>
        <DynamicSEO
          pageName="caseStudyDetail"
          customData={{
            title: "Case Study Not Found | MkRonix",
            description: "The requested case study could not be found. Explore our other successful projects and case studies.",
          }}
        />
        <div className="min-h-screen bg-black text-[#F5E7D3] flex items-center justify-center px-4">
          <div className="md:md:text-center max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-black mb-4">Case Study Not Found</h1>
            <p className="text-[#F5E7D3]/80 mb-8">
              The case study you're looking for doesn't exist or may have been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/case-studies')}
                className="bg-[#F5E7D3] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors duration-300 flex items-center gap-2 justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </button>
              <Link
                to="/"
                className="border border-[#F5E7D3]/20 text-[#F5E7D3] px-6 py-3 rounded-full font-bold hover:border-[#F5E7D3] hover:text-[#F5E7D3] transition-colors duration-300 flex items-center gap-2 justify-center"
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

  const formattedResults = formatResults(caseStudy.results);

  return (
    <>
      <DynamicSEO
        pageName="caseStudyDetail"
        customData={{
          title: `${caseStudy.title} - Case Study | MkRonix`,
          description: `${caseStudy.shortDescription} Learn how MkRonix helped ${caseStudy.client} achieve remarkable results in ${caseStudy.industry.toLowerCase()}.`,
          keywords: `${caseStudy.title.toLowerCase()}, ${caseStudy.industry.toLowerCase()} case study, ${caseStudy.technologies.join(', ').toLowerCase()}`,
          url: `https://mkronix.com/case-studies/${slug}`,
          image: `https://mkronix.com${caseStudy.mainImage}`,
          articleData: {
            publishedTime: `${caseStudy.year}-01-01T08:00:00Z`,
            modifiedTime: new Date().toISOString(),
            author: "MkRonix Team",
            section: "Case Studies"
          }
        }}
      />

      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h1>{caseStudy.title} - Detailed Case Study by MkRonix</h1>
        <p>{caseStudy.description}</p>
        <span>Client: {caseStudy.client} | Category: {caseStudy.category} | Year: {caseStudy.year}</span>
        <span>Technologies: {caseStudy.technologies.join(', ')}</span>
      </div>

      <div ref={containerRef} className="bg-black text-[#F5E7D3] overflow-x-hidden">
        {/* Enhanced Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        >
          <BoxesLayer gridColor="#484440" />

          <div ref={heroRef} className="relative z-10 md:text-center max-w-6xl mx-auto py-10">

            <div
              className="mb-8"
            >
              {/* Status & Category Badge */}
              <div className="flex items-center md:justify-center gap-4 mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5E7D3]/10 backdrop-blur-sm border border-[#F5E7D3]/20 rounded-full"
                >
                  <Award className="w-4 h-4 text-[#F5E7D3]" />
                  <span className="text-[#F5E7D3] text-sm font-medium">{caseStudy.category}</span>
                </div>

                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-full ${caseStudy.status === 'completed'
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                    }`}
                >
                  <div className={`w-2 h-2 rounded-full ${caseStudy.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></div>
                  <span className="text-sm font-medium capitalize">{caseStudy.status}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-[#F5E7D3]">
                {caseStudy.title}
              </h1>

              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-[#F5E7D3]/80 mb-8 font-medium">
                {caseStudy.subtitle}
              </p>

              {/* Enhanced Project Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {[
                  { icon: Users, label: "Client", value: caseStudy.client },
                  { icon: Calendar, label: "Year", value: caseStudy.year },
                  { icon: Clock, label: "Duration", value: caseStudy.duration },
                  { icon: Target, label: "Team Size", value: caseStudy.teamSize }
                ].map((meta, index) => (
                  <div
                    key={meta.label}
                    className="bg-[#F5E7D3]/5 backdrop-blur-sm border border-[#F5E7D3]/10 p-4 md:p-6 rounded-2xl hover:border-[#F5E7D3]/30 transition-all duration-300 group text-center"
                  >
                    <meta.icon className="w-6 h-6 text-[#F5E7D3] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-[#F5E7D3]/60 text-lg mb-1">{meta.label}</p>
                    <p className="font-bold text-[#F5E7D3] group-hover:text-white transition-colors duration-300">{meta.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Hero Image with Gallery */}
        <section className="px-4 md:py-20 py-10">
          <div className="max-w-6xl mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden aspect-video group mb-8"
            >
              {/* Main Image */}
              <img
                src={caseStudy.mainImage}
                alt={caseStudy.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Tech Stack Pills */}
              <div className="max-md:hidden absolute bottom-6 left-6 flex flex-wrap gap-2">
                {caseStudy.technologies.slice(0, 6).map((tech, index) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-black/70 backdrop-blur-sm text-[#F5E7D3] rounded-full text-sm font-medium border border-[#F5E7D3]/20 hover:border-[#F5E7D3]/40 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex gap-3">
                <button
                  className="w-12 h-12 bg-black/70 backdrop-blur-sm border border-[#F5E7D3]/20 rounded-full flex items-center justify-center text-[#F5E7D3] hover:text-white hover:border-[#F5E7D3]/40 transition-all duration-300"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: caseStudy.title,
                        text: caseStudy.description,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Gallery Images */}
            {caseStudy.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {caseStudy.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`${caseStudy.title} gallery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Overview Section */}
        <section className="px-4 py-20 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div
              className="content-section md:text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#F5E7D3]">
                Project <span className="text-[#F5E7D3]">Overview</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-3xl mx-auto leading-relaxed">
                {caseStudy.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Challenge */}
              <div
                className="content-section"
              >
                <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-[#F5E7D3]/20 p-4 md:p-8 rounded-3xl h-full hover:border-red-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-black text-[#F5E7D3]">The Challenge</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-[#F5E7D3]/80 group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                    {caseStudy.challenge}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div
                className="content-section"
              >
                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-[#F5E7D3]/20 p-4 md:p-8 rounded-3xl h-full hover:border-green-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-black text-[#F5E7D3]">Our Solution</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-[#F5E7D3]/80 group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div
              className="content-section"
            >
              <h3 className="text-3xl font-black mb-8 md:text-center text-[#F5E7D3]">Key Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudy.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[#F5E7D3]/5 border border-[#F5E7D3]/20 p-6 rounded-2xl hover:border-[#F5E7D3]/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F5E7D3]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-[#F5E7D3]" />
                      </div>
                      <p className="text-[#F5E7D3]/80 group-hover:text-[#F5E7D3] transition-colors duration-300">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Process Section */}
        <section className="px-4 py-20 bg-black">
          <div className="max-w-6xl mx-auto">
            <div
              className="md:text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#F5E7D3]">
                Development <span className="text-[#F5E7D3]">Process</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Our systematic approach to delivering exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caseStudy.process.map((phase, index) => (
                <div
                  key={index}
                  className="content-section relative bg-gradient-to-br from-[#F5E7D3]/10 to-[#F5E7D3]/5 border border-[#F5E7D3]/20 p-4 md:p-8 rounded-3xl hover:border-[#F5E7D3]/40 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#F5E7D3]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F5E7D3]/20 transition-colors duration-300">
                      <span className="text-2xl font-bold text-[#F5E7D3]">{index + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                      {phase.phase}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-[#F5E7D3]/60" />
                      <span className="text-base text-[#F5E7D3]/60">{phase.duration}</span>
                    </div>
                    <p className="text-[#F5E7D3]/80 text-lg leading-relaxed group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                      {phase.description}
                    </p>
                  </div>

                  {/* Connection Line */}
                  {index < caseStudy.process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#F5E7D3]/20"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Technologies Section */}
        <section className="px-4 py-20 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <div
              className="md:text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#F5E7D3]">
                Technologies <span className="text-[#F5E7D3]">& Tools</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Cutting-edge technologies that powered this project
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {caseStudy.technologies.map((tech, index) => {
                const IconComponent = getTechIcon(tech);
                return (
                  <div
                    key={index}
                    className="content-section bg-gradient-to-br from-[#F5E7D3]/10 to-[#F5E7D3]/5 border border-[#F5E7D3]/20 p-4 md:p-6 rounded-2xl md:text-center hover:border-[#F5E7D3]/40 transition-all duration-300 group text-center"
                  >
                    <div className="w-12 h-12 bg-[#F5E7D3]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#F5E7D3]/20 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-[#F5E7D3]" />
                    </div>
                    <span className="font-bold text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Results Section with Metrics */}
        <section className="px-4 py-20 bg-black">
          <div className="max-w-6xl mx-auto">
            <div
              className="md:text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-[#F5E7D3]">
                Measurable <span className="text-[#F5E7D3]">Results</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80">
                Data-driven outcomes that exceeded expectations
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-8 mb-16">
              {caseStudy.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="content-section bg-gradient-to-br from-[#F5E7D3]/10 to-[#F5E7D3]/5 backdrop-blur-sm border border-[#F5E7D3]/20 p-4 md:p-8 rounded-3xl group hover:border-[#F5E7D3]/40 transition-all duration-500 md:text-center"
                >
                  <div className="md:mb-4">
                    <div className="text-2xl md:text-5xl font-black text-[#F5E7D3] mb-2 group-hover:text-white transition-colors duration-300">
                      <span className="metric-counter" data-target={metric.value}>
                        {metric.value}
                      </span>
                    </div>
                    {metric.growth && (
                      <div className="flex items-center md:justify-center gap-2 text-green-400 max-md:mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{metric.growth}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#F5E7D3]/80 group-hover:text-[#F5E7D3] transition-colors duration-300">
                    {metric.label}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonial Section */}
        <section className="px-4 py-20 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto">
            <div
              className="content-section bg-gradient-to-br from-[#F5E7D3]/10 to-[#F5E7D3]/5 border border-[#F5E7D3]/20 p-4 md:p-12 rounded-3xl md:text-center hover:border-[#F5E7D3]/40 transition-all duration-500"
            >
              <Quote className="w-12 h-12 text-[#F5E7D3] md:mx-auto mb-8" />

              {/* Rating Stars */}
              <div className="flex items-center md:justify-center gap-1 mb-6">
                {[...Array(caseStudy.testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl md:text-3xl text-[#F5E7D3]/90 mb-8 leading-relaxed font-medium">
                "{caseStudy.testimonial.quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-[#F5E7D3] rounded-full flex items-center justify-center">
                  <img
                    src={caseStudy.testimonial.avatar}
                    alt={caseStudy.testimonial.author}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      if (e.target instanceof HTMLImageElement) {
                        e.target.style.display = 'none';
                        const sibling = e.target.nextElementSibling as HTMLElement;
                        if (sibling) {
                          sibling.style.display = 'flex';
                        }
                      }
                    }}
                  />
                  <span className="text-black font-bold text-lg hidden">
                    {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#F5E7D3] text-lg">
                    {caseStudy.testimonial.author}
                  </div>
                  <div className="text-[#F5E7D3]/60">
                    {caseStudy.testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        {caseStudy.awards.length > 0 && (
          <section className="px-4 py-20 bg-black">
            <div className="max-w-6xl mx-auto">
              <div
                className="md:text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#F5E7D3]">
                  Awards & <span className="text-[#F5E7D3]">Recognition</span>
                </h2>
              </div>

              <div className="flex md:flex-wrap flex-col items-center justify-center gap-8">
                {caseStudy.awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-[#F5E7D3]/5 border border-[#F5E7D3]/20 px-6 py-4 rounded-2xl hover:border-[#F5E7D3]/40 transition-all duration-300 max-md:w-full"
                  >
                    <Trophy className="w-6 h-6 text-[#F5E7D3]" />
                    <span className="text-[#F5E7D3] font-medium">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Case Studies */}
        {relatedStudies.length > 0 && (
          <section className="px-4 py-20 bg-[#0a0a0a]">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-4xl md:text-5xl font-black md:text-center mb-16 text-[#F5E7D3]"
              >
                Related <span className="text-[#F5E7D3]">Projects</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedStudies.map((study, index) => (
                  <div
                    key={study.id}
                    className="content-section bg-[#F5E7D3]/5 border border-[#F5E7D3]/20 rounded-2xl overflow-hidden hover:border-[#F5E7D3]/40 transition-all duration-300 group cursor-pointer"
                    onClick={() => {
                      navigate(`/case-studies/${study.slug}`);
                    }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={study.mainImage}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/projects/p1.png';
                        }}
                      />
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-[#F5E7D3]/10 border border-[#F5E7D3]/20 rounded-full text-[#F5E7D3] text-xs font-medium">
                          {study.category}
                        </span>
                        <span className="text-[#F5E7D3]/60 text-sm">{study.year}</span>
                      </div>
                      <h3 className="text-xl font-black text-[#F5E7D3] mb-2 group-hover:text-white transition-colors duration-300">
                        {study.title}
                      </h3>
                      <p className="text-[#F5E7D3]/80 text-sm mb-4 line-clamp-2">
                        {study.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#F5E7D3]/60 text-sm">
                          {study.client}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#F5E7D3]/60 group-hover:text-[#F5E7D3] transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Enhanced CTA Section */}
        <section className="px-4 py-32 bg-black">
          <div className="max-w-4xl mx-auto md:text-center">
            <div
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-[#F5E7D3]">
                Ready for Your <span className="text-[#F5E7D3]">Success Story?</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 mb-12">
                Let's create something extraordinary together
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="group relative bg-[#F5E7D3] text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300"
                  onClick={() => {
                    navigate('/contact');
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    <Rocket className="w-5 h-5" />
                    Start Your Project
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </button>

                <button
                  className="group border-2 border-[#F5E7D3]/20 text-[#F5E7D3] px-8 py-4 rounded-full font-bold hover:border-[#F5E7D3] hover:bg-[#F5E7D3] hover:text-black transition-all duration-300"
                  onClick={() => {
                    navigate('/case-studies');
                  }}
                >
                  <span className="flex items-center gap-2 justify-center">
                    <Eye className="w-5 h-5" />
                    View More Cases
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudyDetail;