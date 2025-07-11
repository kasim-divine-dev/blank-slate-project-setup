import React, { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import CardStack from "./components/CardStack/CardStack";
import Carousel from "./components/Carousel/Carousel";
import CaseStudies from "./components/CaseStudies/CaseStudies";
import CustomCursor from "./components/Cursor/CustomCursor";
import Footer from './components/Footer/Footer';
import GetInTouch from "./components/GetInTouch/GetInTouch";
import HeroSection from './components/HeroSection/HeroSection';
import HorizontalTextScroller from "./components/HorizontalTextScroller/HorizontalTextScroller";
import Menu from "./components/Menu/Menu";
import PreLoading from "./components/PreLoading/PreLoading";
import ServiceCard from "./components/ServiceCard/ServiceCard";

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <>
          <CustomCursor />
          <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <main className={` font-boska relative overflow-x-hidden`}>
            <HeroSection />
            <ServiceCard />
            <Carousel />
            <CaseStudies />
            <HorizontalTextScroller />
            <CardStack />
            <GetInTouch />
            <Footer />
          </main>
        </>
      )}
    </ReactLenis>
  );
};

export default Index;

