import { useCallback, useEffect, useState } from 'react';
import { DOCS_NAV, DOCS_SECTION_IDS } from '@/data/platform-docs';
import styles from '../pages/DocsPage.module.css';

type DocsSidebarProps = {
  activeId: string;
  onNavigate: (id: string) => void;
};

const DocsSidebar = ({ activeId, onNavigate }: DocsSidebarProps) => (
  <aside className={styles.side}>
    <div className={styles.brand}>
      Elystra <span>Docs</span>
    </div>
    <div className={styles.ver}>API v1 · Updated Aug 2026</div>

    {DOCS_NAV.map((group) => (
      <nav key={group.title} className={styles.navGrp} aria-label={group.title}>
        <h2>{group.title}</h2>
        {group.links.map((link) => (
          <button
            key={link.id}
            type="button"
            className={activeId === link.id ? styles.on : undefined}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    ))}
  </aside>
);

export function useDocsActiveSection() {
  const [activeId, setActiveId] = useState('overview');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && DOCS_SECTION_IDS.includes(hash)) {
      setActiveId(hash);
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, []);

  useEffect(() => {
    const sections = DOCS_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const visible: Record<string, boolean> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible[entry.target.id] = entry.isIntersecting;
        });
        const next = DOCS_SECTION_IDS.find((id) => visible[id]);
        if (next) setActiveId(next);
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((id: string) => {
    setActiveId(id);
    window.history.replaceState(null, '', `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return { activeId, navigate };
}

export default DocsSidebar;
