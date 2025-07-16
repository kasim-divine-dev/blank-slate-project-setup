
import { ArrowLeft, ArrowUpRight, Award, Check, ChevronDown, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { useLoading } from '../contexts/LoadingContext';
// Import the services data directly
import BoxesLayer from '@/components/BoxesLayer/BoxesLayer';
import { Service } from '@/types/types';
import servicesData from '../data/detailedServicesData.json';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const { setLoading: setGlobalLoading } = useLoading();


  const handleImageError = (imageSrc: string) => {
    setImageLoadErrors(prev => new Set(prev).add(imageSrc));
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  useEffect(() => {
    const loadService = () => {
      try {
        if (!slug) {
          setError('Service not found');
          setLoading(false);
          setGlobalLoading(false);
          return;
        }

        const foundService = servicesData.services.find(s => s.slug === slug);

        if (!foundService) {
          setError('Service not found');
        } else {
          setService(foundService);
        }
      } catch (err) {
        setError('Failed to load service details');
      } finally {
        setLoading(false);
        // Don't set global loading to false here, let the context handle it
      }
    };

    // Load service immediately without delay
    loadService();
  }, [slug, setGlobalLoading]);


  if (loading) {
    return null; // Let the global loader handle this
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-[#F5E7D3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-12 h-12 text-[#F5E7D3]/50" />
          </div>
          <h1 className="text-2xl font-bold text-[#F5E7D3] mb-4">Service Not Found</h1>
          <p className="text-[#F5E7D3]/70 mb-8">
            {error || 'The service you\'re looking for doesn\'t exist or has been moved.'}
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-[#F5E7D3] text-black px-6 py-3 rounded-lg hover:bg-[#F5E7D3]/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <DynamicSEO
        pageName="serviceDetail"
        customData={{
          title: service.seo.metaTitle,
          description: service.seo.metaDescription,
          keywords: service.seo.keywords,
          url: `https://mkronix.com/services/${service.slug}`,
          breadcrumb: [
            { name: "Home", url: "https://mkronix.com" },
            { name: "Services", url: "https://mkronix.com/services" },
            { name: service.title, url: `https://mkronix.com/services/${service.slug}` }
          ]
        }}
      />

      <div className="bg-black text-[#F5E7D3] overflow-x-hidden">
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex items-center"
        >
          <BoxesLayer gridColor="#484440" />

          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            {!imageLoadErrors.has(service.heroImage) ? (
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover opacity-10"
                onError={() => handleImageError(service.heroImage)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#484440]/20 to-[#1D1C1C]/20" />
            )}
            <div className="absolute inset-0 bg-black/80" />
          </div>

          {/* Background Animation */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 70%, rgba(72, 68, 64, 0.3), transparent 50%),
                       radial-gradient(circle at 70% 30%, rgba(72, 68, 64, 0.2), transparent 50%)`
            }}
          />

          <div className="relative container mx-auto px-4 py-20 z-10">
            <div
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[#F5E7D3]/70 hover:text-[#F5E7D3] transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Services
              </Link>
            </div>

            <div
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-[#F5E7D3]/80 mb-8 font-light leading-relaxed">
                {service.subtitle}
              </p>
              <p className="text-lg text-[#F5E7D3]/70 max-w-2xl leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-32 px-4 bg-[#1D1C1C]/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div
                className="animate-card"
              >
                <h2 className="text-3xl md:text-5xl font-black mb-6">
                  {service.overview.title}
                </h2>
                <p className="text-[#F5E7D3]/80 text-lg mb-8 leading-relaxed">
                  {service.overview.content}
                </p>
              </div>

              <div className="space-y-4">
                {service.overview.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="animate-card flex items-center gap-4 p-6 bg-black/50 backdrop-blur-sm rounded-2xl border border-[#484440]/30 hover:border-[#F5E7D3]/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#F5E7D3] text-black rounded-xl flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6" />
                    </div>
                    <span className="text-[#F5E7D3]/90 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <div
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Our <span className="text-[#484440]">Services</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Comprehensive solutions tailored to your specific needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.services.map((serviceItem, index) => (
                <div
                  key={index}
                  className="animate-card group bg-[#1D1C1C]/50 backdrop-blur-sm rounded-3xl p-8 border border-[#484440]/30 hover:border-[#F5E7D3]/50 transition-all duration-500"
                >
                  <div className="mb-6 aspect-video rounded-2xl overflow-hidden">
                    {!imageLoadErrors.has(serviceItem.image) ? (
                      <img
                        src={serviceItem.image}
                        alt={serviceItem.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={() => handleImageError(serviceItem.image)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#484440]/30 to-[#1D1C1C]/30 flex items-center justify-center">
                        <Award className="w-12 h-12 text-[#F5E7D3]/30" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                    {serviceItem.name}
                  </h3>
                  <p className="text-[#F5E7D3]/80 mb-6 leading-relaxed">
                    {serviceItem.description}
                  </p>

                  <div className="space-y-3">
                    {serviceItem.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-sm text-[#F5E7D3]/70">
                        <div className="w-2 h-2 bg-[#F5E7D3] rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-32 px-4 bg-[#1D1C1C]/30">
          <div className="container mx-auto max-w-6xl">
            <div
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Technologies <span className="text-[#484440]">We Use</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Cutting-edge tools and technologies for superior results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.technologies.map((techCategory, index) => (
                <div
                  key={index}
                  className="animate-card bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-[#484440]/30 hover:border-[#F5E7D3]/50 transition-all duration-500"
                >
                  <h3 className="text-2xl font-bold mb-6">{techCategory.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {techCategory.items.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-[#F5E7D3]/10 text-[#F5E7D3]/80 rounded-full text-sm border border-[#F5E7D3]/20 hover:border-[#F5E7D3]/50 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <div
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Our <span className="text-[#484440]">Process</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                A proven methodology that delivers exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <div
                  key={index}
                  className="animate-card text-center group"
                >
                  <div
                    className="w-20 h-20 bg-[#F5E7D3] text-black rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#F5E7D3]/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-32 px-4 bg-[#1D1C1C]/30">
          <div className="container mx-auto max-w-5xl">
            <div
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Investment <span className="text-[#484440]">Options</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Flexible pricing to match your project requirements and budget
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { name: "Starter", price: service.pricing.starting, desc: "Perfect for small projects", popular: false },
                { name: "Professional", price: service.pricing.popular, desc: "Most comprehensive solution", popular: true },
                { name: "Enterprise", price: service.pricing.enterprise, desc: "Tailored for large projects", popular: false }
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`animate-card relative rounded-3xl p-8 border transition-all duration-500 ${plan.popular
                    ? 'bg-[#F5E7D3]/10 border-[#F5E7D3]/50 scale-105'
                    : 'bg-black/50 border-[#484440]/30 hover:border-[#F5E7D3]/50'
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#F5E7D3] text-black px-6 py-2 rounded-full text-sm font-bold">
                        POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                    <div className="text-4xl font-black mb-4">{plan.price}</div>
                    <p className="text-[#F5E7D3]/70">{plan.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="text-center text-[#F5E7D3]/60 italic"
            >
              {service.pricing.note}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-4">
          <div className="container mx-auto max-w-4xl">
            <div
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Frequently Asked <span className="text-[#484440]">Questions</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80">
                Get answers to common questions about our services
              </p>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="animate-card bg-[#1D1C1C]/50 backdrop-blur-sm rounded-2xl border border-[#484440]/30 overflow-hidden hover:border-[#F5E7D3]/50 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-[#F5E7D3]/5 transition-colors duration-300"
                  >
                    <h3 className="font-bold text-lg pr-4">{faq.question}</h3>
                    <div

                    >
                      <ChevronDown className="w-6 h-6 text-[#F5E7D3]/70 flex-shrink-0" />
                    </div>
                  </button>

                  {expandedFaq === index && (
                    <div
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-[#F5E7D3]/80 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 bg-[#1D1C1C]/50">
          <div className="container mx-auto max-w-4xl text-center">
            <div
              className="relative bg-gradient-to-br from-[#484440]/20 to-[#1D1C1C]/20 backdrop-blur-sm rounded-3xl p-12 border border-[#484440]/30 overflow-hidden"
            >

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  {service.cta.title}
                </h2>
                <p className="text-xl text-[#F5E7D3]/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                  {service.cta.description}
                </p>

                <div
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 bg-[#F5E7D3] text-black px-12 py-6 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 shadow-2xl"
                  >
                    {service.cta.buttonText}
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetail;
