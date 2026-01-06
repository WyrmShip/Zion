/* =========================
   CONNECT TO CHAT SERVER
========================= */
const socket = io("https://zion-backend.onrender.com");

/* =========================
   BUTTON NAVIGATION
========================= */
document.querySelectorAll('.buttons a').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();

        document.querySelectorAll('.buttons a').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        const id = btn.dataset.section;
        document.getElementById(id).classList.add('active');

        if (id === "instagram-section") loadInstagram();
    });
});

/* =========================
   CHAT FUNCTIONS (REAL)
========================= */
const chatBox = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

function sendMessage() {
    if (!chatInput.value.trim()) return;

    socket.emit("chat-message", chatInput.value);
    chatInput.value = "";
}

/* RECEIVE NEW MESSAGE */
socket.on("chat-message", data => {
    addLine(`> ${data.text}`);
});

/* RECEIVE CHAT HISTORY */
socket.on("chat-history", messages => {
    chatBox.innerHTML = "";
    messages.forEach(msg => {
        addLine(`> ${msg.text}`);
    });
});

/* TERMINAL STYLE LINE */
function addLine(text) {
    const line = document.createElement("div");
    line.textContent = text;
    chatBox.appendChild(line);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* =========================
   INSTAGRAM
========================= */
function loadInstagram() {
    const urls = [
        "https://www.instagram.com/p/DMAiPwwspDz/",
        "https://www.instagram.com/p/DNtr9Zx2CFL/",
        "https://www.instagram.com/p/DLnPGSrsCXC/",
        "https://www.instagram.com/p/DLNeAnlssHB/"
    ];

    const grid = document.querySelector(".instagram-grid");
    grid.innerHTML = "";

    urls.forEach(u => {
        const div = document.createElement("div");
        div.className = "instagram-post";
        div.innerHTML = `
            <blockquote class="instagram-media"
                data-instgrm-permalink="${u}">
            </blockquote>
        `;
        grid.appendChild(div);
    });

    if (window.instgrm) window.instgrm.Embeds.process();
}
