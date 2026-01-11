# 🧠 ManaRhythm – Feel the Rhythm of Real Writing

ManaRhythm is a **privacy-first MERN stack web application** designed to analyze **typing behavior** without storing or analyzing the actual text content typed by users. The focus is on **how** users type, not **what** they type.

---

## 🎯 Problem Statement

Many students rely on shortcuts like copy-paste or AI tools. Educators need a way to understand **genuine writing effort** without invading privacy.

**ManaRhythm solves this by:**
- Capturing only **keystroke timing**
- Never storing actual characters or text
- Providing session-level typing rhythm analysis

---

## ✨ Key Features

### 🔐 Authentication
- User Registration & Login
- JWT-based secure authentication
- Each session linked to a unique user

### ✍️ Distraction-Free Editor
- Minimal UI with calm dark theme
- No spell check, no formatting, no copy-paste
- Full focus on typing experience

### ⌨️ Keystroke Timing Capture (Privacy First)
- Captures only:
  - Key press timestamp
  - Key release timestamp
  - Press duration (ms)
  - Interval between consecutive keys (ms)
- ❌ No characters or words are stored

### 📊 Typing Session History
- One card per typing session
- Shows:
  - Session time
  - Average key press duration
  - Average interval between keys
  - Total keys pressed
- Back button to return to editor

### 🛡️ Ethics & Privacy
- No text data stored
- No key values recorded
- Only timing metadata is saved

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Inline CSS (minimal & calm UI)

### Backend
- Node.js
- Express.js
- JWT Authentication

### Database
- MongoDB Atlas
- Mongoose ODM

---

## 📁 Project Structure

```
ManaRhythm/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Editor.js
│   │   │   └── SessionHistory.js
│   │   ├── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── Server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── typingController.js
│   ├── models/
│   │   ├── User.js
│   │   └── TypingSession.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── typingRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── .env
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repo-url>
cd ManaRhythm
```

---

### 2️⃣ Backend Setup

```bash
cd Server
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npx nodemon server.js
```

Expected output:
```
Server running on port 5000
MongoDB Connected
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

Open browser:
```
http://localhost:3000
```

---

## 🔄 Application Flow

1. User opens website
2. Register page appears
3. User registers → redirected to login
4. Login successful → Editor page opens
5. User types (text visible, timing captured silently)
6. Click **Save Session**
7. Redirected to **Session History**
8. One session card shown with averages
9. Click **Back to Editor**
10. Logout clears token

---

## 🧮 Typing Rhythm Analysis (How It Works)

- Each key press is stored as a timing record
- Backend saves raw timing data (per key)
- Frontend groups records by session time
- Averages are calculated:
  - Average key press duration
  - Average interval between keys
- Result is shown as **one clean session summary**

---

## 🧠 Learning Outcomes

- MERN stack integration
- JWT authentication flow
- Privacy-first system design
- Event-based data capture
- Frontend data aggregation
- MongoDB schema design with timestamps

---

## 📌 Future Enhancements

- Typing rhythm charts (graphs)
- Consistency score
- Typing speed analysis
- CSV export of sessions
- Admin/Teacher dashboard

---

## 👨‍💻 Author

**Arjun Shaw**  
B.Tech – Computer Science & Engineering  
MERN Stack Intern / Learner

---

## 🏁 Final Note

> *“ManaRhythm focuses on learning behavior, not content — making it ethical, human, and privacy-friendly.”*

