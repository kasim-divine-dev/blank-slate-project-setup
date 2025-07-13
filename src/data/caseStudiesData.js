
import detailedCaseStudies from './detailedCaseStudies.json';

// Transform the detailed case studies to match the existing interface
export const caseStudiesData = detailedCaseStudies.caseStudies.map(study => ({
  id: study.id,
  title: study.title,
  subtitle: study.subtitle,
  description: study.description,
  image: study.mainImage,
  category: study.category,
  year: study.year,
  client: study.client,
  technologies: study.technologies,
  results: Object.entries(study.results).map(([key, value]) => 
    `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}`
  ),
  url: `/case-studies/${study.slug}`
}));

// Export the detailed case studies for the detail pages
export const detailedCaseStudiesData = detailedCaseStudies.caseStudies;

// Helper function to get a case study by slug
export const getCaseStudyBySlug = (slug) => {
  return detailedCaseStudiesData.find(study => study.slug === slug);
};

// Helper function to get featured case studies
export const getFeaturedCaseStudies = () => {
  return detailedCaseStudiesData.filter(study => study.featured);
};

// Helper function to get case studies by category
export const getCaseStudiesByCategory = (category) => {
  if (category === 'All') return detailedCaseStudiesData;
  return detailedCaseStudiesData.filter(study => study.category === category);
};
