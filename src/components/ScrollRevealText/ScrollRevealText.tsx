
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
    children: string;
    className?: string;
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ children, className }) => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const characters = el.querySelectorAll(".char");

        gsap.fromTo(
            characters,
            { opacity: 0.3 },
            {
                opacity: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                    toggleActions: "play reverse play reverse",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const splitText = (text: string) =>
        text.split(" ").map((word, index) => (
            <h6
                key={index}
                style={{ display: "inline-block", whiteSpace: "pre" }}
            >
                {word.split("").map((char, i) => (
                    <span key={i} className="char inline-block text-lg md:text-xl">
                        {char}
                    </span>
                ))}
                <span className="char inline-block">&nbsp;</span>
            </h6>
        ));

    return (
        <div
            ref={textRef}
            className={`overflow-hidden ${className}`}
            style={{ display: "inline-block" }}
        >
            {splitText(children)}
        </div>
    );
};

export default ScrollRevealText;
