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
        <span className="badge-glow inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/60 text-green-300 border border-green-700/50 text-xs font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          {siteConfig.heroBadge}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={childVars as Parameters<typeof motion.h1>[0]['variants']}
        className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight text-gray-50"
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
        className="text-gray-400 text-sm leading-relaxed max-w-md"
      >
        {siteConfig.subheadline}
      </motion.p>

      {/* Free tier pills */}
      <motion.div
        variants={childVars as Parameters<typeof motion.div>[0]['variants']}
        className="flex flex-wrap gap-2 justify-center"
      >
        {siteConfig.freeTier.pills.map(pill => (
          <span key={pill} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-900/40 text-green-300 border border-green-700/40">
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
            className="cta-pulse inline-flex items-center justify-center px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-500 transition-colors"
          >
            {siteConfig.ctaPrimary.text}
          </Link>
        </motion.div>
        <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
          <Link
            href={siteConfig.ctaSecondary.href}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-amber-600/50 text-amber-400 bg-amber-900/20 font-bold text-sm hover:bg-amber-900/40 transition-colors"
          >
            {siteConfig.ctaSecondary.text}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
