import { NavLink, useNavigate } from "react-router-dom";
import { Home, Compass, MapPin, Users, Trophy, Bell, User, Music2, MessageCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/map", label: "Map", icon: MapPin },
  { to: "/community", label: "Community", icon: Users },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export function Navbar() {
  const navigate = useNavigate();
  const { notifications, currentUser } = useApp();
  return (
    <header className="hidden md:flex sticky top-0 z-40 items-center justify-between px-8 py-3 bg-cream/90 backdrop-blur border-b-2 border-ink/10">
      <button onClick={() => navigate("/dashboard")} className="focus-ring flex items-center gap-2">
        <span className="w-10 h-10 rounded-2xl bg-electric text-white grid place-items-center font-display font-black text-lg border-2 border-ink shadow-chunky">
          J
        </span>
        <span className="font-display text-xl font-extrabold tracking-tight">JamVerse</span>
      </button>

      <nav className="flex items-center gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `focus-ring flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                isActive ? "bg-electric text-white" : "text-ink/70 hover:bg-lavender"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/chat")}
          aria-label="Chat"
          className="focus-ring p-2.5 rounded-full hover:bg-lavender relative"
        >
          <MessageCircle size={20} />
        </button>
        <button
          onClick={() => navigate("/notifications")}
          aria-label="Notifications"
          className="focus-ring p-2.5 rounded-full hover:bg-lavender relative"
        >
          <Bell size={20} />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-magenta rounded-full border-2 border-cream" />
          )}
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="focus-ring w-10 h-10 rounded-full bg-blush border-2 border-ink grid place-items-center text-lg"
          aria-label="Profile"
        >
          {currentUser.avatar}
        </button>
      </div>
    </header>
  );
}

const mobileItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: Music2 },
  { to: "/map", label: "Map", icon: MapPin },
  { to: "/leaderboard", label: "Top", icon: Trophy },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream border-t-2 border-ink/10 flex justify-around py-2 px-1"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      {mobileItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `focus-ring flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl min-w-[56px] ${
              isActive ? "text-electric" : "text-ink/50"
            }`
          }
        >
          <Icon size={22} />
          <span className="text-[11px] font-semibold">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
