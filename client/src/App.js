import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Editor from "./components/Editor";
import SessionHistory from "./components/SessionHistory";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(true);

  // 🔥 APP START PAR TOKEN CLEAR
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  if (!loggedIn) {
    return (
      <div style={{ background: "#2e2e2e", minHeight: "100vh", color: "white" }}>
        {showRegister ? (
          <>
           <Register onSwitchToLogin={() => setShowRegister(false)} />
          </>
        ) : (
          <>
           <Login
            setLoggedIn={setLoggedIn}
            onSwitchToRegister={() => setShowRegister(true)}
          />
          </>
        )}
      </div>
    );
  }

  // ✅ LOGIN KE BAAD
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/history" element={<SessionHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
