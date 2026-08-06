import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, CheckCheck } from 'lucide-react';
import { askGroq, type GroqChatMessage } from '../lib/groq';

type ChatMessage = {
  id: number;
  role: 'bot' | 'user';
  text: string;
  time: string;
};

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

const WELCOME: ChatMessage = {
  id: 0,
  role: 'bot',
  text: "Hey! I'm Ryan 👋 Ask me about my skills, projects, or how to reach me — in any language.",
  time: nowTime(),
};

const QUICK_REPLIES = ['Who are you?', 'Your skills', 'Your projects', 'Kumusta?'];

function toGroqHistory(msgs: ChatMessage[]): GroqChatMessage[] {
  return msgs
    .filter((m) => m.id !== 0)
    .map((m) => ({
      role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.text,
    }));
}

export function RazorAIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const sendText = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    const userMsg: ChatMessage = {
      id: idRef.current++,
      role: 'user',
      text,
      time: nowTime(),
    };

    let historySnapshot: ChatMessage[] = [];
    setMessages((prev) => {
      historySnapshot = prev;
      return [...prev, userMsg];
    });
    setInput('');
    setTyping(true);

    let replyText: string;
    try {
      replyText = await askGroq(toGroqHistory(historySnapshot), text);
    } catch {
      replyText =
        "Sorry — something went wrong on my end. Try again in a moment, or reach me through the Contact section.";
    }

    setMessages((prev) => [
      ...prev,
      {
        id: idRef.current++,
        role: 'bot',
        text: replyText,
        time: nowTime(),
      },
    ]);
    setTyping(false);
  };

  const send = () => sendText(input);

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="w-[min(calc(100vw-2rem),390px)] h-[min(72dvh,560px)] max-h-[calc(100dvh-5.5rem-env(safe-area-inset-bottom))] rounded-[1.75rem] overflow-hidden flex flex-col border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.65)] bg-[#0e0a18]">
            {/* Messenger-style header */}
            <div className="relative z-10 flex items-center gap-3 px-3.5 py-3 bg-[#15101f]/95 backdrop-blur-xl border-b border-white/8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-11 h-11 rounded-full text-gray-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors shrink-0 lg:hidden">
                <X size={18} />
              </button>

              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-purple-500/40 shadow-[0_0_16px_rgba(139,92,246,0.35)]">
                  <img
                    src="/razor.png"
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#15101f]" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-white text-[15px] leading-tight truncate">
                  RazorAI
                </h3>
                <p className="text-[11px] text-emerald-400/90 truncate">Active now</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="hidden lg:flex w-9 h-9 rounded-full text-gray-400 hover:text-white hover:bg-white/5 items-center justify-center transition-colors shrink-0">
                <X size={18} />
              </button>
            </div>

            {/* Chat wallpaper + messages */}
            <div
              ref={listRef}
              className="relative flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-hide"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse at 20% 0%, rgba(139,92,246,0.12), transparent 50%),
                  radial-gradient(ellipse at 80% 100%, rgba(88,28,135,0.1), transparent 45%),
                  linear-gradient(180deg, #0a0712 0%, #0e0a18 100%)
                `,
              }}>
              {/* Date chip */}
              <div className="flex justify-center mb-4">
                <span className="text-[10px] font-medium tracking-wide uppercase text-gray-500 bg-black/35 border border-white/8 px-3 py-1 rounded-full backdrop-blur-sm">
                  Today
                </span>
              </div>

              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                const prev = messages[index - 1];
                const showAvatar = !isUser && prev?.role !== 'bot';
                const stacked = prev?.role === msg.role;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'} ${
                      stacked ? 'mt-0.5' : 'mt-3'
                    }`}>
                    {/* Bot avatar gutter */}
                    {!isUser && (
                      <div className="w-7 shrink-0 mb-0.5">
                        {showAvatar ? (
                          <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10">
                            <img
                              src="/razor.png"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : null}
                      </div>
                    )}

                    <div
                      className={`group relative max-w-[78%] px-3.5 py-2 text-[13.5px] leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-gradient-to-br from-purple-600 to-violet-600 text-white rounded-[18px] rounded-br-[6px]'
                          : 'bg-[#1c1628] text-gray-100 border border-white/8 rounded-[18px] rounded-bl-[6px]'
                      }`}>
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      <div
                        className={`flex items-center gap-1 mt-1 ${
                          isUser ? 'justify-end text-white/55' : 'justify-end text-gray-500'
                        }`}>
                        <span className="text-[10px] tabular-nums">{msg.time}</span>
                        {isUser && <CheckCheck size={12} className="text-purple-200/80" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {typing && (
                <div className="flex items-end gap-2 mt-3">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <img src="/razor.png" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-[#1c1628] border border-white/8 rounded-[18px] rounded-bl-[6px] px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {/* Quick replies — only when conversation is short */}
              {messages.length <= 2 && !typing && (
                <div className="flex flex-wrap gap-2 pt-4 pl-9">
                  {QUICK_REPLIES.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => sendText(label)}
                      className="text-xs px-3.5 py-2.5 min-h-[36px] rounded-full border border-purple-500/35 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/50 transition-colors">
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* iMessage-style composer */}
            <div className="relative z-10 px-3 py-3 bg-[#15101f]/95 backdrop-blur-xl border-t border-white/8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-end gap-2">
                <div className="flex-1 flex items-center min-h-[44px] rounded-[22px] bg-[#1c1628] border border-white/10 focus-within:border-purple-500/45 transition-colors px-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message…"
                    className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.35)] disabled:opacity-35 disabled:shadow-none disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all">
                  <Send size={18} className="translate-x-px" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher bubble */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close RazorAI chat' : 'Open RazorAI chat'}
        aria-expanded={open}
        className="relative w-14 h-14 rounded-full overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.45)] flex items-center justify-center border border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-shadow">
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-violet-600 text-white">
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0">
              <img
                src="/razor.png"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#050505] z-10" />
        )}
      </motion.button>
    </div>
  );
}
