
import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Img1 from '../../assets/img/card-3.jpeg';

interface Card {
    id: string;
    endTranslateX: number;
    rotate: number;
}

export default function HorizontalTextScroller(): React.ReactElement {
    const sectionRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards: Card[] = [
            { id: "#horizontal-card-1", endTranslateX: -2000, rotate: 45 },
            { id: "#horizontal-card-2", endTranslateX: -1000, rotate: -30 },
            { id: "#horizontal-card-3", endTranslateX: -2000, rotate: 45 },
            { id: "#horizontal-card-4", endTranslateX: -1500, rotate: -30 },
        ];

        ScrollTrigger.create({
            trigger: ".horizontal-wrapper-404",
            start: "top top",
            end: "+=900vh",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                gsap.to(".horizontal-wrapper-404", {
                    x: `${-350 * self.progress}vw`,
                    duration: 0.5,
                    ease: "power3.out",
                });
            },
        });

        cards.forEach((card) => {
            ScrollTrigger.create({
                trigger: card.id,
                start: "top top",
                end: "+=1200vh",
                scrub: 1,
                onUpdate: (self) => {
                    gsap.to(card.id, {
                        x: `${card.endTranslateX * self.progress}px`,
                        rotate: `${card.rotate * self.progress * 2}`,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            className="overflow-hidden relative h-[300vh]"
            ref={sectionRef}
        >
            <section className="horizontal-wrapper-404 absolute top-0 w-[400vw] h-screen will-change-transform" ref={wrapperRef}>
                <h1 className="text-[28vw] font-bold mb-8 w-full text-darkText font-boska-bold text-center m-0">
                    Transforming Ideas into Reality
                </h1>

                <div className="absolute md:w-[300px] w-44 md:h-[300px] h-44 bg-gray-500 rounded-[20px] overflow-hidden top-1/2 left-[20%]" id="horizontal-card-1">
                    <img src={Img1} alt="Horizontal scroller text card 1" className="w-full h-full object-cover" />
                </div>
                <div className="absolute md:w-[300px] w-44 md:h-[300px] h-44 bg-gray-500 rounded-[20px] overflow-hidden top-1/4 left-[40%]" id="horizontal-card-2">
                    <img src={Img1} alt="Horizontal scroller text card 2" className="w-full h-full object-cover" />
                </div>
                <div className="absolute md:w-[300px] w-44 md:h-[300px] h-44 bg-gray-500 rounded-[20px] overflow-hidden top-[45%] left-[60%]" id="horizontal-card-3">
                    <img src={Img1} alt="Horizontal scroller text card 3" className="w-full h-full object-cover" />
                </div>
                <div className="absolute md:w-[300px] w-44 md:h-[300px] h-44 bg-gray-500 rounded-[20px] overflow-hidden top-[15%] left-[80%]" id="horizontal-card-4">
                    <img src={Img1} alt="Horizontal scroller text card 4" className="w-full h-full object-cover" />
                </div>
            </section>
        </section>
    );
}
