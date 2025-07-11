import React, { useEffect, useRef } from 'react';
import './ServiceCard.css';
import Card1 from '../../assets/img/img1.jpg';
import Card2 from '../../assets/img/img2.jpg';
import Card3 from '../../assets/img/img3.jpg';
import Card4 from '../../assets/img/img4.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { DrawCircleText } from '../DrawCircleText/DrawCircleText';

const ServiceCard = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis();

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        const cards = gsap.utils.toArray(".service-card");

        ScrollTrigger.create({
            trigger: cards[0],
            start: "top 35%",
            endTrigger: cards[cards.length - 1],
            end: "top 30%",
            pin: ".intro",
            pinSpacing: false,
        });

        cards.forEach((card, index) => {
            const isLastCard = index === cards.length - 1;
            const cardInner = card.querySelector(".service-card-inner");

            if (!isLastCard) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 35%",
                    endTrigger: ".end-service-section",
                    end: "top 65%",
                    pin: true,
                    pinSpacing: false,
                });

                gsap.to(cardInner, {
                    y: `-${(cards.length - index) * 20}vh`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 35%",
                        endTrigger: ".end-service-section",
                        end: "top 65%",
                        scrub: true,
                    },
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            if (lenis) {
                lenis.destroy();
            }
            gsap.ticker.remove();
        };
    }, []);

    return (
        <>
            <section className="intro h-screen flex justify-center items-center px-4">
                <DrawCircleText
                    normalText={"creating standout brands for "}
                    normalText2={"that bring joy and leave lasting impression."}
                    circleText={"startups"}
                />
            </section>
            <section className="service-cards" ref={sectionRef}>
                <div className="service-card" id="service-card-1">
                    <div className="service-card-inner">
                        <div className="service-card-content">
                            <h1 className='font-bold text-[3.5rem] leading-[1] mb-4'>Brand Foundation</h1>
                            <p className='text-2xl lg:text-3xl font-medium'>
                                The heart of your company's story. It shapes your vision, values,
                                and voice, ensuring a clear and powerful impact in every
                                interaction.
                            </p>
                        </div>
                        <div className="service-card-img">
                            <img src={Card1} alt="Brand Foundation" />
                        </div>
                    </div>
                </div>
                <div className="service-card" id="service-card-2">
                    <div className="service-card-inner">
                        <div className="service-card-content">
                            <h1 className='font-bold text-[3.5rem] leading-[1] mb-4'>Design Identity</h1>
                            <p className='text-2xl lg:text-3xl font-medium'>
                                Your brand's visual fingerprint. It crafts a distinctive look that
                                sparks recognition and builds emotional connections with your
                                audience.
                            </p>
                        </div>
                        <div className="service-card-img">
                            <img src={Card2} alt="Design Identity" />
                        </div>
                    </div>
                </div>
                <div className="service-card" id="service-card-3">
                    <div className="service-card-inner">
                        <div className="service-card-content">
                            <h1 className='font-bold text-[3.5rem] leading-[1] mb-4'> Digital Presence</h1>
                            <p className='text-2xl lg:text-3xl font-medium'>
                                Our web solutions combine cutting-edge design and seamless
                                functionality to create experiences that captivate and inspire
                                your audience.
                            </p>
                        </div>
                        <div className="service-card-img">
                            <img src={Card3} alt="Digital Presence" />
                        </div>
                    </div>
                </div >
                <div className="service-card" id="service-card-4">
                    <div className="service-card-inner bg-darkBg">
                        <div className="service-card-content">
                            <h1 className='font-bold text-[3.5rem] leading-[1] mb-4'>Product Design</h1>
                            <p className='text-2xl lg:text-3xl font-medium'>
                                We craft user-first products that are both functional and visually
                                appealing, delivering solutions that leave a lasting impression.
                            </p>
                        </div>
                        <div className="service-card-img">
                            <img src={Card4} alt="Experience Design" />
                        </div>
                    </div>
                </div >
            </section >
            <section className="end-service-section">
            </section>
        </>

    );
};

export default ServiceCard;