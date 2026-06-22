# TravelMind — Frontend

The frontend for TravelMind, an AI-powered travel planning web application. Built with React.js and deployed on Vercel.

🌐 **Live App:** https://travelmind-frontend.vercel.app

---

## ✨ Features

- 🔐 User registration and login with JWT authentication
- 📍 Enter destination, dates, budget and interests
- 🤖 AI-generated day-by-day itinerary with accommodation, transport and budget breakdown
- 💾 Save trips to your personal dashboard
- 🗑️ Delete saved trips
- 🌙 Premium dark UI design
- 📱 Responsive layout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React.js |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Styling | CSS3 (Custom dark theme) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
travelmind-frontend/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.js        # Navigation bar with auth state
│   ├── pages/
│   │   ├── Login.js         # Login page
│   │   ├── Register.js      # Registration page
│   │   ├── PlanTrip.js      # Trip planning form + itinerary display
│   │   └── Dashboard.js     # Saved trips dashboard
│   ├── App.js               # React Router setup
│   ├── index.js             # Entry point
│   └── index.css            # Global dark theme styles
└── package.json
```

---

## 📱 Pages

### Login & Register
- Clean dark form UI
- JWT token stored in localStorage
- Redirects to dashboard on success

### Plan Trip (`/plan`)
- Destination input
- Date picker (start & end date)
- Budget input with per-day calculation
- Travelers selector
- 20 interest tags (Beaches, Food, Adventure, Culture, etc.)
- Generates complete itinerary via backend API
- Shows stats: destination, duration, total budget
- Save trip to dashboard

### Dashboard (`/dashboard`)
- Welcome message with username
- Grid of saved trip cards
- Each card shows destination, dates, budget, interests and itinerary
- Delete trip functionality
- Plan new trip button

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- TravelMind backend running on port 5000

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/GayathriDeshaveni/travelmind-frontend.git
cd travelmind-frontend

# 2. Switch to premium UI branch
git checkout premium-ui

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

App runs at `http://localhost:3000`

> Make sure the backend is running at `http://localhost:5000` for local development.
> For production, the app connects to `https://travelmind-api.onrender.com`

---

## 🌍 Deployment

Deployed on **Vercel** (free tier):
- Connected to `premium-ui` branch on GitHub
- Auto-deploys on every push
- Backend API hosted separately on Render

---

## 🔗 Related

- 🔧 Backend Repository: [github.com/GayathriDeshaveni/travelmind](https://github.com/GayathriDeshaveni/travelmind)
- 🌐 Live App: [travelmind-frontend.vercel.app](https://travelmind-frontend.vercel.app)
- ⚙️ API: [travelmind-api.onrender.com](https://travelmind-api.onrender.com)

---

## 👩‍💻 Author

**Gayathri Deshaveni**
- GitHub: [@GayathriDeshaveni](https://github.com/GayathriDeshaveni)
