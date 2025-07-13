
import blogData from './blogData.json';

// Export blog data
export const blogsData = blogData.blogs;

// Helper function to get a blog by slug with error handling
export const getBlogBySlug = (slug) => {
  if (!slug) return null;
  const blog = blogsData.find(blog => blog.slug === slug);
  return blog || null;
};

// Helper function to get featured blogs
export const getFeaturedBlogs = () => {
  return blogsData.filter(blog => blog.featured);
};

// Helper function to get blogs by category
export const getBlogsByCategory = (category) => {
  if (!category || category === 'All') return blogsData;
  return blogsData.filter(blog => blog.category === category);
};

// Helper function to get related blogs
export const getRelatedBlogs = (currentSlug, limit = 3) => {
  return blogsData
    .filter(blog => blog.slug !== currentSlug)
    .slice(0, limit);
};

// Helper function to get recent blogs
export const getRecentBlogs = (limit = 6) => {
  return blogsData
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
};
