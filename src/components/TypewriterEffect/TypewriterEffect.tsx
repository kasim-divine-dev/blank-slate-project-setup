
"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface Word {
    text: string;
    className?: string;
}

interface TypewriterEffectSmoothProps {
    words: Word[];
    className?: string;
}

export const TypewriterEffectSmooth: React.FC<TypewriterEffectSmoothProps> = ({
    words,
    className,
}) => {
    const wordsArray = words.map((word) => {
        return {
            ...word,
            text: word.text.split(""),
        };
    });

    const renderWords = () => {
        return (
            <div className="flex gap-2 md:gap-4 items-center max-md:flex-wrap max-md:justify-center">
                {wordsArray.map((word, idx) => {
                    return (
                        <h2 key={`word-${idx}`} className="inline-block">
                            {word.text.map((char, index) => (
                                <span
                                    key={`char-${index}`}
                                    className={cn(`text-darkText `, className)}>
                                    {char}
                                </span>
                            ))}
                        </h2>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={cn("flex space-x-1 max-w-screen", className)}>
            <motion.div
                className="overflow-hidden"
                initial={{
                    clipPath: "inset(0% 100% 0% 0%)",
                }}
                whileInView={{
                    clipPath: "inset(0% 0% 0% 0%)",
                }}
                transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 1,
                }}
            >
                <div
                    className="font-bold"
                    style={{
                        whiteSpace: "nowrap",
                    }}
                >
                    {renderWords()}{" "}
                </div>
            </motion.div>
        </div>
    );
};
