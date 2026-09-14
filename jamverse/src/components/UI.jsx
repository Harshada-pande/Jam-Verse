import { useApp } from "../context/AppContext";
import { X, CheckCircle2, Info } from "lucide-react";

export function Button({ children, variant = "primary", size = "md", className = "", ...rest }) {
  const base = "btn-press focus-ring inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all border-2";
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-5 py-3 text-base", lg: "px-7 py-4 text-lg" };
  const variants = {
    primary: "bg-electric text-white border-ink shadow-chunky hover:shadow-chunkyLg",
    secondary: "bg-white text-ink border-ink shadow-chunky hover:shadow-chunkyLg",
    magenta: "bg-magenta text-white border-ink shadow-chunky hover:shadow-chunkyLg",
    coral: "bg-coral text-white border-ink shadow-chunky hover:shadow-chunkyLg",
    ghost: "bg-transparent text-ink border-transparent hover:bg-lavender",
    outline: "bg-transparent text-ink border-ink hover:bg-lavender",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = "electric", className = "" }) {
  const tones = {
    electric: "bg-electric/10 text-electric border-electric/30",
    magenta: "bg-magenta/10 text-magenta border-magenta/30",
    coral: "bg-coral/10 text-coral border-coral/30",
    lime: "bg-lime/20 text-ink border-lime/50",
    cyan: "bg-cyan/10 text-cyan-700 border-cyan/30",
    sun: "bg-sun/20 text-ink border-sun/50",
    violet: "bg-violet/10 text-violet border-violet/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-magenta mb-1">{eyebrow}</p>}
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-ink">{title}</h2>
        {subtitle && <p className="text-ink/60 mt-1 max-w-xl">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function ToastStack() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="chunky-card bg-white px-4 py-3 flex items-center gap-2 animate-[fadein_0.2s_ease]"
        >
          {t.tone === "success" ? (
            <CheckCircle2 className="text-lime shrink-0" size={20} />
          ) : (
            <Info className="text-electric shrink-0" size={20} />
          )}
          <span className="text-sm font-medium text-ink">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-end md:items-center justify-center p-0 md:p-6">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-cream w-full md:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border-3 border-ink shadow-chunkyLg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-extrabold">{title}</h3>
          <button aria-label="Close" onClick={onClose} className="focus-ring p-2 rounded-full hover:bg-lavender">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="chunky-card bg-white p-10 text-center flex flex-col items-center gap-3">
      {Icon && <Icon size={36} className="text-electric" />}
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {subtitle && <p className="text-ink/60 text-sm max-w-sm">{subtitle}</p>}
      {action}
    </div>
  );
}
