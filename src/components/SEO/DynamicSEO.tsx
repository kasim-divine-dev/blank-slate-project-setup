
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoService, SEOPageData } from '../../services/seoService';

interface DynamicSEOProps {
  pageName: string;
  customData?: Partial<SEOPageData>;
}

export const DynamicSEO: React.FC<DynamicSEOProps> = ({
  pageName,
  customData = {}
}) => {
  console.log("pageName", pageName);
  const pageData = seoService.getPageSEO(pageName);
  const schemas = seoService.generateSchemas(pageName);

  // Merge default data with custom overrides
  const seoData = { ...pageData, ...customData };

  const {
    title,
    description,
    keywords,
    image = "https://mkronix.com/assets/og-default.jpg",
    url = "https://mkronix.com",
    type = "website",
    customMeta = {},
    articleData
  } = seoData;

  const fullTitle = title.includes('MkRonix') ? title : `${title} | MkRonix`;

  return (
    <Helmet>
      {/* Enhanced Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Enhanced Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="MkRonix" />

      {/* Article specific OG tags */}
      {articleData && (
        <>
          {articleData.publishedTime && <meta property="article:published_time" content={articleData.publishedTime} />}
          {articleData.modifiedTime && <meta property="article:modified_time" content={articleData.modifiedTime} />}
          {articleData.author && <meta property="article:author" content={articleData.author} />}
          {articleData.section && <meta property="article:section" content={articleData.section} />}
        </>
      )}

      {/* Enhanced Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@mkronix" />
      <meta name="twitter:creator" content="@mkronix" />

      {/* Advanced SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="MkRonix Digital Solutions" />
      <meta name="publisher" content="MkRonix Digital Solutions" />
      <meta name="copyright" content="© 2025 MkRonix Digital Solutions. All rights reserved." />
      <meta name="revisit-after" content="3 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="origin-when-cross-origin" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Geo Tags for India SEO */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="geo.position" content="23.0760;72.8777" />
      <meta name="ICBM" content="23.0760, 72.8777" />

      {/* Custom Meta Tags */}
      {Object.entries(customMeta).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}

      {/* Language and Regional */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="language" content="English" />
      <link rel="alternate" hrefLang="en-in" href={url} />
      <link rel="alternate" hrefLang="hi-in" href={url.replace('.com', '.com/hi')} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Structured Data Schemas */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
