import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/UI";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const { login, showToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    showToast(mode === "login" ? "Welcome back!" : "Account created — welcome to JamVerse!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-lavender flex items-center justify-center px-6 py-10">
      <div className="chunky-card bg-white w-full max-w-md p-8">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <span className="w-9 h-9 rounded-xl bg-electric text-white grid place-items-center font-display font-black border-2 border-ink">J</span>
          <span className="font-display text-lg font-extrabold">JamVerse</span>
        </div>

        <div className="flex bg-lavender/60 rounded-full p-1 mb-6">
          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`focus-ring flex-1 py-2 rounded-full text-sm font-bold capitalize transition-colors ${
                mode === m ? "bg-electric text-white" : "text-ink/60"
              }`}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <Field label="Full Name" type="text" placeholder="Your name" />
          )}
          <Field label="Email" type="email" placeholder="you@example.com" />
          <Field label="Password" type="password" placeholder="••••••••" />
          <Button type="submit" variant="primary" className="w-full mt-2">
            {mode === "login" ? "Log In" : "Create Account"}
          </Button>
        </form>
        <p className="text-xs text-center text-ink/50 mt-4">
          This is a demo — no real credentials are sent anywhere.
        </p>
      </div>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink/80">{label}</span>
      <input
        {...rest}
        required
        className="focus-ring mt-1 w-full px-4 py-3 rounded-2xl border-2 border-ink/20 bg-cream text-base"
      />
    </label>
  );
}
