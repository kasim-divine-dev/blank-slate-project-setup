'use client';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import services from '../../data/servicesection';
import { DrawCircleText } from '../DrawCircleText/DrawCircleText';



export default function ServiceSection() {
    // State to track the active service card for mobile view
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className='relative'>
            {/* Hero Section with enhanced animation */}
            <motion.section
                className="h-screen flex justify-center items-center px-4 overflow-hidden relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 0, 255, 0.15), transparent 40%)`,
                    }}
                />

                <div className="text-center">
                    <DrawCircleText
                        normalText="Building exceptional digital experiences through "
                        normalText2="cutting-edge technology, and strategy."
                        circleText="Creativity"
                    />
                </div>

            </motion.section>

            {/* Desktop View: Sticky Scroll Effect */}
            <div className="hidden md:block relative w-full" ref={sectionRef}>
                {services.map((service, i) => (
                    <StickyCard
                        key={`service_${i}`}
                        index={i}
                        totalCards={services.length}
                        service={service}
                    />
                ))}
            </div>

            {/* Mobile View: Swipeable Cards with enhanced indicators */}
            <div className="md:hidden w-full px-4 py-10 space-y-12">
                <div className="flex justify-center items-center space-x-3 mb-6">
                    {services.map((_, i) => (
                        <motion.button
                            key={`indicator_${i}`}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1 transition-all duration-500 rounded-full ${i === activeIndex ? 'bg-gradient-to-r from-off-white to-lightText w-6' : 'bg-white/30 w-3'
                                }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`mobile_service_${activeIndex}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                        className="w-full"
                    >
                        <MobileCard service={services[activeIndex]} />
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-6">
                    <motion.button
                        onClick={() => setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1))}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ←
                    </motion.button>

                    <motion.button
                        onClick={() => setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1))}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        →
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

const StickyCard = ({ index, totalCards, service }) => {
    const {
        name,
        overview,
        purpose,
        tools,
        notableWorks,
        ongoingProjects,
        projectsCompleted,
        image
    } = service;

    const cardRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.2 });


    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 1.1]);
    const imageOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [0, 1, 1, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [60, 0, 0, -60]);
    const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -3]);
    const bgBlur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 8, 8, 0]);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        if (imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width - 0.5,
                y: (e.clientY - rect.top) / rect.height - 0.5
            });
        }
    };

    // Word entrance animation
    const titleWords = name.split(' ');

    return (
        <div
            ref={cardRef}
            className="h-screen flex flex-col md:flex-row items-center justify-center w-full sticky top-0 overflow-hidden"
            style={{ zIndex: totalCards - index }}
        >
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    filter: `blur(${bgBlur}px)`,
                    opacity: useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0])
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={`blob_${index}_${i}`}
                        className="absolute rounded-full bg-gradient-to-r from-off-white/10 to-lightText/10"
                        style={{
                            width: Math.random() * 300 + 50,
                            height: Math.random() * 300 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            filter: 'blur(40px)',
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>

            <motion.div
                ref={textRef}
                style={{ opacity: textOpacity, y: textY }}
                className="w-full md:w-1/2 flex flex-col gap-6 px-6 md:px-16 max-w-2xl relative z-10"
            >
                <motion.div className="flex flex-col">
                    <div className="overflow-hidden mb-2">
                        {titleWords.map((word, i) => (
                            <motion.span
                                key={`word_${i}`}
                                className="inline-block mr-3 text-5xl md:text-6xl font-black"
                                initial={{ y: 80 }}
                                animate={isInView ? { y: 0 } : { y: 80 }}
                                transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    <motion.h2
                        className="text-xl md:text-2xl mt-2 text-white/80"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {purpose}
                    </motion.h2>
                </motion.div>

                <motion.div
                    className="flex flex-col space-y-5 relative"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Animated line connector */}
                    <motion.div
                        className="absolute left-0 top-0 w-1 h-0 bg-gradient-to-b from-off-white to-darkBg"
                        initial={{ height: 0 }}
                        animate={isInView ? { height: '100%' } : { height: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="pl-6"
                    >
                        <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-off-white to-lightText">Overview</span>
                        </h3>
                        <p className="text-white/70 leading-relaxed text-lg">{overview}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="pl-6"
                    >
                        <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-off-white to-lightText">Tools</span>
                        </h3>
                        <p className="text-white/70 text-lg">{tools}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="pl-6"
                    >
                        <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-white">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-off-white to-lightText">Notable Projects</span>
                        </h3>
                        <ul className="list-none pl-0 text-white/70 space-y-2">
                            {notableWorks.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    className="flex items-start text-lg"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3, delay: 1 + idx * 0.1 }}
                                >
                                    <span className="inline-block w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-off-white to-lightText" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="flex justify-start space-x-12 pt-6 mt-4 border-t border-white/10 pl-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        <motion.div
                            className="text-center group cursor-pointer"
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.p
                                className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-off-white to-lightText"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {ongoingProjects}
                            </motion.p>
                            <p className="text-sm text-white/60 uppercase tracking-wider group-hover:text-white mt-1">Ongoing Projects</p>
                        </motion.div>

                        <motion.div
                            className="text-center group cursor-pointer"
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.p
                                className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-off-white to-lightText"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            >
                                {projectsCompleted}
                            </motion.p>
                            <p className="text-sm text-white/60 uppercase tracking-wider group-hover:text-white mt-1">Projects Completed</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                ref={imageRef}
                style={{
                    opacity: imageOpacity,
                    scale: imageScale,
                }}
                className="w-full md:w-1/2 flex justify-center items-center p-6"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
            >
                <motion.div
                    className="relative w-80 h-80 md:w-96 md:h-96 overflow-hidden rounded-xl transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        x: mousePosition.x * 30,
                        y: mousePosition.y * 30,
                    }}
                >

                    <motion.img
                        src={image}
                        alt={`${name} service`}
                        className="object-cover w-full h-full transition-all duration-300"
                        animate={{
                            scale: 1.05,
                        }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

// Mobile Card Component with enhanced animations
const MobileCard = ({ service }) => {
    const {
        name,
        overview,
        purpose,
        tools,
        notableWorks,
        ongoingProjects,
        projectsCompleted,
        image
    } = service;

    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, amount: 0.1 });

    // Split the name into words for letter animation
    const titleWords = name.split(' ');

    return (
        <motion.div
            ref={cardRef}
            className="w-full flex flex-col gap-6 relative"
        >

            {/* Image with animations */}
            <motion.div
                className="w-full h-64 rounded-xl overflow-hidden relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-off-white/40 to-lightText/40 mix-blend-overlay z-10"
                    animate={{
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.img
                    src={image}
                    alt={`${name} service`}
                    className="w-full h-full object-cover"
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />


                {/* Floating badge */}
                <motion.div
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <motion.span
                        animate={{ color: ['#f472b6', '#a855f7', '#f472b6'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ★ Premium Service
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Content with enhanced typography */}
            <motion.div
                className="flex flex-col gap-4 relative pl-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Animated vertical line */}
                <motion.div
                    className="absolute left-0 top-12 w-[2px] h-0 bg-gradient-to-b from-off-white to-lightText rounded-full"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: 'calc(100% - 3rem)' } : { height: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                <div>
                    {/* Title with word-by-word animation */}
                    <div className="overflow-hidden mb-1">
                        {titleWords.map((word, i) => (
                            <motion.span
                                key={`mobile_word_${i}`}
                                className="inline-block mr-2 text-3xl font-black"
                                initial={{ y: 40 }}
                                animate={isInView ? { y: 0 } : { y: 40 }}
                                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    <motion.p
                        className="text-white/70 mt-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {purpose}
                    </motion.p>
                </div>

                <motion.div
                    className="pl-4 border-l-0 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                    >
                        <h3 className="text-xl font-bold mb-1">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-off-white to-lightText">Overview</span>
                        </h3>
                        <p className="text-sm text-white/70 leading-relaxed">{overview}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                    >
                        <h3 className="text-xl font-bold mb-1">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-off-white to-lightText">Tools</span>
                        </h3>
                        <p className="text-sm text-white/70">{tools}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                    >
                        <h3 className="text-xl font-bold mb-1">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-off-white to-lightText">Notable Projects</span>
                        </h3>
                        <ul className="list-none pl-0 text-sm text-white/70 space-y-2">
                            {notableWorks.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                                    transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
                                    whileHover={{ x: 3 }}
                                >
                                    <span className="inline-block w-2 h-2 mt-1.5 mr-2 rounded-full bg-gradient-to-r from-off-white to-lightText" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex justify-between pt-4 mt-2 border-t border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 1 }}
                >
                    <motion.div
                        className="text-center"
                        whileHover={{ scale: 1.1, y: -3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.p
                            className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-off-white to-lightText"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {ongoingProjects}
                        </motion.p>
                        <p className="text-xs text-white/60 uppercase tracking-wider">Ongoing</p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        whileHover={{ scale: 1.1, y: -3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.p
                            className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-off-white to-lightText"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                            {projectsCompleted}
                        </motion.p>
                        <p className="text-xs text-white/60 uppercase tracking-wider">Completed</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
