// Import images
import openaiAnthropicImg from '../images/openai-anthropic.jpg';
import aiToolsFailedImg from '../images/invisible-tax-ai-tools.jpg';
import nestedLearningImg from '../images/nested_learning.png';
import notebooklmStorytellingImg from '../images/notebooklm-storytelling.png';

// Import metadata
import aiToolsFailedMeta from '../content/blogs/invisible-tax-ai-tools/metadata.json';
import openaiAnthropicMeta from '../content/blogs/how-700m-people-use-ai/metadata.json';
import promptEngineeringMeta from '../content/blogs/prompt-engineering-best-practices/metadata.json';
import aiHealthcareMeta from '../content/blogs/ai-healthcare-ethics/metadata.json';
import nhisNhanesMeta from '../content/blogs/working-with-nhis-nhanes/metadata.json';
import nestedLearningMeta from '../content/blogs/nested-learning-why-google-wants-models-with-real-memory/metadata.json';
import notebooklmStorytellingMeta from '../content/blogs/notebooklm-storytelling-learning/metadata.json';

// Import markdown content  
import aiToolsFailedContent from '../content/blogs/invisible-tax-ai-tools/content.md?raw';
import openaiAnthropicContent from '../content/blogs/how-700m-people-use-ai/content.md?raw';
import promptEngineeringContent from '../content/blogs/prompt-engineering-best-practices/content.md?raw';
import aiHealthcareContent from '../content/blogs/ai-healthcare-ethics/content.md?raw';
import nhisNhanesContent from '../content/blogs/working-with-nhis-nhanes/content.md?raw';
import nestedLearningContent from '../content/blogs/nested-learning-why-google-wants-models-with-real-memory/content.md?raw';
import notebooklmStorytellingContent from '../content/blogs/notebooklm-storytelling-learning/content.md?raw';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  thumbnail: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    ...aiToolsFailedMeta,
    thumbnail: aiToolsFailedImg,
    content: aiToolsFailedContent
  },
  {
    ...openaiAnthropicMeta,
    thumbnail: openaiAnthropicImg,
    content: openaiAnthropicContent
  },
  {
    ...promptEngineeringMeta,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    content: promptEngineeringContent
  },
  {
    ...aiHealthcareMeta,
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    content: aiHealthcareContent
  },
  {
    ...nhisNhanesMeta,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    content: nhisNhanesContent
  },
  {
    ...nestedLearningMeta,
    thumbnail: nestedLearningImg,
    content: nestedLearningContent
  },
  {
    ...notebooklmStorytellingMeta,
    thumbnail: notebooklmStorytellingImg,
    content: notebooklmStorytellingContent
  }
];

export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return getAllPosts().slice(0, count);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const formatDate = (dateString: string): string => {
  // Parse date components to avoid timezone issues
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
