import {
  DEFAULT_DESCRIPTION,
  LOGO_URL,
  ORGANIZATION_ID,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
  SOFTWARE_ID,
  WEBSITE_ID,
  absoluteUrl,
  type BreadcrumbItem,
} from './constants';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    description: DEFAULT_DESCRIPTION,
    sameAs: [...SAME_AS],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@elystra.online',
      url: absoluteUrl('/help'),
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/help')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Revenue Operations',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    featureList: [
      'AI Proposal Engine',
      'Sign-and-Pay Close Rail',
      'Deal Intelligence & Follow-Up',
      'Ops Automation & Client Portal',
    ],
    offers: {
      '@type': 'Offer',
      url: 'https://app.elystra.online/pricing',
      priceCurrency: 'USD',
      description: 'Flat monthly pricing for agencies. See pricing page for plans.',
    },
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a.replace(/\n+/g, ' ').trim(),
      },
    })),
  };
}

export function jobPostingSchema(role: {
  title: string;
  slug: string;
  department: string;
  summary: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: role.summary || `${role.title} at Elystra — ${role.department} team.`,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Elystra',
      value: role.slug,
    },
    datePosted: '2026-02-01',
    validThrough: '2026-12-31',
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: LOGO_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'United States',
    },
    jobLocationType: 'TELECOMMUTE',
    url: absoluteUrl(`/careers/${role.slug}`),
  };
}

export function webPageSchema(path: string, title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SOFTWARE_ID },
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function homePageSchemas() {
  return [organizationSchema(), websiteSchema(), softwareApplicationSchema()];
}
