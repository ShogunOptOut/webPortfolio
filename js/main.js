"use strict";

// ? == MOUSECURSOR CUSTOM ==

const cursor = document.querySelector(".cursor");
let isScrolling;
let isMouseDown = false;

// Mausbewegung überwachen
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
  cursor.style.display = "block"; // Cursor anzeigen
  clearTimeout(isScrolling);
});

// ? Mausradüberwachung
document.addEventListener("wheel", () => {
  cursor.style.display = "none"; // Cursor ausblenden
});

// ? Überwachung, wenn die linke Maustaste gedrückt wird
document.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    isMouseDown = true;
  }
});

// ? Überwachung, wenn die linke Maustaste losgelassen wird
document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// ? Kontinuierliche Aktualisierung des Cursors, während die linke Maustaste gehalten wird
document.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  }
});

// ? Entwicklermodus überprüfen
function checkDevTools() {
  const devtools = /Chrome|Firefox/i.test(navigator.userAgent) && window.outerWidth - window.innerWidth > 100;
  if (devtools) {
    document.body.style.cursor = "auto"; // Standardcursor aktivieren
  } else {
    document.body.style.cursor = "none"; // Standardcursor deaktivieren
  }
}

// ? Regelmäßig auf den Entwicklermodus überprüfen
setInterval(checkDevTools, 1000);

// ? PASSWORT-MODAL

const encryptedPassword = "U29mdHdhcmVFbmdpbmVlcg==";

function openModal() {
  document.getElementById("passwordModal").style.display = "block";
}

function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
}

function checkPassword() {
  const inputPassword = document.getElementById("passwordInput").value;
  const decodedPassword = atob(encryptedPassword);

  if (inputPassword === decodedPassword) {
    window.location.href = "/pages/werdegang.html";
  } else {
    document.getElementById("message").innerText = "Das Passwort ist falsch. Bitte erneut versuchen.";
  }
}

document.getElementById("passwordInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkPassword();
  }
});

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("passwordInput");
  const passwordToggle = document.getElementById("passwordToggle");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordToggle.innerText = "Passwort verbergen";
  } else {
    passwordInput.type = "password";
    passwordToggle.innerText = "Passwort anzeigen";
  }
}

window.onclick = function (event) {
  const modal = document.getElementById("passwordModal");
  if (event.target == modal) {
    closeModal();
  }
};

// ? IMG-MODAL
function openImage(url) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("imageModalContent");
  img.src = url;
  modal.style.display = "block";
}

function closeImage() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

// ? === SCROLLER ===

const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}
function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

