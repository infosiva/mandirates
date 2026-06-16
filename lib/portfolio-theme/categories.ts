/**
 * Category → theme palette, per DESIGN-STANDARD.md
 * Single source of truth. Pull this instead of hardcoding hex per project.
 */

export type ThemeMode = 'light' | 'dark';

export interface CategoryTheme {
  mode: ThemeMode;
  bg: string;
  bg2: string;
  surface: string;
  border: string;
  borderStrong: string;
  accent: string;
  accent2: string;
  text: string;
  text2: string;
  text3: string;
  up: string;
  down: string;
}

const UP = '#16a34a';
const DOWN = '#dc2626';

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  education: {
    mode: 'light', bg: '#f0f9ff', bg2: '#e0f2fe', surface: '#ffffff',
    border: 'rgba(2,132,199,0.14)', borderStrong: 'rgba(2,132,199,0.24)',
    accent: '#0284c7', accent2: '#0369a1',
    text: '#0f172a', text2: '#334155', text3: '#64748b', up: UP, down: DOWN,
  },
  health: {
    mode: 'light', bg: '#f8fafc', bg2: '#f1f5f9', surface: '#ffffff',
    border: 'rgba(13,148,136,0.14)', borderStrong: 'rgba(13,148,136,0.24)',
    accent: '#0d9488', accent2: '#0f766e',
    text: '#0f172a', text2: '#334155', text3: '#64748b', up: UP, down: DOWN,
  },
  travel: {
    mode: 'light', bg: '#f0fdf4', bg2: '#dcfce7', surface: '#ffffff',
    border: 'rgba(5,150,105,0.14)', borderStrong: 'rgba(5,150,105,0.24)',
    accent: '#059669', accent2: '#047857',
    text: '#0f172a', text2: '#334155', text3: '#64748b', up: UP, down: DOWN,
  },
  finance: {
    mode: 'light', bg: '#f8fafc', bg2: '#ecfdf5', surface: '#ffffff',
    border: 'rgba(5,150,105,0.14)', borderStrong: 'rgba(5,150,105,0.24)',
    accent: '#059669', accent2: '#10b981',
    text: '#0f172a', text2: '#334155', text3: '#64748b', up: UP, down: DOWN,
  },
  'food-local': {
    mode: 'light', bg: '#fffbf5', bg2: '#fff7ed', surface: '#ffffff',
    border: 'rgba(217,119,6,0.14)', borderStrong: 'rgba(217,119,6,0.24)',
    accent: '#d97706', accent2: '#b45309',
    text: '#1c1410', text2: '#5c4a3a', text3: '#92765a', up: UP, down: DOWN,
  },
  'news-trends': {
    mode: 'light', bg: '#f9fafb', bg2: '#f3f4f6', surface: '#ffffff',
    border: 'rgba(220,38,38,0.12)', borderStrong: 'rgba(220,38,38,0.22)',
    accent: '#dc2626', accent2: '#b91c1c',
    text: '#0f172a', text2: '#334155', text3: '#64748b', up: UP, down: DOWN,
  },
  productivity: {
    mode: 'light', bg: '#ffffff', bg2: '#f8fafc', surface: '#ffffff',
    border: 'rgba(37,99,235,0.14)', borderStrong: 'rgba(37,99,235,0.24)',
    accent: '#2563eb', accent2: '#1d4ed8',
    text: '#0f172a', text2: '#334155', text3: '#64748b', up: UP, down: DOWN,
  },
  'dev-tools': {
    mode: 'dark', bg: '#0b1120', bg2: '#0d1424', surface: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)', borderStrong: 'rgba(255,255,255,0.16)',
    accent: '#6366f1', accent2: '#818cf8',
    text: '#f1f5f9', text2: '#cbd5e1', text3: '#64748b', up: UP, down: DOWN,
  },
  'ai-infra': {
    mode: 'dark', bg: '#0c0f1a', bg2: '#0e1220', surface: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)', borderStrong: 'rgba(255,255,255,0.16)',
    accent: '#7c3aed', accent2: '#8b5cf6',
    text: '#f1f5f9', text2: '#cbd5e1', text3: '#64748b', up: UP, down: DOWN,
  },
  'gaming-creative': {
    mode: 'dark', bg: '#0f0f23', bg2: '#13132b', surface: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)', borderStrong: 'rgba(255,255,255,0.16)',
    accent: '#f59e0b', accent2: '#fbbf24',
    text: '#f1f5f9', text2: '#cbd5e1', text3: '#64748b', up: UP, down: DOWN,
  },
  media: {
    mode: 'dark', bg: '#0a0a0f', bg2: '#0d0d14', surface: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)', borderStrong: 'rgba(255,255,255,0.16)',
    accent: '#e879f9', accent2: '#d946ef',
    text: '#f1f5f9', text2: '#cbd5e1', text3: '#64748b', up: UP, down: DOWN,
  },
};

export function getCategoryTheme(category: keyof typeof CATEGORY_THEMES): CategoryTheme {
  return CATEGORY_THEMES[category] ?? CATEGORY_THEMES.productivity;
}

/** Emit a `:root { --bg: ...; }` CSS variable block for a category. */
export function categoryThemeToCSSVars(theme: CategoryTheme): string {
  return `:root {
  --bg: ${theme.bg};
  --bg-2: ${theme.bg2};
  --surface: ${theme.surface};
  --border: ${theme.border};
  --border-strong: ${theme.borderStrong};
  --accent: ${theme.accent};
  --accent-2: ${theme.accent2};
  --text: ${theme.text};
  --text-2: ${theme.text2};
  --text-3: ${theme.text3};
  --up: ${theme.up};
  --down: ${theme.down};
}`;
}
