import { useEffect, useState } from "react";
import { api } from "../api";

export default function Summary() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/typing/summary", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={box}>
      <h2>Typing Rhythm Summary</h2>
      <p>Total Keys Pressed: {data.totalKeys}</p>
      <p>Average Key Hold Time: {data.avgKeyHold.toFixed(2)} ms</p>
    </div>
  );
}

const box = {
  color: "white",
  padding: "20px",
};
