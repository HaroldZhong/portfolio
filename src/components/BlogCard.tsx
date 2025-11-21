import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost, formatDate } from '../utils/blogLoader';
import '../assets/styles/Blog.scss';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="blog-card-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="blog-card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front of card */}
        <div className="blog-card-front">
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
            <div className="hover-hint">Hover to read more →</div>
          </div>
        </div>

        {/* Back of card */}
        <div className="blog-card-back">
          <div className="blog-card-content">
            <div className="blog-category-badge">{post.category}</div>
            <h3>{post.title}</h3>
            <p className="blog-excerpt-full">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="read-more-btn">
              Read Full Article <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogCard;

