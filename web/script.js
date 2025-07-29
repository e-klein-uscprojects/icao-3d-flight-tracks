mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5rbGVpbi1sb3NhbmdlbGVzIiwiYSI6ImNtZG54b2F5aDF1anAyaW9zdzBub2FsZTEifQ.mvGz0tEuU9cHMgmQ2XyhZw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: [-104.735, 39.845], // Initial focus near track
  zoom: 10,
  pitch: 60,
  bearing: -25,
  antialias: true
});

// Flyover cam after map loads
map.on('load', () => {
  map.flyTo({
    center: [-104.735, 39.845],
    zoom: 13,
    bearing: -45,
    pitch: 70,
    speed: 0.6,
    curve: 1.8,
    easing: t => t
  });

  map.addSource('flight-track', {
    type: 'geojson',
    data: 'data/vor_33r_kden.json'
  });

  // Line segments
  map.addLayer({
    id: 'final-segment',
    type: 'line',
    source: 'flight-track',
    filter: ['==', ['get', 'segment'], 'final approach'],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#00ffff',
      'line-width': 4
    }
  });

  map.addLayer({
    id: 'missed-segment',
    type: 'line',
    source: 'flight-track',
    filter: ['==', ['get', 'segment'], 'missed approach'],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#ff9900',
      'line-width': 4
    }
  });

  // Waypoint dots
  map.addLayer({
    id: 'waypoints',
    type: 'circle',
    source: 'flight-track',
    paint: {
      'circle-radius': 6,
      'circle-color': '#ff00ff',
      'circle-stroke-width': 1,
      'circle-stroke-color': 'white'
    }
  });

  // Labels
  map.addLayer({
    id: 'labels',
    type: 'symbol',
    source: 'flight-track',
    layout: {
      'text-field': ['concat', ['get', 'segment'], ' (', ['get', 'altitude_min'], ')'],
      'text-size': 12,
      'text-offset': [0, 1.5]
    },
    paint: {
      'text-color': '#ffffff'
    }
  });
});

