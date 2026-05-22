'use client'
// components/HeroClient.tsx — Framer Motion stagger animation over server-rendered hero copy
import { motion } from 'framer-motion'
import { STAGGER_CONTAINER, FADE_UP, SPRING_CINEMATIC, BUTTON_PRESS, useMotionVariants } from '@/lib/motion'
import { siteConfig } from '@/site.config'
import Link from 'next/link'

export default function HeroClient() {
  const variants  = useMotionVariants(STAGGER_CONTAINER(0.06))
  const childVars = useMotionVariants(FADE_UP)

  return (
    <motion.div
      variants={variants as Parameters<typeof motion.div>[0]['variants']}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5 items-center text-center"
    >
      {/* Badge */}
      <motion.div variants={childVars as Parameters<typeof motion.div>[0]['variants']}>
        <span className="badge-glow inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-800 border border-green-200 text-xs font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {siteConfig.heroBadge}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={childVars as Parameters<typeof motion.h1>[0]['variants']}
        className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight text-slate-900"
      >
        {siteConfig.headline.map((line, i) => (
          <span key={i} className="block">
            {i === 1
              ? <span className="gradient-text">{line}</span>
              : <span>{line}</span>
            }
          </span>
        ))}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={childVars as Parameters<typeof motion.p>[0]['variants']}
        className="text-slate-500 text-base leading-relaxed max-w-md"
      >
        {siteConfig.subheadline}
      </motion.p>

      {/* Free tier pills */}
      <motion.div
        variants={childVars as Parameters<typeof motion.div>[0]['variants']}
        className="flex flex-wrap gap-2 justify-center"
      >
        {siteConfig.freeTier.pills.map(pill => (
          <span key={pill} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700 border border-green-200">
            {pill}
          </span>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        variants={childVars as Parameters<typeof motion.div>[0]['variants']}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
          <Link
            href={siteConfig.ctaPrimary.href}
            className="cta-pulse inline-flex items-center justify-center px-8 py-4 rounded-xl bg-green-700 text-white font-bold text-base hover:bg-green-800 transition-colors min-h-[52px]"
          >
            {siteConfig.ctaPrimary.text}
          </Link>
        </motion.div>
        <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
          <Link
            href={siteConfig.ctaSecondary.href}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-amber-300 text-amber-700 bg-amber-50 font-bold text-sm hover:bg-amber-100 transition-colors min-h-[52px]"
          >
            {siteConfig.ctaSecondary.text}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
