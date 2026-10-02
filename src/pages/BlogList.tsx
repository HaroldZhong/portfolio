import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { getAllPosts } from '../utils/blogLoader';
import { usePageMeta } from '../hooks/usePageMeta';
import '../assets/styles/Blog.scss';

const BlogList: React.FC = () => {
  const [params] = useSearchParams();
  const category = params.get('topic');
  const posts = getAllPosts();
  const topics = Array.from(new Set(posts.map(post => post.category)));
  const allPosts = category ? posts.filter(post => post.category === category) : posts;
  const prefersReducedMotion = useReducedMotion();

  usePageMeta('Articles | Harold Zhong', 'Essays and notes on research methods, applied AI, and health data by Harold Zhong.');



  return (
    <div className="blog-list-page">
      <motion.div
        initial={false}
        animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
      >
        <h1>All Articles</h1>
      </motion.div>

      <nav className="topic-links" aria-label="Article topics"><Link to="/blog" aria-current={!category ? 'page' : undefined}>All topics</Link>{topics.map(topic => <Link key={topic} to={`/blog?topic=${encodeURIComponent(topic)}`} aria-current={category === topic ? 'page' : undefined}>{topic}</Link>)}</nav>
      {allPosts.length === 0 && <p>No articles in this topic. <Link to="/blog">Browse all articles</Link>.</p>}
      <div className="blog-grid">
        {allPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
