mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5rbGVpbi1sb3NhbmdlbGVzIiwiYSI6ImNtZG54b2F5aDF1anAyaW9zdzBub2FsZTEifQ.mvGz0tEuU9cHMgmQ2XyhZw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v12',
  center: [-104.6737, 39.8617], // Denver (KDEN)
  zoom: 9,
  pitch: 60,
  bearing: -20,
  antialias: true
});

map.on('load', () => {
  map.addSource('flight-track', {
    type: 'geojson',
    data: 'data/vor_33r_kden.json'
  });

  map.addLayer({
    id: 'track-line',
    type: 'line',
    source: 'flight-track',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#00ffff',
      'line-width': 4
    }
  });

  map.addLayer({
    id: 'track-points',
    type: 'circle',
    source: 'flight-track',
    paint: {
      'circle-radius': 6,
      'circle-color': '#ff00ff'
    }
  });
});
