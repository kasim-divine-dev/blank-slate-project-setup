import { DynamicSEO } from '@/components/SEO/DynamicSEO';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Star,
  Users
} from 'lucide-react';
import React, { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service: string;
  budget: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: 'Web Development',
    budget: '5k-15k'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Web Development',
    'UI/UX Design',
    'Mobile App Development',
    'Digital Marketing',
    'SEO Services',
    'Brand Identity',
    'E-commerce Solutions',
    'Other'
  ];

  const budgetRanges = [
    '5k-15k',
    '15k-50k',
    '50k-1L',
    '1L-5L',
    '5L+',
    'Let\'s Discuss'
  ];

  useGSAP(() => {
    // Hero section animation
    gsap.fromTo(
      '.hero-element',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Form fields animation
    gsap.fromTo(
      '.form-field',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Contact info cards animation
    gsap.fromTo(
      '.contact-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: 'Web Development',
        budget: '5k-15k'
      });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Mon-Fri 9AM-6PM IST",
      value: "+91-84-59258801",
      href: "tel:+918459258801",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Mail,
      title: "Email Us",
      subtitle: "We reply within 24 hours",
      value: "mkronix.official@gmail.com",
      href: "mailto:mkronix.official@gmail.com",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      subtitle: "Creative Studio",
      value: "Mumbai, Gujarat 400102",
      href: "#location",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      subtitle: "Quick responses",
      value: "Available 24/7",
      href: "#chat",
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  const stats = [
    { number: "20+", label: "Projects Delivered" },
    { number: "15+", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  return (
    <>
      <DynamicSEO pageName="contact" />

      <div className="min-h-screen bg-black text-[#F5E7D3]">
        {/* Hidden SEO Content */}
        <div className="sr-only">
          <h1>Contact MkRonix - Free Consultation for Web Development & Digital Marketing India</h1>
          <p>Get in touch with India's leading creative digital agency. Free consultation available for web development, UI/UX design, mobile apps, and digital marketing services.</p>
          <span>Phone: +91-84-59258801 | Email: mkronix.official@gmail.com</span>
          <span>Address: Jogeshwari, Mumbai, Gujarat - 400102, India</span>
          <span>Services: Web Development, UI/UX Design, Mobile App Development, Digital Marketing, SEO</span>
          <span>Business Hours: Monday-Friday 9AM-6PM, Saturday 10AM-4PM IST</span>
          <span>Coverage: Mumbai, Delhi, Bangalore, Ahmedabad, Surat, Rajkot, Gujarat, India</span>
        </div>

        {/* Hero Section */}
        <motion.section
          className="hero-section pt-32 pb-20 px-4 bg-gradient-to-b from-black to-darkBg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
              transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
            >
              <motion.p
                className="hero-element text-sm text-darkText60 mb-6 uppercase tracking-[0.2em] font-medium"
                variants={itemVariants}
                transition={{ duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95] }}
              >
                Let's Work Together
              </motion.p>
              <motion.h1
                className="hero-element text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[0.9]"
                variants={itemVariants}
                transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
              >
                Get In
                <span className="block text-transparent bg-gradient-to-r from-darkText via-lightBg to-darkText bg-clip-text">
                  Touch
                </span>
              </motion.h1>
              <motion.p
                className="hero-element text-xl text-darkText80 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
                transition={{ duration: 1.0, ease: [0.6, 0.01, -0.05, 0.95] }}
              >
                Ready to transform your digital presence? Let's discuss your project and create something extraordinary together.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-darkText20 backdrop-blur-sm border border-darkText20"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 231, 211, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-lightBg">{stat.number}</div>
                  <div className="text-sm text-darkText60 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Methods */}
        <section className="contact-info py-20 px-4 bg-darkBg">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Multiple Ways to <span className="text-lightBg">Connect</span>
              </h2>
              <p className="text-darkText80 text-lg max-w-2xl mx-auto">
                Choose the method that works best for you. We're here to help.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  className={`contact-card group relative overflow-hidden rounded-3xl bg-gradient-to-br ${method.gradient} backdrop-blur-sm border border-darkText20 p-8 hover:border-lightBg/50 transition-all duration-500`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-darkText20 flex items-center justify-center mb-6 group-hover:bg-lightBg group-hover:text-brown-text transition-all duration-300">
                      <method.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-darkText60 text-sm mb-4 group-hover:text-darkText80 transition-colors duration-300">
                      {method.subtitle}
                    </p>
                    <p className="text-lightBg font-medium group-hover:text-white transition-colors duration-300">
                      {method.value}
                    </p>
                    <ArrowUpRight className="w-6 h-6 absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-lightBg" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form py-20 px-4 bg-black">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Start Your <span className="text-lightBg">Project</span>
              </h2>
              <p className="text-darkText80 text-lg max-w-2xl mx-auto">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div
              className="bg-darkBg rounded-3xl p-8 md:p-12 border border-darkText20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="form-field">
                    <label htmlFor='name' className="block text-darkText text-sm font-medium mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-darkText20 border border-darkText20 rounded-xl text-darkText placeholder-darkText60 focus:outline-none focus:border-lightBg focus:bg-black transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor='email' className="block text-darkText text-sm font-medium mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-darkText20 border border-darkText20 rounded-xl text-darkText placeholder-darkText60 focus:outline-none focus:border-lightBg focus:bg-black transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="form-field">
                    <label htmlFor='phone' className="block text-darkText text-sm font-medium mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-darkText20 border border-darkText20 rounded-xl text-darkText placeholder-darkText60 focus:outline-none focus:border-lightBg focus:bg-black transition-all duration-300"
                      placeholder="+91 XXX XXX XXXX"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor='service' className="block text-darkText text-sm font-medium mb-3">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-darkText20 border border-darkText20 rounded-xl text-darkText focus:outline-none focus:border-lightBg focus:bg-black transition-all duration-300"
                    >
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-darkBg text-darkText">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="form-field">
                    <label htmlFor='budget' className="block text-darkText text-sm font-medium mb-3">
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-darkText20 border border-darkText20 rounded-xl text-darkText focus:outline-none focus:border-lightBg focus:bg-black transition-all duration-300"
                    >
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-darkBg text-darkText">
                          ₹{range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor='subject' className="block text-darkText text-sm font-medium mb-3">
                      Project Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-darkText20 border border-darkText20 rounded-xl text-darkText placeholder-darkText60 focus:outline-none focus:border-lightBg focus:bg-black transition-all duration-300"
                      placeholder="Brief project title"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor='message' className="block text-darkText text-sm font-medium mb-3">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 bg-darkText20 border border-darkText20 rounded-xl text-darkText placeholder-darkText60 focus:outline-none focus:border-lightBg focus:bg-black transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-lightBg text-brown-text py-4 px-8 rounded-xl font-bold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-brown-text border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-4"
                    >
                      <div className="inline-flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 px-4 bg-darkBg">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Visit Our <span className="text-lightBg">Studio</span>
              </h2>
              <p className="text-darkText80 text-lg max-w-2xl mx-auto">
                Located in the heart of Mumbai, our creative studio is where innovation meets execution.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-darkText20 p-8 rounded-3xl hover:border-lightBg/50 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-darkText20 flex items-center justify-center mb-6">
                    <MapPin className="w-8 h-8 text-lightBg" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-darkText">
                    MkRonix Creative Studio
                  </h3>
                  <p className="text-darkText80 mb-6 leading-relaxed">
                    Mumbai, Gujarat 400102<br />
                    India
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-lightBg" />
                      <span className="text-darkText80">Monday - Friday: 9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-lightBg" />
                      <span className="text-darkText80">Saturday: 10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-lightBg" />
                      <span className="text-darkText80">Serving clients across India</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-darkText20 p-6 rounded-2xl">
                  <h4 className="font-bold mb-3 text-lightBg">Why Visit Us?</h4>
                  <ul className="space-y-2 text-darkText80">
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                      <span>Face-to-face project discussions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                      <span>Live demonstration of our work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                      <span>Collaborative brainstorming sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                      <span>Meet our creative team</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-darkText20 p-6 rounded-2xl">
                  <h4 className="font-bold mb-3 text-lightBg">What to Expect</h4>
                  <ul className="space-y-2 text-darkText80">
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                      <span>Complimentary consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                      <span>Project timeline discussion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                      <span>Custom solution planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                      <span>Transparent pricing</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Ready to Create <span className="text-lightBg">Magic?</span>
              </h2>
              <p className="text-xl text-darkText80 mb-12 max-w-2xl mx-auto">
                Your next breakthrough is just a conversation away. Let's turn your vision into reality.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  href="tel:+918459258801"
                  className="group relative bg-lightBg text-brown-text px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  Schedule a Call
                </motion.a>

                <motion.a
                  href="mailto:mkronix.official@gmail.com"
                  className="group border-2 border-darkText20 text-darkText px-8 py-4 rounded-full font-bold hover:border-lightBg hover:bg-lightBg hover:text-brown-text transition-all duration-300 inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;