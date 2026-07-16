

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

    cursor.style.opacity = "0.8";
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




// ===== PARALLAX =====
window.addEventListener("scroll", function () {
  const section = document.querySelector(".parallax-section");
  const rect = section.getBoundingClientRect();
  
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    section.classList.add("show");
  } else {
    section.classList.remove("show");
  }

  let scrollY = window.scrollY;
  let speed = 4;

  section.style.backgroundPosition = "center " + scrollY * speed + "px";
});



// ===== KLICK-GAME =====
if (document.getElementById("game")) {

    const symbols = [
        "ア", "カ", "サ", "タ", "ナ",
        "ハ", "マ", "ヤ", "ラ", "ワ"
    ];

    let gameStarted = false;
    let gameTimer;
    let timeoutId;

    let score = 0;
    let gameTime = 10;
    let gameOver = false;

    let target;
    let scoreElement;
    let timeElement;

    function cacheElements() {

        target = document.getElementById("target");
        scoreElement = document.getElementById("score");
        timeElement = document.getElementById("time");

        target.addEventListener("click", handleTargetClick);
    }

    function moveTarget() {

        const game = document.getElementById("game");

        const maxX = game.clientWidth - 50;
        const maxY = game.clientHeight - 50;

        target.style.left =
            Math.random() * maxX + "px";

        target.style.top =
            (Math.random() * (maxY - 50) + 50) + "px";

        target.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];
    }

    function spawnTarget() {

        if (gameOver) return;

        moveTarget();
    }

    function startGameTimer() {

        gameTimer = setInterval(() => {

          // gameTime-- == gameTime - 1
            gameTime--;
            timeElement.textContent = gameTime;

            if (gameTime <= 0) {

                gameOver = true;

                clearInterval(gameTimer);
                clearTimeout(timeoutId);

                let bewertung = "";

if (score > 9) {

    bewertung = "Geschafft! Die Hoffnung ist noch nicht verloren. -!Morpheus";

} else {

    bewertung = "Agent Smith hat uns gefunden. Wir sind gefangen in der Matrix ...";

}

document.getElementById("game").innerHTML = `
    <div class="game-over">
        <h2>GAME OVER</h2>
        <p>Punkte: ${score}</p>
        <p>${bewertung}</p>
        <button id="restartBtn">
            Neustarten
        </button>
    </div>
`;
                document
                    .getElementById("restartBtn")
                    .addEventListener(
                        "click",
                        restartGame
                    );
            }
        }, 1000);
    }

    function handleTargetClick() {

        if (gameOver) return;

        if (!gameStarted) {
            gameStarted = true;
            startGameTimer();
            spawnTarget();
        }

        score++;
        scoreElement.textContent = score;

        spawnTarget();
    }

    function restartGame() {

        clearInterval(gameTimer);
        clearTimeout(timeoutId);

        gameStarted = false;
        gameOver = false;

        score = 0;
        gameTime = 10;

        document.getElementById("game").innerHTML = `
            <div class="game-header">

                <span>
                    Zeit: <span id="time">10</span>s
                </span>
                <span>
                    Punkte: <span id="score">0</span>
                </span>
            </div>

            <div id="target">
                ア
            </div>`
            ;

        cacheElements();
        moveTarget();
    }

    cacheElements();
    moveTarget();
}


const worte = [
  "Web Designer",
  "Web Entwickler",
  "Fullstack Entwickler",
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
  ziel.textContent = worte[4]
  ziel.style.animation = "fadeIn 0.7s backwards";
}, 500);
// alle 3 Sekunden wechseln
setInterval(wortWechseln, 2500);
