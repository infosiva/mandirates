// site.config.ts — MandiRates site configuration
// All landing page copy, FAQ, features, and layout settings driven from here.

export type HeroVariant = 'split' | 'centered' | 'minimal'

export interface SiteConfig {
  siteName: string
  domain: string
  themeColor: string
  heroBadge: string
  headline: string[]
  subheadline: string
  ctaPrimary: { text: string; href: string }
  ctaSecondary: { text: string; href: string }
  freeTier: {
    pills: string[]
  }
  socialProof: {
    marqueeItems: string[]
  }
  howItWorks: Array<{ step: number; icon: string; title: string; desc: string }>
  features: Array<{ icon: string; title: string; desc: string; size?: 'large' | 'wide' | 'medium' }>
  faq: Array<{ q: string; a: string }>
  finalCta: { headline: string; subtext: string; ctaText: string; ctaHref: string }
  layout: { heroVariant: HeroVariant; sectionOrder: string[]; hideSections: string[] }
  seo: { title: string; description: string; ogImage: string; llmsDescription: string }
  nav: Array<{ label: string; href: string }>
}

export const siteConfig: SiteConfig = {
  siteName:   'MandiRates',
  domain:     'mandirates.app',
  themeColor: 'green',

  heroBadge:    'mandirates · 500+ mandis · updated daily',
  headline:     ['Know your crop\'s worth,', 'before you sell.'],
  subheadline:  'Live mandi prices from 500+ markets across India — compare MSP, spot the best market, and sell at the right time.',
  ctaPrimary:   { text: 'Check Today\'s Prices →', href: '#prices' },
  ctaSecondary: { text: 'Compare MSP Rates', href: '/msp' },

  freeTier: {
    pills: ['Free access', '500+ mandis', 'Daily updates'],
  },

  socialProof: {
    marqueeItems: [
      '🌾 Wheat', '🍚 Rice', '🧅 Onion', '🥔 Potato',
      '🌽 Maize', '🫘 Soybean', '🥜 Groundnut', '🌿 Cotton',
      '🍅 Tomato', '🌶️ Chilli', '🧄 Garlic', '🫚 Mustard',
    ],
  },

  howItWorks: [
    { step: 1, icon: '🌾', title: 'Select commodity', desc: 'Choose from 100+ agricultural commodities — wheat, rice, vegetables, pulses and more.' },
    { step: 2, icon: '📍', title: 'Choose state or mandi', desc: 'Filter by state or specific mandi to see local prices from 500+ markets across India.' },
    { step: 3, icon: '📈', title: 'See live prices', desc: 'Instantly view today\'s modal, min, and max prices with trend data and MSP comparison.' },
  ],

  features: [
    { icon: '🏪', title: '500+ Mandis Covered',   desc: 'Data sourced from Agmarknet covering agricultural produce markets across all 28 states.', size: 'large'  },
    { icon: '🌾', title: '100+ Commodities',      desc: 'Track prices for all major crops — cereals, pulses, oilseeds, vegetables and fruits.',         size: 'medium' },
    { icon: '📈', title: 'Price Trends',           desc: 'View daily price movements and spot emerging trends across markets and states.',                size: 'medium' },
    { icon: '📋', title: 'MSP Comparison',         desc: 'Compare live mandi rates against government Minimum Support Prices for fair price awareness.',   size: 'medium' },
    { icon: '🔔', title: 'Price Alerts',           desc: 'Get notified when commodity prices cross your target threshold. SMS and web alerts.',            size: 'wide'   },
  ],

  faq: [
    { q: 'Is MandiRates free to use?',
      a: 'Yes — MandiRates is completely free. All mandi price data, MSP comparisons, and commodity tracking are available at no cost.' },
    { q: 'How often are prices updated?',
      a: 'Prices are updated every 6 hours from Agmarknet (data.gov.in), India\'s official agricultural market data portal. Most mandi data reflects the latest trading session.' },
    { q: 'Which states are covered?',
      a: 'MandiRates covers mandis across all 28 Indian states including major agricultural states like Uttar Pradesh, Maharashtra, Karnataka, Punjab, Haryana, Madhya Pradesh, and Tamil Nadu.' },
    { q: 'Can I get price alerts for specific commodities?',
      a: 'Yes. You can set price alerts for any commodity and mandi. We\'ll notify you via SMS or browser notification when prices cross your specified threshold.' },
    { q: 'Where does the price data come from?',
      a: 'All price data is sourced from Agmarknet — the government\'s official Agricultural Marketing Information Network. Data reflects actual transactions from registered mandis.' },
  ],

  finalCta: {
    headline: 'Sell at the right price, every time.',
    subtext:  'Free. No account needed. 500+ mandis, all of India.',
    ctaText:  'Check Today\'s Prices →',
    ctaHref:  '#prices',
  },

  layout: {
    heroVariant:  'centered',
    sectionOrder: ['hero', 'marquee', 'priceData', 'howItWorks', 'features', 'faq', 'finalCta'],
    hideSections: [],
  },

  seo: {
    title:          'MandiRates — Daily Mandi Prices & MSP Tracker India',
    description:    'Check today\'s mandi rates for all crops across India. Live Agmarknet data for 500+ mandis, 100+ commodities. Compare with MSP.',
    ogImage:        '/og.png',
    llmsDescription: 'MandiRates (mandirates.app) provides free real-time agricultural commodity prices from 500+ mandis across India. Data sourced from Agmarknet (data.gov.in). Covers 100+ commodities including wheat, rice, vegetables, pulses, and oilseeds. Features MSP comparison, price trends, state-wise filtering, and daily updates every 6 hours. Completely free, no account required.',
  },

  nav: [
    { label: 'Home',        href: '/' },
    { label: 'MSP Rates',   href: '/msp' },
    { label: 'Prices',      href: '/prices/tomato' },
  ],
}

export default siteConfig
