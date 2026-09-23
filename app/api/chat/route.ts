import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { AI_LIMITER } from '@/lib/rateLimit'

let _g: Groq | null = null
function g() { if (!_g) _g = new Groq({ apiKey: process.env.GROQ_API_KEY! }); return _g }

export async function POST(req: NextRequest) {
  const limited = AI_LIMITER.check(req); if (limited) return limited

  try {
    const { messages, system } = await req.json()
    const sysPrompt = system ?? 'You are MandiRates AI — India agricultural commodity price expert. Help farmers and traders find mandi prices, understand price trends, and make better trading decisions. Be concise and practical in simple English or Hindi.'
    for (const model of ['qwen/qwen3.8-27b', 'openai/gpt-oss-20b']) {
      try {
        const res = await g().chat.completions.create({
          model,
          messages: [{ role: 'system', content: sysPrompt }, ...messages],
          max_tokens: 400,
        })
        const text = res.choices[0]?.message?.content
        if (text) return NextResponse.json({ text })
      } catch (err) {
        console.warn(`[mandirates][chat] ${model} failed`, err)
      }
    }
    return NextResponse.json({ text: 'Happy to help!' })
  } catch {
    return NextResponse.json({ text: 'Try again in a moment!' }, { status: 200 })
  }
}
