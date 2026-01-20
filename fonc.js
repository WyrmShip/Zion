/* ================= FIREBASE ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  off
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

/* ================= NOTIFICATION PERMISSION ================= */
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

/* ================= USERNAME ================= */
let username = localStorage.getItem("zion_username");

if (!username) {
  username = prompt("Choose your nickname:");
  if (!username || username.trim() === "") {
    username = "guest_" + Math.floor(Math.random() * 9999);
  }
  localStorage.setItem("zion_username", username);
}

/* ================= CONFIG ================= */
const firebaseConfig = {
  apiKey: "AIzaSyCAmtfnW4THCLj9dDGx77Z-MZoEESwyqk8",
  authDomain: "wyrm-chat.firebaseapp.com",
  databaseURL: "https://wyrm-chat-default-rtdb.firebaseio.com",
  projectId: "wyrm-chat",
  storageBucket: "wyrm-chat.firebasestorage.app",
  messagingSenderId: "543614890114",
  appId: "1:543614890114:web:03400887e27a640c01849b"
};

/* ================= INIT ================= */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "zion-chat");

/* ================= REALTIME RECEIVE ================= */
let initialLoad = true;

document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("chat-messages");

  onChildAdded(chatRef, (snap) => {
    const msg = snap.val();
    if (!msg || !box) return;

    /* SHOW MESSAGE */
    const line = document.createElement("div");
    line.className = "chat-line";
    line.textContent = `[${msg.user}] > ${msg.text}`;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;

    /* 🔔 NOTIFICATION (only after initial load) */
    if (
      !initialLoad &&
      document.hidden &&
      msg.user !== username &&
      Notification.permission === "granted"
    ) {
      new Notification("New message", {
        body: `${msg.user}: ${msg.text}`
      });
    }
  });

  /* Stop initial-load spam */
  setTimeout(() => {
    initialLoad = false;
  }, 1500);
});

/* ================= SEND MESSAGE ================= */
window.sendMessage = function () {
  const input = document.getElementById("chat-input");
  if (!input || !input.value.trim()) return;

  push(chatRef, {
    user: username,
    text: input.value.trim(),
    time: Date.now()
  });

  input.value = "";
};

/* ================= ENTER KEY SUPPORT ================= */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chat-input");
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});

/* ================= CLEANUP ================= */
window.addEventListener("beforeunload", () => {
  off(chatRef);
});

/* ================= NAVIGATION ================= */
document.querySelectorAll(".buttons a").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();

    document.querySelectorAll(".buttons a").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(btn.dataset.section).classList.add("active");
  });
});
const logo = document.getElementById("logo");

if (logo) {
  logo.addEventListener("click", () => {
    let overlay = document.getElementById("logo-overlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "logo-overlay";
      document.body.appendChild(overlay);
    }

    // FORCE reflow so transition works
    overlay.offsetHeight;

    overlay.classList.add("show");

    // stay 13s, then fade out
    setTimeout(() => {
      overlay.classList.remove("show");

      setTimeout(() => {
        overlay.remove();
        location.href = "/";
      }, 1200); // match CSS transition
    }, 13000);
  });
}

const archiveImages = [
  "/assets/1.png",
  "/assets/2.png",
  "/assets/3.png",
  "/assets/4.png",
  "/assets/5.png",
  "/assets/6.png",
  "/assets/7.png",
  "/assets/8.png"
];

function loadArchive() {
  const grid = document.getElementById("archive-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const shuffled = archiveImages.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 4);

  selected.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    grid.appendChild(img);
  });
}

loadArchive();

