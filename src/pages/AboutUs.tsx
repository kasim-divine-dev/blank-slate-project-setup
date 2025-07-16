import { DynamicSEO } from '@/components/SEO/DynamicSEO';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brush,
  Clock,
  Code,
  Coffee,
  Globe,
  Heart,
  Layers,
  Lightbulb,
  Palette,
  Rocket,
  Sparkles,
  Star,
  Target,
  Terminal,
  TrendingUp,
  Trophy,
  Users,
  Zap
} from 'lucide-react';
import React, { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const AboutUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('mission')

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

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach((stat: any) => {
      const target = stat.getAttribute('data-target');
      gsap.fromTo(stat, {
        innerText: 0
      }, {
        innerText: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 80%"
        }
      });
    });
  }, []);

  const stats = [
    { value: 30, label: "Projects Completed", suffix: "+", icon: Trophy },
    { value: 15, label: "Happy Clients", suffix: "+", icon: Users },
    { value: 3, label: "Years Experience", suffix: "", icon: Clock },
    { value: 1, label: "Countries Served", suffix: "", icon: Globe }
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Innovation",
      desc: "We push boundaries and embrace cutting-edge technologies to create extraordinary solutions that set new industry standards.",
      gradient: "from-purple-500/20 to-pink-500/20",
      highlight: "Creative Excellence"
    },
    {
      icon: Code,
      title: "Precision",
      desc: "Every pixel, every line of code matters. We obsess over details to achieve perfection in every project we deliver.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      highlight: "Technical Mastery"
    },
    {
      icon: Palette,
      title: "Creativity",
      desc: "We blend artistry with functionality to create designs that inspire, engage, and leave lasting impressions.",
      gradient: "from-green-500/20 to-emerald-500/20",
      highlight: "Design Thinking"
    },
    {
      icon: Zap,
      title: "Impact",
      desc: "We create solutions that drive real results, generate measurable ROI, and make a lasting difference for our clients.",
      gradient: "from-orange-500/20 to-red-500/20",
      highlight: "Results Driven"
    }
  ];

  const teamMembers = [
    {
      name: "Kasim Kadiwala",
      role: "Founder & CEO",
      skills: ["UI/UX Design", "Brand Strategy", "Creative Direction"],
      color: "from-purple-500/20 to-pink-500/20",
      experience: "2+ Years",
      projects: "15+",
      primaryIcon: Brush,
      secondaryIcon: Lightbulb,
      pattern: "geometric",
      accentColor: "purple"
    },
    {
      name: "Moinudding Chudiwal",
      role: "Senior Developer",
      skills: ["React", "Node.js", "Full-Stack Development"],
      color: "from-blue-500/20 to-cyan-500/20",
      experience: "4+ Years",
      projects: "20+",
      primaryIcon: Terminal,
      secondaryIcon: Code,
      pattern: "circuit",
      accentColor: "blue"
    }
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      content: "To empower businesses with cutting-edge digital solutions that drive growth, enhance user experiences, and create lasting impact in the digital landscape.",
      icon: Target,
      stats: ["50+ Successful Projects", "99% Client Satisfaction", "24/7 Support"]
    },
    vision: {
      title: "Our Vision",
      content: "To be the leading creative digital agency that transforms ideas into extraordinary digital experiences, setting new standards for innovation and excellence.",
      icon: Rocket,
      stats: ["Global Recognition", "Industry Leadership", "Innovative Solutions"]
    },
    culture: {
      title: "Our Culture",
      content: "We foster a collaborative environment where creativity thrives, innovation is encouraged, and every team member contributes to our collective success.",
      icon: Heart,
      stats: ["Team Collaboration", "Continuous Learning", "Work-Life Balance"]
    }
  };

  // Creative pattern components
  const GeometricPattern = ({ accentColor }: { accentColor: string }) => (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 200">
      <defs>
        <pattern id={`geometric-${accentColor}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="none" />
          <circle cx="20" cy="20" r="3" fill={`var(--${accentColor}-500)`} opacity="0.3" />
          <rect x="10" y="10" width="20" height="20" fill="none" stroke={`var(--${accentColor}-400)`} strokeWidth="1" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#geometric-${accentColor})`} />
    </svg>
  );

  const CircuitPattern = ({ accentColor }: { accentColor: string }) => (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 200">
      <defs>
        <pattern id={`circuit-${accentColor}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="none" />
          <path d="M10 25h30M25 10v30M15 15h5v5h-5zM30 30h5v5h-5z"
            stroke={`var(--${accentColor}-400)`} strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="25" cy="25" r="2" fill={`var(--${accentColor}-500)`} opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#circuit-${accentColor})`} />
    </svg>
  );

  return (
    <>
      <DynamicSEO pageName="about" />

      <div ref={containerRef} className="min-h-screen bg-black text-[#F5E7D3]">
        {/* Hidden SEO Content */}
        <div className="sr-only">
          <h1>About MkRonix - Creative Digital Agency in India for Web Development, UI/UX Design, and Digital Marketing</h1>
          <p>Learn about MkRonix, India's leading creative digital agency. Meet our expert team, discover our values, and see how we transform businesses through innovative digital solutions.</p>
        </div>

        {/* Hero Section */}
        <section
          className="hero-section pt-32 pb-20 px-4 bg-gradient-to-b from-black to-darkBg"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className="md:text-center mb-16"            >
              <p
                className="hero-element text-sm text-darkText60 mb-6 uppercase tracking-[0.2em] font-medium"
              >
                About MkRonix
              </p>
              <h1
                className="hero-element text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[0.9]"
              >
                We Are <span className="block text-transparent bg-gradient-to-r from-darkText via-lightBg to-darkText bg-clip-text">
                  Creators
                </span>
              </h1>
              <p
                className="hero-element text-xl text-darkText80 max-w-3xl mx-auto leading-relaxed"
              >
                A passionate creative digital agency based in India, crafting extraordinary digital experiences for brands worldwide. We blend creativity with technology to deliver solutions that inspire and engage.
              </p>
            </div>

            {/* Quick Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-darkText20 backdrop-blur-sm border border-darkText20 group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-lightBg/10 flex items-center justify-center group-hover:bg-lightBg group-hover:text-brown-text transition-all duration-300">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-center">
                    <div
                      className="stat-number text-3xl md:text-4xl font-bold text-lightBg"
                      data-target={stat.value}
                    >
                      0
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-lightBg">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-sm text-darkText60 uppercase tracking-wider mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission/Vision/Culture Tabs */}
        <section className="py-20 px-4 bg-darkBg">
          <div className="max-w-6xl mx-auto">
            <div
              className="md:text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What Drives <span className="text-lightBg">Us</span>
              </h2>
              <p className="text-darkText80 text-lg max-w-2xl mx-auto">
                Discover the principles and vision that guide everything we do
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex md:justify-center  gap-2 md:gap-4 mb-6 md:mb-12">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 md:px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 capitalize ${activeTab === tab
                    ? 'bg-lightBg text-brown-text shadow-lg'
                    : 'bg-darkText20 text-darkText60 hover:bg-darkText20 hover:text-darkText'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div
              key={activeTab}
              className="bg-black rounded-3xl p-5 md:p-12 border border-darkText20"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-lightBg rounded-2xl flex items-center justify-center">
                      {React.createElement(tabContent[activeTab as keyof typeof tabContent].icon, {
                        className: "w-8 h-8 text-brown-text"
                      })}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold">{tabContent[activeTab as keyof typeof tabContent].title}</h3>
                  </div>
                  <p className="text-darkText80 text-lg leading-relaxed mb-8">
                    {tabContent[activeTab as keyof typeof tabContent].content}
                  </p>
                  <div className="space-y-3">
                    {tabContent[activeTab as keyof typeof tabContent].stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-lightBg" />
                        <span className="text-darkText80">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-lightBg/20 to-darkText20 rounded-3xl p-8 backdrop-blur-sm border border-darkText20">
                    <Coffee className="w-16 h-16 text-lightBg mb-6" />
                    <h4 className="text-xl font-bold mb-4">Why Choose MkRonix?</h4>
                    <ul className="space-y-3 text-darkText80">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                        <span>Proven track record of success</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                        <span>Cutting-edge technology expertise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                        <span>Dedicated support and communication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-lightBg mt-1 flex-shrink-0" />
                        <span>Results-driven approach</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div
              className="md:text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our Core <span className="text-lightBg">Values</span>
              </h2>
              <p className="text-xl text-darkText80 max-w-2xl mx-auto">
                These principles guide every project we undertake and every relationship we build
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`value-card relative bg-gradient-to-br ${value.gradient} backdrop-blur-sm border border-darkText20 p-4 md:p-8 rounded-3xl group hover:border-lightBg/50 transition-all duration-500`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-darkText20 rounded-2xl flex items-center justify-center group-hover:bg-lightBg group-hover:text-brown-text transition-all duration-300">
                        <value.icon className="w-8 h-8" />
                      </div>
                      <span className="text-xs text-lightBg font-medium px-3 py-1 bg-darkText20 rounded-full">
                        {value.highlight}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-darkText80 leading-relaxed group-hover:text-darkText transition-colors duration-300">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Creative Visual Representation */}
        <section className="team-section py-20 px-4 bg-darkBg">
          <div className="max-w-7xl mx-auto">
            <div
              className="md:text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Meet Our <span className="text-lightBg">Dream Team</span>
              </h2>
              <p className="text-xl text-darkText80 max-w-2xl mx-auto">
                The creative minds behind every pixel, every line of code, and every strategic decision
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="team-card group"
                >
                  <div className="relative overflow-hidden rounded-3xl mb-6 bg-gradient-to-br from-darkText20 to-black border border-darkText20 group-hover:border-lightBg/50 transition-all duration-500">
                    <div className="aspect-[4/5] relative">
                      {/* Creative Visual Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-40`} />

                      {/* Pattern Overlay */}
                      {member.pattern === 'geometric' ? (
                        <GeometricPattern accentColor={member.accentColor} />
                      ) : (
                        <CircuitPattern accentColor={member.accentColor} />
                      )}

                      {/* Floating Elements */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-center items-center">
                        {/* Primary Icon */}
                        <div
                          className="floating-element w-20 h-20 bg-lightBg/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lightBg group-hover:text-brown-text transition-all duration-500"
                        >
                          <member.primaryIcon className="w-10 h-10" />
                        </div>

                        {/* Secondary Elements */}
                        <div className="flex gap-4 mb-6">
                          <div
                            className="floating-element w-12 h-12 bg-darkText20 rounded-xl flex items-center justify-center group-hover:bg-lightBg/30 transition-all duration-500"
                          >
                            <member.secondaryIcon className="w-6 h-6" />
                          </div>
                          <div
                            className="floating-element w-12 h-12 bg-darkText20 rounded-xl flex items-center justify-center group-hover:bg-lightBg/30 transition-all duration-500"
                          >
                            <Layers className="w-6 h-6" />
                          </div>
                          <div
                            className="floating-element w-12 h-12 bg-darkText20 rounded-xl flex items-center justify-center group-hover:bg-lightBg/30 transition-all duration-500"
                          >
                            <Sparkles className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Abstract Shape */}
                        <div
                          className="floating-element w-16 h-2 bg-lightBg/40 rounded-full mb-6 group-hover:bg-lightBg transition-all duration-500"
                        />

                        {/* Skills Tags */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {member.skills.map((skill, skillIndex) => (
                              <span
                                key={skill}
                                className="bg-lightBg/20 backdrop-blur-sm text-lightBg px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-4 text-xs text-lightBg/80 justify-center">
                            <span>{member.experience}</span>
                            <span>•</span>
                            <span>{member.projects} Projects</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-lightBg font-medium text-lg group-hover:text-white transition-colors duration-300">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-4xl mx-auto md:text-center">
            <div
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Ready to Start Your <span className="text-lightBg">Journey?</span>
              </h2>
              <p className="text-xl text-darkText80 mb-12 max-w-2xl mx-auto">
                Let's create something extraordinary together. Your vision combined with our expertise equals magic.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  className="group relative bg-lightBg text-brown-text px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Let's Work Together
                </button>

                <button
                  className="group border-2 border-darkText20 text-darkText px-8 py-4 rounded-full font-bold hover:border-lightBg hover:bg-lightBg hover:text-brown-text transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Meet the Team
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;