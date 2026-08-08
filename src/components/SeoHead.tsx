import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  type SeoConfig,
} from '@/lib/seo/constants';
import { breadcrumbSchema } from '@/lib/seo/schemas';

type SeoHeadProps = SeoConfig;

const SeoHead = ({
  title,
  description,
  path,
  ogType = 'website',
  breadcrumbs,
  jsonLd,
  noIndex = false,
}: SeoHeadProps) => {
  const canonical = absoluteUrl(path);
  const schemas: Record<string, unknown>[] = [];

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(breadcrumbSchema(breadcrumbs));
  }

  if (jsonLd) {
    const extra = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    schemas.push(...extra);
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      <meta name="twitter:creator" content="@elystra" />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;
