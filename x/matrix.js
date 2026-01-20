/* ================= FIREBASE ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* 🔒 SECRET CHAT PATH */
const chatRef = ref(db, "x-chat-private");

/* ================= USER ================= */
const username = "matrix";

/* ================= RECEIVE ================= */
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("chat-messages");

  onChildAdded(chatRef, snap => {
    const msg = snap.val();
    if (!msg) return;

    const line = document.createElement("div");
    line.textContent = `> ${msg.text}`;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  });
});

/* ================= SEND ================= */
window.sendMessage = function () {
  const input = document.getElementById("chat-input");
  if (!input.value.trim()) return;

  push(chatRef, {
    text: input.value.trim(),
    time: Date.now()
  });

  input.value = "";
};
