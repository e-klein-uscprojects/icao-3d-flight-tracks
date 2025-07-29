fetch('data/ils_25l_klax.json')
  .then(response => response.json())
  .then(data => {
    const canvas = document.getElementById('flightCanvas');
    const ctx = canvas.getContext('2d');

    data.track.forEach((point, index) => {
      const x = point.lon * 10 + 400;  // Simplified scaling
      const y = 600 - point.lat * 10;

      if (index > 0) {
        const prev = data.track[index - 1];
        const prevX = prev.lon * 10 + 400;
        const prevY = 600 - prev.lat * 10;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
      }
    });
  })
  .catch(err => console.error('Error loading JSON:', err));
