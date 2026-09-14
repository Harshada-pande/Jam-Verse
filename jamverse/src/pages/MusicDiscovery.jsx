import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { moods, genres, playlists, artists } from "../data/mockData";
import { SectionHeading, Badge } from "../components/UI";
import { PlaylistCard, ArtistCard } from "../components/Cards";
import { useApp } from "../context/AppContext";

export default function MusicDiscovery() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [activeGenre, setActiveGenre] = useState(null);
  const [activeMood, setActiveMood] = useState(null);

  const filteredPlaylists = activeMood
    ? playlists.filter((p) => p.mood === activeMood)
    : playlists;

  const filteredArtists = activeGenre
    ? artists.filter((a) => a.genres.includes(activeGenre))
    : artists;

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 space-y-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">Music Discovery</p>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold">What are you in the mood for?</h1>
      </div>

      <section>
        <SectionHeading title="Browse by Mood" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => { setActiveMood(activeMood === m.id ? null : m.id); showToast(`Showing ${m.label} playlists`, "info"); }}
              className={`focus-ring chunky-card ${m.color} p-6 text-left ${activeMood === m.id ? "ring-4 ring-electric" : ""}`}
            >
              <p className={`font-display font-extrabold text-lg ${m.accent}`}>{m.label}</p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title={activeMood ? `Playlists · ${moods.find((m) => m.id === activeMood)?.label}` : "Featured Playlists"} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filteredPlaylists.map((p) => <PlaylistCard key={p.id} playlist={p} />)}
        </div>
      </section>

      <section>
        <SectionHeading title="Browse by Genre" />
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(activeGenre === g ? null : g)}
              className="focus-ring"
            >
              <Badge tone={activeGenre === g ? "magenta" : "electric"}>{g}</Badge>
            </button>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          title={activeGenre ? `Artists in ${activeGenre}` : "Trending Local Artists"}
          subtitle="Explore an artist to see their events, performances, and profile."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filteredArtists.map((a) => <ArtistCard key={a.id} artist={a} />)}
        </div>
      </section>
    </div>
  );
}
