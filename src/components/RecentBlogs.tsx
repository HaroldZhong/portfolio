import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import BlogCard from './BlogCard';
import SectionHead from './SectionHead';
import { getAllPosts, getRecentPosts } from '../utils/blogLoader';
import '../assets/styles/Blog.scss';

const RecentBlogs: React.FC = () => (
  <section className="section shell" id="blog" aria-labelledby="blog-title">
    <SectionHead index="06" label="Writing" titleId="blog-title" title="Recent Articles"
      intro="These are the kinds of questions I keep coming back to in my work."
      aside={<Link to="/blog" className="text-link view-all-btn">All {getAllPosts().length} articles <ArrowUpRight size={16} /></Link>} />
    <div className="blog-grid">
      {getRecentPosts(3).map(post => <BlogCard key={post.slug} post={post} />)}
    </div>
  </section>
);

export default RecentBlogs;
