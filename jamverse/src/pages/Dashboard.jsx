import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { playlists, artists } from "../data/mockData";
import { SectionHeading, Button, EmptyState, Badge } from "../components/UI";
import { EventCard, PlaylistCard, ArtistCard } from "../components/Cards";
import { CalendarDays, Sparkles } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, allEvents, rsvpedEvents, savedEvents, followedArtists, notifications } = useApp();

  const upcoming = allEvents.filter((e) => rsvpedEvents.includes(e.id));
  const saved = allEvents.filter((e) => savedEvents.includes(e.id));
  const favArtists = artists.filter((a) => followedArtists.includes(a.id));

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 space-y-10">
      <div className="chunky-card bg-gradient-to-br from-electric to-violet text-white p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-80">Welcome back</p>
          <h1 className="font-display text-3xl font-extrabold mt-1">Hey {currentUser.name.split(" ")[0]} 👋</h1>
          <p className="opacity-90 mt-1">{upcoming.length} upcoming session{upcoming.length !== 1 && "s"} · {notifications.length} new notifications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate("/host-jam")}>Host a Jam</Button>
          <Button variant="coral" onClick={() => navigate("/discover")}>Discover Events</Button>
        </div>
      </div>

      <section>
        <SectionHeading
          eyebrow="Your Calendar"
          title="Upcoming Jam Sessions & Events"
          action={<Button size="sm" variant="outline" onClick={() => navigate("/discover")}>Find more</Button>}
        />
        {upcoming.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <EmptyState
            icon={CalendarDays}
            title="Nothing on your calendar yet"
            subtitle="RSVP to a jam session, open mic, or concert to see it here."
            action={<Button size="sm" variant="primary" className="mt-2" onClick={() => navigate("/discover")}>Browse Events</Button>}
          />
        )}
      </section>

      {saved.length > 0 && (
        <section>
          <SectionHeading eyebrow="For Later" title="Saved Events" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {saved.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </section>
      )}

      <section>
        <SectionHeading eyebrow="Keep Discovering" title="Playlists For You" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {playlists.slice(0, 4).map((p) => <PlaylistCard key={p.id} playlist={p} />)}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Your Circle"
          title="Favourite Local Artists"
          action={<Button size="sm" variant="outline" onClick={() => navigate("/community")}>Find musicians</Button>}
        />
        {favArtists.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {favArtists.map((a) => <ArtistCard key={a.id} artist={a} />)}
          </div>
        ) : (
          <EmptyState
            icon={Sparkles}
            title="You're not following anyone yet"
            subtitle="Follow local musicians to build your circle and see their performances here."
          />
        )}
      </section>
    </div>
  );
}
