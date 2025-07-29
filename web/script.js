// Initialize Leaflet map
const map = L.map('map').setView([33.9425, -118.4081], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap'
}).addTo(map);

// Chart.js import workaround for direct script
let altitudeChart;

// Airport selector logic
const airportLocations = {
  KLAX: { lat: 33.9425, lon: -118.4081 },
  KSFO: { lat: 37.6188, lon: -122.375 },
  KDEN: { lat: 39.8617, lon: -104.6731 }
};

document.getElementById("airport-selector").addEventListener("change", function () {
  const airport = this.value;
  const { lat, lon } = airportLocations[airport];
  map.setView([lat, lon], 12);
  loadProceduresFor(airport);
  addWeatherOverlay(lat, lon);
});

// Procedure loading and rendering
function loadProceduresFor(airport) {
  fetch(`data/${airport}.json`)
    .then(res => res.json())
    .then(data => {
      clearMapLayers();
      plotArrival(data.arrival);
      plotDeparture(data.departure);
      drawAltitudeChart([...data.arrival, ...data.departure]);
    });
}

function clearMapLayers() {
  map.eachLayer(layer => {
    if (layer.options && layer.options.pane === "overlayPane") map.removeLayer(layer);
  });
}

function plotArrival(points) {
  const coords = points.map(p => [p.lat, p.lon]);
  const line = L.polyline(coords, { color: 'blue', weight: 3 }).addTo(map);
}

function plotDeparture(points) {
  const coords = points.map(p => [p.lat, p.lon]);
  const line = L.polyline(coords, { color: 'orange', weight: 3, dashArray: '4,6' }).addTo(map);
}

// Altitude chart generation
function drawAltitudeChart(procedureData) {
  const altitudes = procedureData.map(p => p.altitude);
  const distances = procedureData.map(p => p.distance);

  if (altitudeChart) altitudeChart.destroy();

  const ctx = document.getElementById('altitude-chart').getContext('2d');
  altitudeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: distances,
      datasets: [{
        label: "Altitude (ft)",
        data: altitudes,
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.1)",
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: "Distance (nm)" } },
        y: { title: { display: true, text: "Altitude (ft)" } }
      }
    }
  });
}

// METAR overlay (demo using aviationweather.gov endpoint)
async function addWeatherOverlay(lat, lon) {
  try {
    const response = await fetch(`https://aviationweather.gov/api/data/metar?coords=${lat},${lon}`);
    const weatherData = await response.json();
    const metar = weatherData[0]?.raw_text || "METAR data unavailable";

    L.marker([lat, lon], {
      title: "METAR",
      icon: L.divIcon({
        className: "weather-icon",
        html: `<span style="background:#0cf;padding:4px;border-radius:6px">${metar}</span>`
      })
    }).addTo(map);
  } catch (err) {
    console.error("METAR fetch error:", err);
  }
}

// Load default airport
loadProceduresFor("KLAX");
addWeatherOverlay(33.9425, -118.4081);
