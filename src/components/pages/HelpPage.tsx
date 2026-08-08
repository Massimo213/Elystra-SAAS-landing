import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import MarketingPageLayout from '@/components/MarketingPageLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/pages/PageHero';
import { FAQ_ITEMS, searchHelpArticles } from '@/data/faqs';
import { faqPageSchema, webPageSchema } from '@/lib/seo/schemas';

const HelpPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const results = useMemo(() => searchHelpArticles(query), [query]);

  return (
    <MarketingPageLayout>
      <SeoHead
        title="Help Center | Elystra"
        description="Elystra help and support. Answers about pricing, login, integrations, proposals, and agency revenue infrastructure."
        path="/help"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Help Center', path: '/help' },
        ]}
        jsonLd={[
          webPageSchema('/help', 'Help Center | Elystra', 'Support resources for Elystra agencies.'),
          faqPageSchema(FAQ_ITEMS),
        ]}
      />

      <div className="px-6">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[{ name: 'Home', path: '/' }, { name: 'Help Center', path: '/help' }]}
          />
        </div>
      </div>

      <PageHero
        eyebrow="Support"
        title="Elystra Help Center"
        description="Search for answers about Elystra pricing, login, product, integrations, and support."
      />

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const q = String(formData.get('q') ?? '').trim();
              setSearchParams(q ? { q } : {});
            }}
            className="relative mb-10"
          >
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search help articles..."
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 pl-11 pr-4 text-sm font-light text-white placeholder:text-zinc-600 focus:border-violet-500/40 focus:outline-none"
            />
          </form>

          <div className="space-y-4">
            {results.map((article) => (
              <article
                key={article.slug}
                id={article.slug}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-5"
              >
                <h2 className="text-base font-light text-white">{article.title}</h2>
                <p className="mt-2 text-sm font-light leading-relaxed text-zinc-400">{article.body}</p>
              </article>
            ))}
            {results.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No results for &ldquo;{query}&rdquo;.{' '}
                <Link to="/contact" className="text-violet-400 hover:text-violet-300">
                  Contact support
                </Link>
                .
              </p>
            ) : null}
          </div>

          <p className="mt-10 text-center text-sm text-zinc-500">
            Still need help?{' '}
            <a href="mailto:support@elystra.online" className="text-violet-400 hover:text-violet-300">
              support@elystra.online
            </a>
          </p>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default HelpPage;
