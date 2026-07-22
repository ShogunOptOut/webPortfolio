window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        setTimeout(() => {
            location.reload();
        }, 100); // 0,1 Sekunde warten
    }
});


function startMatrix() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  const letters = "アカサタナハマヤラワ";
  const fontSize = 18;
  let columns;
  let drops;


  // ===== CURSOR SETUP =====
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  const cursorDot = document.createElement("div");
  cursorDot.className = "cursor-dot";
  document.body.appendChild(cursorDot);

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.opacity = "1";
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";

    cursor.style.opacity = "1";
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // ===== CLICK ANIMATION =====
  document.addEventListener("click", () => {
    cursor.classList.add("click");
    setTimeout(() => cursor.classList.remove("click"), 300);
  });

  // ===== HOVER PULSE =====
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  
  // ===== NAVIGATION DELAY =====
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) return;
      if (link.target === "_blank") return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

      event.preventDefault();

      setTimeout(() => {
      
        document.body.style.opacity = "0";
        window.location.href = href;
      }, 400);
    });
  });

  // ===== TRAIL =====
  const trail = [];
  const trailLength = 5;

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

      dot.style.opacity = `${1 - index * 0.05}`;
      dot.style.transform = `translate(-50%, -50%) scale(${1 - index * 0.05})`;

      const next = trail[index + 1] || { style: { left: x, top: y } };

      x += ((parseFloat(next.style.left) || x) - x) * 0.8;
      y += ((parseFloat(next.style.top) || y) - y) * 0.8;
    });

    requestAnimationFrame(animateTrail);
  }

  animateTrail();


  // ===== MATRIX =====
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

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(26, 110, 60, 0.23)";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.9) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 50);
  window.addEventListener("resize", resize);
}

startMatrix();


const worte = [
  "Webdesigner",
  "Webentwickler",
  "Fullstack-Entwickler",
  "Automatisierer",
  "Anwendungsentwickler"
];

let index = 0;
const ziel = document.getElementById("wechselwort");

function wortWechseln() {

    // 1. Fade-Out starten
    ziel.style.animation = "fadeOut 0.7s forwards";

    setTimeout(() => {
        // 2. Wort wechseln
        ziel.textContent = worte[index];
        index = (index + 1) % worte.length;

        // 3. Fade-In starten
        ziel.style.animation = "fadeIn 0.7s forwards";
    }, 600); // nach Ende des Fade-Out
}

// erstes Wort sofort anzeigen
setTimeout(() => {
  ziel.textContent = worte[0]
  ziel.style.animation = "fadeIn 0.7s backwards";
}, 500);
// alle 3 Sekunden wechseln
setInterval(wortWechseln, 2500);
