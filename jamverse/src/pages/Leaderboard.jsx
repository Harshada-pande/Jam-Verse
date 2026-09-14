import { leaderboard, artists } from "../data/mockData";
import { LeaderboardCard } from "../components/Cards";
import { Badge } from "../components/UI";
import { Trophy } from "lucide-react";

export default function Leaderboard() {
  const top = leaderboard[0];
  const topArtist = artists.find((a) => a.id === top.artistId);

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 space-y-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">Recognition</p>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold">Performer Leaderboard</h1>
        <p className="text-ink/60 mt-2 max-w-md mx-auto">Celebrating the musicians moving our community this week — through performances, engagement, and jam turnout.</p>
      </div>

      <div className="chunky-card bg-gradient-to-br from-sun/40 to-blush p-8 flex flex-col items-center text-center gap-3">
        <Trophy size={40} className="text-sun" />
        <Badge tone="sun">Performer of the Week</Badge>
        <div className="w-20 h-20 rounded-full bg-white border-2 border-ink grid place-items-center text-4xl">
          {topArtist?.avatar}
        </div>
        <h2 className="font-display text-2xl font-extrabold">{topArtist?.name}</h2>
        <p className="text-ink/70">{topArtist?.genres.join(" • ")} · {topArtist?.instrument}</p>
        <p className="text-sm text-ink/60 max-w-sm">{topArtist?.bio}</p>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry) => <LeaderboardCard key={entry.rank} entry={entry} />)}
      </div>
    </div>
  );
}
