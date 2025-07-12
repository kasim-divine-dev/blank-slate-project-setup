
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContactHero } from '../components/Contact/ContactHero';
import { ContactInfo } from '../components/Contact/ContactInfo';
import { ContactForm } from '../components/Contact/ContactForm';
import { DynamicSEO } from '../components/SEO/DynamicSEO';

const ContactUs: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const formFields = document.querySelectorAll('.form-field');
    formFields.forEach((field, index) => {
      gsap.fromTo(field, {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: field,
          start: "top 80%"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <DynamicSEO pageName="contact" />
      
      {/* Hidden SEO Content */}
      <div className="sr-only">
        <h1>Contact MkRonix - Free Consultation for Web Development & Digital Marketing India</h1>
        <p>Get in touch with India's leading creative digital agency. Free consultation available for web development, UI/UX design, mobile apps, and digital marketing services.</p>
        <span>Phone: +91-84-59258801 | Email: hello@mkronix.com</span>
        <span>Address: Kadiwala Compound, Rasulpur, Sidhpur, Gujarat 384290, India</span>
        <span>Services: Web Development, UI/UX Design, Mobile App Development, Digital Marketing, SEO</span>
        <span>Business Hours: Monday-Friday 9AM-6PM, Saturday 10AM-4PM IST</span>
        <span>Coverage: Mumbai, Delhi, Bangalore, Ahmedabad, Surat, Rajkot, Gujarat, India</span>
      </div>

      <div className="bg-black text-[#F5E7D3] font-boska overflow-x-hidden">
        <ContactHero />
        <ContactInfo />
        <ContactForm />

        {/* Location Section */}
        <section className="py-32 px-4 bg-[#1D1C1C]/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Find <span className="text-[#484440]">Us</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80">Visit our creative studio in Gujarat, India</p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative z-10 text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#1D1C1C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  >
                    <MapPin className="w-8 h-8 text-[#F5E7D3]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                    MkRonix Studio
                  </h3>
                  <p className="text-[#F5E7D3]/80 mb-4 group-hover:text-[#F5E7D3] transition-colors duration-300">
                    Kadiwala Compound, Rasulpur<br />
                    Sidhpur, Gujarat 384290<br />
                    India
                  </p>
                  <p className="text-[#F5E7D3]/60 group-hover:text-[#F5E7D3]/80 transition-colors duration-300">
                    Our creative headquarters
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8">
                Ready to Create <span className="text-[#484440]">Magic?</span>
              </h2>
              <p className="text-xl text-[#F5E7D3]/80 mb-12 max-w-2xl mx-auto">
                Your next breakthrough is just a conversation away. Let's turn your vision into reality.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  className="group relative bg-[#F5E7D3] text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Schedule a Call
                  </span>
                </motion.button>

                <motion.button
                  className="group border-2 border-[#484440] text-[#F5E7D3] px-8 py-4 rounded-full font-bold hover:border-[#F5E7D3] hover:bg-[#F5E7D3] hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Send Email
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
