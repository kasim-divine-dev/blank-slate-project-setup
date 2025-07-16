
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from '../MagneticButton/MagneticButton';

const Footer: React.FC = () => {
    return (
        <footer id='contact' className="bg-gradient-to-br from-darkBg via-darkBg/25 to-darkBg/0 text-white font-boska">
            {/* Main Footer Content */}
            <div className="relative pt-7 max-md:px-4 mx-auto max-w-7xl">
                {/* Top Section */}
                <div className="text-center mb-16 max-md:text-start">
                    <div className="flex md:justify-center items-center space-x-2 mb-6">
                        <svg width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.3636 0L24.0714 10.0865C24.8 14.3902 28.4834 17.7666 33.1783 18.4346L44.1818 20L33.1783 21.5654C28.4834 22.2334 24.8 25.6098 24.0714 29.9135L22.3636 40L20.6558 29.9135C19.9272 25.6098 16.2438 22.2334 11.5489 21.5654L0.54541 20L11.5489 18.4346C16.2438 17.7666 19.9272 14.3902 20.6558 10.0865L22.3636 0Z" fill="currentColor" />
                        </svg>
                        <svg width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.3636 0L24.0714 10.0865C24.8 14.3902 28.4834 17.7666 33.1783 18.4346L44.1818 20L33.1783 21.5654C28.4834 22.2334 24.8 25.6098 24.0714 29.9135L22.3636 40L20.6558 29.9135C19.9272 25.6098 16.2438 22.2334 11.5489 21.5654L0.54541 20L11.5489 18.4346C16.2438 17.7666 19.9272 14.3902 20.6558 10.0865L22.3636 0Z" fill="currentColor" />
                        </svg>
                        <svg width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.3636 0L24.0714 10.0865C24.8 14.3902 28.4834 17.7666 33.1783 18.4346L44.1818 20L33.1783 21.5654C28.4834 22.2334 24.8 25.6098 24.0714 29.9135L22.3636 40L20.6558 29.9135C19.9272 25.6098 16.2438 22.2334 11.5489 21.5654L0.54541 20L11.5489 18.4346C16.2438 17.7666 19.9272 14.3902 20.6558 10.0865L22.3636 0Z" fill="currentColor" />
                        </svg>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                        Drop us a line
                    </h2>

                    <p className="text-xl md:text-2xl mb-8 text-white max-w-3xl mx-auto">
                        Book a meeting or leave a request. We're ready to embark on this journey with you. Are you?
                    </p>

                    {/* Email Input and Contact Button */}
                    <div className="flex flex-wrap sm:flex-row md:gap-4 justify-center items-center max-w-md md:mx-auto mb-12">
                        <div className="relative flex-1 w-full">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                        <MagneticButton
                        >
                            <Link to="/contact">
                                <button className="bg-white text-darkBg px-8 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 whitespace-nowrap">
                                    Contact →
                                </button>
                            </Link>
                        </MagneticButton>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap md:justify-center gap-6 text-sm font-mono uppercase tracking-wider">
                        <a href="mailto:mkronix.official@gmail.com" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            [ EMAIL ]
                        </a>
                        <a href="https://www.instagram.com/mkronix" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                            <Instagram className="w-4 h-4" />
                            [ INSTAGRAM ]
                        </a>
                        <a href="https://www.facebook.com/mkronix" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                            <Facebook className="w-4 h-4" />
                            [ FACEBOOK ]
                        </a>
                        <a href="https://www.linkedin.com/company/mkronix" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
                            <Linkedin className="w-4 h-4" />
                            [ LINKEDIN ]
                        </a>
                    </div>

                    <div className="mt-8 flex flex-wrap md:justify-center gap-6 text-sm font-mono uppercase tracking-wider">
                        <span className="hover:text-white transition-colors duration-300">[ AWWWARDS ]</span>
                        <span className="hover:text-white transition-colors duration-300">[ BEHANCE ]</span>
                    </div>
                </div>

                {/* Large MKRONIX Text */}
                <div className="text-center mb-16">
                    <h1 className="text-[19vw] md:text-[8vw] lg:text-[6vw] font-black leading-none tracking-tighter text-white/50 select-none pointer-events-none font-spectral">
                        MKRONIX
                    </h1>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/20 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
                            <nav className="flex flex-wrap md:justify-center gap-4 md:gap-6 text-lg">
                                <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
                                <Link to="/about" className="hover:text-white transition-colors duration-300">About</Link>
                                <Link to="/services" className="hover:text-white transition-colors duration-300">Services</Link>
                                <Link to="/projects" className="hover:text-white transition-colors duration-300">Projects</Link>
                                <Link to="/case-studies" className="hover:text-white transition-colors duration-300">Case Studies</Link>
                                <Link to="/contact" className="hover:text-white transition-colors duration-300">Contact Us</Link>
                            </nav>
                        </div>

                        <div className="flex flex-col-reverse md:flex-row md:items-center gap-3 md:space-x-6 text-lg text-white">
                            <span>©2024. All rights reserved</span>
                            <div className="flex space-x-4">
                                <Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
                                <Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
