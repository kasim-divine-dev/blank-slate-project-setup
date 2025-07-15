
// Base Types
interface BaseEntity {
  id: string;
  title: string;
  description: string;
  image: string;
  year: string;
  url: string;
}

// Service Types
interface ServiceOverview {
  title: string;
  content: string;
  highlights: string[];
}

interface ServiceItem {
  name: string;
  description: string;
  features: string[];
  image: string;
}

interface TechnologyCategory {
  category: string;
  items: string[];
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServicePricing {
  starting: string;
  popular: string;
  enterprise: string;
  note: string;
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface ServiceCTA {
  title: string;
  description: string;
  buttonText: string;
}

interface ServiceSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  localKeywords: string[];
}

interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  overview: ServiceOverview;
  services: ServiceItem[];
  technologies: TechnologyCategory[];
  process: ProcessStep[];
  pricing: ServicePricing;
  faqs: ServiceFAQ[];
  cta: ServiceCTA;
  seo: ServiceSEO;
}

// Services Section Data Types
interface ServicesSectionItem {
  name: string;
  image: string;
  purpose: string;
  tools: string;
  projectsCompleted: number;
  ongoingProjects: number;
  notableWorks: string[];
  overview: string;
}

// Project Types
interface Project extends BaseEntity {
  category: string;
  client: string;
  technologies: string[];
}

// Case Study Types
interface CaseStudyMetric {
  label: string;
  value: string;
  growth?: string;
}

interface CaseStudyTestimonial {
  quote: string;
  author: string;
  position: string;
  avatar: string;
  rating: number;
}

interface CaseStudyProcessPhase {
  phase: string;
  duration: string;
  description: string;
}

interface CaseStudyResults {
  [key: string]: string;
}

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  category: string;
  industry: string;
  client: string;
  year: string;
  duration: string;
  teamSize: string;
  projectType: string;
  status: string;
  featured: boolean;
  mainImage: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  challenge: string;
  solution: string;
  process: CaseStudyProcessPhase[];
  results: CaseStudyResults;
  metrics: CaseStudyMetric[];
  testimonial: CaseStudyTestimonial;
  awards: string[];
  tags: string[];
}

// Blog Types
interface BlogAuthor {
  name: string;
  avatar: string;
  bio: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// SEO Types
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOPage {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image: string;
  type: string;
  breadcrumb?: BreadcrumbItem[];
  customMeta?: Record<string, string>;
  articleData?: {
    section: string;
    author: string;
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOSchema {
  organization?: boolean;
  website?: boolean;
  localBusiness?: boolean;
  contactPage?: boolean;
  service?: boolean;
  itemList?: boolean;
  creativeWork?: boolean;
  aboutPage?: boolean;
  team?: boolean;
  article?: boolean;
  blog?: boolean;
  faq?: FAQItem[];
}

interface OrganizationAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface OrganizationContactPoint {
  telephone: string;
  contactType: string;
  availableLanguage: string[];
  areaServed: string;
}

interface OrganizationRating {
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  worstRating: string;
}

interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate: string;
  numberOfEmployees: string;
  address: OrganizationAddress;
  contactPoint: OrganizationContactPoint;
  sameAs: string[];
  aggregateRating: OrganizationRating;
  priceRange: string;
}

interface SEOData {
  pages: Record<string, SEOPage>;
  organization: OrganizationData;
  schemas: Record<string, SEOSchema>;
}

// Team Types
interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar: string;
  skills: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// Stats Types
interface StatItem {
  number: string;
  label: string;
  description: string;
}

// Testimonial Types
interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

// Hero Section Types
interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    url: string;
  };
  secondaryCTA: {
    text: string;
    url: string;
  };
  features: string[];
}

// Workflow Types
interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

// Contact Types
interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Form Types
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  timeline: string;
}

// Component Props Types
interface CaseStudiesProps {
  isFromHome?: boolean;
}

interface ServiceDetailProps {
  serviceId: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

interface BlogCardProps {
  blog: BlogPost;
  index?: number;
}

// API Response Types
interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Loading and Error States
interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

interface AsyncComponentState<T> extends LoadingState {
  data: T | null;
}

// Export all types
export type {
  // Base
  BaseEntity,
  
  // Services
  Service,
  ServiceOverview,
  ServiceItem,
  TechnologyCategory,
  ProcessStep,
  ServicePricing,
  ServiceFAQ,
  ServiceCTA,
  ServiceSEO,
  ServicesSectionItem,
  
  // Projects
  Project,
  
  // Case Studies
  CaseStudy,
  CaseStudyMetric,
  CaseStudyTestimonial,
  CaseStudyProcessPhase,
  CaseStudyResults,
  
  // Blog
  BlogPost,
  BlogAuthor,
  
  // SEO
  SEOData,
  SEOPage,
  SEOSchema,
  BreadcrumbItem,
  FAQItem,
  OrganizationData,
  OrganizationAddress,
  OrganizationContactPoint,
  OrganizationRating,
  
  // Team
  TeamMember,
  
  // Stats
  StatItem,
  
  // Testimonials
  Testimonial,
  
  // Hero
  HeroSection,
  
  // Workflow
  WorkflowStep,
  
  // Contact
  ContactInfo,
  ContactFormData,
  
  // Component Props
  CaseStudiesProps,
  ServiceDetailProps,
  ProjectCardProps,
  BlogCardProps,
  
  // API
  APIResponse,
  PaginatedResponse,
  LoadingState,
  AsyncComponentState
};
