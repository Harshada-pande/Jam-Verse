// JamVerse mock data — realistic fictional content, no lorem ipsum

export const genres = [
  "Indie", "Acoustic", "Pop", "Rock", "Jazz", "Classical", "Folk",
  "Electronic", "Hip-Hop", "Bollywood", "Fusion", "Blues",
];

export const moods = [
  { id: "chill", label: "Chill Evenings", color: "bg-skyfog", accent: "text-electric" },
  { id: "energetic", label: "High Energy", color: "bg-blush", accent: "text-magenta" },
  { id: "focus", label: "Deep Focus", color: "bg-lavender", accent: "text-violet" },
  { id: "monsoon", label: "Monsoon Moods", color: "bg-skyfog", accent: "text-cyan" },
  { id: "campfire", label: "Campfire Acoustic", color: "bg-blush", accent: "text-coral" },
  { id: "lateNight", label: "Late Night Jazz", color: "bg-lavender", accent: "text-electric" },
];

export const artists = [
  {
    id: "art-01", name: "Aanya Kulkarni", handle: "@aanyasings", avatar: "🎤",
    instrument: "Vocalist", genres: ["Acoustic", "Indie"], skillLevel: "Advanced",
    city: "Pune", bio: "Acoustic storyteller. I write songs about small-town monsoons and big feelings. Performing around Pune's open mic circuit since 2022.",
    followers: 1840, performances: 26, badge: "Performer of the Week",
  },
  {
    id: "art-02", name: "Riya Deshmukh", handle: "@riyaonstrings", avatar: "🎸",
    instrument: "Guitarist", genres: ["Indie", "Rock"], skillLevel: "Intermediate",
    city: "Pune", bio: "Fingerstyle guitarist exploring indie-rock textures. Always looking for a rhythm section to jam with on weekends.",
    followers: 972, performances: 14,
  },
  {
    id: "art-03", name: "Meera Iyer", handle: "@meerasings", avatar: "🎙️",
    instrument: "Vocalist", genres: ["Pop", "Bollywood"], skillLevel: "Advanced",
    city: "Mumbai", bio: "Playback-style vocalist trained in Hindustani classical, now bending pop hooks around it.",
    followers: 1290, performances: 21,
  },
  {
    id: "art-04", name: "Kabir Shah", handle: "@kabirkeys", avatar: "🎹",
    instrument: "Keyboardist", genres: ["Jazz", "Fusion"], skillLevel: "Advanced",
    city: "Pune", bio: "Jazz-trained keyboardist, currently building a fusion trio. Loves odd time signatures a little too much.",
    followers: 640, performances: 18,
  },
  {
    id: "art-05", name: "Devika Rao", handle: "@devikabeats", avatar: "🥁",
    instrument: "Drummer", genres: ["Rock", "Fusion"], skillLevel: "Intermediate",
    city: "Pune", bio: "Session drummer, three bands deep. Free most Friday nights and always up for a jam.",
    followers: 512, performances: 11,
  },
  {
    id: "art-06", name: "Arjun Mehta", handle: "@arjunbass", avatar: "🎸",
    instrument: "Bassist", genres: ["Indie", "Acoustic"], skillLevel: "Beginner",
    city: "Pune", bio: "Learning bass for a year now. Looking for a patient band to grow with.",
    followers: 96, performances: 3,
  },
  {
    id: "art-07", name: "Sana Qureshi", handle: "@sanaviolin", avatar: "🎻",
    instrument: "Violinist", genres: ["Classical", "Fusion"], skillLevel: "Advanced",
    city: "Pune", bio: "Carnatic-trained violinist bringing classical phrasing into contemporary fusion sets.",
    followers: 758, performances: 19,
  },
  {
    id: "art-08", name: "Yash Patil", handle: "@yashacoustic", avatar: "🪕",
    instrument: "Guitarist", genres: ["Folk", "Acoustic"], skillLevel: "Intermediate",
    city: "Pune", bio: "Folk-leaning acoustic player. Runs a monthly campfire jam near Lonavla.",
    followers: 431, performances: 9,
  },
];

export const playlists = [
  { id: "pl-01", title: "Rainy Pune Evenings", mood: "monsoon", curator: "JamVerse Editors", tracks: 18, cover: "🌧️" },
  { id: "pl-02", title: "Open Mic Warmups", mood: "chill", curator: "Aanya Kulkarni", tracks: 12, cover: "🎤" },
  { id: "pl-03", title: "Fuzz & Feedback", mood: "energetic", curator: "Riya Deshmukh", tracks: 15, cover: "🎸" },
  { id: "pl-04", title: "Late Night Jazz Trio", mood: "lateNight", curator: "Kabir Shah", tracks: 10, cover: "🎷" },
  { id: "pl-05", title: "Deep Practice Focus", mood: "focus", curator: "JamVerse Editors", tracks: 20, cover: "🎧" },
  { id: "pl-06", title: "Campfire Sessions", mood: "campfire", curator: "Yash Patil", tracks: 14, cover: "🔥" },
];

export const events = [
  {
    id: "evt-01", name: "Koregaon Park Open Mic", type: "Open Mic", genre: "Indie",
    date: "2026-09-06", time: "7:00 PM", venue: "The Daily Roast Café", location: "Koregaon Park, Pune",
    distance: "1.2 km", fee: "Free entry", capacity: 40, going: 27,
    artists: ["art-01", "art-06"], description: "A relaxed weekly open mic — sign up on arrival, 2 songs per slot. All skill levels welcome.",
  },
  {
    id: "evt-02", name: "Fusion Nights: Strings & Keys", type: "Concert", genre: "Fusion",
    date: "2026-09-08", time: "8:30 PM", venue: "Swara Live House", location: "Baner, Pune",
    distance: "6.5 km", fee: "₹250", capacity: 120, going: 84,
    artists: ["art-04", "art-07"], description: "Kabir Shah and Sana Qureshi lead a fusion set blending Carnatic violin with jazz keys.",
  },
  {
    id: "evt-03", name: "Weekend Jam: Rock Circle", type: "Jam Session", genre: "Rock",
    date: "2026-09-05", time: "6:00 PM", venue: "Soundbox Studio", location: "Viman Nagar, Pune",
    distance: "4.8 km", fee: "₹100 (gear use)", capacity: 15, going: 9,
    artists: ["art-05", "art-02"], description: "Bring your instrument, plug in, and jam. House drum kit and amps provided.",
  },
  {
    id: "evt-04", name: "Campfire Acoustic Circle", type: "Jam Session", genre: "Folk",
    date: "2026-09-12", time: "6:30 PM", venue: "Riverside Lawns", location: "Lonavla",
    distance: "62 km", fee: "Free entry", capacity: 30, going: 18,
    artists: ["art-08"], description: "Monthly unplugged circle by the river — acoustic guitars, cajons, and voices only.",
  },
  {
    id: "evt-05", name: "Songwriting Workshop", type: "Workshop", genre: "Acoustic",
    date: "2026-09-10", time: "5:00 PM", venue: "JamVerse Studio", location: "FC Road, Pune",
    distance: "3.1 km", fee: "₹400", capacity: 20, going: 12,
    artists: ["art-01"], description: "Aanya Kulkarni walks through building a song from a single lyric idea to a full arrangement.",
  },
  {
    id: "evt-06", name: "Bollywood Karaoke Live", type: "Concert", genre: "Bollywood",
    date: "2026-09-14", time: "9:00 PM", venue: "Highstreet Bar", location: "Kalyani Nagar, Pune",
    distance: "5.4 km", fee: "₹150", capacity: 80, going: 61,
    artists: ["art-03"], description: "Live band plays backing tracks — hop on stage and sing your favourite Bollywood numbers.",
  },
];

export const communities = [
  { id: "com-01", name: "Pune Indie Collective", members: 1240, genre: "Indie", description: "For indie musicians and fans across Pune — gigs, collabs, and feedback threads." },
  { id: "com-02", name: "Campus Jammers", members: 860, genre: "Mixed", description: "College musicians finding bandmates and jam partners across Pune campuses." },
  { id: "com-03", name: "Fusion & Classical Circle", members: 430, genre: "Fusion", description: "Where Hindustani, Carnatic, and jazz-trained musicians experiment together." },
  { id: "com-04", name: "Bedroom Producers Pune", members: 610, genre: "Electronic", description: "Home-studio producers sharing beats, feedback, and gear recommendations." },
];

export const musicianWanted = [
  {
    id: "mw-01", title: "Need a Bassist", postedBy: "art-02",
    genre: "Indie / Acoustic", when: "Friday • 7 PM", location: "Pune",
    description: "Riya's four-piece indie band needs a bassist for a recurring Friday jam — no gig commitments yet, just building chemistry.",
  },
  {
    id: "mw-02", title: "Drummer for Fusion Trio", postedBy: "art-04",
    genre: "Jazz / Fusion", when: "Weekends", location: "Baner, Pune",
    description: "Kabir's fusion trio wants a drummer comfortable with odd time signatures for weekend rehearsals.",
  },
  {
    id: "mw-03", title: "Backup Vocalist Wanted", postedBy: "art-03",
    genre: "Bollywood / Pop", when: "Sep 14 gig", location: "Kalyani Nagar, Pune",
    description: "Meera needs one backup vocalist for the Bollywood Karaoke Live show — harmony experience preferred.",
  },
];

export const performances = [
  { id: "perf-01", artistId: "art-01", title: "Monsoon Diaries (Original)", type: "Original", likes: 342, comments: 28, duration: "3:42" },
  { id: "perf-02", artistId: "art-07", title: "Raga Fusion Improv", type: "Original", likes: 210, comments: 14, duration: "5:10" },
  { id: "perf-03", artistId: "art-03", title: "Tum Hi Ho (Cover)", type: "Cover", likes: 498, comments: 41, duration: "4:05" },
  { id: "perf-04", artistId: "art-04", title: "Late Night Keys Improv", type: "Original", likes: 156, comments: 9, duration: "4:30" },
  { id: "perf-05", artistId: "art-08", title: "Campfire Sessions Vol.3", type: "Original", likes: 187, comments: 12, duration: "3:58" },
  { id: "perf-06", artistId: "art-02", title: "Fuzzbox (Original)", type: "Original", likes: 132, comments: 6, duration: "3:20" },
];

export const leaderboard = [
  { rank: 1, artistId: "art-01", title: "Performer of the Week", points: 2840 },
  { rank: 2, artistId: "art-03", title: "Rising Vocalist", points: 2415 },
  { rank: 3, artistId: "art-07", title: "Fusion Spotlight", points: 2130 },
  { rank: 4, artistId: "art-04", title: "Community Favourite", points: 1870 },
  { rank: 5, artistId: "art-08", title: "Acoustic Standout", points: 1520 },
];

export const mapLocations = [
  { id: "loc-01", name: "The Daily Roast Café", type: "Café", x: 30, y: 42, eventId: "evt-01" },
  { id: "loc-02", name: "Swara Live House", type: "Venue", x: 62, y: 28, eventId: "evt-02" },
  { id: "loc-03", name: "Soundbox Studio", type: "Jam Venue", x: 75, y: 55, eventId: "evt-03" },
  { id: "loc-04", name: "Riverside Lawns, Lonavla", type: "Open Air", x: 15, y: 75, eventId: "evt-04" },
  { id: "loc-05", name: "JamVerse Studio", type: "Studio", x: 45, y: 60, eventId: "evt-05" },
  { id: "loc-06", name: "Highstreet Bar", type: "Venue", x: 68, y: 40, eventId: "evt-06" },
];

export const conversations = [
  {
    id: "conv-01", withArtistId: "art-02", isGroup: false,
    messages: [
      { from: "them", text: "Hey! Saw your profile — are you free for the Friday jam at Soundbox?", time: "10:12 AM" },
      { from: "me", text: "Yeah I should be, what time exactly?", time: "10:14 AM" },
      { from: "them", text: "6 PM, house drum kit will be there. Bring your bass!", time: "10:15 AM" },
    ],
  },
  {
    id: "conv-02", withArtistId: "art-01", isGroup: false,
    messages: [
      { from: "them", text: "Loved your comment on my Monsoon Diaries track 🙏", time: "Yesterday" },
      { from: "me", text: "It genuinely gave me chills, the bridge especially", time: "Yesterday" },
    ],
  },
  {
    id: "conv-03", withArtistId: null, isGroup: true, groupName: "Koregaon Park Open Mic — Sep 6",
    messages: [
      { from: "them", name: "Aanya", text: "Sign-up sheet is at the counter, first come first serve for slots!", time: "9:02 AM" },
      { from: "them", name: "Arjun", text: "Bringing my bass, anyone need a fourth for a quick jam before it starts?", time: "9:20 AM" },
    ],
  },
];

export const notifications = [
  { id: "n1", text: "Your RSVP for Koregaon Park Open Mic is confirmed.", time: "2h ago", type: "event" },
  { id: "n2", text: "Riya Deshmukh sent you a message.", time: "5h ago", type: "chat" },
  { id: "n3", text: "You're this week's #1 on the Performer Leaderboard 🎉", time: "1d ago", type: "recognition" },
  { id: "n4", text: "Meera Iyer liked your performance 'Monsoon Diaries'.", time: "1d ago", type: "like" },
  { id: "n5", text: "New workshop near you: Songwriting Workshop, Sep 10.", time: "2d ago", type: "discovery" },
];

export const currentUser = {
  id: "me-01", name: "Harshada Pande", handle: "@harshadap", avatar: "🎧",
  instrument: "Vocalist", genres: ["Indie", "Acoustic"], skillLevel: "Intermediate",
  city: "Lonavla", bio: "Building my performing voice one open mic at a time.",
};
