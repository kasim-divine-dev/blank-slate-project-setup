
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card1 from '../../assets/img/contact-dark.png';
import Card2 from '../../assets/img/contact-light.png';

const GetInTouch: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (card1Ref.current && card2Ref.current && card3Ref.current) {
            gsap.set(card1Ref.current, { rotation: -10 });
            gsap.set(card2Ref.current, { rotation: -20 });
            gsap.set(card3Ref.current, { rotation: -15 });

            const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "-50% top",
                onUpdate: (self) => {
                    const progress = self.progress;
                    cards.forEach((card) => {
                        gsap.to(card, { y: -300 * progress, overwrite: true });
                    });
                },
            });
        }

        const splitTextIntoSpans = (element: HTMLElement | null) => {
            if (!element) return;

            const text = element.innerText;
            element.innerHTML = "";

            text.split("").forEach((char) => {
                if (char === " ") {
                    element.innerHTML += "&nbsp;";
                } else {
                    const span = document.createElement("span");
                    span.innerText = char;

                    const div = document.createElement("div");
                    div.className = "letter";
                    div.appendChild(span);

                    element.appendChild(div);
                }
            });
        };

        splitTextIntoSpans(headingRef.current);

        if (headingRef.current) {
            const spans = headingRef.current.querySelectorAll(".letter span");

            gsap.to(spans, {
                x: 0,
                duration: 1,
                ease: "power4.out",
                delay: (index) => Math.random() * 0.5 + 0.25,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 90%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen bg-black relative flex flex-col items-center justify-center px-10">
            <div
                ref={card1Ref}
                className="card absolute w-[200px] md:w-[300px] card-1 md:top-[60%] top-[50%] md:left-[10%] left-[5%]"
                style={{ transformOrigin: "center center" }}
            >
                <img src={Card1} alt="web developer" />
            </div>
            <div
                ref={card2Ref}
                className="card absolute w-[200px] md:w-[300px] card-2 md:top-[40%] top-[20%] md:left-[35%] left-[25%]"
                style={{ transformOrigin: "center center" }}
            >
                <img src={Card2} alt="app developer" />
            </div>
            <div
                ref={card3Ref}
                className="card absolute w-[200px] md:w-[300px] card-3 z-20 md:top-[65%] top-[73%] md:left-[65%] left-[35%]"
                style={{ transformOrigin: "center center", top: "65%" }}
            >
                <img src={Card1} alt="full stack developer" />
            </div>
            <div className="text-center relative z-10">
                <h1 ref={headingRef}
                    className='flex uppercase items-center text-6xl sm:text-4xl md:text-5xl lg:text-[9rem] font-bold text-darkText80 mb-4'
                >Get in touch</h1>
            </div>
        </section>
    );
};

export default GetInTouch;
