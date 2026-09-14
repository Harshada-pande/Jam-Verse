import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { SectionHeading, Badge, Button } from "../components/UI";
import { EventCard, MusicianWantedCard } from "../components/Cards";
import { musicianWanted } from "../data/mockData";
import { Filter } from "lucide-react";

const eventTypes = ["All", "Jam Session", "Open Mic", "Concert", "Workshop"];

export default function EventDiscovery() {
  const navigate = useNavigate();
  const { allEvents } = useApp();
  const [type, setType] = useState("All");

  const filtered = type === "All" ? allEvents : allEvents.filter((e) => e.type === type);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 space-y-10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">Event Discovery</p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold">Jam sessions, open mics & more near you</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/map")}>View on Map</Button>
          <Button variant="primary" onClick={() => navigate("/host-jam")}>Host a Jam</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={16} className="text-ink/50" />
        {eventTypes.map((t) => (
          <button key={t} onClick={() => setType(t)} className="focus-ring">
            <Badge tone={type === t ? "magenta" : "electric"}>{t}</Badge>
          </button>
        ))}
      </div>

      <section>
        <SectionHeading title={`${filtered.length} Event${filtered.length !== 1 ? "s" : ""}`} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Band Formation" title="Musician Wanted" subtitle="Musicians looking to collaborate right now." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {musicianWanted.map((p) => <MusicianWantedCard key={p.id} post={p} />)}
        </div>
      </section>
    </div>
  );
}
