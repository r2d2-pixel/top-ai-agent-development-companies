// ─── SITE CONFIG ───────────────────────────────────────────────────────────
// To clone this site for a new niche: edit EVERY field in this file,
// swap out src/data/companies.ts, and you're done.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name:          'Top AI Agent Development Companies',
  domain:        'top-ai-agent-development-companies.com',
  url:           'https://top-ai-agent-development-companies.com',
  tagline:       'The top-ranked AI agent development companies, independently reviewed',
  description:   'See the top-ranked AI agent development companies compared side by side. Independent reviews, pricing data, and rankings for teams building autonomous AI agents.',
  locale:        'en_US',
  twitterHandle: '',
  lastReviewed:  'August 2026',
};

export const NICHE = {
  label:          'AI Agent Development',
  providerLabel:  'company',
  providersLabel: 'companies',
  verticalSlug:   'ai-agent-development',
};

export const BRANDING = {
  primaryColor: '#d97706',  // tailwind brand-600 (Amber); update tailwind.config.mjs too
  logoText:     'Top AI Agent Development Companies',
  logoPath:     '/logos/site-logo.svg',
};

// ─── MONETIZATION ──────────────────────────────────────────────────────────
export const MONETIZATION = {
  enabled: false,
  // When enabled=true, companies with monetized:true get rel="sponsored" on outbound links.
  // Set to false site-wide to strip all sponsored rels (e.g. while testing).
  defaultRel: 'nofollow' as 'sponsored' | 'nofollow' | '',
  disclosurePath: '/affiliate-disclosure',
};

// ─── NAV ───────────────────────────────────────────────────────────────────
export const NAV = [
  { label: 'Home',        href: '/' },
  { label: 'Disclosure',  href: '/affiliate-disclosure/' },
  { label: 'Contact',     href: '/contact/' },
];
