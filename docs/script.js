function drawTrack(data) {
  const canvas = document.getElementById('flightCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#00ffff';
  ctx.lineWidth = 2;

  data.track.forEach((point, index) => {
    const x = (point.lon + 180) * 2.5;  // Longitude scaling
    const y = canvas.height - (point.lat + 90) * 2.5;  // Latitude scaling

    if (index === 0) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

fetch('data/ils_25l_klax.json')
  .then(res => res.json())
  .then(drawTrack)
  .catch(err => {
    console.error("Failed to load flight data:", err);
  });
