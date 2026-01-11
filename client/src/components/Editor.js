import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Editor() {
  const [text, setText] = useState("");
  const lastKeyTime = useRef(null);
  const buffer = useRef([]);
  const navigate = useNavigate();

  const handleKeyDown = () => {
    const now = Date.now();
    buffer.current.push({
      keyPressTime: now,
      intervalBetweenKeys: lastKeyTime.current
        ? now - lastKeyTime.current
        : 0,
    });
    lastKeyTime.current = now;
  };

  const handleKeyUp = () => {
    const now = Date.now();
    const last = buffer.current[buffer.current.length - 1];
    if (last) {
      last.keyReleaseTime = now;
      last.pressDuration = now - last.keyPressTime;
    }
  };

  const saveSession = async () => {
    if (buffer.current.length === 0) {
      alert("No typing data captured");
      return;
    }

    await api.post("/typing/save", buffer.current, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    buffer.current = [];
    setText("");
    alert("Session saved");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={{ background: "#2e2e2e", minHeight: "100vh", padding: "20px" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Type here..."
        style={{
          width: "100%",
          height: "70vh",
          background: "#1e1e1e",
          color: "white",
          caretColor: "white",
          border: "1px solid #444",
          outline: "none",
          fontSize: "20px",
          padding: "20px",
        }}
      />

      {/* 🔘 BUTTONS */}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={saveSession}>Save Session</button>

        <button onClick={() => navigate("/history")}>
          View Sessions
        </button>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
