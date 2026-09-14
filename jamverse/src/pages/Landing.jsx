import { useNavigate } from "react-router-dom";
import { Music2, Users, MapPin, Mic2 } from "lucide-react";
import { Button } from "../components/UI";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender via-cream to-blush flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 py-6">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-2xl bg-electric text-white grid place-items-center font-display font-black text-lg border-2 border-ink shadow-chunky">J</span>
          <span className="font-display text-xl font-extrabold">JamVerse</span>
        </div>
        <Button size="sm" variant="secondary" onClick={() => navigate("/login")}>Log In</Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
        <span className="mb-4 inline-block px-4 py-1.5 rounded-full bg-white border-2 border-ink text-xs font-bold uppercase tracking-widest">
          Music Community & Live Jamming
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-black text-ink leading-[1.05] max-w-3xl">
          Discover music.
          <br />
          Find your <span className="text-electric">people</span>.
          <br />
          Jam <span className="text-magenta">together</span>.
        </h1>
        <p className="mt-5 text-ink/70 max-w-xl text-lg">
          JamVerse connects music discovery with real-world jam sessions, open mics, bands, and performers — so listening turns into playing, together.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button size="lg" variant="primary" onClick={() => navigate("/login")}>Enter JamVerse</Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/discover")}>Explore First</Button>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
          {[
            { icon: Music2, label: "Discover Music", color: "text-electric" },
            { icon: Users, label: "Meet Musicians", color: "text-magenta" },
            { icon: MapPin, label: "Find Local Jams", color: "text-coral" },
            { icon: Mic2, label: "Perform & Get Recognized", color: "text-violet" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="chunky-card bg-white p-5 flex flex-col items-center gap-2">
              <Icon size={26} className={color} />
              <p className="text-sm font-bold">{label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
