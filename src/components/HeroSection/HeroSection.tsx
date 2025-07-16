import React from 'react';
import { typeText, words } from '../../data/herosection';
import BoxesLayer from '../BoxesLayer/BoxesLayer';
import { FlipWords } from '../FlipWords/FlipWords';
import ImageMarquee from '../ImageMarquee/ImageMarquee';
import { TypewriterEffectSmooth } from '../TypewriterEffect/TypewriterEffect';

const HeroSection: React.FC = () => {

    return (
        <>
            <section id='home' className="relative pt-56 md:pt-48 max-md:px-2 px-5 flex flex-col">
                <BoxesLayer />
                <div className={`max-md:px-3 flex flex-col max-md:gap-4 items-center relative `}>
                    <TypewriterEffectSmooth
                        words={typeText}
                        className='font-boska-black text-darkText hover:text-darkText transition-all duration-500 text-4xl md:text-6xl lg:text-7xl '
                    />
                    <div className="relative my-2 font-light flex gap-2 text-darkText hover:text-darkText transition-all duration-500 text-xl lg:text-4xl items-center max-md:w-full">
                        Your <FlipWords words={words} className={'text-darkText'} /> deserves better.
                    </div>
                    <p className="relative md:text-center font-light flex text-darkText hover:text-darkText transition-all duration-500 text-2xl lg:text-3xl max-md:w-full ">
                        Stand out with a digital presence they'll always remember
                    </p>
                </div>
            </section>
            <ImageMarquee />
        </>
    );

};

export default HeroSection;