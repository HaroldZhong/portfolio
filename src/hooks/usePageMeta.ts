import { useEffect } from 'react';

/**
 * Sets document.title and the meta description for a route, restoring the
 * previous values on unmount. Gives this client-rendered SPA per-page
 * metadata for search engines and the browser tab without adding a
 * head-manager dependency.
 */
export function usePageMeta(title?: string, description?: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    const descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl?.getAttribute('content') ?? '';

    if (title) document.title = title;
    if (description && descEl) descEl.setAttribute('content', description);

    return () => {
      document.title = prevTitle;
      if (descEl) descEl.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}
