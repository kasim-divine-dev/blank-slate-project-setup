import seoData from '../data/seoData.json';
import teamData from '../data/teamData.json';
import blogSeoData from '../data/blogSeoData.json';
import caseStudiesSeoData from '../data/caseStudiesSeoData.json';
import servicesSeoData from '../data/servicesSeoData.json';
import contactSeoData from '../data/contactSeoData.json';
import aboutSeoData from '../data/aboutSeoData.json';

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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  projectType: string;
  client: string;
  industry: string;
  duration: string;
  teamSize: string;
  technologies: string[];
  challenge: string;
  solution: string;
  results: Record<string, string>;
  image: string;
  gallery: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
}

class EnhancedSEOService {
  private seoData = seoData;
  private teamData = teamData;
  private blogData = blogSeoData;
  private caseStudiesData = caseStudiesSeoData;
  private servicesData = servicesSeoData;
  private contactData = contactSeoData;
  private aboutData = aboutSeoData;

  getPageSEO(pageName: string, dynamicData?: any): SEOPageData {
    let pageData: SEOPageData | undefined;

    // Check main seo data
    if (this.seoData.pages[pageName as keyof typeof this.seoData.pages]) {
      pageData = this.seoData.pages[pageName as keyof typeof this.seoData.pages];
    }

    // Check about data
    if (!pageData && this.aboutData.pages[pageName as keyof typeof this.aboutData.pages]) {
      pageData = this.aboutData.pages[pageName as keyof typeof this.aboutData.pages];
    }

    // Check blog data
    if (!pageData && this.blogData.pages[pageName as keyof typeof this.blogData.pages]) {
      pageData = this.blogData.pages[pageName as keyof typeof this.blogData.pages];
    }

    // Check case studies data
    if (!pageData && this.caseStudiesData.pages[pageName as keyof typeof this.caseStudiesData.pages]) {
      pageData = this.caseStudiesData.pages[pageName as keyof typeof this.caseStudiesData.pages];
    }

    // Check services data
    if (!pageData && this.servicesData.pages[pageName as keyof typeof this.servicesData.pages]) {
      pageData = this.servicesData.pages[pageName as keyof typeof this.servicesData.pages];
    }

    // Check contact data
    if (!pageData && this.contactData.pages[pageName as keyof typeof this.contactData.pages]) {
      pageData = this.contactData.pages[pageName as keyof typeof this.contactData.pages];
    }

    if (!pageData) {
      throw new Error(`SEO data not found for page: ${pageName}`);
    }

    // Replace dynamic placeholders if provided
    if (dynamicData) {
      pageData = this.replacePlaceholders(pageData, dynamicData);
    }

    return pageData;
  }

  private replacePlaceholders(data: SEOPageData, dynamicData: any): SEOPageData {
    const jsonString = JSON.stringify(data);
    const replacedString = jsonString.replace(/\{(\w+)\}/g, (match, key) => {
      return dynamicData[key] || match;
    });
    return JSON.parse(replacedString);
  }

  getBlogPosts(): BlogPost[] {
    return this.blogData.blogPosts;
  }

  getBlogPost(slug: string): BlogPost | undefined {
    return this.blogData.blogPosts.find(post => post.slug === slug);
  }

  getFeaturedBlogPosts(): BlogPost[] {
    return this.blogData.blogPosts.filter(post => post.featured);
  }

  getBlogCategories() {
    return this.blogData.categories;
  }

  getCaseStudies(): CaseStudy[] {
    return this.caseStudiesData.caseStudies;
  }

  getCaseStudy(slug: string): CaseStudy | undefined {
    return this.caseStudiesData.caseStudies.find(study => study.slug === slug);
  }

  getServices() {
    return this.servicesData.services;
  }

  getContactInfo() {
    return this.contactData.contactInfo;
  }

  getAboutInfo() {
    return this.aboutData.teamInfo;
  }

  generateSchemas(pageName: string, dynamicData?: any): any[] {
    const schemas: any[] = [];

    // Get schema config from main seo data
    const schemaConfig = this.seoData.schemas[pageName as keyof typeof this.seoData.schemas];

    if (!schemaConfig) return [];

    // Generate schemas based on configuration
    if ((schemaConfig as any).organization) {
      schemas.push(this.getOrganizationSchema());
    }

    if ((schemaConfig as any).website) {
      schemas.push(this.getWebsiteSchema());
    }

    if ((schemaConfig as any).localBusiness) {
      schemas.push(this.getLocalBusinessSchema());
    }

    if ((schemaConfig as any).creativeWork) {
      schemas.push(this.getCreativeWorkSchema());
    }

    if ((schemaConfig as any).aboutPage) {
      const pageData = this.getPageSEO(pageName);
      schemas.push(this.getAboutPageSchema(pageData));
    }

    if ((schemaConfig as any).team) {
      schemas.push(this.getTeamSchema());
    }

    if ((schemaConfig as any).itemList) {
      schemas.push(this.getItemListSchema());
    }

    if ((schemaConfig as any).faq && (schemaConfig as any).faq.length > 0) {
      schemas.push(this.getFAQSchema((schemaConfig as any).faq));
    }

    // Add article schema for blog posts
    if (pageName === 'blogPost' && dynamicData) {
      schemas.push(this.getArticleSchema(dynamicData));
    }

    // Add case study schema
    if (pageName === 'caseStudyDetail' && dynamicData) {
      schemas.push(this.getCaseStudySchema(dynamicData));
    }

    // Breadcrumb schema
    const pageData = this.getPageSEO(pageName, dynamicData);
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

  private getArticleSchema(blogPost: BlogPost) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blogPost.title,
      "description": blogPost.excerpt,
      "image": blogPost.image,
      "datePublished": blogPost.publishedAt,
      "dateModified": blogPost.updatedAt,
      "author": {
        "@type": "Person",
        "name": blogPost.author
      },
      "publisher": {
        "@type": "Organization",
        "name": this.seoData.organization.name,
        "logo": {
          "@type": "ImageObject",
          "url": this.seoData.organization.logo
        }
      },
      "articleSection": blogPost.category,
      "keywords": blogPost.tags.join(", "),
      "wordCount": Math.floor(blogPost.content.length / 5),
      "timeRequired": blogPost.readTime
    };
  }

  private getCaseStudySchema(caseStudy: CaseStudy) {
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": caseStudy.title,
      "description": `${caseStudy.challenge} - ${caseStudy.solution}`,
      "image": caseStudy.image,
      "creator": {
        "@type": "Organization",
        "name": this.seoData.organization.name
      },
      "genre": caseStudy.projectType,
      "keywords": caseStudy.technologies.join(", "),
      "client": caseStudy.client,
      "industry": caseStudy.industry
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

export const enhancedSeoService = new EnhancedSEOService();
