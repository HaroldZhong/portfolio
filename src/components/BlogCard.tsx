import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost, formatDate } from '../utils/blogLoader';
import '../assets/styles/Blog.scss';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="blog-card-link">
    <article className="blog-card">
      <div className="blog-thumbnail">
        <img src={post.thumbnail} alt="" loading="lazy" decoding="async" />
      </div>
      <p className="blog-meta mono">
        <span className="blog-category">{post.category}</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      <h3>{post.title}</h3>
      <p className="blog-excerpt">{post.excerpt}</p>
      <span className="hover-hint">Read article <ArrowUpRight size={15} /></span>
    </article>
  </Link>
);

export default BlogCard;
