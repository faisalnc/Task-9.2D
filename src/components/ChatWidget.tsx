"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! How can I help you today?" },
  ]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function send() {
    if (!input.trim()) return;
    const newMsg: Msg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, newMsg]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages.concat(newMsg) }),
      });
      const data = await res.json();
      if (data?.content) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.content },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Sorry—no reply received." },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error—try again." },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!sending) send();
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg p-4 bg-primary text-primary-foreground hover:opacity-90 transition"
        aria-label="Toggle chat"
      >
        💬
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[360px] max-h-[70vh] flex flex-col rounded-xl shadow-2xl border border-border bg-card text-card-foreground transition-colors">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="font-semibold">Chat Assistant</div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollerRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm ${
                  m.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-2xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t border-border p-3">
            <div className="flex items-end gap-2">
              <textarea
                className="w-full border border-border rounded-lg p-2 text-sm resize-none bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
                placeholder="Type a message… (Enter to send)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={sending}
              />
              <button
                onClick={send}
                disabled={sending}
                className="shrink-0 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-50 transition"
              >
                {sending ? "…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
