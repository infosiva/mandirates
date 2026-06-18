import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #9a3412, #ea580c)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* ascending price/mandi bars */}
          <rect x="3" y="14" width="3.4" height="7" rx="1" fill="white" />
          <rect x="9.3" y="9.5" width="3.4" height="11.5" rx="1" fill="white" />
          <rect x="15.6" y="5" width="3.4" height="16" rx="1" fill="white" />
          {/* rising trend arrow above bars */}
          <path d="M3 9l5-4 3.5 3L19 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M15 2h4v4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
