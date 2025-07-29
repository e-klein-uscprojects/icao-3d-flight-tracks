mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';  // ← Replace with your token

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-118.4081, 33.9425],
  zoom: 11,
  pitch: 60,
  bearing: -20
});

let altitudeChart;

// Map airport to filename
const fileMap = {
  KLAX: "ils_25l_klax.json",
  KSFO: "rnav_28l_ksfo.json",
  KDEN: "vor_33r_kden.json"
};

document.getElementById("airport-selector").addEventListener("change", e => {
  const airport = e.target.value;
  loadProcedures(airport);
});

function loadProcedures(airport) {
  fetch(`/data/${fileMap[airport]}`)
    .then(res => res.json())
    .then(data => {
      removeLayer("arrival-layer");
      removeLayer("departure-layer");
      plotProcedure(data.arrival, "arrival-layer", "#007bff");
      plotProcedure(data.departure, "departure-layer", "#ffa500");
      drawAltitudeChart([...data.arrival, ...data.departure]);
    });
}

function plotProcedure(points, layerId, color) {
  const geojson = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: points.map(p => [p.lon, p.lat])
    }
  };

  map.addSource(layerId, { type: "geojson", data: geojson });
  map.addLayer({
    id: layerId,
    type: "line",
    source: layerId,
    paint: {
      "line-color": color,
      "line-width": 3
    }
  });
}

function removeLayer(id) {
  if (map.getLayer(id)) map.removeLayer(id);
  if (map.getSource(id)) map.removeSource(id);
}

function drawAltitudeChart(points) {
  const altitudes = points.map(p => p.altitude);
  const distances = points.map(p => p.distance);
  if (altitudeChart) altitudeChart.destroy();

  const ctx = document.getElementById("altitude-chart").getContext("2d");
  altitudeChart = new Chart(ctx, {
    type: "line",
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

// Auto-load default
loadProcedures("KLAX");
