// components/HeroSection.tsx — server component
// Static HTML that crawlers read. HeroClient mounts stagger animation on top.
import { siteConfig } from '@/site.config'
import HeroClient from './HeroClient'
import HeroPricePreview from './HeroPricePreview'

export default function HeroSection() {
  const isCentered = siteConfig.layout.heroVariant === 'centered'

  return (
    <section
      className="relative px-4 sm:px-6 pt-6 pb-4 max-w-4xl mx-auto"
      style={{ maxHeight: '380px' }}
    >
      <div className={isCentered ? 'max-w-3xl mx-auto text-center' : 'max-w-xl'}>
        <HeroClient />
      </div>
      {/* Scroll hint */}
      <div className="mt-3 text-center">
        <span className="text-xs text-green-500/70 animate-bounce inline-block">
          ↓ Live prices below
        </span>
      </div>
    </section>
  )
}
