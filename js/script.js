function startMatrix() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  const letters = "アカサタナMMハマヤラワ";
  const fontSize = 18;
  let columns;
  let drops;

  // ===== CURSOR SETUP (DOT 1) =====
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  // ===== CURSOR SETUP ZWEITER DOT =====
  const cursorDot = document.createElement("div");
  cursorDot.className = "cursor-dot";
  document.body.appendChild(cursorDot);

  // Mouse Position
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // ERSTER DOT SETTINGS
    cursorDot.style.opacity = "0";
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";

    // ZWEITER DOT SETTINGS
    cursor.style.opacity = "0";
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // ===== MAUSKLICK ERKENNEN FÜR ANIMATION =====
  document.addEventListener("click", () => {
    cursor.classList.add("click");

    // Animation zurücksetzen (damit sie erneut abgespielt werden kann)
    setTimeout(() => {
      cursor.classList.remove("click");
    }, 400); // gleiche Dauer wie Animation
  });

  // ===== NAVIGATIONSKLICKS MIT CURSOR-ANIMATION =====
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) return;
      if (link.target === "_blank") return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

      event.preventDefault();

      setTimeout(() => {
        window.location.href = href;
      }, 200);
    });
  });

  // ===== TRAIL SETUP =====
  const trail = [];
  const trailLength = 55;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement("div");
    dot.className = "trail";
    document.body.appendChild(dot);
    trail.push(dot);
  }

  function animateTrail() {
    let x = mouseX;
    let y = mouseY;

    trail.forEach((dot, index) => {
      dot.style.left = x + "px";
      dot.style.top = y + "px";

      dot.style.opacity = `${1 - index * 0.25}`;
      dot.style.transform = `translate(-50%, -50%) scale(${1 - index * 0.05})`;

      const next = trail[index + 1] || { style: { left: x, top: y } };

      x += ((parseFloat(next.style.left) || x) - x) * 0.8;
      y += ((parseFloat(next.style.top) || y) - y) * 0.8;
    });

    requestAnimationFrame(animateTrail);
  }

  animateTrail();

  // ===== MATRIX GRÖSSE =====
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

  // ===== MATRIX ZEICHNEN =====
  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#223b2c";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 50);
  window.addEventListener("resize", resize);
}

startMatrix();

// ===== PARALLAX TEST =====

window.addEventListener("scroll", function () {
  const section = document.querySelector(".parallax-section");
  const rect = section.getBoundingClientRect();

  // Sichtbar → anzeigen
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    section.classList.add("show");
  } else {
    // NICHT sichtbar → wieder verstecken
    section.classList.remove("show");
  }

  // Parallax Effekt bleibt aktiv
  let scrollY = window.scrollY;
  let speed = 4;

  section.style.backgroundPosition = "center " + scrollY * speed + "px";
});
