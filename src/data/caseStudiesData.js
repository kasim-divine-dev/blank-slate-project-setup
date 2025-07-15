
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
  results: study.metrics.map(metric =>
    `${metric.label}: ${metric.value}${metric.growth ? ` (${metric.growth})` : ''}`
  ),
  url: `/case-studies/${study.slug}`
}));

// Export the detailed case studies for the detail pages
export const detailedCaseStudiesData = detailedCaseStudies.caseStudies;

// Helper function to get a case study by slug with error handling
export const getCaseStudyBySlug = (slug) => {
  if (!slug) return null;
  const study = detailedCaseStudiesData.find(study => study.slug === slug);
  return study || null;
};

// Helper function to get featured case studies
export const getFeaturedCaseStudies = () => {
  return detailedCaseStudiesData.filter(study => study.featured);
};

// Helper function to get case studies by category
export const getCaseStudiesByCategory = (category) => {
  if (!category || category === 'All') return detailedCaseStudiesData;
  return detailedCaseStudiesData.filter(study => study.category === category);
};

// Helper function to get related case studies
export const getRelatedCaseStudies = (currentSlug, limit = 3) => {
  return detailedCaseStudiesData
    .filter(study => study.slug !== currentSlug)
    .slice(0, limit);
};
