import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../background.css";
import { Player } from "@lottiefiles/react-lottie-player";
const alarm = new Audio("/fire-alarm.mp3");



function LiveMonitor() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Loading...");
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://tejas-backend1.onrender.com/api/sensors");
      const json = await res.json();
      setData(json);
      setStatus(json.fireDetected ? "🔥 Fire Detected!" : "✅ Safe");
      if (json.fireDetected) {
  alarm.play();
} else {
  alarm.pause();
  alarm.currentTime = 0;
}

     setHistory((prev) => {
  const updated = [
    ...prev.slice(-9),
    {
      temp: Number(json.temp),
      smoke: Number(json.smoke),
      ldr: Number(json.ldr),
      time: new Date().toLocaleTimeString("en-IN", { hour12: false }),
    },
  ];
  localStorage.setItem('history', JSON.stringify(updated));
  return updated;
});

    } catch (err) {
      setStatus("❌ Error fetching data");
    }
  };

 useEffect(() => {
 const stored = localStorage.getItem('history');
  if (stored) {
    setHistory(JSON.parse(stored));
  }

  fetchData();
  const interval = setInterval(fetchData, 10000);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const stored = localStorage.getItem('history');
  if (stored) {
    setHistory(JSON.parse(stored));
  }
}, []);

  return (
    <div className={`min-h-screen ${data?.fireDetected ? "fire-bg" : "safe-bg"} p-4`}>
     <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white mb-10">
          <h1 className="text-4xl font-bold mb-4 text-center">🔥 Tejas Fire Monitor</h1>
          {data ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xl">
                <p><b>LDR:</b> {data.ldr}</p>
                <p><b>Temperature:</b> {data.temp}°C</p>
                <p><b>Smoke:</b> {data.smoke}</p>
              </div>
              <p className={`mt-4 text-2xl font-semibold ${data.fireDetected ? "text-red-400" : "text-green-300"}`}>
                Status: {status}
              </p>
              <p className="text-sm mt-1 text-gray-300">Last Updated: {data.timestamp}</p>
            </>
          ) : (
            <p className="text-xl">{status}</p>
          )}
        </div>

        {/* 📈 Graph Section */}
     <div className={`bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white mb-10 transition duration-300 ${
  data?.fireDetected ? "flash-alert" : ""
}`}>
<h2 className="text-2xl font-bold mb-4">📊 Sensor Data Graph (Last 10 Updates)</h2>
           <ResponsiveContainer width="100%" height={300}>
  <LineChart data={history}>
    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
    <XAxis dataKey="time" tick={{ fill: "#fff", fontSize: 12 }} stroke="#ccc" angle={-30} textAnchor="end" />
    <YAxis tick={{ fill: "#fff", fontSize: 12 }} stroke="#ccc" />
    <Tooltip
      contentStyle={{ backgroundColor: "#222", borderRadius: "8px", color: "#fff" }}
      labelStyle={{ color: "#fff" }}
    />
    <Line type="monotone" dataKey="temp" stroke="#FF9900" dot />
    <Line type="monotone" dataKey="ldr" stroke="#00D1FF" dot />
    <Line type="monotone" dataKey="smoke" stroke="#FFFFFF" dot />
    <button
  onClick={() => {
    localStorage.removeItem("history");
    setHistory([]);
  }}
  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
>
  🧹 Clear Graph
</button>

  </LineChart>
</ResponsiveContainer>
<button
  onClick={() => {
    localStorage.removeItem("history");
    setHistory([]);
  }}
  className="  mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
>
  🧹 Clear Graph
</button>

        </div>
      </div>
    </div>
  );
}

export default LiveMonitor;    