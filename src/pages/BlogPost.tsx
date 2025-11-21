import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getPostBySlug, formatDate } from '../utils/blogLoader';
import '../assets/styles/Blog.scss';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="blog-post-page">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Post Not Found</h1>
          <Link to="/blog" className="back-button">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/blog" className="back-button">
          <ArrowLeft size={18} /> Back to All Articles
        </Link>

        <div className="post-header">
          <div className="post-category">{post.category}</div>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <Calendar size={18} />
            <span>{formatDate(post.date)}</span>
          </div>
        </div>

        <div className="post-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPost;

