
import { motion, Variants } from 'framer-motion'

const letterVariants: Variants = {
    initial: { opacity: 0, y: 0, x: 0 },
    animate: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 1,
            ease: 'easeOut',
        },
    },
};

const wordVariants: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.09,
        },
    },
};

const splitText = (text: string, type: string = 'word') => text.split("").map((letter, index) => (
    <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        initial="initial"
        animate="animate"
    >
        {letter}
    </motion.span>
));

export { splitText, wordVariants, letterVariants };
