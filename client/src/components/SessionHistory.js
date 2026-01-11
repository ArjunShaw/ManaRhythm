import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function SessionHistory() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/typing/history", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then(res => {
      setSessions(groupBySession(res.data));
    });
  }, []);

  // 🔹 GROUP DATA BY SESSION TIME
  const groupBySession = (data) => {
    const groups = {};

    data.forEach(item => {
      const sessionKey = new Date(item.createdAt)
        .toLocaleString(); // same session time

      if (!groups[sessionKey]) {
        groups[sessionKey] = {
          time: sessionKey,
          totalDuration: 0,
          totalInterval: 0,
          count: 0,
        };
      }

      groups[sessionKey].totalDuration += item.pressDuration || 0;
      groups[sessionKey].totalInterval += item.intervalBetweenKeys || 0;
      groups[sessionKey].count += 1;
    });

    return Object.values(groups).map(g => ({
      time: g.time,
      avgDuration: Math.round(g.totalDuration / g.count),
      avgInterval: Math.round(g.totalInterval / g.count),
      totalKeys: g.count,
    }));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#2e2e2e",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <button onClick={() => navigate("/")}>
        ← Back to Editor
      </button>

      <h2>Typing Session History</h2>

      {sessions.map((s, i) => (
        <div
          key={i}
          style={{
            background: "#1e1e1e",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "6px",
          }}
        >
          <p><b>Session Time:</b> {s.time}</p>
          <p><b>Average Key Press Duration:</b> {s.avgDuration} ms</p>
          <p><b>Average Interval Between Keys:</b> {s.avgInterval} ms</p>
          <p><b>Total Keys Pressed:</b> {s.totalKeys}</p>
        </div>
      ))}
    </div>
  );
}
