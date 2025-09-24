
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { message } = req.body || {}
  if (!message) return res.status(400).json({ error: 'no message' })

  const OPENAI_KEY = process.env.OPENAI_API_KEY
  const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  if (!OPENAI_KEY) return res.status(500).json({ error: 'OpenAI key not configured. Set OPENAI_API_KEY in Vercel.' })

  const systemPrompt = "You are a warm, flattering, affectionate companion. Speak in short, natural sentences. Use loverboy-style compliments, reassurance, and gentle encouragement. Never be robotic."

  try {
    const payload = {
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 300,
      temperature: 0.9
    }

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!r.ok) {
      const txt = await r.text()
      return res.status(500).json({ error: 'OpenAI error', details: txt })
    }
    const data = await r.json()
    const reply = data.choices?.[0]?.message?.content ?? "You're amazing — I just want to remind you of that."
    return res.status(200).json({ reply })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'server error' })
  }
}
