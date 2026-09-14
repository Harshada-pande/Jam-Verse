import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Bell, Calendar, MessageCircle, Trophy, Heart, Compass } from "lucide-react";

const iconFor = { event: Calendar, chat: MessageCircle, recognition: Trophy, like: Heart, discovery: Compass };

export default function Notifications() {
  const { notifications, markNotificationsRead } = useApp();
  useEffect(() => { markNotificationsRead(); }, [markNotificationsRead]);

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Bell size={22} className="text-electric" />
        <h1 className="font-display text-3xl font-extrabold">Notifications</h1>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = iconFor[n.type] || Bell;
          return (
            <div key={n.id} className="chunky-card bg-white p-4 flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-lavender grid place-items-center shrink-0">
                <Icon size={18} className="text-electric" />
              </span>
              <div>
                <p className="text-sm font-medium">{n.text}</p>
                <p className="text-xs text-ink/50 mt-0.5">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
