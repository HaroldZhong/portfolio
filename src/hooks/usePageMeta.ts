import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const siteUrl = 'https://haroldzhong.github.io';
export const homeTitle = 'Harold Zhong | Applied AI Engineer & Researcher';
export const homeDescription = 'Applied AI engineer and researcher working on LLM evaluation and safety, data quality and governance, and survey research. Explore Harold Zhong’s projects, experience, and scholarly work.';
export const defaultImage = '/portfolio/images/social-card.jpg';

export function pageMetadata(pathname: string, title = homeTitle, description = homeDescription, image = defaultImage) {
  const path = pathname === '/' ? '/portfolio/' : `/portfolio${pathname.replace(/\/$/, '')}/`;
  return { title, description, canonical: siteUrl + path, image: new URL(image || defaultImage, siteUrl).href, type: pathname.startsWith('/blog/') ? 'article' : 'website' };
}

export function usePageMeta(title?: string, description?: string, image?: string): void {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = pageMetadata(pathname, title, description, image);
    document.title = meta.title;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', meta.canonical);
    for (const [key, value] of Object.entries({ description: meta.description, 'og:title': meta.title, 'og:description': meta.description, 'og:url': meta.canonical, 'og:image': meta.image, 'og:type': meta.type, 'twitter:title': meta.title, 'twitter:description': meta.description, 'twitter:image': meta.image })) {
      document.querySelector(`meta[name="${key}"], meta[property="${key}"]`)?.setAttribute('content', value);
    }
  }, [pathname, title, description, image]);
}
