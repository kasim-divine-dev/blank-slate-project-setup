import seoData from '../data/seoData.json';
import teamData from '../data/teamData.json';

export interface SEOPageData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  breadcrumb?: Array<{ name: string; url: string }>;
  customMeta?: Record<string, string>;
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
}

export interface SchemaConfig {
  organization?: boolean;
  website?: boolean;
  localBusiness?: boolean;
  creativeWork?: boolean;
  aboutPage?: boolean;
  team?: boolean;
  itemList?: boolean;
  faq?: Array<{ question: string; answer: string }>;
}

class SEOService {
  private seoData = seoData;
  private teamData = teamData;

  getPageSEO(pageName: string): SEOPageData {
    const pageData = this.seoData.pages[pageName as keyof typeof this.seoData.pages];
    if (!pageData) {
      throw new Error(`SEO data not found for page: ${pageName}`);
    }
    return pageData;
  }

  generateSchemas(pageName: string): any[] {
    const schemas: any[] = [];
    const schemaConfig = this.seoData.schemas[pageName as keyof typeof this.seoData.schemas] as SchemaConfig;

    if (!schemaConfig) return [];

    // Organization Schema
    if (schemaConfig.organization) {
      schemas.push(this.getOrganizationSchema());
    }

    // Website Schema
    if (schemaConfig.website) {
      schemas.push(this.getWebsiteSchema());
    }

    // Local Business Schema
    if (schemaConfig.localBusiness) {
      schemas.push(this.getLocalBusinessSchema());
    }

    // Creative Work Schema
    if (schemaConfig.creativeWork) {
      schemas.push(this.getCreativeWorkSchema());
    }

    // About Page Schema
    if (schemaConfig.aboutPage) {
      const pageData = this.getPageSEO(pageName);
      schemas.push(this.getAboutPageSchema(pageData));
    }

    // Team Schema
    if (schemaConfig.team) {
      schemas.push(this.getTeamSchema());
    }

    // Item List Schema
    if (schemaConfig.itemList) {
      schemas.push(this.getItemListSchema());
    }

    // FAQ Schema
    if (schemaConfig.faq && schemaConfig.faq.length > 0) {
      schemas.push(this.getFAQSchema(schemaConfig.faq));
    }

    // Breadcrumb Schema
    const pageData = this.getPageSEO(pageName);
    if (pageData.breadcrumb && pageData.breadcrumb.length > 1) {
      schemas.push(this.getBreadcrumbSchema(pageData.breadcrumb));
    }

    return schemas;
  }

  private getOrganizationSchema() {
    const org = this.seoData.organization;
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${org.url}/#organization`,
      "name": org.name,
      "url": org.url,
      "logo": {
        "@type": "ImageObject",
        "url": org.logo,
        "width": 200,
        "height": 60
      },
      "sameAs": org.sameAs,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": org.contactPoint.telephone,
        "contactType": org.contactPoint.contactType,
        "availableLanguage": org.contactPoint.availableLanguage,
        "areaServed": org.contactPoint.areaServed
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": org.address.streetAddress,
        "addressLocality": org.address.addressLocality,
        "addressRegion": org.address.addressRegion,
        "postalCode": org.address.postalCode,
        "addressCountry": org.address.addressCountry
      },
      "foundingDate": org.foundingDate,
      "numberOfEmployees": org.numberOfEmployees,
      "description": org.description,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": org.aggregateRating.ratingValue,
        "reviewCount": org.aggregateRating.reviewCount,
        "bestRating": org.aggregateRating.bestRating,
        "worstRating": org.aggregateRating.worstRating
      }
    };
  }

  private getWebsiteSchema() {
    const org = this.seoData.organization;
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${org.url}/#website`,
      "url": org.url,
      "name": org.name,
      "description": org.description,
      "publisher": {
        "@id": `${org.url}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${org.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }

  private getLocalBusinessSchema() {
    const org = this.seoData.organization;
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${org.url}/#localbusiness`,
      "name": org.name,
      "image": `${org.url}/assets/office.jpg`,
      "telephone": org.contactPoint.telephone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": org.address.streetAddress,
        "addressLocality": org.address.addressLocality,
        "addressRegion": org.address.addressRegion,
        "postalCode": org.address.postalCode,
        "addressCountry": org.address.addressCountry
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
        "ratingValue": org.aggregateRating.ratingValue,
        "reviewCount": org.aggregateRating.reviewCount,
        "bestRating": org.aggregateRating.bestRating,
        "worstRating": org.aggregateRating.worstRating
      },
      "priceRange": org.priceRange
    };
  }

  private getCreativeWorkSchema() {
    const org = this.seoData.organization;
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "MkRonix Portfolio",
      "description": "A collection of 20+ successful digital projects including web development, UI/UX design, mobile applications, and digital marketing campaigns",
      "creator": {
        "@type": "Organization",
        "name": org.name,
        "url": org.url
      },
      "dateCreated": "2020-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "genre": ["Web Development", "UI/UX Design", "Mobile Development", "Digital Marketing"],
      "keywords": "portfolio, web development, UI/UX design, mobile apps, digital marketing, creative projects",
      "inLanguage": "en-IN"
    };
  }

  private getAboutPageSchema(pageData: SEOPageData) {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": pageData.title,
      "description": pageData.description,
      "url": pageData.url,
      "mainEntity": {
        "@type": "Organization",
        "name": this.seoData.organization.name
      }
    };
  }

  private getTeamSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "MkRonix Team Members",
      "description": "Meet the creative professionals behind MkRonix's success",
      "itemListElement": this.teamData.teamMembers.map((member, index) => ({
        "@type": "Person",
        "position": index + 1,
        "name": member.name,
        "jobTitle": member.jobTitle,
        "description": member.description,
        "knowsAbout": member.knowsAbout,
        "worksFor": {
          "@type": "Organization",
          "name": this.seoData.organization.name
        }
      }))
    };
  }

  private getItemListSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "MkRonix Project Portfolio",
      "description": "Featured projects showcasing our expertise in web development, design, and digital marketing",
      "numberOfItems": 20,
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "position": 1,
          "name": "E-commerce Redesign Project",
          "description": "Complete redesign and development of e-commerce platform with 150% increase in conversions",
          "genre": "Web Development",
          "creator": {
            "@type": "Organization",
            "name": this.seoData.organization.name
          }
        },
        {
          "@type": "CreativeWork",
          "position": 2,
          "name": "Mobile App UI/UX Design",
          "description": "Award-winning mobile application design with focus on user experience and accessibility",
          "genre": "UI/UX Design",
          "creator": {
            "@type": "Organization",
            "name": this.seoData.organization.name
          }
        }
      ]
    };
  }

  private getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  private getBreadcrumbSchema(breadcrumb: Array<{ name: string; url: string }>) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  getTeamMembers() {
    return this.teamData.teamMembers;
  }
}

export const seoService = new SEOService();
