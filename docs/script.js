mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5rbGVpbi1sb3NhbmdlbGVzIiwiYSI6ImNtZG54b2F5aDF1anAyaW9zdzBub2FsZTEifQ.mvGz0tEuU9cHMgmQ2XyhZw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  center: [-118.40, 33.94], // LAX Airport
  zoom: 12,
  pitch: 60,
  bearing: -20
});

map.on('load', () => {
  // Load the ILS 25L KLAX Flight Track
  map.addLayer({
    id: 'ils-25l-klax',
    type: 'line',
    source: {
      type: 'geojson',
      data: 'data/ils_25l_klax.json' // Make sure this file is located in docs/data/
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#00FFFF',
      'line-width': 4
    }
  });

  // Optional: Add markers for each waypoint (altitudes)
  fetch('data/ils_25l_klax.json')
    .then(response => response.json())
    .then(json => {
      const coords = json.features[0].geometry.coordinates;
      const altitudes = json.features[0].properties.altitudes;

      coords.forEach((coord, i) => {
        new mapboxgl.Marker({ color: '#333' })
          .setLngLat(coord)
          .setPopup(new mapboxgl.Popup().setText(`Altitude: ${altitudes[i]} ft`))
          .addTo(map);
      });
    });
});
