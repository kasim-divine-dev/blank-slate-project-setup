import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import Card1 from '../../assets/img/img1.jpg';
import Card2 from '../../assets/img/img2.jpg';
import Card3 from '../../assets/img/img3.jpg';
import Card4 from '../../assets/img/img4.jpg';
import { DrawCircleText } from '../DrawCircleText/DrawCircleText';
import './ServiceCard.css';
const ServiceCard: React.FC = () => {

    const services = [
        {
            id: 1,
            title: "Brand Foundation",
            description: "The heart of your company's story. It shapes your vision, values, and voice, ensuring a clear and powerful impact in every interaction.",
            image: Card1,
            bgColor: "#1D1C1C",
            textColor: "#F5E7D3"
        },
        {
            id: 2,
            title: "Design Identity",
            description: "Your brand's visual fingerprint. It crafts a distinctive look that sparks recognition and builds emotional connections with your audience.",
            image: Card2,
            bgColor: "#F5E7D3",
            textColor: "#1D1C1C"
        },
        {
            id: 3,
            title: "Digital Presence",
            description: "Our web solutions combine cutting-edge design and seamless functionality to create experiences that captivate and inspire your audience.",
            image: Card3,
            bgColor: "#1D1C1C",
            textColor: "#F5E7D3"
        },
        {
            id: 4,
            title: "Product Design",
            description: "We craft user-first products that are both functional and visually appealing, delivering solutions that leave a lasting impression.",
            image: Card4,
            bgColor: "#484440",
            textColor: "#F5E7D3"
        }
    ];

    return (
        <div className="relative bg-black">
            {/* Clean Intro Section */}
            <motion.section
                className="intro h-screen flex justify-center items-center px-4 relative"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <DrawCircleText
                        normalText="Creating standout brands for "
                        normalText2="that bring joy and leave lasting impression."
                        circleText="startups"
                    />
                </motion.div>
            </motion.section>

            {/* Clean Service Cards Section */}
            <section className="service-cards relative">
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className="service-card h-screen flex items-center justify-center px-4"
                        style={{ zIndex: services.length - index }}
                    >
                        <div
                            className="service-card-inner w-full max-w-7xl mx-auto rounded-3xl p-8 md:p-16 shadow-2xl"
                            style={{
                                backgroundColor: service.bgColor,
                                color: service.textColor
                            }}
                        >
                            <div className="flex flex-col lg:flex-row items-center gap-16">
                                {/* Content Section - Clean and Readable */}
                                <div className="flex-1 space-y-8">
                                    {/* Service Number */}
                                    <div className="text-8xl md:text-9xl font-black opacity-20 leading-none">
                                        0{service.id}
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                                        {service.title}
                                    </h1>

                                    {/* Description */}
                                    <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed opacity-90 max-w-3xl">
                                        {service.description}
                                    </p>

                                    {/* Clean CTA Button */}
                                    <motion.button
                                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg border-2 transition-all duration-300"
                                        style={{
                                            borderColor: service.textColor,
                                            color: service.textColor
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: service.textColor,
                                            color: service.bgColor
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Learn More
                                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </motion.button>
                                </div>

                                {/* Image Section - Clean and Simple */}
                                <div className="flex-1 max-w-lg lg:max-w-none">
                                    <motion.div
                                        className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Subtle overlay on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-black/20"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ServiceCard;