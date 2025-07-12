import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdArrowOutward } from 'react-icons/md';
import Case1 from '../../assets/img/p1.png';
import Case2 from '../../assets/img/p2.png';
import Case3 from '../../assets/img/p3.png';
import { DynamicSEO } from '../SEO/DynamicSEO';
import { DrawCircleText } from '../DrawCircleText/DrawCircleText';
import './CaseStudies.css';

const CaseStudies = () => {
    useGSAP(
        () => {
            const images = gsap.utils.toArray(".case-studies-img");

            images.forEach((img: Element, i) => {
                const imgElement = (img as Element).querySelector("img");

                ScrollTrigger.create({
                    trigger: img,
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        gsap.to(imgElement, {
                            scale: 2 - self.progress,
                            duration: 0.1,
                            ease: "none",
                        });
                    },
                });

                ScrollTrigger.create({
                    trigger: img,
                    start: "top top",
                    end: () =>
                        `+=${(document.querySelector(".case-studies-item") as HTMLElement).offsetHeight *
                        (images.length - i - 1)
                        }`,
                    pin: true,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                });
            });

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        },
    );

    return (
        <>
            <DynamicSEO pageName="caseStudies" />
            
            {/* Hidden SEO Content */}
            <div className="sr-only">
                <h1>MkRonix Case Studies - 20+ Successful Digital Projects & Client Success Stories</h1>
                <p>Explore detailed case studies showcasing our successful digital transformations across web development, UI/UX design, mobile apps, and digital marketing projects in India.</p>
                <span>Featured Projects: Elevé Fashion Platform, Patria Time Management, Creators Social Network</span>
                <span>Technologies: React, Node.js, UI/UX Design, Mobile Development, Digital Marketing</span>
                <span>Industries: Fashion, Productivity, Social Media, E-commerce</span>
                <span>Results: 150% conversion increase, 85% performance boost, 4.8/5 user ratings</span>
            </div>

            <section className="h-screen flex justify-center items-center px-4">
                <DrawCircleText
                    normalText={"Exploring groundbreaking that redefine "}
                    normalText2={"the digital landscape through creativity and innovation."}
                    circleText={"Projects"}
                />
            </section>
            
            <section className="case-studies-items relative w-full h-full flex -mt-2">
                <div className="case-studies-items-content relative z-[2] flex-[1]">
                    <div className="px-4 case-studies-item case-studies-item-1 w-full h-max md:h-[100svh]">
                        <div className="container flex flex-col justify-center h-full">
                            <h3 className='font-normal text-[3rem] text-darkText80 md:text-[4rem] mb-2 tracking-[-5px]'>Elevé: Redefining Fashion in the Digital Age</h3>
                            <p className="primary mb-[0.5em] text-2xl text-darkText80">[ Elevé — The Future of Lifestyle ]</p>
                            <div className="case-studies-item-inner-img md:hidden block rounded-[1em] overflow-hidden h-[300px] mb-[1em]">
                                <img src={Case1} alt="Lifestyle fashion project showcase" />
                            </div>
                            <p className='text-darkText80 text-lg md:text-2xl'>
                                Elevé is the ultimate fusion of AI-driven personalization and cutting-edge fashion.
                                This lifestyle project curates tailored outfit recommendations based on your mood, schedule, and personal aesthetics.
                                Elevate your style with real-time trend insights and sustainable fashion choices—all in one seamless experience.
                            </p>
                            <div className="case-studies-item-inner-link md:hidden my-[2em] flex items-center gap-[0.5em]">
                                <a href="/case-studies/eleve-fashion-platform" className='text-darkText80'>Discover Elevé</a>
                                <div className="link-icon relative top-[0.125rem]">
                                    <MdArrowOutward size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 case-studies-item case-studies-item-2 w-full h-max md:h-[100svh]">
                        <div className="container flex flex-col justify-center h-full">
                            <h3 className='font-normal text-[3rem] text-darkText80 md:text-[4rem] mb-2 tracking-[-5px]'>Patria: Master Your Time Like Never Before</h3>
                            <p className="primary mb-[0.5em] text-2xl text-darkText80">[ Patria — The Ultimate Time Management Software ]</p>
                            <div className="case-studies-item-inner-img md:hidden block rounded-[1em] overflow-hidden h-[300px] mb-[1em]">
                                <img src={Case2} alt="Time management software interface" />
                            </div>
                            <p className='text-darkText80 text-lg md:text-2xl'>
                                Patria transforms how individuals and teams manage time with AI-powered scheduling,
                                automated task prioritization, and intuitive productivity analytics.
                                Designed for efficiency, Patria helps users stay on top of deadlines, meetings, and daily routines seamlessly.
                            </p>
                            <div className="case-studies-item-inner-link md:hidden my-[2em] flex items-center gap-[0.5em]">
                                <a href="/case-studies/patria-time-management" className='text-darkText80'>Explore Patria</a>
                                <div className="link-icon relative top-[0.125rem]">
                                    <MdArrowOutward size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 case-studies-item case-studies-item-3 w-full h-max md:h-[100svh]">
                        <div className="container flex flex-col justify-center h-full">
                            <h3 className='font-normal text-[3rem] text-darkText80 md:text-[4rem] mb-2 tracking-[-5px]'>Creators: The Social Network for Innovators</h3>
                            <p className="primary mb-[0.5em] text-2xl text-darkText80">[ Creators — Powering the Next Generation of Content ]</p>
                            <div className="case-studies-item-inner-img md:hidden block rounded-[1em] overflow-hidden h-[300px] mb-[1em]">
                                <img src={Case3} alt="Social media platform for creators" />
                            </div>
                            <p className='text-darkText80 text-lg md:text-2xl'>
                                Creators is a social platform built exclusively for artists, influencers, and digital content creators.
                                Featuring AI-driven content suggestions, monetization tools, and an engaged creator-first community,
                                Creators empowers individuals to build, share, and grow their brand like never before.
                            </p>
                            <div className="case-studies-item-inner-link md:hidden my-[2em] flex items-center gap-[0.5em]">
                                <a href="/case-studies/creators-social-platform" className='text-darkText80'>Join the Movement</a>
                                <div className="link-icon relative top-[0.125rem]">
                                    <MdArrowOutward size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="case-studies-items-images max-md:hidden relative flex-[1]">
                    <div className="case-studies-img relative will-change-transform rounded-[1em] overflow-hidden z-[1] case-studies-img-1 w-full h-[100svh]">
                        <img src={Case1} alt={`lifestyle project`} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[2]' />
                        <div className="hero-img-overlay"></div>
                        <div className="case-studies-img-link max-md:hidden absolute top-0 left-0 w-full h-full flex justify-center items-center">
                            <a className='w-full h-full flex items-center justify-center' href="/case-studies/eleve-fashion-platform">
                                <span className='flex items-center text-darkText80'>
                                    (&nbsp; View Case Study <MdArrowOutward />
                                    &nbsp;)
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="case-studies-img relative will-change-transform rounded-[1em] overflow-hidden z-[1] case-studies-img-2 w-full h-[100svh]">
                        <img src={Case2} alt={`time management project`} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[2]' />
                        <div className="hero-img-overlay"></div>
                        <div className="case-studies-img-link max-md:hidden absolute top-0 left-0 w-full h-full flex justify-center items-center">
                            <a className='w-full h-full flex items-center justify-center' href="/case-studies/patria-time-management">
                                <span className='flex items-center text-darkText80'>
                                    (&nbsp; View Case Study <MdArrowOutward />
                                    &nbsp;)
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="case-studies-img relative will-change-transform rounded-[1em] overflow-hidden z-[1]  case-studies-img-3 w-full h-[100svh]">
                        <img src={Case3} alt={`creators project`} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[2]' />
                        <div className="hero-img-overlay"></div>
                        <div className="case-studies-img-link max-md:hidden absolute top-0 left-0 w-full h-full flex justify-center items-center">
                            <a className='w-full h-full flex items-center justify-center' href="/case-studies/creators-social-platform">
                                <span className='flex items-center text-darkText80'>
                                    (&nbsp; View Case Study <MdArrowOutward />
                                    &nbsp;)
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CaseStudies
