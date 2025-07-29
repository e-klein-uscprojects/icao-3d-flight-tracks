mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5rbGVpbi1sb3NhbmdlbGVzIiwiYSI6ImNtZG54b2F5aDF1anAyaW9zdzBub2FsZTEifQ.mvGz0tEuU9cHMgmQ2XyhZw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  center: [-118.4080, 33.9500],
  zoom: 12
});

map.on('load', () => {
  fetch('data/ils_25l_klax.json')
    .then(response => response.json())
    .then(data => {
      map.addSource('ils-track', {
        type: 'geojson',
        data: data
      });

      map.addLayer({
        id: 'ils-line',
        type: 'line',
        source: 'ils-track',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#00ffff',
          'line-width': 4
        }
      });
    })
    .catch(error => console.error('Error loading GeoJSON:', error));
});


