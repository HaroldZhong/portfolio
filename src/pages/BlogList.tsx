import React from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { getAllPosts } from '../utils/blogLoader';
import '../assets/styles/Blog.scss';

const BlogList: React.FC = () => {
  const allPosts = getAllPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog-list-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>All Articles</h1>
      </motion.div>

      <div className="blog-grid">
        {allPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
