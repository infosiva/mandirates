import CookieConsent from "@/components/CookieConsent";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import SchemaOrg from '@/components/SchemaOrg'

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
    siteName: "MandiRates",
    type: "website",
    locale: "en_IN",
    url: "https://mandirates.app",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="aurora aurora-primary" aria-hidden />
        <div className="aurora aurora-secondary" aria-hidden />
        <div className="aurora aurora-third" aria-hidden />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <footer className="mt-16" style={{ borderTop: '1px solid rgba(22,163,74,0.15)', background: 'rgba(10,18,10,0.95)', position: 'relative', zIndex: 1 }}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌾</span>
                <span className="font-black text-base">
                  <span className="text-green-400">Mandi</span>
                  <span className="text-amber-400">Rates</span>
                </span>
              </div>
              <p className="text-xs text-center" style={{ color: 'rgba(238,244,238,0.4)' }}>
                Live mandi prices via{" "}
                <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-green-500">
                  Agmarknet
                </a>
                {" "}· ₹ per quintal · Refreshed every 6h · For reference only
              </p>
              <div className="flex gap-4 text-xs" style={{ color: 'rgba(238,244,238,0.4)' }}>
                <a href="/msp" className="hover:text-green-400 transition-colors">MSP Rates</a>
                <a href="/prices/tomato" className="hover:text-green-400 transition-colors">Vegetable Prices</a>
              </div>
            </div>
          </div>
        </footer>
        <FloatingChatWrapper />
        <CookieConsent />
        <Script defer data-site="mandirates.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
