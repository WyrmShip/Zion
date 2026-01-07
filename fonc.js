/* ================= FIREBASE ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  off
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

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
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("chat-messages");
  if (!box) return;

  box.innerHTML = ""; // 🔥 clear once (important)

  onChildAdded(chatRef, (snap) => {
    const msg = snap.val();
    if (!msg) return;

    const line = document.createElement("div");
    line.className = "chat-line";
    line.textContent = `[${msg.user}] > ${msg.text}`;

    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  });
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
