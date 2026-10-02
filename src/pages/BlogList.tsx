import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import SectionHead from '../components/SectionHead';
import { getAllPosts } from '../utils/blogLoader';
import { usePageMeta } from '../hooks/usePageMeta';
import '../assets/styles/Blog.scss';

const BlogList: React.FC = () => {
  const [params] = useSearchParams();
  const category = params.get('topic');
  const posts = getAllPosts();
  const topics = Array.from(new Set(posts.map(post => post.category)));
  const allPosts = category ? posts.filter(post => post.category === category) : posts;

  usePageMeta('Articles | Harold Zhong', 'Essays and notes on research methods, applied AI, and health data by Harold Zhong.');

  return (
    <div className="page-head shell blog-list-page">
      <SectionHead level="h1" index={String(posts.length).padStart(2, '0')} label="Articles" title="All Articles"
        intro="Essays and notes on research methods, applied AI, and health data." />

      <nav className="topic-links" aria-label="Article topics">
        <Link to="/blog" aria-current={!category ? 'page' : undefined}>All topics <span className="count">{posts.length}</span></Link>
        {topics.map(topic => (
          <Link key={topic} to={`/blog?topic=${encodeURIComponent(topic)}`} aria-current={category === topic ? 'page' : undefined}>
            {topic} <span className="count">{posts.filter(post => post.category === topic).length}</span>
          </Link>
        ))}
      </nav>
      {allPosts.length === 0 && <p className="empty-state">No articles in this topic. <Link to="/blog" className="text-link">Browse all articles</Link>.</p>}
      <div className="blog-grid">
        {allPosts.map(post => <BlogCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
};

export default BlogList;
