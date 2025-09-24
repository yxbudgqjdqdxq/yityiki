
import { useState, useRef, useEffect } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([{ id: 'init', from: 'bot', text: "You're seen. You're cherished. 💌" }])
  const [input, setInput] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [messages])

  async function send() {
    if (!input.trim()) return
    const user = { id: Date.now(), from: 'user', text: input.trim() }
    setMessages(m => [...m, user])
    setInput('')
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now()+1, from: 'bot', text: "You matter. I'm proud of you." }])
    }, 600)
  }

  return (
    <main className="chat-page">
      <h2 className="page-title">Daily Affirmations</h2>
      <div className="chat-shell">
        <div className="messages" ref={ref}>
          {messages.map(m => (
            <div key={m.id} className={`bubble ${m.from==='user'?'me':'them'}`}><p>{m.text}</p></div>
          ))}
        </div>
        <div className="chat-controls">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask for a sweet line..." onKeyDown={e=>{if(e.key==='Enter') send()}} />
          <button onClick={send} className="send">Send</button>
        </div>
      </div>
    </main>
  )
}
