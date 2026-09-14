# JamVerse — Music Community & Live Jamming Platform

A fully functional frontend prototype. No backend — everything runs on mock data,
React state, and localStorage.

## Run locally

```bash
npm install
npm run dev
```

Open the printed localhost URL (usually http://localhost:5173).

Log in / sign up with anything — auth is simulated, no real credentials are sent anywhere.

## Build for production

```bash
npm run build
npm run preview
```

## What's implemented

- Landing, simulated Login/Sign Up
- Personal Dashboard (upcoming RSVPs, saved events, followed artists, playlists)
- Music Discovery (moods, genres, playlists, trending artists)
- Event Discovery (jam sessions, open mics, concerts, workshops) + Musician Wanted board
- Interactive Map with location markers and event popovers
- Event Details with working RSVP / Save / performer links
- Host a Jam flow — new jams appear live in Event Discovery & Dashboard
- Musician Profiles with follow, bio, and performance portfolio
- Community Feed — communities, musician search/filter, Musician Wanted
- Chat — DMs and a group/event chat, messages persist in state
- Creator Space — simulated performance upload, likes, comments
- Performer Leaderboard / Performer of the Week
- Notifications
- Profile & Settings, including a dedicated, easy-to-find Accessibility Settings
  panel (text size, high contrast, reduce motion, visual alerts, language,
  voice assistance, data saver) — all wired to actually affect the UI

## Stack

React + Vite + Tailwind CSS + React Router + lucide-react icons.
State persists to `localStorage` under the key `jamverse-state-v1`.

## Notes on scope

This is a frontend-only prototype built for a UI/UX evaluation. All "uploads,"
"bookings," and "authentication" are simulated on the client. Replace the mock
data in `src/data/mockData.js` and the logic in `src/context/AppContext.jsx`
with real API calls when a backend is introduced.
