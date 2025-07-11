import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import BoxesLayer from '../components/BoxesLayer/BoxesLayer';
import { DrawCircleText } from '../components/DrawCircleText/DrawCircleText';

const ContactUs: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Floating animation for hero
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        y: -15,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Form field animations
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      project: '',
      budget: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@mkronix.com", "projects@mkronix.com"],
      description: "Drop us a line anytime",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 87654 32109"],
      description: "Available 24/7 for urgent projects",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Mumbai, Maharashtra", "Bangalore, Karnataka"],
      description: "Our creative studios in India",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 7:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "We're here when you need us",
      gradient: "from-orange-500/20 to-red-500/20"
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

      <div ref={containerRef} className="bg-black text-[#F5E7D3] font-boska overflow-x-hidden">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center px-4"
          style={{ y: textY }}
        >
          <BoxesLayer gridColor="#484440" />
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              y: backgroundY,
              background: `radial-gradient(circle at 30% 70%, rgba(72, 68, 64, 0.4), transparent 50%),
                         radial-gradient(circle at 70% 30%, rgba(72, 68, 64, 0.3), transparent 50%)`
            }}
          />

          <div ref={heroRef} className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <DrawCircleText
                normalText="Let's bring your vision to "
                normalText2="together and create something extraordinary."
                circleText="life"
              />
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Ready to transform your ideas into digital reality? We'd love to hear about your project and explore how we can make magic happen.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Info Grid */}
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
                Get In <span className="text-[#484440]">Touch</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className={`relative bg-gradient-to-br ${info.gradient} backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F5E7D3]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 text-center">
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#1D1C1C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon className="w-8 h-8 text-[#F5E7D3]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                      {info.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-[#F5E7D3]/80 group-hover:text-[#F5E7D3] transition-colors duration-300">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-[#F5E7D3]/60 text-sm group-hover:text-[#F5E7D3]/80 transition-colors duration-300">
                      {info.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative bg-[#1D1C1C]/50 backdrop-blur-xl border border-[#484440]/30 p-8 md:p-12 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#484440]/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: Math.random() * 4 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-black mb-6 flex items-center justify-center gap-4">
                    <Sparkles className="w-10 h-10 text-[#484440]" />
                    Start Your Project
                    <Sparkles className="w-10 h-10 text-[#484440]" />
                  </h2>
                  <p className="text-[#F5E7D3]/80">Tell us about your vision and let's make it reality</p>
                </motion.div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="form-field"
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label htmlFor='fullName' className="block text-[#F5E7D3]/80 mb-3 font-medium">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-[#484440]/50 rounded-2xl text-[#F5E7D3] focus:border-[#F5E7D3] focus:outline-none transition-all duration-300 backdrop-blur-sm"
                        placeholder="Your full name"
                        required
                      />
                    </motion.div>

                    <motion.div
                      className="form-field"
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label htmlFor='email' className="block text-[#F5E7D3]/80 mb-3 font-medium">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-[#484440]/50 rounded-2xl text-[#F5E7D3] focus:border-[#F5E7D3] focus:outline-none transition-all duration-300 backdrop-blur-sm"
                        placeholder="your@email.com"
                        required
                      />
                    </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="form-field"
                      whileHover={{ scale: 1.02 }}
                    >
                      <label htmlFor='company' className="block text-[#F5E7D3]/80 mb-3 font-medium">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-[#484440]/50 rounded-2xl text-[#F5E7D3] focus:border-[#F5E7D3] focus:outline-none transition-all duration-300 backdrop-blur-sm"
                        placeholder="Your company name"
                      />
                    </motion.div>

                    <motion.div
                      className="form-field"
                      whileHover={{ scale: 1.02 }}
                    >
                      <label htmlFor='project' className="block text-[#F5E7D3]/80 mb-3 font-medium">Project Type</label>
                      <select
                        name="project"
                        value={formData.project}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-[#484440]/50 rounded-2xl text-[#F5E7D3] focus:border-[#F5E7D3] focus:outline-none transition-all duration-300 backdrop-blur-sm"
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
                    className="form-field"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label htmlFor='budget' className="block text-[#F5E7D3]/80 mb-3 font-medium">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-black/50 border border-[#484440]/50 rounded-2xl text-[#F5E7D3] focus:border-[#F5E7D3] focus:outline-none transition-all duration-300 backdrop-blur-sm"
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
                    className="form-field"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label htmlFor='message' className="block text-[#F5E7D3]/80 mb-3 font-medium">Project Details *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full p-4 bg-black/50 border border-[#484440]/50 rounded-2xl text-[#F5E7D3] focus:border-[#F5E7D3] focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm"
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      required
                    />
                  </motion.div>

                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative bg-[#F5E7D3] text-black px-12 py-6 rounded-full text-lg font-bold hover:bg-white transition-all duration-300 inline-flex items-center gap-3 overflow-hidden disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Send Message
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map/Location Section */}
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
              <p className="text-xl text-[#F5E7D3]/80">Visit our creative hubs across India</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  city: "Mumbai Studio",
                  address: "123 Creative Street, Bandra West\nMumbai, Maharashtra 400050\nIndia",
                  description: "Our flagship creative hub",
                  gradient: "from-purple-500/20 to-pink-500/20"
                },
                {
                  city: "Bangalore Office",
                  address: "456 Tech Park, Koramangala\nBangalore, Karnataka 560034\nIndia",
                  description: "Our technology center",
                  gradient: "from-blue-500/20 to-cyan-500/20"
                }
              ].map((location, index) => (
                <motion.div
                  key={location.city}
                  className={`relative bg-gradient-to-br ${location.gradient} backdrop-blur-sm border border-[#484440]/30 p-8 rounded-3xl group hover:border-[#F5E7D3]/50 transition-all duration-500`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F5E7D3]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 text-center">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#1D1C1C] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      <MapPin className="w-8 h-8 text-[#F5E7D3]" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-[#F5E7D3] group-hover:text-white transition-colors duration-300">
                      {location.city}
                    </h3>
                    <p className="text-[#F5E7D3]/80 mb-4 whitespace-pre-line group-hover:text-[#F5E7D3] transition-colors duration-300">
                      {location.address}
                    </p>
                    <p className="text-[#F5E7D3]/60 group-hover:text-[#F5E7D3]/80 transition-colors duration-300">
                      {location.description}
                    </p>
                  </div>
                </motion.div>
              ))}
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