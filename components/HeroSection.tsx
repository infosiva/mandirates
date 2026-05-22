// components/HeroSection.tsx — server component
// Static HTML that crawlers read. HeroClient mounts stagger animation on top.
import { siteConfig } from '@/site.config'
import HeroClient from './HeroClient'
import HeroPricePreview from './HeroPricePreview'

export default function HeroSection() {
  const isCentered = siteConfig.layout.heroVariant === 'centered'

  return (
    <section className="relative px-4 sm:px-6 pt-8 pb-10 max-w-4xl mx-auto">
      <div className={isCentered ? 'max-w-3xl mx-auto text-center' : 'max-w-xl'}>
        <HeroClient />
        {/* Static price preview table — visible to crawlers */}
        <div className="mt-10">
          <HeroPricePreview />
        </div>
      </div>
    </section>
  )
}
