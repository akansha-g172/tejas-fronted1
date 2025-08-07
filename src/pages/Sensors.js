import React from "react";

function Sensors() {
  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">🧪 Sensors Used</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-yellow-400">1. LDR (Light Dependent Resistor)</h2>
        <p className="mt-2">
          An LDR detects ambient light. In your project, it's used to measure how bright the environment is.
        </p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/LDR.jpg" alt="LDR Sensor" className="w-64 mt-4 rounded-lg shadow-lg" />
        <p className="mt-2 text-sm text-gray-300">📘 Reference: <a href="https://components101.com/sensors/ldr-sensor" target="_blank" rel="noreferrer" className="text-blue-400 underline">LDR Sensor - Components101</a></p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-yellow-400">2. MQ2 Gas/Smoke Sensor</h2>
        <p className="mt-2">
          MQ2 detects smoke and flammable gases. It outputs analog or digital values based on gas density.
        </p>
        <img src="https://components101.com/sites/default/files/component_pin/MQ-2-Gas-Sensor-Pinout.png" alt="MQ2 Sensor" className="w-64 mt-4 rounded-lg shadow-lg" />
        <p className="mt-2 text-sm text-gray-300">📘 Reference: <a href="https://components101.com/sensors/mq2-gas-sensor" target="_blank" rel="noreferrer" className="text-blue-400 underline">MQ2 Gas Sensor - Components101</a></p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-yellow-400">3. DHT11 (Temperature & Humidity Sensor)</h2>
        <p className="mt-2">
          DHT11 gives digital output of temperature and humidity. Useful for detecting heat buildup.
        </p>
        <img src="https://components101.com/sites/default/files/component_pin/DHT11-Pinout.png" alt="DHT11 Sensor" className="w-64 mt-4 rounded-lg shadow-lg" />
        <p className="mt-2 text-sm text-gray-300">📘 Reference: <a href="https://components101.com/sensors/dht11-temperature-sensor" target="_blank" rel="noreferrer" className="text-blue-400 underline">DHT11 Sensor - Components101</a></p>
      </div>
    </div>
  );
}

export default Sensors;
