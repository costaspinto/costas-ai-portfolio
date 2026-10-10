'use client';

import { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi, I’m Costas’s AI portfolio assistant. Ask me about my projects, skills, education, or the work I enjoy building.' },
  ]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Chat request failed.');
      setMessages([...next, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setMessages([...next, { role: 'assistant', content: err instanceof Error ? err.message : 'I could not respond right now. Please try again.' }]);
    } finally { setBusy(false); }
  }

  return <>
    {open && <section className="fixed bottom-24 right-4 z-50 flex h-[min(620px,75vh)] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-2xl">
      <header className="flex items-center justify-between bg-ink p-4 text-white"><div className="flex items-center gap-3"><div className="rounded-xl bg-white/10 p-2"><Bot size={20}/></div><div><p className="font-semibold">Ask Costas AI</p><p className="text-xs text-emerald-100">Portfolio assistant</p></div></div><button onClick={() => setOpen(false)} aria-label="Close chat"><X size={20}/></button></header>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">{messages.map((m, i) => <div key={i} className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2.5 text-sm leading-6 ${m.role === 'user' ? 'ml-auto bg-forest text-white' : 'bg-slate-100 text-ink'}`}>{m.content}</div>)}{busy && <p className="text-xs text-slate-500">Thinking…</p>}</div>
      <form onSubmit={sendMessage} className="flex gap-2 border-t p-3"><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about my work…" className="min-w-0 flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:border-forest" maxLength={1000}/><button disabled={busy || !input.trim()} className="rounded-xl bg-forest px-3 text-white disabled:opacity-50" aria-label="Send message"><Send size={18}/></button></form>
    </section>}
    <button onClick={() => setOpen(!open)} className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-forest px-5 py-4 font-semibold text-white shadow-xl transition hover:-translate-y-1" aria-label="Open Ask Costas AI"><Bot size={20}/><span>Ask Costas AI</span></button>
  </>;
}
