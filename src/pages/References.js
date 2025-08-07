import React from "react";

const references = [
  {
    name: "MQ2 Smoke Sensor",
    image: "https://components101.com/sites/default/files/component_pin/MQ2-Gas-Sensor-Pinout.png",
    link: "https://components101.com/sensors/mq2-gas-sensor",
    description:
      "The MQ2 sensor detects gases like LPG, smoke, alcohol, propane, hydrogen, and methane. It's ideal for fire detection and air quality monitoring."
  },
  {
    name: "LDR (Light Dependent Resistor)",
    image: "https://www.electronics-tutorials.ws/wp-content/uploads/2018/05/resist8.gif",
    link: "https://www.electronics-tutorials.ws/light/light_2.html",
    description:
      "An LDR changes its resistance based on light intensity. It is commonly used for light sensing and day/night detection."
  },
  {
    name: "DHT11 Temperature & Humidity Sensor",
    image: "https://components101.com/sites/default/files/component_pin/DHT11-Pinout.png",
    link: "https://components101.com/sensors/dht11-temperature-sensor",
    description:
      "DHT11 measures temperature and humidity. It's a low-cost digital sensor suitable for basic environmental monitoring."
  },
  {
    name: "ESP8266 WiFi Module",
    image: "https://components101.com/sites/default/files/component_pin/ESP8266-Pinout.png",
    link: "https://components101.com/wireless/esp8266-pinout-features",
    description:
      "The ESP8266 is a microcontroller with built-in WiFi. It's widely used in IoT projects to connect sensors to the cloud or server."
  }
];

function Reference() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">📚 Sensor References</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {references.map((sensor, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 p-6 rounded-xl shadow-md hover:scale-105 transition"
          >
            <h2 className="text-2xl font-semibold mb-3">{sensor.name}</h2>
            <img
              src={sensor.image}
              alt={sensor.name}
              className="rounded-lg mb-4 w-full h-48 object-contain bg-white p-2"
            />
            <p className="text-sm mb-3">{sensor.description}</p>
            <a
              href={sensor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              🔗 Learn more about {sensor.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reference;
