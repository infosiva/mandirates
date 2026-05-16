import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

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
      </head>
      <body className="bg-green-50 min-h-screen">
        <Navbar />
        <main>{children}</main>
        <footer className="bg-green-900 text-green-200 text-center py-6 mt-12 text-sm">
          <p>
            MandiRates — Daily mandi prices powered by{" "}
            <a
              href="https://data.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Agmarknet / data.gov.in
            </a>
          </p>
          <p className="mt-1 text-xs text-green-400">
            Prices in ₹ per quintal. Data refreshed every 6 hours. For
            informational purposes only.
          </p>
        </footer>
      </body>
    </html>
  );
}
