const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const matrixDisplay = document.getElementById("matrixDisplay");

function update() {
  const rot = document.getElementById("rot").value * Math.PI / 180;
  const scale = parseFloat(document.getElementById("scale").value);
  const shear = parseFloat(document.getElementById("shear").value);
  const moveX = parseFloat(document.getElementById("moveX").value);
  const moveY = parseFloat(document.getElementById("moveY").value);

  // Matrix
  const a = scale * Math.cos(rot);
  const b = scale * Math.sin(rot);
  const c = shear;
  const d = scale * Math.cos(rot);

  const matrix = [
    [a.toFixed(3), b.toFixed(3), moveX.toFixed(3)],
    [c.toFixed(3), d.toFixed(3), moveY.toFixed(3)],
    [0, 0, 0]
  ];

  matrixDisplay.textContent =
    `[ ${matrix[0].join("   ")} ]\n` +
    `[ ${matrix[1].join("   ")} ]\n` +
    `[ ${matrix[2].join("   ")} ]`;

  // Canvas render
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(250, 250);

  // Achsen
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(-250, 0);
  ctx.lineTo(250, 0);
  ctx.moveTo(0, -250);
  ctx.lineTo(0, 250);
  ctx.stroke();

  // Transformation anwenden
  ctx.transform(a, b, c, d, moveX, moveY);

  // Quadrat zeichnen
  ctx.fillStyle = "lime";
  ctx.fillRect(-50, -50, 100, 100);

  ctx.restore();
}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", update);
});

update();
