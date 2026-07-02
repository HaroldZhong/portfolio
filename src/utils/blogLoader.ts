// Import images
import openaiAnthropicImg from '../images/openai-anthropic.jpg';
import aiToolsFailedImg from '../images/invisible-tax-ai-tools.jpg';
import nestedLearningImg from '../images/nested_learning.png';
import notebooklmStorytellingImg from '../images/notebooklm-storytelling.png';
import researchAtlasCoverImg from '../images/research-atlas-cover.png';
import skillsProtocolsImg from '../images/skills-as-research-protocols.jpg';
import aiEvalsImg from '../images/ai-evals-are-measurement.jpg';
import ralphLoopImg from '../images/ralph-loop-honest-look.jpg';
import harnessImg from '../images/building-research-agents-harness-over-model.jpg';
import stormImg from '../images/storm-multi-perspective-research-questions.jpg';
import obsidianVaultImg from '../images/obsidian-ai-research-vault.jpg';
import siliconSamplingImg from '../images/silicon-sampling-promise-and-peril.jpg';
import governanceGapImg from '../images/ai-research-governance-transparency-gap.jpg';
import deepResearchImg from '../images/deep-research-agents-lit-review.jpg';

// Import metadata
import aiToolsFailedMeta from '../content/blogs/invisible-tax-ai-tools/metadata.json';
import openaiAnthropicMeta from '../content/blogs/how-700m-people-use-ai/metadata.json';
import promptEngineeringMeta from '../content/blogs/prompt-engineering-best-practices/metadata.json';
import aiHealthcareMeta from '../content/blogs/ai-healthcare-ethics/metadata.json';
import nhisNhanesMeta from '../content/blogs/working-with-nhis-nhanes/metadata.json';
import nestedLearningMeta from '../content/blogs/nested-learning-why-google-wants-models-with-real-memory/metadata.json';
import notebooklmStorytellingMeta from '../content/blogs/notebooklm-storytelling-learning/metadata.json';
import notebooklmWorkflowMeta from '../content/blogs/notebooklm-research-workflow/metadata.json';
import skillsProtocolsMeta from '../content/blogs/skills-as-research-protocols/metadata.json';
import aiEvalsMeta from '../content/blogs/ai-evals-are-measurement/metadata.json';
import ralphLoopMeta from '../content/blogs/ralph-loop-honest-look/metadata.json';
import harnessMeta from '../content/blogs/building-research-agents-harness-over-model/metadata.json';
import stormMeta from '../content/blogs/storm-multi-perspective-research-questions/metadata.json';
import obsidianVaultMeta from '../content/blogs/obsidian-ai-research-vault/metadata.json';
import siliconSamplingMeta from '../content/blogs/silicon-sampling-promise-and-peril/metadata.json';
import governanceGapMeta from '../content/blogs/ai-research-governance-transparency-gap/metadata.json';
import deepResearchMeta from '../content/blogs/deep-research-agents-lit-review/metadata.json';

// Import markdown content  
import aiToolsFailedContent from '../content/blogs/invisible-tax-ai-tools/content.md?raw';
import openaiAnthropicContent from '../content/blogs/how-700m-people-use-ai/content.md?raw';
import promptEngineeringContent from '../content/blogs/prompt-engineering-best-practices/content.md?raw';
import aiHealthcareContent from '../content/blogs/ai-healthcare-ethics/content.md?raw';
import nhisNhanesContent from '../content/blogs/working-with-nhis-nhanes/content.md?raw';
import nestedLearningContent from '../content/blogs/nested-learning-why-google-wants-models-with-real-memory/content.md?raw';
import notebooklmStorytellingContent from '../content/blogs/notebooklm-storytelling-learning/content.md?raw';
import notebooklmWorkflowContent from '../content/blogs/notebooklm-research-workflow/content.md?raw';
import skillsProtocolsContent from '../content/blogs/skills-as-research-protocols/content.md?raw';
import aiEvalsContent from '../content/blogs/ai-evals-are-measurement/content.md?raw';
import ralphLoopContent from '../content/blogs/ralph-loop-honest-look/content.md?raw';
import harnessContent from '../content/blogs/building-research-agents-harness-over-model/content.md?raw';
import stormContent from '../content/blogs/storm-multi-perspective-research-questions/content.md?raw';
import obsidianVaultContent from '../content/blogs/obsidian-ai-research-vault/content.md?raw';
import siliconSamplingContent from '../content/blogs/silicon-sampling-promise-and-peril/content.md?raw';
import governanceGapContent from '../content/blogs/ai-research-governance-transparency-gap/content.md?raw';
import deepResearchContent from '../content/blogs/deep-research-agents-lit-review/content.md?raw';

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
  },
  {
    ...notebooklmWorkflowMeta,
    thumbnail: researchAtlasCoverImg,
    content: notebooklmWorkflowContent
  },
  {
    ...skillsProtocolsMeta,
    thumbnail: skillsProtocolsImg,
    content: skillsProtocolsContent
  },
  {
    ...aiEvalsMeta,
    thumbnail: aiEvalsImg,
    content: aiEvalsContent
  },
  {
    ...ralphLoopMeta,
    thumbnail: ralphLoopImg,
    content: ralphLoopContent
  },
  {
    ...harnessMeta,
    thumbnail: harnessImg,
    content: harnessContent
  },
  {
    ...stormMeta,
    thumbnail: stormImg,
    content: stormContent
  },
  {
    ...obsidianVaultMeta,
    thumbnail: obsidianVaultImg,
    content: obsidianVaultContent
  },
  {
    ...siliconSamplingMeta,
    thumbnail: siliconSamplingImg,
    content: siliconSamplingContent
  },
  {
    ...governanceGapMeta,
    thumbnail: governanceGapImg,
    content: governanceGapContent
  },
  {
    ...deepResearchMeta,
    thumbnail: deepResearchImg,
    content: deepResearchContent
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
