import React from "react";

function ESP8266() {
  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">📡 ESP8266 NodeMCU</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-400">What is ESP8266?</h2>
        <p className="mt-2">
          The ESP8266 NodeMCU is a low-cost Wi-Fi microcontroller used for IoT (Internet of Things) projects. It has built-in Wi-Fi and is ideal for reading sensor data and sending it to a server.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-400">Key Features:</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Built-in Wi-Fi Module</li>
          <li>1 Analog Pin (A0), Multiple Digital Pins (D0-D8)</li>
          <li>Uses 3.3V Logic (⚠️ avoid 5V directly!)</li>
          <li>Can be programmed using Arduino IDE</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-400">Pinout Diagram:</h2>
        <img
          src="https://i.imgur.com/OqGLC7j.png"
          alt="ESP8266 Pinout"
          className="w-96 mt-4 rounded-lg shadow-lg"
        />
        <p className="mt-2 text-sm text-gray-300">
          📘 Source: <a href="https://lastminuteengineers.com/wp-content/uploads/iot/ESP8266-Pinout-NodeMCU.png" target="_blank" rel="noreferrer" className="text-blue-400 underline">RandomNerdTutorials.com</a>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-400">Wiring Tips:</h2>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Connect sensors like LDR (A0), MQ2 (D1), DHT11 (D5)</li>
          <li>Use a voltage divider (2 resistors) for 5V sensors to convert to 3.3V if needed</li>
          <li>Use a common ground for all components</li>
        </ul>
      </div>
    </div>
  );
}

export default ESP8266;
