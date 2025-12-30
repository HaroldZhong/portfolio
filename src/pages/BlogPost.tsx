import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getPostBySlug, formatDate } from '../utils/blogLoader';
import { useEffect } from 'react';
import PdfViewer from '../components/PdfViewer';
import '../assets/styles/Blog.scss';

// Custom component to handle pdf-viewer tags
const PdfViewerWrapper = ({ src, title }: { src?: string; title?: string }) => {
  if (!src) return null;
  return <PdfViewer src={src} title={title || ''} />;
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

  // Custom components for ReactMarkdown
  const markdownComponents: Partial<Components> & Record<string, React.ComponentType<any>> = {
    a: ({ node, ...props }: any) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
    'pdf-viewer': ({ src, title }: any) => <PdfViewerWrapper src={src} title={title} />
  };

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
          <div className="post-thumbnail-large">
            <img src={post.thumbnail} alt={post.title} />
          </div>
          <div className="post-category">{post.category}</div>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <Calendar size={18} />
            <span>{formatDate(post.date)}</span>
          </div>
        </div>

        <div className="post-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents as Components}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPost;


