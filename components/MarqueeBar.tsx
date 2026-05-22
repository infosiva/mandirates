// components/MarqueeBar.tsx — server component, CSS-only animation (zero JS)
import { siteConfig } from '@/site.config'

export default function MarqueeBar() {
  // Duplicate items so CSS loop is seamless
  const items = [...siteConfig.socialProof.marqueeItems, ...siteConfig.socialProof.marqueeItems]

  return (
    <section aria-label="Commodity categories" className="py-5 border-y border-green-900/20 overflow-hidden">
      <div className="marquee-wrapper">
        <div className="marquee-track gap-8">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm text-green-800/50 font-medium whitespace-nowrap select-none px-3"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
