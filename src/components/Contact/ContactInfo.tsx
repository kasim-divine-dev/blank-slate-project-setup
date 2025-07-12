
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@mkronix.com"],
    description: "Drop us a line anytime",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 84592 58801", "+91 72848 55130"],
    description: "Available 24/7 for urgent projects",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Kadiwala Compound, Rasulpur", "Sidhpur, Gujarat 384290", "India"],
    description: "Our creative studio location",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
    description: "We're here when you need us",
    gradient: "from-orange-500/20 to-red-500/20"
  }
];

export const ContactInfo = () => {
  return (
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
              whileHover={{ scale: 1.05, rotateY: 5 }}
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
  );
};
