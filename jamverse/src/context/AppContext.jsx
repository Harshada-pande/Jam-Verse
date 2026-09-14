import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  events as seedEvents,
  performances as seedPerformances,
  conversations as seedConversations,
  notifications as seedNotifications,
  currentUser,
} from "../data/mockData";

const AppContext = createContext(null);

const STORAGE_KEY = "jamverse-state-v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore corrupt storage
  }
  return null;
}

const defaultState = {
  isAuthenticated: false,
  rsvpedEvents: [],
  savedEvents: [],
  followedArtists: [],
  likedPerformances: [],
  joinedCommunities: [],
  hostedJams: [],
  uploadedPerformances: [],
  performanceLikeCounts: {},
  performanceComments: {},
  notifications: seedNotifications,
  accessibility: {
    textSize: "medium", // small | medium | large | xlarge
    highContrast: false,
    reduceMotion: false,
    visualAlerts: true,
    language: "en", // en | hi | mr
    voiceAssistance: false,
    dataSaver: false,
  },
};

export function AppProvider({ children }) {
  const [state, setState] = useState(() => ({ ...defaultState, ...(loadState() || {}) }));
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("high-contrast", state.accessibility.highContrast);
    body.classList.toggle("reduce-motion", state.accessibility.reduceMotion);
    const scaleMap = { small: 0.9, medium: 1, large: 1.15, xlarge: 1.3 };
    document.documentElement.style.setProperty("--text-scale", scaleMap[state.accessibility.textSize] || 1);
  }, [state.accessibility]);

  const showToast = useCallback((message, tone = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const login = useCallback(() => {
    setState((s) => ({ ...s, isAuthenticated: true }));
  }, []);

  const logout = useCallback(() => {
    setState((s) => ({ ...s, isAuthenticated: false }));
  }, []);

  const toggleRsvp = useCallback((eventId, eventName) => {
    setState((s) => {
      const has = s.rsvpedEvents.includes(eventId);
      showToast(has ? `Removed RSVP for ${eventName}` : `You're going to ${eventName}!`, has ? "info" : "success");
      return {
        ...s,
        rsvpedEvents: has ? s.rsvpedEvents.filter((id) => id !== eventId) : [...s.rsvpedEvents, eventId],
      };
    });
  }, [showToast]);

  const toggleSaveEvent = useCallback((eventId, eventName) => {
    setState((s) => {
      const has = s.savedEvents.includes(eventId);
      showToast(has ? `Removed from saved events` : `Saved ${eventName}`, "info");
      return {
        ...s,
        savedEvents: has ? s.savedEvents.filter((id) => id !== eventId) : [...s.savedEvents, eventId],
      };
    });
  }, [showToast]);

  const toggleFollow = useCallback((artistId, artistName) => {
    setState((s) => {
      const has = s.followedArtists.includes(artistId);
      showToast(has ? `Unfollowed ${artistName}` : `Now following ${artistName}`, "info");
      return {
        ...s,
        followedArtists: has ? s.followedArtists.filter((id) => id !== artistId) : [...s.followedArtists, artistId],
      };
    });
  }, [showToast]);

  const toggleLike = useCallback((performanceId) => {
    setState((s) => {
      const has = s.likedPerformances.includes(performanceId);
      const base = seedPerformances.find((p) => p.id === performanceId)?.likes || 0;
      const current = s.performanceLikeCounts[performanceId] ?? base;
      return {
        ...s,
        likedPerformances: has
          ? s.likedPerformances.filter((id) => id !== performanceId)
          : [...s.likedPerformances, performanceId],
        performanceLikeCounts: {
          ...s.performanceLikeCounts,
          [performanceId]: has ? current - 1 : current + 1,
        },
      };
    });
  }, []);

  const addComment = useCallback((performanceId, text) => {
    setState((s) => ({
      ...s,
      performanceComments: {
        ...s.performanceComments,
        [performanceId]: [...(s.performanceComments[performanceId] || []), { text, author: currentUser.name, time: "Just now" }],
      },
    }));
  }, []);

  const toggleJoinCommunity = useCallback((communityId, communityName) => {
    setState((s) => {
      const has = s.joinedCommunities.includes(communityId);
      showToast(has ? `Left ${communityName}` : `Joined ${communityName}`, "info");
      return {
        ...s,
        joinedCommunities: has ? s.joinedCommunities.filter((id) => id !== communityId) : [...s.joinedCommunities, communityId],
      };
    });
  }, [showToast]);

  const hostJam = useCallback((jam) => {
    const id = `jam-${Date.now()}`;
    const newJam = { ...jam, id, going: 1, capacity: jam.capacity || 15, artists: [] };
    setState((s) => ({ ...s, hostedJams: [...s.hostedJams, newJam], rsvpedEvents: [...s.rsvpedEvents, id] }));
    showToast(`${jam.name} is live! It now appears in Event Discovery.`, "success");
    return id;
  }, [showToast]);

  const uploadPerformance = useCallback((perf) => {
    const id = `upload-${Date.now()}`;
    const newPerf = { ...perf, id, artistId: currentUser.id, likes: 0, comments: 0 };
    setState((s) => ({ ...s, uploadedPerformances: [...s.uploadedPerformances, newPerf] }));
    showToast("Performance uploaded to your Creator Space!", "success");
    return id;
  }, [showToast]);

  const sendMessage = useCallback((convId, text) => {
    setState((s) => {
      const convos = s.userConversations || seedConversations;
      const updated = convos.map((c) =>
        c.id === convId
          ? { ...c, messages: [...c.messages, { from: "me", text, time: "Just now" }] }
          : c
      );
      return { ...s, userConversations: updated };
    });
  }, []);

  const updateAccessibility = useCallback((patch) => {
    setState((s) => ({ ...s, accessibility: { ...s.accessibility, ...patch } }));
  }, []);

  const markNotificationsRead = useCallback(() => {
    setState((s) => ({ ...s, notificationsRead: true }));
  }, []);

  const value = {
    ...state,
    conversations: state.userConversations || seedConversations,
    allEvents: [...seedEvents, ...state.hostedJams],
    allPerformances: [...seedPerformances, ...state.uploadedPerformances],
    toasts,
    showToast,
    login,
    logout,
    toggleRsvp,
    toggleSaveEvent,
    toggleFollow,
    toggleLike,
    addComment,
    toggleJoinCommunity,
    hostJam,
    uploadPerformance,
    sendMessage,
    updateAccessibility,
    markNotificationsRead,
    currentUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
