export const SITE_URL = 'https://www.elystra.online';
export const SITE_NAME = 'Elystra';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/hero-banner.png`;
export const LOGO_URL = `${SITE_URL}/og/logo.png`;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;

export const SAME_AS = [
  'https://twitter.com/elystra',
  'https://www.linkedin.com/company/elystra',
  'https://github.com/elystra',
] as const;

export const DEFAULT_DESCRIPTION =
  'Revenue infrastructure for agencies. Proposal-to-cash rail: scope, send, sign, collect, follow up, operate.';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  breadcrumbs?: BreadcrumbItem[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
};

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
