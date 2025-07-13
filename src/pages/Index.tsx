
import { LazyLoad } from "../utils/lazyLoad";
import { DynamicSEO } from '../components/SEO/DynamicSEO';

// Lazy load components for better performance
const HeroSection = LazyLoad(() => import('../components/HeroSection/HeroSection'));
const ServiceCard = LazyLoad(() => import('../components/ServiceCard/ServiceCard'));
const Carousel = LazyLoad(() => import('../components/Carousel/Carousel'));
const CaseStudies = LazyLoad(() => import('../components/CaseStudies/CaseStudies'));
const BlogSection = LazyLoad(() => import('../components/BlogSection/BlogSection'));
const HorizontalTextScroller = LazyLoad(() => import('../components/HorizontalTextScroller/HorizontalTextScroller'));
const GetInTouch = LazyLoad(() => import('../components/GetInTouch/GetInTouch'));

const Index = () => {
  return (
    <>
      <DynamicSEO pageName="home" />

      <div className="font-boska relative overflow-x-hidden bg-black text-[#F5E7D3]">
        {/* Add H1 for SEO */}
        <h1 className="sr-only">MkRonix - Creative Digital Agency in India for Web Development, UI/UX Design, and Digital Marketing</h1>

        <HeroSection />
        <ServiceCard />
        <Carousel />
        <CaseStudies />
        <BlogSection />
        <HorizontalTextScroller />
        <GetInTouch />

        {/* Add structured content for SEO */}
        <section className="py-16 px-4 bg-black" style={{ display: 'none' }}>
          <div className="max-w-4xl mx-auto">
            <h2>About MkRonix Creative Digital Agency India</h2>
            <p>MkRonix is a leading creative digital agency based in India, specializing in web development, UI/UX design, mobile app development, and digital marketing services. With over 300 successful projects and 5+ years of experience, we help businesses transform their digital presence and achieve measurable growth.</p>

            <h3>Our Core Services:</h3>
            <ul>
              <li><strong>Web Development India:</strong> Custom websites, e-commerce platforms, and web applications</li>
              <li><strong>UI/UX Design:</strong> User-centered design solutions for web and mobile</li>
              <li><strong>Mobile App Development:</strong> Native and cross-platform mobile applications</li>
              <li><strong>Digital Marketing:</strong> SEO, PPC, social media marketing, and content strategy</li>
            </ul>

            <h3>Why Choose MkRonix?</h3>
            <ul>
              <li>3+ years of proven experience</li>
              <li>20+ successful projects delivered</li>
              <li>99% client satisfaction rate</li>
              <li>Expert team of 50+ professionals</li>
              <li>Serving clients across India and internationally</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
