import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { artists, performances } from "../data/mockData";
import { Badge, Button } from "../components/UI";
import { PerformanceCard } from "../components/Cards";
import { ArrowLeft, MapPin } from "lucide-react";

export default function MusicianProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { followedArtists, toggleFollow } = useApp();
  const artist = artists.find((a) => a.id === id);

  if (!artist) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-16 text-center">
        <p className="font-bold">Musician not found.</p>
        <Button className="mt-4" onClick={() => navigate("/community")}>Back to Community</Button>
      </div>
    );
  }

  const isFollowing = followedArtists.includes(artist.id);
  const artistPerformances = performances.filter((p) => p.artistId === artist.id);

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 space-y-6">
      <button onClick={() => navigate(-1)} className="focus-ring flex items-center gap-1 text-sm font-semibold text-ink/60 hover:text-ink">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="chunky-card bg-white p-7 space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-lavender border-2 border-ink grid place-items-center text-4xl">
              {artist.avatar}
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold">{artist.name}</h1>
              <p className="text-ink/60 text-sm">{artist.handle}</p>
              <p className="flex items-center gap-1 text-sm text-ink/60 mt-1"><MapPin size={14} /> {artist.city}</p>
            </div>
          </div>
          <Button variant={isFollowing ? "secondary" : "primary"} onClick={() => toggleFollow(artist.id, artist.name)}>
            {isFollowing ? "Following ✓" : "Follow"}
          </Button>
        </div>

        <p className="text-ink/70">{artist.bio}</p>

        <div className="flex flex-wrap gap-2">
          <Badge tone="electric">{artist.instrument}</Badge>
          <Badge tone="violet">{artist.skillLevel}</Badge>
          {artist.genres.map((g) => <Badge key={g} tone="coral">{g}</Badge>)}
          {artist.badge && <Badge tone="sun">🏆 {artist.badge}</Badge>}
        </div>

        <div className="flex gap-6 pt-2 text-sm">
          <span><b className="font-display">{artist.followers.toLocaleString()}</b> Followers</span>
          <span><b className="font-display">{artist.performances}</b> Performances</span>
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold text-lg mb-3">Portfolio</h3>
        {artistPerformances.length ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {artistPerformances.map((p) => <PerformanceCard key={p.id} performance={p} />)}
          </div>
        ) : (
          <p className="text-ink/60 text-sm">No performances uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
