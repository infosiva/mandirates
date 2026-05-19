import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

let _g: Groq | null = null
function g() { if (!_g) _g = new Groq({ apiKey: process.env.GROQ_API_KEY! }); return _g }

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json()
    const res = await g().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: system ?? 'You are MandiRates AI — India agricultural commodity price expert. Help farmers and traders find mandi prices, understand price trends, and make better trading decisions. Be concise and practical in simple English or Hindi.' }, ...messages],
      max_tokens: 400,
    })
    return NextResponse.json({ text: res.choices[0]?.message?.content ?? 'Happy to help!' })
  } catch {
    return NextResponse.json({ text: 'Try again in a moment!' }, { status: 200 })
  }
}
