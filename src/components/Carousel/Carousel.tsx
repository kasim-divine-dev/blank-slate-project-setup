
import React from 'react'
import { carouselItems } from '../../data/carouselItems'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { DrawCircleText } from '../DrawCircleText/DrawCircleText';

gsap.registerPlugin(ScrollTrigger);

const Carousel: React.FC = () => {
    useGSAP(
        () => {
            if (typeof window === "undefined") return;

            const projects = gsap.utils.toArray(".project");

            ScrollTrigger.create({
                trigger: ".carousel",
                start: "top top",
                end: `+=${window.innerHeight * (projects.length - 1)}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress * (projects.length - 1);
                    const currentSlide = Math.floor(progress);
                    const slideProgress = progress - currentSlide;

                    if (currentSlide < projects.length - 1) {
                        gsap.set(projects[currentSlide], {
                            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                        });

                        const nextSlideProgress = gsap.utils.interpolate(
                            "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                            "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                            slideProgress
                        );

                        gsap.set(projects[currentSlide + 1], {
                            clipPath: nextSlideProgress,
                        });
                    }

                    projects.forEach((project, index) => {
                        if (index < currentSlide) {
                            gsap.set(project, {
                                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                            });
                        } else if (index > currentSlide + 1) {
                            gsap.set(project, {
                                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                            });
                        }
                    });
                },
            });

            gsap.set(projects[0], {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        },
    );

    return (
        <>
            <section className="intro h-screen flex justify-center items-center px-4">
                <DrawCircleText
                    normalText={"Crafting innovative digital experiences for "}
                    normalText2={"that inspire, engage, and drive impact."}
                    circleText={"businesses"}
                />
            </section>
            <section className="carousel relative w-screen h-screen overflow-hidden z-[1]" >
                {carouselItems.map((item) => (
                    <div
                        key={item.id}
                        id={`project-${item.id}`}
                        className="project absolute top-0 left-0 w-screen h-screen"
                        style={{
                            clipPath:
                                item.id === "01"
                                    ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
                                    : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                        }}
                    >
                        <div className="project-bg absolute w-full h-full">
                            <img src={item.bg} alt={`background for project ${item.id}`} className='w-full h-full object-contain md:object-cover' />
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Carousel
