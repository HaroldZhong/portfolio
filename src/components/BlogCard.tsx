import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { BlogPost, formatDate } from '../utils/blogLoader';
import '../assets/styles/Blog.scss';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card-link">
      <motion.div
        className="blog-card-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
      >
        <div className="blog-card">
          <div className="blog-thumbnail">
            <img src={post.thumbnail} alt={post.title} />
            <div className="blog-category-badge">{post.category}</div>
          </div>
          <div className="blog-card-content">
            <h3>{post.title}</h3>
            <div className="blog-meta">
              <Calendar size={16} />
              <span>{formatDate(post.date)}</span>
            </div>
            <p className="blog-excerpt">{post.excerpt}</p>
            <div className="hover-hint">Click to read more →</div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;

