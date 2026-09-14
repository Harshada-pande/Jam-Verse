import { useState } from "react";
import { communities, artists, musicianWanted } from "../data/mockData";
import { SectionHeading, Badge } from "../components/UI";
import { CommunityCard, ArtistCard, MusicianWantedCard } from "../components/Cards";
import { Search } from "lucide-react";

const instruments = ["All", "Vocalist", "Guitarist", "Keyboardist", "Drummer", "Bassist", "Violinist"];

export default function CommunityFeed() {
  const [query, setQuery] = useState("");
  const [instrument, setInstrument] = useState("All");

  const filteredArtists = artists.filter((a) => {
    const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase()) || a.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()));
    const matchesInstrument = instrument === "All" || a.instrument === instrument;
    return matchesQuery && matchesInstrument;
  });

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 space-y-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">Community</p>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold">Meet musicians, join circles, form bands</h1>
      </div>

      <section>
        <SectionHeading title="Communities" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {communities.map((c) => <CommunityCard key={c.id} community={c} />)}
        </div>
      </section>

      <section>
        <SectionHeading title="Find Musicians" subtitle="Search by name or genre, filter by instrument." />
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <label className="relative flex-1">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search musicians or genres…"
              aria-label="Search musicians"
              className="focus-ring w-full pl-11 pr-4 py-3 rounded-full border-2 border-ink/20 bg-white"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {instruments.map((i) => (
            <button key={i} onClick={() => setInstrument(i)} className="focus-ring">
              <Badge tone={instrument === i ? "magenta" : "electric"}>{i}</Badge>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {filteredArtists.map((a) => <ArtistCard key={a.id} artist={a} />)}
        </div>
        {filteredArtists.length === 0 && <p className="text-ink/60 text-sm">No musicians match that search.</p>}
      </section>

      <section>
        <SectionHeading eyebrow="Band Formation" title="Musician Wanted" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {musicianWanted.map((p) => <MusicianWantedCard key={p.id} post={p} />)}
        </div>
      </section>
    </div>
  );
}
