import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mapLocations, events } from "../data/mockData";
import { MapPin, X } from "lucide-react";
import { Button, Badge } from "../components/UI";

const locationTypes = ["All", "Café", "Venue", "Jam Venue", "Open Air", "Studio"];
const markerColor = {
  "Café": "bg-coral", "Venue": "bg-magenta", "Jam Venue": "bg-electric",
  "Open Air": "bg-lime", "Studio": "bg-violet",
};

export default function MapPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? mapLocations : mapLocations.filter((l) => l.type === filter);
  const selectedEvent = selected ? events.find((e) => e.id === selected.eventId) : null;

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">Interactive Map</p>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold">Find jams, cafés & venues nearby</h1>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {locationTypes.map((t) => (
          <button key={t} onClick={() => setFilter(t)} className="focus-ring">
            <Badge tone={filter === t ? "magenta" : "electric"}>{t}</Badge>
          </button>
        ))}
      </div>

      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] chunky-card bg-lavender overflow-hidden">
        {/* simulated map background */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, #C9C3F5 0, transparent 35%), radial-gradient(circle at 70% 60%, #FFD6E8 0, transparent 35%), radial-gradient(circle at 85% 20%, #B8F0FF 0, transparent 30%)",
        }} />
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <line x1="0" y1="50%" x2="100%" y2="55%" stroke="#1A1533" strokeWidth="3" />
          <line x1="30%" y1="0" x2="40%" y2="100%" stroke="#1A1533" strokeWidth="3" />
        </svg>

        {visible.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc)}
            aria-label={loc.name}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            className="focus-ring absolute -translate-x-1/2 -translate-y-full group"
          >
            <MapPin
              size={34}
              className={`${markerColor[loc.type] || "bg-electric"} text-ink drop-shadow-md`}
              fill="currentColor"
              color="#1A1533"
            />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 -top-8 bg-ink text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap">
              {loc.name}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="chunky-card bg-white p-5 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Badge tone="electric">{selected.type}</Badge>
            <h3 className="font-display text-lg font-extrabold mt-2">{selected.name}</h3>
            {selectedEvent && (
              <p className="text-sm text-ink/70 mt-1">{selectedEvent.name} · {selectedEvent.date} at {selectedEvent.time}</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            {selectedEvent && (
              <Button size="sm" variant="primary" onClick={() => navigate(`/events/${selectedEvent.id}`)}>Open Details</Button>
            )}
            <button aria-label="Close" onClick={() => setSelected(null)} className="focus-ring p-2 rounded-full hover:bg-lavender">
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
