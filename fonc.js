/* ===== NAVIGATION ===== */
document.querySelectorAll(".buttons a").forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();

        document.querySelectorAll(".buttons a").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
        document.getElementById(btn.dataset.section).classList.add("active");

        if (btn.dataset.section === "instagram-section") loadInstagram();
    });
});

/* ===== SOCKET CHAT ===== */
const socket = io("https://zion-backend.onrender.com");
const ROOM = "zion-global";

socket.emit("join_room", ROOM);

function sendMessage() {
    const input = document.getElementById("chat-input");
    if (!input.value.trim()) return;

    socket.emit("send_message", {
        room: ROOM,
        text: input.value
    });

    input.value = "";
}

socket.on("receive_message", data => {
    const box = document.getElementById("chat-messages");
    const line = document.createElement("div");
    line.className = "chat-line";
    line.textContent = `[${data.time}] ${data.text}`;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
});

/* ===== INSTAGRAM ===== */
function loadInstagram() {
    const posts = [
        "https://www.instagram.com/p/DMAiPwwspDz/",
        "https://www.instagram.com/p/DNtr9Zx2CFL/",
        "https://www.instagram.com/p/DLnPGSrsCXC/",
        "https://www.instagram.com/p/DLNeAnlssHB/"
    ];

    const grid = document.querySelector(".instagram-grid");
    grid.innerHTML = "";

    posts.forEach(url => {
        const div = document.createElement("div");
        div.innerHTML = `
          <blockquote class="instagram-media"
            data-instgrm-permalink="${url}">
          </blockquote>`;
        grid.appendChild(div);
    });

    if (window.instgrm) window.instgrm.Embeds.process();
}
