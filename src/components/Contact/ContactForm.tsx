import { motion } from 'framer-motion';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    setFormData({
      name: '',
      email: '',
      company: '',
      project: '',
      budget: '',
      message: ''
    });
  };

  return (
    <section className="py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative bg-[#1D1C1C]/50 backdrop-blur-xl border border-[#484440]/30 p-8 md:p-12 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
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

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div className="form-field" whileHover={{ scale: 1.02 }}>
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

                <motion.div className="form-field" whileHover={{ scale: 1.02 }}>
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

              <motion.div className="text-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
  );
};
