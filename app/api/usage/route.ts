import { NextRequest, NextResponse } from 'next/server'

// Anonymous usage event (client only sends after cookie consent). Structured log, no PII stored.
export async function POST(req: NextRequest) {
  try {
    const b = await req.json()
    console.log(JSON.stringify({ level: 'info', scope: 'usage', event: String(b.event ?? '').slice(0, 40), ts: Date.now() }))
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  return NextResponse.json({ ok: true })
}
