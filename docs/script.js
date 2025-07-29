mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9',
  center: [-118.4080, 33.9500],
  zoom: 12
});

map.on('load', () => {
  fetch('data/ils_25l_klax.json')
    .then(res => res.json())
    .then(data => {
      map.addSource('ils-track', {
        type: 'geojson',
        data: data
      });

      map.addLayer({
        id: 'ils-line',
        type: 'line',
        source: 'ils-track',
        layout: {},
        paint: {
          'line-color': '#00ffff',
          'line-width': 4
        }
      });
    });
});

