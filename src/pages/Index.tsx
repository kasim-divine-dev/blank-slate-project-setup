
import React, { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import CardStack from "../components/CardStack/CardStack";
import Carousel from "../components/Carousel/Carousel";
import CaseStudies from "../components/CaseStudies/CaseStudies";
import GetInTouch from "../components/GetInTouch/GetInTouch";
import HeroSection from '../components/HeroSection/HeroSection';
import HorizontalTextScroller from "../components/HorizontalTextScroller/HorizontalTextScroller";
import PreLoading from "../components/PreLoading/PreLoading";
import ServiceCard from "../components/ServiceCard/ServiceCard";

const Index = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        } else return prev - 1;
      });
    }, 1000);
  }, []);

  return (
    <ReactLenis root>
      {count > 0 ? (
        <PreLoading count={count} />
      ) : (
        <div className="font-boska relative overflow-x-hidden">
          <HeroSection />
          <ServiceCard />
          <Carousel />
          <CaseStudies />
          <HorizontalTextScroller />
          <CardStack />
          <GetInTouch />
        </div>
      )}
    </ReactLenis>
  );
};

export default Index;
