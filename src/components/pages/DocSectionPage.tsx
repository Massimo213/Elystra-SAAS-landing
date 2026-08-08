import { Link, Navigate, useParams } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { DOC_SECTIONS } from '@/data/docs';
import { webPageSchema } from '@/lib/seo/schemas';

const DocSectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const section = DOC_SECTIONS.find((s) => s.slug === slug);

  if (!section) {
    return <Navigate to="/docs" replace />;
  }

  return (
    <MarketingPageLayout>
      <SeoHead
        title={`${section.title} | Elystra Docs`}
        description={section.description}
        path={`/docs/${section.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Documentation', path: '/docs' },
          { name: section.title, path: `/docs/${section.slug}` },
        ]}
        jsonLd={webPageSchema(
          `/docs/${section.slug}`,
          `${section.title} | Elystra Docs`,
          section.description,
        )}
      />

      <div className="px-6">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Documentation', path: '/docs' },
              { name: section.title, path: `/docs/${section.slug}` },
            ]}
          />
        </div>
      </div>

      <PageHero eyebrow="Documentation" title={section.title} description={section.description} />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <ol className="space-y-4">
            {section.content.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs text-violet-300">
                  {index + 1}
                </span>
                <span className="text-sm font-light leading-relaxed text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
          <Link to="/docs" className="mt-10 inline-block text-sm text-violet-400 hover:text-violet-300">
            ← All documentation
          </Link>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default DocSectionPage;
