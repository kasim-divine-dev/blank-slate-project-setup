
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactUs: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@mkronix.com", "projects@mkronix.com"],
      description: "Drop us a line anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 87654 32109"],
      description: "Available 24/7 for urgent projects"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Mumbai, Maharashtra", "Bangalore, Karnataka"],
      description: "Our creative studios in India"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 7:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "We're here when you need us"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Mkronix | Get In Touch With Creative Agency India</title>
        <meta name="description" content="Ready to start your project? Contact Mkronix creative agency in India. We offer web development, design, and digital marketing services worldwide." />
        <meta name="keywords" content="contact creative agency India, web development inquiry, design consultation, digital marketing contact, project quote" />
        <meta property="og:title" content="Contact Mkronix - Let's Create Something Amazing" />
        <meta property="og:description" content="Get in touch with our creative team to discuss your next digital project." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <main className="bg-darkBg text-darkText font-boska overflow-x-hidden">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div ref={heroRef} className="max-w-6xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-boska-black mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Let's <span className="text-lightText">Connect</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-darkText80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ready to bring your vision to life? We'd love to hear about your project and explore how we can create something extraordinary together.
            </motion.p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-20 bg-darkText20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-lightText flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-8 h-8 text-darkBg" />
                  </div>
                  <h3 className="text-2xl font-boska-bold mb-4">{info.title}</h3>
                  <div className="space-y-2 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-darkText80">{detail}</p>
                    ))}
                  </div>
                  <p className="text-darkText60 text-sm">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="bg-darkText20 p-8 md:p-12 rounded-3xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-boska-bold text-center mb-12">
                Start Your Project
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-darkText80 mb-2 font-spectral">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-darkBg border border-darkText60 rounded-xl text-darkText focus:border-lightText focus:outline-none transition-colors duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-darkText80 mb-2 font-spectral">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-darkBg border border-darkText60 rounded-xl text-darkText focus:border-lightText focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-darkText80 mb-2 font-spectral">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-darkBg border border-darkText60 rounded-xl text-darkText focus:border-lightText focus:outline-none transition-colors duration-300"
                      placeholder="Your company name"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-darkText80 mb-2 font-spectral">Project Type</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-darkBg border border-darkText60 rounded-xl text-darkText focus:border-lightText focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select project type</option>
                      <option value="web-development">Web Development</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="mobile-app">Mobile App</option>
                      <option value="branding">Branding</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-darkText80 mb-2 font-spectral">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-darkBg border border-darkText60 rounded-xl text-darkText focus:border-lightText focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-50k">Under ₹50,000</option>
                    <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                    <option value="1l-3l">₹1,00,000 - ₹3,00,000</option>
                    <option value="3l-5l">₹3,00,000 - ₹5,00,000</option>
                    <option value="above-5l">Above ₹5,00,000</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-darkText80 mb-2 font-spectral">Project Details *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-4 bg-darkBg border border-darkText60 rounded-xl text-darkText focus:border-lightText focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                    required
                  />
                </motion.div>

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    type="submit"
                    className="bg-lightText text-darkBg px-12 py-4 rounded-full text-lg font-boska-bold hover:bg-lightText80 transition-all duration-300 inline-flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-darkText20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2 
              className="text-4xl md:text-6xl font-boska-bold text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Find Us
            </motion.h2>
            <motion.div
              className="bg-darkBg rounded-3xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-boska-bold mb-4 text-lightText">Mumbai Studio</h3>
                  <p className="text-darkText80 mb-4">
                    123 Creative Street, Bandra West<br />
                    Mumbai, Maharashtra 400050<br />
                    India
                  </p>
                  <p className="text-darkText60">Our flagship creative hub</p>
                </div>
                <div>
                  <h3 className="text-2xl font-boska-bold mb-4 text-lightText">Bangalore Office</h3>
                  <p className="text-darkText80 mb-4">
                    456 Tech Park, Koramangala<br />
                    Bangalore, Karnataka 560034<br />
                    India
                  </p>
                  <p className="text-darkText60">Our technology center</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactUs;
