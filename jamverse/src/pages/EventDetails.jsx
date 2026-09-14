import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { artists } from "../data/mockData";
import { Button, Badge } from "../components/UI";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allEvents, rsvpedEvents, savedEvents, toggleRsvp, toggleSaveEvent } = useApp();
  const event = allEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-16 text-center">
        <p className="font-bold">Event not found.</p>
        <Button className="mt-4" onClick={() => navigate("/discover")}>Back to Discovery</Button>
      </div>
    );
  }

  const isRsvped = rsvpedEvents.includes(event.id);
  const isSaved = savedEvents.includes(event.id);
  const performers = artists.filter((a) => (event.artists || []).includes(a.id));

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 space-y-6">
      <button onClick={() => navigate(-1)} className="focus-ring flex items-center gap-1 text-sm font-semibold text-ink/60 hover:text-ink">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="chunky-card bg-white p-7 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Badge tone="electric">{event.type}</Badge>
          <Badge tone="coral">{event.genre}</Badge>
        </div>

        <h1 className="font-display text-3xl font-extrabold">{event.name}</h1>
        <p className="text-ink/70">{event.description}</p>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <InfoRow icon={Calendar} label={event.date} />
          <InfoRow icon={Clock} label={event.time} />
          <InfoRow icon={MapPin} label={`${event.venue}, ${event.location}`} />
          <InfoRow icon={Users} label={`${event.going}/${event.capacity} going`} />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant={isRsvped ? "secondary" : "primary"} onClick={() => toggleRsvp(event.id, event.name)}>
            {isRsvped ? "You're Going ✓" : "RSVP / Join"}
          </Button>
          <Button variant="outline" onClick={() => toggleSaveEvent(event.id, event.name)}>
            {isSaved ? "Saved ✓" : "Save Event"}
          </Button>
          <Button variant="ghost" onClick={() => navigate("/map")}>View Location on Map</Button>
          <Button variant="ghost" onClick={() => navigate("/chat")}>Event Chat</Button>
        </div>
      </div>

      {performers.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-lg mb-3">Performers</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {performers.map((a) => (
              <button
                key={a.id}
                onClick={() => navigate(`/musicians/${a.id}`)}
                className="focus-ring chunky-card bg-white p-4 flex items-center gap-3 text-left"
              >
                <span className="text-2xl">{a.avatar}</span>
                <div>
                  <p className="font-bold">{a.name}</p>
                  <p className="text-xs text-ink/60">{a.instrument} · {a.genres.join(", ")}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-ink/80">
      <Icon size={16} className="text-electric shrink-0" />
      <span className="font-medium">{label}</span>
    </div>
  );
}
