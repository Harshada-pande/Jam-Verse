import { useApp } from "../context/AppContext";
import { Type, Contrast, Sparkles, Bell, Languages, Mic, Wifi } from "lucide-react";

const textSizes = [
  { id: "small", label: "Small" }, { id: "medium", label: "Medium" },
  { id: "large", label: "Large" }, { id: "xlarge", label: "Extra Large" },
];
const languages = [
  { id: "en", label: "English" }, { id: "hi", label: "हिंदी" }, { id: "mr", label: "मराठी" },
];

function ToggleRow({ icon: Icon, title, subtitle, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-ink/10 last:border-0">
      <div className="flex items-start gap-3">
        <Icon size={20} className="text-electric mt-0.5 shrink-0" />
        <div>
          <p className="font-bold text-sm">{title}</p>
          {subtitle && <p className="text-xs text-ink/60">{subtitle}</p>}
        </div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`focus-ring w-14 h-8 rounded-full border-2 border-ink shrink-0 relative transition-colors ${checked ? "bg-electric" : "bg-lavender"}`}
      >
        <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white border-2 border-ink transition-all ${checked ? "left-[26px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

export default function AccessibilityPanel() {
  const { accessibility, updateAccessibility, showToast } = useApp();

  const set = (patch, msg) => {
    updateAccessibility(patch);
    if (msg) showToast(msg, "info");
  };

  return (
    <div className="chunky-card bg-white p-6 space-y-6">
      <div>
        <p className="flex items-center gap-2 font-bold text-sm mb-3"><Type size={18} className="text-electric" /> Text Size</p>
        <div className="flex flex-wrap gap-2">
          {textSizes.map((t) => (
            <button
              key={t.id}
              onClick={() => set({ textSize: t.id }, `Text size set to ${t.label}`)}
              className={`focus-ring px-4 py-2 rounded-full border-2 font-semibold text-sm ${
                accessibility.textSize === t.id ? "bg-electric text-white border-ink" : "bg-cream border-ink/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="flex items-center gap-2 font-bold text-sm mb-3"><Languages size={18} className="text-electric" /> Language</p>
        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => set({ language: l.id }, `Language set to ${l.label}`)}
              className={`focus-ring px-4 py-2 rounded-full border-2 font-semibold text-sm ${
                accessibility.language === l.id ? "bg-electric text-white border-ink" : "bg-cream border-ink/20"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <ToggleRow
          icon={Contrast}
          title="High Contrast"
          subtitle="Increases contrast between text and background."
          checked={accessibility.highContrast}
          onChange={(v) => set({ highContrast: v }, `High contrast turned ${v ? "on" : "off"}`)}
        />
        <ToggleRow
          icon={Sparkles}
          title="Reduce Motion"
          subtitle="Minimizes animations and transitions."
          checked={accessibility.reduceMotion}
          onChange={(v) => set({ reduceMotion: v }, `Reduce motion turned ${v ? "on" : "off"}`)}
        />
        <ToggleRow
          icon={Bell}
          title="Visual Alerts"
          subtitle="Shows visual banners for sound-based alerts."
          checked={accessibility.visualAlerts}
          onChange={(v) => set({ visualAlerts: v }, `Visual alerts turned ${v ? "on" : "off"}`)}
        />
        <ToggleRow
          icon={Mic}
          title="Voice Assistance"
          subtitle="Enables spoken guidance for key actions."
          checked={accessibility.voiceAssistance}
          onChange={(v) => set({ voiceAssistance: v }, `Voice assistance turned ${v ? "on" : "off"}`)}
        />
        <ToggleRow
          icon={Wifi}
          title="Data Saver Mode"
          subtitle="Reduces heavy media for slower connections."
          checked={accessibility.dataSaver}
          onChange={(v) => set({ dataSaver: v }, `Data saver turned ${v ? "on" : "off"}`)}
        />
      </div>
    </div>
  );
}
