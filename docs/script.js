mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5rbGVpbi1sb3NhbmdlbGVzIiwiYSI6ImNtZG54b2F5aDF1anAyaW9zdzBub2FsZTEifQ.mvGz0tEuU9cHMgmQ2XyhZw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  center: [-118.40, 33.94], // Example: LAX Airport
  zoom: 12,
  pitch: 60,
  bearing: -20
});

map.on('load', () => {
  // Final Approach Segment
  map.addLayer({
    id: 'final-approach',
    type: 'line',
    source: {
      type: 'geojson',
      data: 'data/final.json' // Replace with actual path to your GeoJSON file
    },
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: {
      'line-color': '#00FF00',
      'line-width': 4
    }
  });

  // Missed Approach Segment
  map.addLayer({
    id: 'missed-approach',
    type: 'line',
    source: {
      type: 'geojson',
      data: 'data/missed.json' // Replace with actual path to your GeoJSON file
    },
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: {
      'line-color': '#FF0000',
      'line-width': 4,
      'line-dasharray': [2, 2]
    }
  });
});
