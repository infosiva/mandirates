import { NextRequest, NextResponse } from 'next/server'
import { AI_LIMITER } from '@/lib/rateLimit'

// Free-first chain: Groq -> Gemini -> Cerebras -> static. Never 500.
const SYS = 'You are MandiRates AI — India agricultural commodity price expert. Help farmers and traders find mandi prices, understand price trends, and make better trading decisions. Be concise and practical in simple English or Hindi. If asked anything outside agriculture prices, respond: "I\'m trained for MandiRates. For that, try Google or ChatGPT!"'
type Msg = { role: string; content: string }

async function openai(url: string, key: string | undefined, model: string, msgs: Msg[]) {
  if (!key) throw new Error('no key')
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages: msgs, max_tokens: 400 }),
  })
  if (!r.ok) throw new Error(`${model} ${r.status}`)
  const t = (await r.json()).choices?.[0]?.message?.content
  if (!t) throw new Error('empty')
  return t as string
}

export async function POST(req: NextRequest) {
  const limited = AI_LIMITER.check(req); if (limited) return limited
  try {
    const { messages = [], system } = await req.json()
    const msgs: Msg[] = [{ role: 'system', content: system ?? SYS }, ...messages]
    const tiers: Array<() => Promise<string>> = [
      () => openai('https://api.groq.com/openai/v1/chat/completions', process.env.GROQ_API_KEY, 'llama-3.3-70b-versatile', msgs),
      () => openai('https://api.groq.com/openai/v1/chat/completions', process.env.GROQ_API_KEY, 'llama-3.1-8b-instant', msgs),
      () => openai('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', process.env.GEMINI_API_KEY, 'gemini-2.0-flash', msgs),
      () => openai('https://api.cerebras.ai/v1/chat/completions', process.env.CEREBRAS_API_KEY, 'llama3.1-8b', msgs),
    ]
    for (const t of tiers) {
      try { return NextResponse.json({ text: await t() }) }
      catch (e) { console.warn(JSON.stringify({ level: 'warn', scope: 'mandirates.chat', msg: String(e) })) }
    }
  } catch {}
  return NextResponse.json({ text: "I'm having trouble right now — please try again in a moment." })
}
