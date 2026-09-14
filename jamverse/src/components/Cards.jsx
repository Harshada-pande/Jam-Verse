import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Users, Heart, MessageSquare, Bookmark, Trophy } from "lucide-react";
import { Badge, Button } from "./UI";
import { useApp } from "../context/AppContext";
import { artists } from "../data/mockData";

const genreTone = {
  Indie: "electric", Acoustic: "coral", Pop: "magenta", Rock: "violet",
  Jazz: "cyan", Classical: "sun", Folk: "lime", Fusion: "violet", Bollywood: "magenta",
};

export function EventCard({ event }) {
  const navigate = useNavigate();
  const { rsvpedEvents, savedEvents, toggleRsvp, toggleSaveEvent } = useApp();
  const isRsvped = rsvpedEvents.includes(event.id);
  const isSaved = savedEvents.includes(event.id);

  return (
    <div className="chunky-card bg-white p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Badge tone={genreTone[event.genre] || "electric"}>{event.type}</Badge>
        <button
          onClick={() => toggleSaveEvent(event.id, event.name)}
          aria-label={isSaved ? "Unsave event" : "Save event"}
          className="focus-ring p-1.5 rounded-full hover:bg-lavender"
        >
          <Bookmark size={18} fill={isSaved ? "#4A3AFF" : "none"} color={isSaved ? "#4A3AFF" : "#1A1533"} />
        </button>
      </div>

      <button onClick={() => navigate(`/events/${event.id}`)} className="focus-ring text-left">
        <h3 className="font-display text-lg font-extrabold leading-tight">{event.name}</h3>
      </button>

      <div className="text-sm text-ink/70 space-y-1.5">
        <div className="flex items-center gap-2"><Calendar size={15} /> {event.date} <Clock size={15} className="ml-2" /> {event.time}</div>
        <div className="flex items-center gap-2"><MapPin size={15} /> {event.venue} · {event.distance}</div>
        <div className="flex items-center gap-2"><Users size={15} /> {event.going}/{event.capacity} going</div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="font-bold text-sm">{event.fee}</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/events/${event.id}`)}>Details</Button>
          <Button size="sm" variant={isRsvped ? "secondary" : "primary"} onClick={() => toggleRsvp(event.id, event.name)}>
            {isRsvped ? "Going ✓" : "RSVP"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ArtistCard({ artist }) {
  const navigate = useNavigate();
  const { followedArtists, toggleFollow } = useApp();
  const isFollowing = followedArtists.includes(artist.id);
  return (
    <div className="chunky-card bg-white p-5 flex flex-col items-center text-center gap-2">
      <button onClick={() => navigate(`/musicians/${artist.id}`)} className="focus-ring">
        <div className="w-16 h-16 rounded-full bg-lavender border-2 border-ink grid place-items-center text-3xl">
          {artist.avatar}
        </div>
      </button>
      <button onClick={() => navigate(`/musicians/${artist.id}`)} className="focus-ring">
        <h4 className="font-display font-bold">{artist.name}</h4>
      </button>
      <p className="text-xs text-ink/60">{artist.instrument} · {artist.city}</p>
      <div className="flex gap-1 flex-wrap justify-center">
        {artist.genres.slice(0, 2).map((g) => (
          <Badge key={g} tone={genreTone[g] || "electric"}>{g}</Badge>
        ))}
      </div>
      <Button size="sm" variant={isFollowing ? "secondary" : "primary"} className="mt-1 w-full" onClick={() => toggleFollow(artist.id, artist.name)}>
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
}

export function PlaylistCard({ playlist }) {
  return (
    <div className="chunky-card bg-white p-5 flex flex-col gap-2">
      <div className="w-full aspect-square rounded-2xl bg-skyfog border-2 border-ink grid place-items-center text-5xl">
        {playlist.cover}
      </div>
      <h4 className="font-display font-bold">{playlist.title}</h4>
      <p className="text-xs text-ink/60">By {playlist.curator} · {playlist.tracks} tracks</p>
      <Button size="sm" variant="outline">Open Playlist</Button>
    </div>
  );
}

export function CommunityCard({ community }) {
  const { joinedCommunities, toggleJoinCommunity } = useApp();
  const isJoined = joinedCommunities.includes(community.id);
  return (
    <div className="chunky-card bg-white p-5 flex flex-col gap-2">
      <Badge tone="violet">{community.genre}</Badge>
      <h4 className="font-display font-bold text-lg">{community.name}</h4>
      <p className="text-sm text-ink/70">{community.description}</p>
      <p className="text-xs text-ink/50">{community.members.toLocaleString()} members</p>
      <Button size="sm" variant={isJoined ? "secondary" : "primary"} onClick={() => toggleJoinCommunity(community.id, community.name)}>
        {isJoined ? "Joined ✓" : "Join Community"}
      </Button>
    </div>
  );
}

export function PerformanceCard({ performance }) {
  const { toggleLike, likedPerformances, performanceLikeCounts, addComment, performanceComments } = useApp();
  const artist = artists.find((a) => a.id === performance.artistId);
  const isLiked = likedPerformances.includes(performance.id);
  const likeCount = performanceLikeCounts[performance.id] ?? performance.likes;
  const comments = performanceComments[performance.id] || [];
  const commentCount = performance.comments + comments.length;

  return (
    <div className="chunky-card bg-white p-5 flex flex-col gap-3">
      <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-lavender to-blush border-2 border-ink grid place-items-center text-4xl">
        🎵
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl">{artist?.avatar}</span>
        <div>
          <p className="font-bold text-sm leading-tight">{artist?.name || "You"}</p>
          <p className="text-xs text-ink/50">{performance.duration} · {performance.type}</p>
        </div>
      </div>
      <h4 className="font-display font-bold">{performance.title}</h4>
      <div className="flex items-center gap-4">
        <button onClick={() => toggleLike(performance.id)} className="focus-ring flex items-center gap-1.5 text-sm font-semibold">
          <Heart size={18} fill={isLiked ? "#FF3D8A" : "none"} color={isLiked ? "#FF3D8A" : "#1A1533"} />
          {likeCount}
        </button>
        <span className="flex items-center gap-1.5 text-sm text-ink/60">
          <MessageSquare size={17} /> {commentCount}
        </span>
      </div>
      <CommentBox performanceId={performance.id} onAdd={addComment} comments={comments} />
    </div>
  );
}

function CommentBox({ performanceId, onAdd, comments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const val = e.target.elements.comment.value.trim();
    if (!val) return;
    onAdd(performanceId, val);
    e.target.reset();
  };
  return (
    <div className="border-t border-ink/10 pt-2">
      {comments.slice(-2).map((c, i) => (
        <p key={i} className="text-xs text-ink/70 mb-1"><span className="font-bold">{c.author}:</span> {c.text}</p>
      ))}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          name="comment"
          aria-label="Add a comment"
          placeholder="Add a comment…"
          className="focus-ring flex-1 text-sm px-3 py-2 rounded-full border-2 border-ink/20 bg-lavender/30"
        />
        <Button size="sm" variant="outline" type="submit">Post</Button>
      </form>
    </div>
  );
}

export function LeaderboardCard({ entry }) {
  const navigate = useNavigate();
  const artist = artists.find((a) => a.id === entry.artistId);
  const isTop = entry.rank === 1;
  return (
    <button
      onClick={() => navigate(`/musicians/${artist.id}`)}
      className={`focus-ring w-full text-left chunky-card p-5 flex items-center gap-4 ${isTop ? "bg-sun/20" : "bg-white"}`}
    >
      <span className="font-display text-2xl font-black text-ink/40 w-10">{String(entry.rank).padStart(2, "0")}</span>
      <div className="w-14 h-14 rounded-full bg-lavender border-2 border-ink grid place-items-center text-2xl">
        {artist?.avatar}
      </div>
      <div className="flex-1">
        <p className="font-display font-bold">{artist?.name}</p>
        <p className="text-xs text-ink/60">{artist?.genres.join(" • ")} · {artist?.instrument}</p>
        <div className="flex items-center gap-1 mt-1">
          {isTop && <Trophy size={14} className="text-sun" />}
          <span className="text-xs font-bold text-magenta">{entry.title}</span>
        </div>
      </div>
      <span className="font-display font-extrabold text-electric">{entry.points.toLocaleString()}</span>
    </button>
  );
}

export function MusicianWantedCard({ post }) {
  const poster = artists.find((a) => a.id === post.postedBy);
  return (
    <div className="chunky-card bg-blush p-5 flex flex-col gap-2">
      <Badge tone="magenta">Musician Wanted</Badge>
      <h4 className="font-display font-extrabold text-lg">{post.title}</h4>
      <p className="text-sm text-ink/70">{post.description}</p>
      <div className="text-xs text-ink/60 space-y-1">
        <p>{post.genre} · {post.when} · {post.location}</p>
        <p>Posted by {poster?.name}</p>
      </div>
      <Button size="sm" variant="magenta">Respond</Button>
    </div>
  );
}
