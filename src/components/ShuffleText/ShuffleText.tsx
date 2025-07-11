import React, { useEffect, useRef } from "react";

const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

interface ShuffleTextProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}

const ShuffleText: React.FC<ShuffleTextProps> = ({
    text,
    className = "",
    delay = 0,
    speed = 0.03,
}) => {
    const output = useRef<HTMLHeadingElement>(null);
    const iteration = useRef(0);

    useEffect(() => {
        iteration.current = 0;
        const interval = setInterval(() => {
            if (output.current) {
                output.current.innerText = text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration.current) {
                            return text[index];
                        }

                        return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                    })
                    .join("");

                if (iteration.current < text.length) {
                    iteration.current += speed ? text.length * speed : 1;
                } else {
                    clearInterval(interval);
                }
            }
        }, delay ? delay : 30);

        return () => clearInterval(interval);
    }, [text, delay, speed]);

    return (
        <h1 ref={output} className={className} data-value={text}>

        </h1>
    );
};

export default ShuffleText;
