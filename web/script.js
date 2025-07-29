const map = L.map("map").setView([37.5, -120.0], 5);

// Add base tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Define your procedures and styling
const procedures = [
  {
    file: "data/geo/ils_25l_klax.json",
    color: "#ffa500", // orange
    label: "ILS RWY 25L @ KLAX"
  },
  {
    file: "data/geo/rnav_28l_ksfo.json",
    color: "#ff0000", // red
    label: "RNAV RWY 28L @ KSFO"
  },
  {
    file: "data/geo/vor_33r_kden.json",
    color: "#0066cc", // blue
    label: "VOR RWY 33R @ KDEN"
  }
];

// Load each procedure and render
procedures.forEach(({ file, color, label }) => {
  fetch(file)
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        style: {
          color: color,
          weight: 4,
        },
        onEachFeature: (feature, layer) => {
          const seg = feature.properties.segment || "unknown segment";
          layer.bindPopup(`<strong>${label}</strong><br>Segment: ${seg}`);
        }
      }).addTo(map);
    })
    .catch((err) => {
      console.error("Error loading procedure file:", file, err);
    });
});
