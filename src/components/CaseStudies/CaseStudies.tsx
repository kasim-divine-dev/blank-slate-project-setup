
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdArrowOutward } from 'react-icons/md';
import { caseStudiesData } from '../../data/caseStudiesData';
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
                <span>Featured Projects: {caseStudiesData.slice(0, 3).map(study => study.title).join(', ')}</span>
                <span>Technologies: React, Node.js, UI/UX Design, Mobile Development, AI/ML, FinTech</span>
                <span>Industries: Fashion, Productivity, Social Media, Healthcare, FinTech</span>
                <span>Results: 150% engagement increase, 85% performance boost, 4.9/5 user ratings</span>
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
                    {caseStudiesData.slice(0, 3).map((study, index) => (
                        <div key={study.id} className={`px-4 case-studies-item case-studies-item-${index + 1} w-full h-max md:h-[100svh]`}>
                            <div className="container flex flex-col justify-center h-full">
                                <h3 className='font-normal text-[3rem] text-darkText80 md:text-[4rem] mb-2 tracking-[-5px]'>
                                    {study.title}
                                </h3>
                                <p className="primary mb-[0.5em] text-2xl text-darkText80">
                                    [ {study.subtitle} ]
                                </p>
                                <div className="case-studies-item-inner-img md:hidden block rounded-[1em] overflow-hidden h-[300px] mb-[1em]">
                                    <img src={study.image} alt={`${study.category} project showcase`} />
                                </div>
                                <p className='text-darkText80 text-lg md:text-2xl'>
                                    {study.description}
                                </p>
                                <div className="case-studies-item-inner-link md:hidden my-[2em] flex items-center gap-[0.5em]">
                                    <a href={study.url} className='text-darkText80'>
                                        Discover {study.title.split(':')[0]}
                                    </a>
                                    <div className="link-icon relative top-[0.125rem]">
                                        <MdArrowOutward size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="case-studies-items-images max-md:hidden relative flex-[1]">
                    {caseStudiesData.slice(0, 3).map((study, index) => (
                        <div key={study.id} className={`case-studies-img relative will-change-transform rounded-[1em] overflow-hidden z-[1] case-studies-img-${index + 1} w-full h-[100svh]`}>
                            <img
                                src={study.image}
                                alt={`${study.category} project`}
                                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[2]'
                            />
                            <div className="hero-img-overlay"></div>
                            <div className="case-studies-img-link max-md:hidden absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                <a className='w-full h-full flex items-center justify-center' href={study.url}>
                                    <span className='flex items-center text-darkText80'>
                                        (&nbsp; View Case Study <MdArrowOutward />
                                        &nbsp;)
                                    </span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default CaseStudies
