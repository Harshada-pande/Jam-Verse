import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Button, Badge, SectionHeading } from "../components/UI";
import AccessibilityPanel from "../components/AccessibilityPanel";
import { artists } from "../data/mockData";

const tabs = ["Profile", "My Activity", "Accessibility"];

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout, followedArtists, rsvpedEvents, uploadedPerformances } = useApp();
  const [tab, setTab] = useState("Profile");

  const following = artists.filter((a) => followedArtists.includes(a.id));

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 space-y-6">
      <div className="chunky-card bg-white p-7 flex flex-col md:flex-row md:items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-lavender border-2 border-ink grid place-items-center text-4xl">
          {currentUser.avatar}
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-extrabold">{currentUser.name}</h1>
          <p className="text-ink/60 text-sm">{currentUser.handle} · {currentUser.city}</p>
          <p className="text-ink/70 text-sm mt-1">{currentUser.bio}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge tone="electric">{currentUser.instrument}</Badge>
            {currentUser.genres.map((g) => <Badge key={g} tone="coral">{g}</Badge>)}
          </div>
        </div>
        <Button variant="outline" onClick={() => { logout(); navigate("/"); }}>Log Out</Button>
      </div>

      <div className="flex bg-lavender/60 rounded-full p-1 max-w-md">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`focus-ring flex-1 py-2 rounded-full text-sm font-bold transition-colors ${
              tab === t ? "bg-electric text-white" : "text-ink/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Profile" && (
        <div className="chunky-card bg-white p-6 space-y-2">
          <p className="text-sm text-ink/70"><b>Skill Level:</b> {currentUser.skillLevel}</p>
          <p className="text-sm text-ink/70"><b>Followed Artists:</b> {following.length}</p>
          <p className="text-sm text-ink/70"><b>Events RSVPed:</b> {rsvpedEvents.length}</p>
          <p className="text-sm text-ink/70"><b>Performances Uploaded:</b> {uploadedPerformances.length}</p>
          <Button variant="ghost" className="mt-2" onClick={() => navigate("/creator-space")}>Go to Creator Space</Button>
        </div>
      )}

      {tab === "My Activity" && (
        <div className="space-y-6">
          <section>
            <SectionHeading title="Following" />
            {following.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {following.map((a) => (
                  <button key={a.id} onClick={() => navigate(`/musicians/${a.id}`)} className="focus-ring chunky-card bg-white p-4 flex items-center gap-3 text-left">
                    <span className="text-2xl">{a.avatar}</span>
                    <span className="font-bold text-sm">{a.name}</span>
                  </button>
                ))}
              </div>
            ) : <p className="text-ink/60 text-sm">You're not following any musicians yet.</p>}
          </section>
        </div>
      )}

      {tab === "Accessibility" && <AccessibilityPanel />}
    </div>
  );
}
