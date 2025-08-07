import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LiveMonitor from "./pages/LiveMonitor";
import Sensors from "./pages/Sensors"; 
import ESP8266 from "./pages/ESP8266";
import References from "./pages/References";


function Home() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Loading...");

  const fetchData = async () => {
    try {
      const res = await fetch("https://tejas-backend1.onrender.com/api/sensors");
      const json = await res.json();
      setData(json);
      setStatus(json.fireDetected ? "🔥 Fire Detected!" : "✅ Safe");
    } catch (err) {
      setStatus("❌ Error fetching data");
    }
  };

  useEffect(() => {   
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center ${data?.fireDetected ? "fire-bg" : "safe-bg"}`}>
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-2xl shadow-lg text-center text-white w-[400px]">
        <h1 className="text-4xl font-bold mb-6">🔥 Tejas Fire Monitor</h1>
        {data ? (
          <>
            <p className="text-xl">LDR: <b>{data.ldr}</b></p>
            <p className="text-xl">Temperature: <b>{data.temp}°C</b></p>
            <p className="text-xl">Smoke: <b>{data.smoke}</b></p>
            <p className="text-xl mt-4">
              Status: <span className={`font-bold ${data.fireDetected ? "text-red-500" : "text-green-300"}`}>{status}</span>
            </p>
            <p className="text-sm mt-2">Last Updated: {data.timestamp}</p>
          </>
        ) : (
          <p className="text-white text-lg">{status}</p>
        )}
        <button
          onClick={fetchData}
          className="mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-lg"
        >
          🔄 Refresh
        </button>
      </div>
    </div>
  );
}

function SensorsInfo() {
  return (
    <div className="p-10 text-white bg-gradient-to-r from-green-900 to-green-700 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">📘 Sensors Used</h1>
      <ul className="space-y-4 text-xl">
        <li><b>LDR:</b> Detects ambient light intensity. <br/> <a href="https://en.wikipedia.org/wiki/Photoresistor" target="_blank" rel="noreferrer" className="underline text-blue-300">Read more</a></li>
        <li><b>MQ2:</b> Gas/smoke sensor for fire/smoke detection. <br/> <a href="https://components101.com/sensors/mq2-gas-sensor" target="_blank" rel="noreferrer" className="underline text-blue-300">Read more</a></li>
        <li><b>DHT11:</b> Temperature & Humidity sensor. <br/> <a href="https://components101.com/sensors/dht11-temperature-sensor" target="_blank" rel="noreferrer" className="underline text-blue-300">Read more</a></li>
      </ul>
    </div>
  );
}

function HardwareInfo() {
  return (
    <div className="p-10 text-white bg-gradient-to-r from-purple-900 to-purple-700 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">🔌 ESP8266 & Circuit</h1>
      <p className="text-xl mb-4">
        The <b>ESP8266</b> is a Wi-Fi microcontroller used to send sensor data to our backend server.
      </p>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/ESP8266_NodeMCU_devkit_1.0.jpg/800px-ESP8266_NodeMCU_devkit_1.0.jpg"
        alt="ESP8266"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
      <p className="mt-4 text-lg">It connects to LDR, MQ2, and DHT11 via digital/analog pins and powers the alert system (buzzer/LED).</p>
      <a href="https://randomnerdtutorials.com/esp8266-nodemcu-pinout-reference/" target="_blank" rel="noreferrer" className="underline text-blue-300 text-lg mt-3 block">Read more about ESP8266</a>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="flex justify-center gap-10 p-5 bg-black text-white text-lg font-medium">
      <Link to="/">Live Monitor</Link>
      <Link to="/sensors">Sensors</Link>
      <Link to="/hardware">ESP8266</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 text-white font-sans">
        {/* Navigation */}
        <nav className="flex justify-center gap-6 py-4 bg-gray-900 text-lg shadow-md sticky top-0 z-50">
          <Link to="/">Live Monitor</Link>
          <Link to="/sensors">Sensors</Link>
          <Link to="/esp8266">ESP8266</Link>
          <Link to="/references">References</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LiveMonitor />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/esp8266" element={<ESP8266 />} />
          <Route path="/references" element={<References />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
