
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

interface StaggeredTextProps {
    className?: string;
    words: string;
    delay?: number;
}

const StaggeredText: React.FC<StaggeredTextProps> = ({ className, words, delay }) => {
    const ref = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref, { once: false });
    const letters = words.split("");

    const pullupVariant = {
        initial: { y: 100, opacity: 0 },
        animate: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * (delay ? delay : 0.05),
            },
        }),
    };

    return (
        <h1 ref={ref} className="flex justify-center max-w-[90vw] flex-wrap">
            <AnimatePresence>
                {isInView &&
                    letters.map((letter, i) => (
                        <motion.span
                            key={i}
                            variants={pullupVariant}
                            initial="initial"
                            animate="animate"
                            exit="initial"
                            custom={i}
                            className={cn(
                                "pointer-events-none  whitespace-pre-wrap bg-gradient-to-b from-darkText via-darkText80 to-darkText20 bg-clip-text text-center text-5xl lg:text-7xl font-bold text-transparent my-1",
                                className
                            )}
                        >
                            {letter === " " ? <span>&nbsp;</span> : letter}
                        </motion.span>
                    ))}
            </AnimatePresence>
        </h1>
    );
};

export default StaggeredText;
