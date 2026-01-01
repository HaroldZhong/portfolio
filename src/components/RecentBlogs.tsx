import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogCard from './BlogCard';
import { getRecentPosts } from '../utils/blogLoader';
import '../assets/styles/Blog.scss';

const RecentBlogs: React.FC = () => {
  const recentPosts = getRecentPosts(3);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="recent-blogs-section" id="blog">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Recent Articles</h2>
        <p className="section-subtitle">
          These are the kinds of questions I keep coming back to in my work.
        </p>
      </motion.div>

      <div className="blog-grid">
        {recentPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      <Link to="/blog" className="view-all-btn">
        View All Articles <ArrowRight size={20} />
      </Link>
    </div>
  );
};

export default RecentBlogs;
