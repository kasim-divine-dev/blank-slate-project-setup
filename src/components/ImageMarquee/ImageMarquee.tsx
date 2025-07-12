
import React, { useRef, useEffect } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { LazyImage } from '../../utils/lazyLoad';

const images = [
    "/images/carousel/algora.png",
    "/images/carousel/wisdommeds.png",
    "/images/carousel/lotto-1.png",
    "/images/carousel/Ca-site.png",
    "/images/carousel/cars-web.png",
    "/images/carousel/itinerary-generator.png",
    "/images/carousel/itinerary-2.png",
    "/images/carousel/lotto-app.png",
    "/images/carousel/attendance.png",
    "/images/carousel/architect.png",
    "/images/carousel/binsina.png",
    "/images/carousel/gym-rats.png",
    "/images/carousel/kikcster.png",
    "/images/carousel/kkJewells.png",
];

interface SplideInstance {
    Components?: {
        Move?: {
            getPosition: () => number;
            translate: (position: number) => void;
        };
    };
    destroy?: () => void;
}

const ImageMarquee: React.FC = () => {
    const splideRef = useRef<{ splide: SplideInstance } | null>(null);

    useEffect(() => {
        if (splideRef.current && splideRef.current.splide) {
            const splideInstance = splideRef.current.splide;
            const autoScrollSpeed = 1;

            const autoScrollInterval = setInterval(() => {
                if (splideInstance && splideInstance.Components && splideInstance.Components.Move) {
                    const currentPosition = splideInstance.Components.Move.getPosition();
                    splideInstance.Components.Move.translate(currentPosition - autoScrollSpeed);
                }
            }, 10);

            return () => {
                clearInterval(autoScrollInterval);
                if (splideInstance && typeof splideInstance.destroy === 'function') {
                    splideInstance.destroy();
                }
            };
        }
    }, []);

    return (
        <div className="w-full bg-black mt-8 md:mt-20 overflow-hidden">
            <Splide
                ref={splideRef}
                options={{
                    type: 'loop',
                    drag: 'free',
                    focus: 'center',
                    perPage: 5,
                    arrows: false,
                    pagination: false,
                    gap: '1rem',
                    autoplay: false,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    breakpoints: {
                        640: {
                            perPage: 2,
                        },
                        768: {
                            perPage: 3,
                        },
                        1024: {
                            perPage: 4,
                        },
                    },
                }}
            >
                {images.map((image, index) => (
                    <SplideSlide key={`marquee-image-${index + 1}`} className="flex items-center justify-center">
                        <div className="h-32 md:h-40 w-auto overflow-hidden rounded-lg transition-all duration-500">
                            <LazyImage
                                src={image}
                                alt={`Marquee ${index % images.length + 1}`}
                                className="h-full w-auto object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default ImageMarquee;
