function startMatrix() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");
  const letters = "アカサタナMMハマヤラワ";
  const fontSize = 16;
  let columns;
  let drops;

  // ===== CURSOR SETUP =====
  document.addEventListener("mousemove", (e) => {
    cursor.style.opacity = "1";
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // ===== RESIZE MATRIX =====
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = (Math.random() * canvas.height) / fontSize;
    }
  }

  resize();

  // ===== DRAW MATRIX =====
  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#07662f";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 33);
  window.addEventListener("resize", resize);
}

startMatrix();
