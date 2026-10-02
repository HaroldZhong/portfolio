import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getAllPosts, getPostBySlug, formatDate, loadPostContent } from '../utils/blogLoader';
import { usePageMeta } from '../hooks/usePageMeta';
import PdfViewer from '../components/PdfViewer';
import { useScrollSpy } from '../hooks/useScrollSpy';
import '../assets/styles/Blog.scss';

export interface ArticleContent { slug: string; content: string }

export default function BlogPost({ initialPost }: { initialPost?: ArticleContent }) {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);
  const [loaded, setLoaded] = useState(initialPost);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const content = loaded?.slug === slug ? loaded.content : '';
  // Ordinal IDs also work for repeated headings, punctuation, and non-Latin text.
  const headings = Array.from(content.matchAll(/^## (.+)$/gm)).map((match, index) => ({ title: match[1].replace(/[*_`]/g, ''), id: `section-${index + 1}` }));
  const activeHeading = useScrollSpy(headings.map(heading => heading.id));
  usePageMeta(post ? `${post.title} | Harold Zhong` : 'Article not found | Harold Zhong', post?.excerpt, post?.thumbnail);
  useEffect(() => {
    let active = true;
    setFailed(false);
    if (post && loaded?.slug !== slug) {
      loadPostContent(slug).then(text => { if (active) setLoaded({ slug, content: text }); }).catch(() => { if (active) setFailed(true); });
    }
    return () => { active = false; };
  }, [slug, post, loaded?.slug, retry]);

  if (!post) return <section className="status-page shell"><h1>Article not found</h1><Link to="/blog" className="btn btn-primary">Back to all articles</Link></section>;

  let headingIndex = 0;
  const components = {
    a: ({ node: _node, href = '', ...props }) => {
      if (href.startsWith('/portfolio/')) return <Link to={href.slice('/portfolio'.length)} {...props} />;
      if (href.startsWith('https://haroldzhong.github.io/portfolio/')) return <Link to={href.slice('https://haroldzhong.github.io/portfolio'.length)} {...props} />;
      return <a href={href} {...props} />;
    },
    // The page header already carries the article title.
    h1: () => null,
    h2: ({ node: _node, ...props }) => <h2 id={`section-${++headingIndex}`} tabIndex={-1} {...props} />,
    img: ({ node: _node, ...props }) => <img {...props} loading="lazy" decoding="async" />,
    table: ({ node: _node, ...props }) => <div className="table-scroll"><table {...props} /></div>,
    'pdf-viewer': ({ src, title }: { src?: string; title?: string }) => src ? <PdfViewer src={src} title={title} /> : null,
  } as Components;
  const minutes = content ? Math.max(1, Math.ceil(content.split(/\s+/).length / 220)) : 0;
  const posts = getAllPosts();
  const next = posts[(posts.findIndex(item => item.slug === post.slug) + 1) % posts.length];

  return <article className="blog-post-page">
    <header className="post-header shell">
      <Link to="/blog" className="back-button mono"><ArrowLeft size={16} /> All articles</Link>
      <p className="post-meta mono">
        <Link to={`/blog?topic=${encodeURIComponent(post.category)}`} className="post-category">{post.category}</Link>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.updated && <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}
        {minutes > 0 && <span>{minutes} min read</span>}
      </p>
      <h1>{post.title}</h1>
      <p className="post-dek">{post.excerpt}</p>
    </header>

    <figure className="post-cover shell">
      <img src={post.thumbnail} alt="" width={1600} height={900} decoding="async" />
    </figure>

    <div className="post-layout shell">
      {headings.length >= 3 && <nav className="post-toc-rail" aria-label="Article contents">
        <p className="eyebrow">In this article</p>
        <ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`} aria-current={activeHeading === heading.id ? 'location' : undefined}>{heading.title}</a></li>)}</ol>
      </nav>}
      <div className="post-main">
        {headings.length >= 3 && <details className="post-toc"><summary>In this article</summary><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></details>}
        <div className="post-content">
          {content ? <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>{content}</ReactMarkdown>
            : failed ? <div role="alert"><p>The article could not load.</p><button type="button" className="btn" onClick={() => setRetry(value => value + 1)}>Try again</button></div>
            : <p role="status">Loading article…</p>}
        </div>
      </div>
    </div>

    {next.slug !== post.slug && <nav className="case-next post-next shell" aria-label="Next article">
      <Link to={`/blog/${next.slug}`}>
        <span className="eyebrow">Next article</span>
        <span className="case-next-title">{next.title} <ArrowUpRight size={36} strokeWidth={1.25} /></span>
      </Link>
    </nav>}
  </article>;
}
