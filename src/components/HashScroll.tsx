import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to in-page anchors after SPA navigation (e.g. /#faq from footer). */
const HashScroll = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    requestAnimationFrame(() => {
      scroll();
      window.setTimeout(scroll, 120);
    });
  }, [pathname, hash]);

  return null;
};

export default HashScroll;
