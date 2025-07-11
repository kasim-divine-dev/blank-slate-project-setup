
import { AnimatePresence, motion } from "framer-motion";
import React, { Dispatch } from "react";
import FlipLink from "../FlipLink/FlipLink";

interface MenuProps {
    menuOpen: boolean;
    setMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}
function Menu({ menuOpen, setMenuOpen }: MenuProps) {
    const primaryEasing = [0.83, 0, 0.17, 1] as const;

    console.log("menuOpen", menuOpen);
    return (
        <>
            <button
                onClick={() => {
                    console.log("clicked");
                    setMenuOpen(!menuOpen)
                }}
                className="md:text-darkText text-white cursor-pointer fixed top-0 right-0 z-[10000]"
            >
                <svg
                    className="w-12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 10 10"
                    stroke="currentColor"
                    strokeWidth=".2"
                    fill="rgba(0,0,0,0)"
                    strokeLinecap="round"
                >
                    <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                        <animate
                            dur="0.2s"
                            attributeName="d"
                            values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                            fill="freeze"
                            begin="start.begin"
                        />
                        <animate
                            dur="0.2s"
                            attributeName="d"
                            values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                            fill="freeze"
                            begin="reverse.begin"
                        />
                    </path>
                    <rect width="10" height="10" stroke="none">
                        <animate dur="2s" id="reverse" attributeName="width" begin="click" />
                    </rect>
                    <rect width="10" height="10" stroke="none">
                        <animate
                            dur="0.001s"
                            id="start"
                            attributeName="width"
                            values="10;0"
                            fill="freeze"
                            begin="click"
                        />
                        <animate
                            dur="0.001s"
                            attributeName="width"
                            values="0;10"
                            fill="freeze"
                            begin="reverse.begin"
                        />
                    </rect>
                </svg>
            </button>

            <AnimatePresence
            >
                {menuOpen && (
                    <motion.section
                        initial={{
                            scaleY: 0,
                            borderBottomLeftRadius: "50%",
                            borderBottomRightRadius: "50%",
                        }}
                        animate={{
                            scaleY: 1,
                            borderBottomLeftRadius: "0%",
                            borderBottomRightRadius: "0%",
                            transition: { duration: 0.7, ease: primaryEasing },
                        }}
                        exit={{
                            scaleY: 0,
                            borderBottomLeftRadius: "50%",
                            borderBottomRightRadius: "50%",
                            transition: { delay: 1 },
                        }}
                        className={`${menuOpen
                            ? "visible bg-darkText"
                            : "invisible bg-black"
                            } origin-top-right z-[100] fixed top-0 left-0 w-full h-screen `}
                    >
                        <motion.div
                            initial={{
                                scaleY: 0,
                                borderBottomLeftRadius: "0%",
                                borderBottomRightRadius: "0%",
                            }}
                            animate={{
                                scaleY: 1,
                                borderBottomLeftRadius: "50%", // moved here
                                borderBottomRightRadius: "50%", // moved here
                                transition: {
                                    duration: 0.7,
                                    delay: 0.5,
                                    ease: primaryEasing,
                                },
                            }}
                            exit={{
                                scaleY: 0,
                                borderBottomLeftRadius: "0%",
                                borderBottomRightRadius: "0%",
                                transition: { delay: 0.9 },
                            }}

                            className={`${menuOpen ? "visible" : "invisible"
                                } origin-top-right bg-black grid grid-cols-1 md:grid-cols-2 w-full h-full`}
                        >
                            <div className="md:p-8 p-3 md:bg-black bg-darkText md:text-darkText text-black flex flex-col">
                                <div className="flex items-center h-full">
                                    {/* Menu Links */}
                                    <nav className="h-full font-spectral place-content-center max-md:tracking-widest text-2xl grid grid-cols-1 gap-7 sm:text-4xl md:text-5xl lg:text-6xl md:font-semibold ">
                                        <FlipLink href={'/'}>Home</FlipLink>
                                        <FlipLink href={'/about'}>About</FlipLink>
                                        <FlipLink href={'/services'}>Service</FlipLink>
                                        <FlipLink href={'/projects'}>Projects</FlipLink>
                                        <FlipLink href={'/case-studies'}>Case Studies</FlipLink>
                                        <FlipLink href={'/contact'}>Contact</FlipLink>
                                    </nav>
                                </div>
                                <div className="font-spectral space-x-4 max-md:font-bold text-lg md:tracking-wider">
                                    <span>
                                        LinkedIn
                                    </span>
                                    <span >
                                        Instagram
                                    </span>
                                    <span>
                                        Facebook
                                    </span>
                                </div>
                            </div>
                            <div className="bg-black md:bg-lightBg text-darkText md:text-black flex flex-col justify-around h-full md:justify-center md:p-8 p-3 relative">
                                <div>
                                    <h2 className="text-darkText md:text-black font-spectral text-3xl font-thin mb-2">Got an idea?</h2>
                                    <p className="text-darkText md:text-black font-spectral max-md:font-bold text-4xl md:text-5xl mb-4">
                                        Let's craft <br /> brilliant together!
                                    </p>
                                    <button
                                        className="border border-accent font-spectral md:border-white px-4 py-2 text-lg rounded-full transition w-max"
                                    >
                                        Get In touch
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
}

export default Menu;
