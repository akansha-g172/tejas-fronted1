import React, { useEffect, useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../background.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black bg-opacity-80 p-4 rounded-lg shadow-lg text-white text-xs sm:text-sm">
        <p className="font-bold mb-1">🕒 Time: {label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function LiveMonitor() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Loading...");
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://tejas-backend1.onrender.com/api/sensors");
      const json = await res.json();
      setData(json);

      if (json.fireDetected && status !== "🔥 Fire Detected!") {
        toast.error("🔥 Fire Detected!", { position: "top-right", theme: "dark" });
      }
      setStatus(json.fireDetected ? "🔥 Fire Detected!" : "✅ Safe");

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
        localStorage.setItem("history", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setStatus("❌ Error fetching data");
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("history");
    if (stored) setHistory(JSON.parse(stored));
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const memoizedGraphData = useMemo(() => {
    return history.map((entry) => ({
      ...entry,
      temp: Number(entry.temp),
      ldr: Number(entry.ldr),
      smoke: Number(entry.smoke),
    }));
  }, [history]);

  return (
    <div className={`min-h-screen ${data?.fireDetected ? "fire-bg" : "safe-bg"} p-4`}>
      <div className="max-w-5xl mx-auto">
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />

        {/* 🔥 Status Card */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg text-white mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">🔥 Tejas Fire Monitor</h1>

          {data ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-base sm:text-lg md:text-xl text-center">
                <p><b>LDR:</b> {data.ldr}</p>
                <p><b>Temperature:</b> {data.temp}°C</p>
                <p><b>Smoke:</b> {data.smoke}</p>
              </div>
              <p className={`mt-4 text-lg sm:text-2xl font-semibold ${data.fireDetected ? "text-red-400" : "text-green-300"}`}>
                Status: {status}
              </p>
              <p className="text-xs sm:text-sm mt-1 text-gray-300">Last Updated: {data.timestamp}</p>
            </>
          ) : (
            <p className="text-lg">{status}</p>
          )}
        </div>

        {/* 📊 Graph Section */}
        <div className={`bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white mb-10 transition duration-300 ${data?.fireDetected ? "flash-alert" : ""}`}>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">📊 Sensor Data Graph (Last 10 Updates)</h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memoizedGraphData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#666" />
              <XAxis dataKey="time" tick={{ fill: "#fff", fontSize: 12 }} stroke="#ccc" angle={-30} textAnchor="end" />
              <YAxis tick={{ fill: "#fff", fontSize: 12 }} stroke="#ccc" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="temp" stroke="#FF9900" dot />
              <Line type="monotone" dataKey="ldr" stroke="#00D1FF" dot />
              <Line type="monotone" dataKey="smoke" stroke="#FFFFFF" dot />
            </LineChart>
          </ResponsiveContainer>

          {/* Clear Graph Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                localStorage.removeItem("history");
                setHistory([]);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              🧹 Clear Graph
            </button>
          </div>
        </div>

        {/* 🌐 Contributors Section */}
        <div className="mt-10 text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-md">
            🔧 Project Contributors
          </h3>
          <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6">
            {["Abhishek Kumar", "Bhavya Omar", "Akanksha Gupta", "Tanya Mishra"].map((name, index) => (
              <span
                key={index}
                className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-purple-700 to-cyan-600 text-white text-xs sm:text-sm md:text-base font-semibold shadow-lg hover:scale-105 transform transition-all duration-300 neon-glow"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default LiveMonitor;
