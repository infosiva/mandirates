import CookieConsent from "@/components/CookieConsent";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import SchemaOrg from '@/components/SchemaOrg'
import FeedbackWidget from '@/components/FeedbackWidget'
import { getSiteFlags } from '@/lib/flags'
import { loadSiteTheme, buildThemeStyleTag, buildGa4Snippet } from '@/lib/theme-loader'
import { AnimatedBg } from '@/components/AnimatedBg'

import { MotionProvider } from "@infosiva/shared-ui/modern";
export const metadata: Metadata = {
  metadataBase: new URL("https://mandirates.app"),
  title: {
    default: "MandiRates — Daily Mandi Prices & MSP Tracker India",
    template: "%s | MandiRates",
  },
  description:
    "Check today's mandi rates for all crops across India. Compare with MSP, get AI price insights. Live Agmarknet data for farmers, traders and agri businesses.",
  keywords: [
    "mandi rates",
    "mandi price",
    "agmarknet",
    "today vegetable price",
    "crop price India",
    "MSP 2025",
    "kisan mandi bhav",
    "mandi bhav today",
  ],
  openGraph: {
    title: "MandiRates — Daily Mandi Prices & MSP Tracker India",
    description:
      "Check today's mandi rates for all crops across India. Compare with MSP, get AI price insights. Live Agmarknet data for farmers, traders and agri businesses.",
    siteName: "MandiRates",
    type: "website",
    locale: "en_IN",
    url: "https://mandirates.app",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MandiRates — Daily Mandi Prices & MSP Tracker India",
    description:
      "Live mandi rates, MSP comparison and AI price insights for Indian crops. Free for farmers and traders.",
    images: ["https://mandirates.app/og.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const flags = await getSiteFlags('mandirates')
  const theme = await loadSiteTheme('mandirates')
  const themeCss = buildThemeStyleTag(theme)
  const ga4 = buildGa4Snippet(theme)
  const archetype = theme?.layout?.archetype ?? 'directory-marketplace'
  return (
    <html lang="en" data-layout={archetype}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-4237294630161176" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "MandiRates",
              "description": "Live mandi rates and MSP tracker for Indian agricultural crops",
              "url": "https://mandirates.app",
              "applicationCategory": "BusinessApplication"
            })
          }}
        />
        <SchemaOrg />
        {themeCss ? <style dangerouslySetInnerHTML={{ __html: themeCss }} /> : null}
        {ga4 ? <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${theme?.analytics?.ga4Id}`} />
          <script dangerouslySetInnerHTML={{ __html: ga4 }} />
        </> : null}
      </head>
      <body className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <AnimatedBg theme={theme} fallback="aurora" />
        <Navbar showMspLink={flags.msp_compare} />
        <main style={{ position: 'relative', zIndex: 1 }}><MotionProvider>{children}</MotionProvider></main>
        <footer className="mt-16" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--ink-2)', position: 'relative', zIndex: 1 }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                
                <span className="font-black text-base">
                  <span style={{ color: "var(--ink)" }}>Mandi</span>
                  <span style={{ color: "var(--accent-ink)" }}>Rates</span>
                </span>
              </div>
              <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                Live mandi prices via{" "}
                <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent-ink)" }}>
                  Agmarknet
                </a>
                {" "}· ₹ per quintal · Refreshed every 6h · For reference only
              </p>
              <div className="flex gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                <a href="/msp" className="hover:underline transition-colors">MSP Rates</a>
                <a href="/prices/tomato" className="hover:underline transition-colors">Vegetable Prices</a>
              </div>
            </div>
          </div>
        </footer>
        <FloatingChatWrapper />
        <FeedbackWidget siteName="MandiRates" position="left" />
        <CookieConsent />
      </body>
    </html>
  );
}
