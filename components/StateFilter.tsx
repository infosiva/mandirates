'use client'
import { useRouter, useSearchParams } from 'next/navigation'

const STATES = [
  { label: 'All', value: '' },
  { label: 'Tamil Nadu', value: 'Tamil Nadu' },
  { label: 'Maharashtra', value: 'Maharashtra' },
  { label: 'Punjab', value: 'Punjab' },
  { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
  { label: 'Rajasthan', value: 'Rajasthan' },
  { label: 'Karnataka', value: 'Karnataka' },
]

export default function StateFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('state') ?? ''

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('state', value)
    } else {
      params.delete('state')
    }
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
      {STATES.map((s) => {
        const isActive = active === s.value
        return (
          <button
            key={s.value}
            onClick={() => handleSelect(s.value)}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 ${
              isActive
                ? 'bg-green-600 text-white border-green-500 shadow-sm shadow-green-900/40'
                : 'bg-transparent text-gray-400 border-green-900/40 hover:border-green-600/60 hover:text-green-300'
            }`}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
