import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getPostBySlug, formatDate, loadPostContent } from '../utils/blogLoader';
import { usePageMeta } from '../hooks/usePageMeta';
import PdfViewer from '../components/PdfViewer';
import '../assets/styles/Blog.scss';

export interface ArticleContent { slug: string; content: string }

export default function BlogPost({ initialPost }: { initialPost?: ArticleContent }) {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);
  const [loaded, setLoaded] = useState(initialPost);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const content = loaded?.slug === slug ? loaded.content : '';
  usePageMeta(post ? `${post.title} | Harold Zhong` : 'Article not found | Harold Zhong', post?.excerpt, post?.thumbnail);
  useEffect(() => {
    let active = true;
    setFailed(false);
    if (post && loaded?.slug !== slug) {
      loadPostContent(slug).then(text => { if (active) setLoaded({ slug, content: text }); }).catch(() => { if (active) setFailed(true); });
    }
    return () => { active = false; };
  }, [slug, post, loaded?.slug, retry]);

  if (!post) return <div className="blog-post-page"><h1>Article not found</h1><Link to="/blog">Back to all articles</Link></div>;

  // Ordinal IDs also work for repeated headings, punctuation, and non-Latin text.
  const headings = Array.from(content.matchAll(/^## (.+)$/gm)).map((match, index) => ({ title: match[1], id: `section-${index + 1}` }));
  let headingIndex = 0;
  const components = {
    a: ({ node: _node, href = '', ...props }) => {
      if (href.startsWith('/portfolio/')) return <Link to={href.slice('/portfolio'.length)} {...props} />;
      if (href.startsWith('https://haroldzhong.github.io/portfolio/')) return <Link to={href.slice('https://haroldzhong.github.io/portfolio'.length)} {...props} />;
      return <a href={href} {...props} />;
    },
    h2: ({ node: _node, ...props }) => <h2 id={`section-${++headingIndex}`} tabIndex={-1} {...props} />,
    img: ({ node: _node, ...props }) => <img {...props} loading="lazy" decoding="async" />,
    'pdf-viewer': ({ src, title }: { src?: string; title?: string }) => src ? <PdfViewer src={src} title={title} /> : null,
  } as Components;

  return <div className="blog-post-page">
    <Link to="/blog" className="back-button"><ArrowLeft size={18} /> Back to All Articles</Link>
    <header className="post-header">
      <div className="post-category">{post.category}</div>
      <h1>{post.title}</h1>
      <div className="post-meta"><Calendar size={18} /><time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.updated && <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}
        {content && <span>· {Math.max(1, Math.ceil(content.split(/\s+/).length / 220))} min read</span>}
      </div>
    </header>
    {headings.length >= 5 && <details className="post-toc"><summary>In this article</summary><nav aria-label="Article contents"><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></nav></details>}
    <div className="post-content">
      {content ? <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>{content}</ReactMarkdown>
        : failed ? <div role="alert"><p>The article could not load.</p><button onClick={() => setRetry(value => value + 1)}>Try again</button></div>
        : <p role="status">Loading article…</p>}
    </div>
  </div>;
}
