import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Editor() {
  const [text, setText] = useState("");

  const lastKeyTime = useRef(null);
  const buffer = useRef([]);

  const navigate = useNavigate();

  // 🔹 TIMING CAPTURE
 const handleKeyDown = (e) => {
  if (e.key.length > 1) return; // ignore Shift, Ctrl, etc.

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

  if (last && !last.keyReleaseTime) {
    last.keyReleaseTime = now;
    last.pressDuration = now - last.keyPressTime;
  }
};

  // ✅ SAVE SESSION
 const saveSession = async () => {
  console.log("BUFFER DATA:", buffer.current);

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
  navigate("/history");
};

  // ✅ LOGOUT FUNCTION (YEH WALA)
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // App.js wapas Login page dikha dega
  };

  return (
    <div
      style={{
        background: "#2e2e2e",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
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

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={saveSession}>Save Session</button>

        <button
          onClick={logout}
          style={{ marginLeft: "10px", background: "#444", color: "white" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
