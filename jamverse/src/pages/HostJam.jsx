import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Button } from "../components/UI";
import { genres } from "../data/mockData";
import { PartyPopper } from "lucide-react";

const skillLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function HostJam() {
  const navigate = useNavigate();
  const { hostJam } = useApp();
  const [submitted, setSubmitted] = useState(null);
  const [form, setForm] = useState({
    name: "", genre: genres[0], date: "", time: "", venue: "", location: "",
    skillLevel: skillLevels[0], instrumentsNeeded: "", type: "Jam Session", description: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = hostJam({ ...form, fee: "Free entry", distance: "0 km" });
    setSubmitted(id);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-5 py-16 text-center space-y-5">
        <PartyPopper size={48} className="mx-auto text-magenta" />
        <h1 className="font-display text-3xl font-extrabold">Your jam is live!</h1>
        <p className="text-ink/70">{form.name} now appears in Event Discovery and on your Dashboard.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button variant="primary" onClick={() => navigate(`/events/${submitted}`)}>View Event</Button>
          <Button variant="outline" onClick={() => navigate("/discover")}>Back to Discovery</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-8">
      <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">Host a Jam</p>
      <h1 className="font-display text-3xl font-extrabold mb-6">Set up your session</h1>

      <form onSubmit={handleSubmit} className="chunky-card bg-white p-7 space-y-4">
        <Field label="Jam Title" value={form.name} onChange={update("name")} placeholder="e.g. Sunday Rooftop Jam" required />

        <div className="grid sm:grid-cols-2 gap-4">
          <SelectField label="Genre" value={form.genre} onChange={update("genre")} options={genres} />
          <SelectField label="Type" value={form.type} onChange={update("type")} options={["Jam Session", "Open Mic", "Workshop"]} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Date" type="date" value={form.date} onChange={update("date")} required />
          <Field label="Time" type="time" value={form.time} onChange={update("time")} required />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Venue" value={form.venue} onChange={update("venue")} placeholder="e.g. Terrace Studio" required />
          <Field label="Location / Area" value={form.location} onChange={update("location")} placeholder="e.g. Kothrud, Pune" required />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <SelectField label="Skill Level" value={form.skillLevel} onChange={update("skillLevel")} options={skillLevels} />
          <Field label="Instruments Needed" value={form.instrumentsNeeded} onChange={update("instrumentsNeeded")} placeholder="e.g. Bass, Drums" />
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-ink/80">Description</span>
          <textarea
            value={form.description}
            onChange={update("description")}
            rows={4}
            placeholder="What should people expect at your jam?"
            className="focus-ring mt-1 w-full px-4 py-3 rounded-2xl border-2 border-ink/20 bg-cream"
          />
        </label>

        <Button type="submit" variant="primary" className="w-full mt-2">Publish Jam Session</Button>
      </form>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink/80">{label}</span>
      <input {...rest} className="focus-ring mt-1 w-full px-4 py-3 rounded-2xl border-2 border-ink/20 bg-cream" />
    </label>
  );
}

function SelectField({ label, options, ...rest }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink/80">{label}</span>
      <select {...rest} className="focus-ring mt-1 w-full px-4 py-3 rounded-2xl border-2 border-ink/20 bg-cream">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
