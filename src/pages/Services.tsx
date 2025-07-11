
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play } from 'lucide-react';

const Services: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      number: "01",
      title: "Graphic Design",
      description: "Creating visually compelling designs that communicate your brand message effectively across all mediums.",
      image: "/images/carousel/architect.png"
    },
    {
      number: "02", 
      title: "UI/UX Design",
      description: "Designing intuitive user experiences that engage and delight users while achieving business objectives.",
      image: "/images/carousel/architect.png"
    },
    {
      number: "03",
      title: "Branding",
      description: "Building strong brand identities that resonate with your target audience and stand out in the market.",
      image: "/images/carousel/architect.png"
    },
    {
      number: "04",
      title: "Motion Graphic",
      description: "Creating dynamic visual content that brings your brand to life through animation and motion design.",
      image: "/images/carousel/architect.png"
    }
  ];

  const workProcess = [
    {
      number: "01",
      title: "Research and Analyze",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mauris auctor mauris nec rhoncus sed vehicula mauris vitae volutpat tellus mauris nec felis non lacus.",
    },
    {
      number: "02", 
      title: "Design Process",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mauris auctor mauris nec rhoncus sed vehicula mauris vitae volutpat tellus mauris nec felis non lacus.",
    },
    {
      number: "03",
      title: "Deliver & Payment",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit mauris auctor mauris nec rhoncus sed vehicula mauris vitae volutpat tellus mauris nec felis non lacus.",
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services - Mkronix | Web Design & Development Agency India</title>
        <meta name="description" content="Comprehensive digital services including web development, UI/UX design, mobile apps, and digital marketing. Transform your business with Mkronix creative solutions." />
        <meta name="keywords" content="web development India, UI UX design, mobile app development, digital marketing, SEO services, brand identity design" />
        <meta property="og:title" content="Digital Services - Mkronix Creative Agency" />
        <meta property="og:description" content="From web development to digital marketing, explore our comprehensive range of creative digital services." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/services" />
      </Helmet>

      <main className="bg-black text-[#F5E7D3] font-boska overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div ref={heroRef} className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-[#F5E7D3]/60 mb-4 uppercase tracking-wider">Our Services</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Services We Offer
            </h1>
            <p className="text-lg text-[#F5E7D3]/80 max-w-2xl mx-auto">
              Learn more about the services and the team behind it
            </p>
          </div>
        </section>

        {/* Hero Video Section */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 aspect-video">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <span className="px-4 py-2 bg-[#1D1C1C] rounded-full text-sm">Design</span>
              <span className="px-4 py-2 bg-[#1D1C1C] rounded-full text-sm">Development</span>
              <span className="px-4 py-2 bg-[#1D1C1C] rounded-full text-sm">Digital Marketing</span>
              <span className="px-4 py-2 bg-[#1D1C1C] rounded-full text-sm">SEO</span>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                className="group border-b border-[#484440] py-8 flex items-center justify-between hover:bg-[#1D1C1C]/50 px-6 -mx-6 rounded-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-8">
                  <span className="text-4xl font-bold text-[#484440] group-hover:text-[#F5E7D3] transition-colors">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#F5E7D3]/70 max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Work Process Section */}
        <section className="px-4 py-20 bg-[#1D1C1C]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm text-[#F5E7D3]/60 mb-4 uppercase tracking-wider">Our Values</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                How we work at Untitled
              </h2>
              <p className="text-[#F5E7D3]/80">
                Our shared values keep us connected and guide us as one team.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {workProcess.map((process, index) => (
                <motion.div
                  key={process.number}
                  className="bg-black p-8 rounded-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-[#484440] rounded-lg flex items-center justify-center mb-6">
                    <span className="text-white font-bold">{process.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{process.title}</h3>
                  <p className="text-[#F5E7D3]/70 text-sm leading-relaxed">
                    {process.description}
                  </p>
                  <ArrowUpRight className="w-5 h-5 mt-6 opacity-50" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Join 2,000+ subscribers
                </h2>
                <p className="text-[#F5E7D3]/80">
                  Stay in the loop with everything you need to know.
                </p>
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-80 px-4 py-3 bg-white text-black rounded-full placeholder:text-gray-500 focus:outline-none"
                />
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            
            <p className="text-xs text-[#F5E7D3]/60 mt-4">
              We care about your data in our{' '}
              <a href="#" className="underline hover:no-underline">
                privacy policy
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
