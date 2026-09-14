import { useState } from "react";
import { useApp } from "../context/AppContext";
import { artists } from "../data/mockData";
import { Send, Users } from "lucide-react";

export default function Chat() {
  const { conversations, sendMessage, currentUser } = useApp();
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [draft, setDraft] = useState("");

  const active = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    sendMessage(active.id, draft.trim());
    setDraft("");
  };

  const getName = (conv) => conv.isGroup ? conv.groupName : artists.find((a) => a.id === conv.withArtistId)?.name;
  const getAvatar = (conv) => conv.isGroup ? "👥" : artists.find((a) => a.id === conv.withArtistId)?.avatar;

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">
      <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">Chat</p>
      <h1 className="font-display text-3xl font-extrabold mb-6">Messages</h1>

      <div className="chunky-card bg-white overflow-hidden grid md:grid-cols-[280px_1fr] h-[70vh]">
        <div className="border-r-2 border-ink/10 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`focus-ring w-full flex items-center gap-3 px-4 py-3 text-left border-b border-ink/5 ${
                active?.id === c.id ? "bg-lavender" : "hover:bg-lavender/40"
              }`}
            >
              <span className="w-10 h-10 rounded-full bg-blush border-2 border-ink grid place-items-center text-lg shrink-0">
                {getAvatar(c)}
              </span>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{getName(c)}</p>
                <p className="text-xs text-ink/50 truncate">{c.messages[c.messages.length - 1]?.text}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col">
          <div className="px-5 py-3 border-b-2 border-ink/10 flex items-center gap-2 font-bold">
            {active?.isGroup && <Users size={16} />}
            {active ? getName(active) : "Select a conversation"}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {active?.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.from === "me" ? "bg-electric text-white rounded-br-sm" : "bg-lavender text-ink rounded-bl-sm"
                }`}>
                  {m.name && <p className="text-xs font-bold opacity-70 mb-0.5">{m.name}</p>}
                  {m.text}
                  <p className={`text-[10px] mt-1 ${m.from === "me" ? "text-white/70" : "text-ink/40"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t-2 border-ink/10 flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              aria-label="Message"
              className="focus-ring flex-1 px-4 py-3 rounded-full border-2 border-ink/20 bg-cream"
            />
            <button type="submit" aria-label="Send" className="focus-ring btn-press bg-electric text-white p-3 rounded-full border-2 border-ink shadow-chunky">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
