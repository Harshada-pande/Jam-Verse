import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Button, Modal, SectionHeading } from "../components/UI";
import { PerformanceCard } from "../components/Cards";
import { UploadCloud, Music } from "lucide-react";

export default function CreatorSpace() {
  const { uploadedPerformances, uploadPerformance, showToast } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Original", duration: "3:30" });
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadPerformance(form);
    setOpen(false);
    setForm({ title: "", type: "Original", duration: "3:30" });
    setFileName("");
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">Creator Space</p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold">Your performance portfolio</h1>
        </div>
        <Button variant="primary" onClick={() => setOpen(true)}>
          <UploadCloud size={18} /> Upload Performance
        </Button>
      </div>

      {uploadedPerformances.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {uploadedPerformances.map((p) => <PerformanceCard key={p.id} performance={p} />)}
        </div>
      ) : (
        <div className="chunky-card bg-white p-12 text-center flex flex-col items-center gap-3">
          <Music size={36} className="text-electric" />
          <h3 className="font-display text-lg font-bold">No performances yet</h3>
          <p className="text-ink/60 text-sm max-w-sm">Upload an original song, cover, or jam recording to build your portfolio and start earning recognition.</p>
          <Button variant="primary" className="mt-2" onClick={() => setOpen(true)}>Upload Your First Performance</Button>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Upload Performance">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-ink/80">Title</span>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Terrace Sessions Vol. 1"
              className="focus-ring mt-1 w-full px-4 py-3 rounded-2xl border-2 border-ink/20 bg-cream"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-semibold text-ink/80">Type</span>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="focus-ring mt-1 w-full px-4 py-3 rounded-2xl border-2 border-ink/20 bg-cream"
              >
                <option>Original</option>
                <option>Cover</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink/80">Duration</span>
              <input
                value={form.duration}
                onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                placeholder="3:30"
                className="focus-ring mt-1 w-full px-4 py-3 rounded-2xl border-2 border-ink/20 bg-cream"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-ink/80">Audio / Video File</span>
            <div className="mt-1 border-2 border-dashed border-ink/30 rounded-2xl p-6 text-center">
              <input type="file" accept="audio/*,video/*" onChange={handleFile} className="focus-ring" />
              {fileName && <p className="text-xs text-ink/60 mt-2">Selected: {fileName}</p>}
              <p className="text-xs text-ink/40 mt-1">This is a simulated upload — no file is actually transferred.</p>
            </div>
          </label>

          <Button type="submit" variant="primary" className="w-full">Publish to Creator Space</Button>
        </form>
      </Modal>
    </div>
  );
}
