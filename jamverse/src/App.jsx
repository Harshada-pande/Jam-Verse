import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar, BottomNav } from "./components/Navigation";
import { ToastStack } from "./components/UI";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MusicDiscovery from "./pages/MusicDiscovery";
import EventDiscovery from "./pages/EventDiscovery";
import MapPage from "./pages/MapPage";
import EventDetails from "./pages/EventDetails";
import HostJam from "./pages/HostJam";
import MusicianProfile from "./pages/MusicianProfile";
import CommunityFeed from "./pages/CommunityFeed";
import Chat from "./pages/Chat";
import CreatorSpace from "./pages/CreatorSpace";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import AccessibilityPage from "./pages/AccessibilityPage";

function RequireAuth({ children }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream pb-20 md:pb-0">
      <Navbar />
      {children}
      <footer className="hidden md:flex max-w-6xl mx-auto px-8 py-8 text-xs text-ink/40 items-center justify-between">
        <span>© 2026 JamVerse — Music Community & Live Jamming</span>
        <Link to="/accessibility" className="focus-ring underline hover:text-ink/70">Accessibility Settings</Link>
      </footer>
      <BottomNav />
      <ToastStack />
    </div>
  );
}

function Shell() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={<RequireAuth><AppLayout><Dashboard /></AppLayout></RequireAuth>}
      />
      <Route
        path="/discover"
        element={<RequireAuth><AppLayout><MusicDiscovery /></AppLayout></RequireAuth>}
      />
      <Route
        path="/events"
        element={<RequireAuth><AppLayout><EventDiscovery /></AppLayout></RequireAuth>}
      />
      <Route
        path="/events/:id"
        element={<RequireAuth><AppLayout><EventDetails /></AppLayout></RequireAuth>}
      />
      <Route
        path="/map"
        element={<RequireAuth><AppLayout><MapPage /></AppLayout></RequireAuth>}
      />
      <Route
        path="/host-jam"
        element={<RequireAuth><AppLayout><HostJam /></AppLayout></RequireAuth>}
      />
      <Route
        path="/musicians/:id"
        element={<RequireAuth><AppLayout><MusicianProfile /></AppLayout></RequireAuth>}
      />
      <Route
        path="/community"
        element={<RequireAuth><AppLayout><CommunityFeed /></AppLayout></RequireAuth>}
      />
      <Route
        path="/chat"
        element={<RequireAuth><AppLayout><Chat /></AppLayout></RequireAuth>}
      />
      <Route
        path="/creator-space"
        element={<RequireAuth><AppLayout><CreatorSpace /></AppLayout></RequireAuth>}
      />
      <Route
        path="/notifications"
        element={<RequireAuth><AppLayout><Notifications /></AppLayout></RequireAuth>}
      />
      <Route
        path="/profile"
        element={<RequireAuth><AppLayout><Profile /></AppLayout></RequireAuth>}
      />
      <Route
        path="/leaderboard"
        element={<RequireAuth><AppLayout><Leaderboard /></AppLayout></RequireAuth>}
      />
      <Route
        path="/accessibility"
        element={<RequireAuth><AppLayout><AccessibilityPage /></AppLayout></RequireAuth>}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </AppProvider>
  );
}
