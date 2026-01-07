/* ================= FIREBASE ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

/* ================= USER NAME SYSTEM ================= */
let username = localStorage.getItem("zion_username");

if (!username) {
  username = prompt("Choose your nickname:");
  if (!username || username.trim() === "") {
    username = "guest_" + Math.floor(Math.random() * 9999);
  }
  localStorage.setItem("zion_username", username);
}

/* ================= FIREBASE CONFIG ================= */
const firebaseConfig = {
  apiKey: "AIzaSyCAmtfnW4THCLj9dDGx77Z-MZoEESwyqk8",
  authDomain: "wyrm-chat.firebaseapp.com",
  databaseURL: "https://wyrm-chat-default-rtdb.firebaseio.com",
  projectId: "wyrm-chat",
  storageBucket: "wyrm-chat.firebasestorage.app",
  messagingSenderId: "543614890114",
  appId: "1:543614890114:web:03400887e27a640c01849b"
};

/* ================= INIT FIREBASE ================= */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "zion-chat");

/* ================= NAVIGATION ================= */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".buttons a").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      document.querySelectorAll(".buttons a")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".section")
        .forEach(s => s.classList.remove("active"));
      document.getElementById(btn.dataset.section).classList.add("active");

      if (btn.dataset.section === "instagram-section") loadInstagram();
    });
  });
});

/* ================= CHAT ================= */
function sendMessage() {
  const input = document.getElementById("chat-input");
  if (!input || !input.value.trim()) return;

  push(chatRef, {
    user: username,
    text: input.value,
    time: Date.now()
  });

  input.value = "";
}

/* make function usable from HTML button */
window.sendMessage = sendMessage;

/* ================= RECEIVE MESSAGES ================= */
onChildAdded(chatRef, (snap) => {
  const msg = snap.val();
  const box = document.getElementById("chat-messages");
  if (!box) return;

  const line = document.createElement("div");
  line.className = "chat-line";
  line.textContent = `[${msg.user}] > ${msg.text}`;

  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
});

/* ================= INSTAGRAM ================= */
function loadInstagram() {
  const urls = [
    "https://www.instagram.com/p/DMAiPwwspDz/",
    "https://www.instagram.com/p/DNtr9Zx2CFL/",
    "https://www.instagram.com/p/DLnPGSrsCXC/",
    "https://www.instagram.com/p/DLNeAnlssHB/"
  ];

  const grid = document.querySelector(".instagram-grid");
  if (!grid) return;
  grid.innerHTML = "";

  urls.forEach(u => {
    const div = document.createElement("div");
    div.className = "instagram-post";
    div.innerHTML = `
      <blockquote class="instagram-media" data-instgrm-permalink="${u}"></blockquote>
    `;
    grid.appendChild(div);
  });

  if (window.instgrm) window.instgrm.Embeds.process();
}
