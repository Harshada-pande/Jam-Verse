import AccessibilityPanel from "../components/AccessibilityPanel";
import { Accessibility } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Accessibility size={24} className="text-electric" />
        <h1 className="font-display text-3xl font-extrabold">Accessibility Settings</h1>
      </div>
      <p className="text-ink/60">JamVerse is built for everyone. Adjust these settings any time — changes apply instantly across the app.</p>
      <AccessibilityPanel />
    </div>
  );
}
