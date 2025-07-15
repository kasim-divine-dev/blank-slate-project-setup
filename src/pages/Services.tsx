
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ServicesHero } from '../components/Services/ServicesHero';
import { ServicesList } from '../components/Services/ServicesList';
import GetInTouch from '../components/GetInTouch/GetInTouch';
import { DynamicSEO } from '../components/SEO/DynamicSEO';

const Services = () => {
  const serviceLinks = [
    {
      title: "Web Development",
      slug: "web-development",
      description: "Custom websites and web applications"
    },
    {
      title: "UI/UX Design", 
      slug: "ui-ux-design",
      description: "User-centered design solutions"
    },
    {
      title: "Mobile Development",
      slug: "mobile-development", 
      description: "Native and cross-platform apps"
    },
    {
      title: "Identity & Branding",
      slug: "identity-branding",
      description: "Brand strategy and visual identity"
    }
  ];

  return (
    <>
      <DynamicSEO pageName="services" />
      
      <div className="bg-black text-[#F5E7D3]">
        <ServicesHero />
        <ServicesList />
        
        {/* Detailed Services Links Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Explore Our <span className="text-white">Services</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
                Get detailed information about each service we offer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {serviceLinks.map((service, index) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group bg-[#F5E7D3]/5 rounded-2xl p-6 border border-[#F5E7D3]/20 hover:border-[#F5E7D3]/40 transition-all duration-300 hover:bg-[#F5E7D3]/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[#F5E7D3]/70 group-hover:text-[#F5E7D3]/90 transition-colors">
                        {service.description}
                      </p>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-[#F5E7D3]/50 group-hover:text-[#F5E7D3] group-hover:transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <GetInTouch />
      </div>
    </>
  );
};

export default Services;
