import React, { useEffect, useState } from "react";
import ReactLenis from "lenis/react";
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>MkRonix | Leading Creative Digital Agency India - Web Development, UI/UX Design & Digital Marketing</title>
        <meta name="description" content="MkRonix is India's premier creative digital agency specializing in web development, UI/UX design, mobile apps & digital marketing. 300+ successful projects. Free consultation available." />
        <meta name="keywords" content="creative digital agency India, web development company Mumbai, UI UX design agency, mobile app development India, digital marketing services, website design company India, creative agency Mumbai, best digital agency India" />

        {/* Enhanced Open Graph */}
        <meta property="og:title" content="MkRonix | #1 Creative Digital Agency in India - Web Development & Design" />
        <meta property="og:description" content="Transform your business with India's leading creative digital agency. Expert web development, stunning UI/UX design, and results-driven digital marketing. 300+ happy clients." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mkronix.com" />
        <meta property="og:image" content="https://mkronix.com/assets/og-homepage.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="MkRonix" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MkRonix | Leading Creative Digital Agency India" />
        <meta name="twitter:description" content="Expert web development, UI/UX design & digital marketing services. 300+ successful projects across India & worldwide." />
        <meta name="twitter:image" content="https://mkronix.com/assets/twitter-homepage.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://mkronix.com" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="MkRonix Digital Solutions" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="expires" content="never" />

        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai, Maharashtra, India" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />

        {/* Language and Location */}
        <meta httpEquiv="content-language" content="en-IN" />
        <meta name="language" content="English" />

        {/* Enhanced Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://mkronix.com/#organization",
                "name": "MkRonix Digital Solutions",
                "url": "https://mkronix.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://mkronix.com/assets/logo.png",
                  "width": 200,
                  "height": 60
                },
                "sameAs": [
                  "https://www.facebook.com/mkronix",
                  "https://www.linkedin.com/company/mkronix",
                  "https://twitter.com/mkronix",
                  "https://www.instagram.com/mkronix"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-84-59258801",
                  "contactType": "customer service",
                  "availableLanguage": ["English", "Hindi"],
                  "areaServed": "IN"
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "kadiwala compund",
                  "addressLocality": "rasulpur, sidhpur",
                  "addressRegion": "Gujarat",
                  "postalCode": "384290",
                  "addressCountry": "IN"
                },
                "founder": {
                  "@type": "Person",
                  "name": "MkRonix Team"
                },
                "foundingDate": "2020-01-01",
                "numberOfEmployees": "50-100",
                "description": "Leading creative digital agency in India specializing in web development, UI/UX design, mobile app development, and digital marketing services."
              },
              {
                "@type": "WebSite",
                "@id": "https://mkronix.com/#website",
                "url": "https://mkronix.com",
                "name": "MkRonix",
                "description": "Creative Digital Agency India - Web Development, UI/UX Design & Digital Marketing",
                "publisher": {
                  "@id": "https://mkronix.com/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://mkronix.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://mkronix.com/#localbusiness",
                "name": "MkRonix Digital Solutions",
                "image": "https://mkronix.com/assets/office.jpg",
                "telephone": "+91-84-59258801",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "kadiwala compund",
                  "addressLocality": "rasulpur, sidhpur",
                  "addressRegion": "Gujarat",
                  "postalCode": "384290",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "23.9165",
                  "longitude": "72.3787"
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                ],
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "127",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "priceRange": "₹₹"
              }
            ]
          })}
        </script>

        {/* FAQ Schema for Voice Search */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does MkRonix offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix offers comprehensive digital services including web development, UI/UX design, mobile app development, digital marketing, SEO, and brand identity design. We serve clients across India and internationally."
                }
              },
              {
                "@type": "Question",
                "name": "How much does web development cost in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Web development costs in India vary based on complexity. Basic websites start from ₹50,000, while complex e-commerce or custom applications range from ₹2-10 lakhs. Contact MkRonix for a detailed quote."
                }
              },
              {
                "@type": "Question",
                "name": "Why choose MkRonix as your digital agency?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MkRonix has 5+ years of experience, 300+ successful projects, and a 95% client satisfaction rate. We combine creativity with technology to deliver results-driven digital solutions."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <ReactLenis root>
        {count > 0 ? (
          <PreLoading count={count} />
        ) : (
          <div className="font-boska relative overflow-x-hidden">
            {/* Add H1 for SEO */}
            <h1 className="sr-only">MkRonix - Leading Creative Digital Agency in India for Web Development, UI/UX Design, and Digital Marketing</h1>

            <HeroSection />
            <ServiceCard />
            <Carousel />
            <CaseStudies />
            <HorizontalTextScroller />
            <CardStack />
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
                  <li>5+ years of proven experience</li>
                  <li>300+ successful projects delivered</li>
                  <li>95% client satisfaction rate</li>
                  <li>Expert team of 50+ professionals</li>
                  <li>Serving clients across India and internationally</li>
                </ul>
              </div>
            </section>
          </div>
        )}
      </ReactLenis>
    </>
  );
};

export default Index;