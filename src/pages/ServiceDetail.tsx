
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Check, ChevronDown, ChevronUp, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DynamicSEO } from '../components/SEO/DynamicSEO';
import { useLoading } from '../contexts/LoadingContext';
// Import the services data directly
import servicesData from '../data/detailedServicesData.json';

interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  overview: {
    title: string;
    content: string;
    highlights: string[];
  };
  services: Array<{
    name: string;
    description: string;
    features: string[];
    image: string;
  }>;
  technologies: Array<{
    category: string;
    items: string[];
  }>;
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  pricing: {
    starting: string;
    popular: string;
    enterprise: string;
    note: string;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    localKeywords: string[];
  };
}

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const { setLoading: setGlobalLoading } = useLoading();

  useEffect(() => {
    const loadService = () => {
      try {
        if (!slug) {
          setError('Service not found');
          setLoading(false);
          setGlobalLoading(false);
          return;
        }

        console.log('Looking for service with slug:', slug);
        console.log('Available services:', servicesData.services.map(s => s.slug));

        const foundService = servicesData.services.find(s => s.slug === slug);

        if (!foundService) {
          console.log('Service not found for slug:', slug);
          setError('Service not found');
        } else {
          console.log('Found service:', foundService.title);
          setService(foundService);
        }
      } catch (err) {
        console.error('Error loading service:', err);
        setError('Failed to load service details');
      } finally {
        setLoading(false);
        // Don't set global loading to false here, let the context handle it
      }
    };

    // Load service immediately without delay
    loadService();
  }, [slug, setGlobalLoading]);

  const handleImageError = (imageSrc: string) => {
    setImageLoadErrors(prev => new Set(prev).add(imageSrc));
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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

      <div className="bg-black text-[#F5E7D3] min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0">
            {!imageLoadErrors.has(service.heroImage) ? (
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover opacity-20"
                onError={() => handleImageError(service.heroImage)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#F5E7D3]/10 to-[#F5E7D3]/5" />
            )}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative container mx-auto px-4 py-20">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#F5E7D3]/70 hover:text-[#F5E7D3] transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-[#F5E7D3]/80 mb-8 font-light">
                {service.subtitle}
              </p>
              <p className="text-lg text-[#F5E7D3]/70 max-w-2xl">
                {service.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {service.overview.title}
                </h2>
                <p className="text-[#F5E7D3]/80 text-lg mb-8 leading-relaxed">
                  {service.overview.content}
                </p>
              </div>

              <div className="space-y-4">
                {service.overview.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 bg-[#F5E7D3]/5 rounded-lg border border-[#F5E7D3]/20"
                  >
                    <Check className="w-6 h-6 text-[#F5E7D3] flex-shrink-0" />
                    <span className="text-[#F5E7D3]/90">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 bg-[#F5E7D3]/5">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
              <p className="text-[#F5E7D3]/80 text-lg max-w-2xl mx-auto">
                Comprehensive solutions tailored to your specific needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.services.map((serviceItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/50 rounded-2xl p-6 border border-[#F5E7D3]/20 hover:border-[#F5E7D3]/40 transition-all duration-300 group"
                >
                  <div className="mb-6 aspect-video rounded-lg overflow-hidden">
                    {!imageLoadErrors.has(serviceItem.image) ? (
                      <img
                        src={serviceItem.image}
                        alt={serviceItem.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError(serviceItem.image)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#F5E7D3]/20 to-[#F5E7D3]/10 flex items-center justify-center">
                        <Award className="w-12 h-12 text-[#F5E7D3]/30" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3">{serviceItem.name}</h3>
                  <p className="text-[#F5E7D3]/80 mb-4">{serviceItem.description}</p>

                  <ul className="space-y-2">
                    {serviceItem.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-[#F5E7D3]/70">
                        <Check className="w-4 h-4 text-[#F5E7D3]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Technologies We Use</h2>
              <p className="text-[#F5E7D3]/80 text-lg max-w-2xl mx-auto">
                Cutting-edge tools and technologies for superior results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.technologies.map((techCategory, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#F5E7D3]/5 rounded-xl p-6 border border-[#F5E7D3]/20"
                >
                  <h3 className="text-xl font-bold mb-4">{techCategory.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {techCategory.items.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-[#F5E7D3]/10 text-[#F5E7D3]/80 rounded-full text-sm border border-[#F5E7D3]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-4 bg-[#F5E7D3]/5">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
              <p className="text-[#F5E7D3]/80 text-lg max-w-2xl mx-auto">
                A proven methodology that delivers exceptional results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-[#F5E7D3] text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-[#F5E7D3]/80 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Investment Options</h2>
              <p className="text-[#F5E7D3]/80 text-lg mb-12 max-w-2xl mx-auto">
                Flexible pricing to match your project requirements and budget
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-[#F5E7D3]/5 rounded-xl p-6 border border-[#F5E7D3]/20">
                  <h3 className="text-lg font-bold mb-2">Starter</h3>
                  <div className="text-2xl font-bold mb-4">{service.pricing.starting}</div>
                  <p className="text-[#F5E7D3]/70 text-sm">Perfect for small projects</p>
                </div>

                <div className="bg-[#F5E7D3]/10 rounded-xl p-6 border-2 border-[#F5E7D3]/40 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#F5E7D3] text-black px-3 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Professional</h3>
                  <div className="text-2xl font-bold mb-4">{service.pricing.popular}</div>
                  <p className="text-[#F5E7D3]/70 text-sm">Most comprehensive solution</p>
                </div>

                <div className="bg-[#F5E7D3]/5 rounded-xl p-6 border border-[#F5E7D3]/20">
                  <h3 className="text-lg font-bold mb-2">Enterprise</h3>
                  <div className="text-2xl font-bold mb-4">{service.pricing.enterprise}</div>
                  <p className="text-[#F5E7D3]/70 text-sm">Tailored for large projects</p>
                </div>
              </div>

              <p className="text-[#F5E7D3]/60 text-sm italic">{service.pricing.note}</p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-[#F5E7D3]/5">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-[#F5E7D3]/80 text-lg">
                Get answers to common questions about our services
              </p>
            </motion.div>

            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/50 rounded-xl border border-[#F5E7D3]/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-[#F5E7D3]/5 transition-colors"
                  >
                    <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#F5E7D3]/70 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#F5E7D3]/70 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-[#F5E7D3]/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#F5E7D3]/10 to-[#F5E7D3]/5 rounded-2xl p-12 border border-[#F5E7D3]/20"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {service.cta.title}
              </h2>
              <p className="text-[#F5E7D3]/80 text-lg mb-8 max-w-2xl mx-auto">
                {service.cta.description}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#F5E7D3] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#F5E7D3]/90 transition-colors text-lg"
              >
                {service.cta.buttonText}
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceDetail;
