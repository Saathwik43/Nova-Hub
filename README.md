# Nova Hub — Esports scoring & Tournament Bracket Engine

Nova Hub is a high-performance, real-time esports tournament management and live-scoring platform designed with a premium dark-mode gaming aesthetic, glassmorphic UI cards, and an interactive virtual mouse cursor.

This repository is structured as a client-server monorepo for a hackathon-winning application.

---

## 📂 Core Structure Overview

```
Nova Hub/
├── backend/
│   ├── models/
│   │   └── schemas.js         # Unified Mongoose models: User, Tournament, Match
│   ├── server.js              # Express, Socket.io scoring server, Auth logic
│   └── package.json           # Backend dependency configuration
├── frontend/
│   ├── src/
│   │   ├── hooks/
│   │   │   └── useVirtualCursor.js # Dynamic gaming cursor vector tracker
│   │   ├── components/
│   │   │   ├── VirtualCursor.jsx   # Gaming crosshair rendering component
│   │   │   ├── LiveLeaderboard.jsx  # Glassmorphic live statistics panel
│   │   │   ├── TournamentBracket.jsx# Interactive node bracket tree
│   │   │   ├── LandingPage.jsx     # High-fidelity scrolling landing page
│   │   │   ├── HostDashboard.jsx   # Administrative host setup console
│   │   │   ├── ParticipantDashboard.jsx # Gamer discovery and standings arena
│   │   │   ├── StripeModal.jsx     # Mock payment portal
│   │   │   └── Auth.jsx            # Tabbed identity login/register dashboard
│   │   ├── App.jsx                 # Routing + global context configuration
│   │   ├── main.jsx                # React DOM bootstrap
│   │   └── index.css               # Design tokens & glassmorphism utilities
│   ├── tailwind.config.js          # Tailored neon color palette config
│   ├── postcss.config.js           # PostCSS compiler configuration
│   ├── vite.config.js              # Vite server settings
│   ├── index.html                  # Google Fonts & viewport metadata
│   └── package.json                # Frontend packages (framer-motion, lucide)
└── README.md
```

---

## 🔧 Installation & Running Locally

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Setup Backend Scoring Server
Navigate to the `backend` folder, install dependencies, and start the scoring engine:
```bash
cd backend
npm install
npm run dev
# Or start normally:
npm start
```
*Note: The server will connect to MongoDB at `mongodb://127.0.0.1:27017/novahub` by default. If MongoDB is not running locally, the server will automatically log a fallback warning and spin up in mock-db demo mode so all front-end dashboards remain fully testable!*

### 2. Setup React Frontend
Open a new terminal window, navigate to the `frontend` folder, install dependencies, and launch Vite's hot-reloading development server:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🛡️ Database Modeling & API Specs

### 1. Unified Schemas (`backend/models/schemas.js`)
*   **User Schema**: Defines the user credentials and assigns the immutable `role` flag (`'host'` or `'participant'`) as well as the active `activeTeam` clan tagline.
*   **Tournament Schema**: Maintains titles, formats, prize values, slots, rules, and host reference keys. Tracks payment flags which shift after Stripe authorizations.
*   **Match Schema**: Represents specific matchups within a round. Houses score aggregations (Kills, Placement) and winner targets which feed single-elimination logic.

### 2. Protected Routing & Endpoint Architecture
*   `POST /api/auth/register` & `POST /api/auth/login`: Signs user payloads into secure cookies.
*   `POST /api/tournaments/create`: Restricted to `'host'` accounts. Generates round matches.
*   `POST /api/tournaments/:id/join`: Restricted to `'participant'`. Inserts players into first-round matchup cards.
*   `PUT /api/matches/:id/score`: Restricts updates to `'host'` organizer, automatically mapping winner tokens to the next round slots and emitting immediate Socket.io status updates.
