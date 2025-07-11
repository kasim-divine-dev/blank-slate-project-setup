"use client";
import React from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { number } from 'prop-types'
function PreLoading({ count }) {
    const name = "Mkronix";

    const starVariant = {
        initial: {
            opacity: 0,
            rotate: 0,
        },
        animate: {
            opacity: 1,
            rotate: 90,
            transition: {
                duration: 0.6,
                delay: 0.6,
                ease: easeInOut,
            },
        },
        exit: {
            opacity: 0,
            rotate: 0,
            transition: {
                delay: .75
            },
        },
    };

    return (
        <AnimatePresence>
            {count > 1 && (
                <motion.section
                    className="z-[100] relative  w-full h-screen flex  items-center md:items-end justify-center overflow-hidden pb-10"
                >
                    {name.split("").map((nom, i) => {
                        return name[i] === "M" || name[i] === "k" ? (
                            <div
                                key={`${nom}_${i}`}
                                className="flex flex-col items-center justify-center md:gap-y-[6vh] lg:gap-y-[10vh]"
                            >
                                <motion.div
                                    variants={starVariant}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                </motion.div>
                                <motion.p
                                    initial={{ y: "100%", opacity: 1 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            duration: 1,
                                            ease: [0.87, 0, 0.13, 1],
                                            delay: i * 0.1,
                                        },
                                    }}
                                    exit={{
                                        y: "100%",
                                        transition: {
                                            delay: 0.6,
                                            ease: [0.65, 0, 0.35, 1]
                                        },
                                    }}
                                    className={`font-spectral text-darkText uppercase text-[20.5vw] leading-[.85] tracking-tight mb-[-.2em]`}
                                >
                                    {nom}
                                </motion.p>
                            </div>
                        ) : (
                            <div key={`${nom}_${i}`} className="">
                                <motion.p
                                    initial={{ y: "100%" }}
                                    animate={{
                                        y: 0,
                                        transition: {
                                            duration: 1,
                                            ease: [0.87, 0, 0.13, 1],
                                            delay: i * 0.1,
                                        },
                                    }}
                                    exit={{
                                        y: 0,
                                        opacity: 0,
                                        transition: {
                                            // delay: 0.1,
                                            ease: [0.65, 0, 0.35, 1]
                                        },
                                    }}
                                    className={`font-spectral text-darkText80 uppercase text-[20.5vw] leading-[.85] tracking-tight mb-[-.2em]`}
                                >
                                    {nom}
                                </motion.p>
                            </div>
                        );
                    })}
                </motion.section>
            )}
        </AnimatePresence>
    );
}

PreLoading.propTypes = {
    count: number
};
export default PreLoading;
