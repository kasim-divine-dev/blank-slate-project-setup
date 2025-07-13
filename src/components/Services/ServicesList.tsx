
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Palette, Smartphone, TrendingUp } from 'lucide-react';
import Card1 from '@/assets/img/img1.jpg'
import Card2 from '@/assets/img/img2.jpg'
import Card3 from '@/assets/img/img3.jpg'
import Card4 from '@/assets/img/img4.jpg'
const services = [
  {
    number: "01",
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies. From responsive designs to complex e-commerce platforms.",
    image: Card1,
    icon: Code,
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
    gradient: "from-purple-500/20 to-pink-500/20",
    projects: "15+",
    startingPrice: "₹18,999"
  },
  {
    number: "02",
    title: "UI/UX Design",
    description: "User-centered design solutions that create meaningful experiences. From wireframes to interactive prototypes.",
    image: Card2,
    icon: Palette,
    technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    projects: "12+",
    startingPrice: "₹15,000"
  },
  {
    number: "03",
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences on all devices.",
    image: Card3,
    icon: Smartphone,
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    gradient: "from-green-500/20 to-emerald-500/20",
    projects: "5+",
    startingPrice: "₹40,000"
  },
  {
    number: "04",
    title: "Identity & Branding",
    description: "Creating and refining your brand identity and visual presence. From logo design to brand guidelines.",
    image: Card4,
    icon: TrendingUp,
    technologies: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    gradient: "from-orange-500/20 to-red-500/20",
    projects: "10+",
    startingPrice: "₹20,000/month"
  }
];

export const ServicesList = () => {
  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Our <span className="text-white">Services</span>
          </h2>
          <p className="text-xl text-[#F5E7D3]/80 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className={`service-card group relative bg-gradient-to-br ${service.gradient} backdrop-blur-sm border border-white/30 rounded-2xl md:rounded-3xl overflow-hidden hover:border-[#F5E7D3]/50 transition-all duration-500`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative z-10 p-4 sm:p-6 md:p-8">
                {/* Mobile Layout */}
                <div className="block md:hidden space-y-4">
                  {/* Header Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#F5E7D3] transition-colors duration-300">
                        {service.number}
                      </span>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1D1C1C] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#F5E7D3]" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#F5E7D3]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#F5E7D3]/70 text-sm sm:text-base group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-[#1D1C1C]/50 text-[#F5E7D3]/80 rounded-full text-xs sm:text-sm border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-[#F5E7D3]/60">
                      {service.projects} projects
                    </div>
                    <div className="font-bold text-white group-hover:text-[#F5E7D3] transition-colors duration-300">
                      Starting {service.startingPrice}
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  <div className="flex items-center gap-8 flex-1">
                    <motion.div
                      className="flex items-center gap-6"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-5xl font-black text-white group-hover:text-[#F5E7D3] transition-colors duration-300">
                        {service.number}
                      </span>
                      <div className="w-16 h-16 bg-[#1D1C1C] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-8 h-8 text-[#F5E7D3]" />
                      </div>
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-3xl xl:text-4xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-[#F5E7D3]/70 mb-4 max-w-2xl group-hover:text-[#F5E7D3]/90 transition-colors duration-300">
                        {service.description}
                      </p>

                      <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-[#1D1C1C]/50 text-[#F5E7D3]/80 rounded-full text-sm border border-white/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-[#F5E7D3]/60">
                          {service.projects} projects
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-[#F5E7D3] transition-colors duration-300">
                          Starting {service.startingPrice}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-4">
                    <motion.div
                      className="w-20 h-20 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#F5E7D3]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
