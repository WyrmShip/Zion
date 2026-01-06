// BUTTON NAVIGATION
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

function sendMessage() {
    const input = document.getElementById("chat-input");
    if (!input.value.trim()) return;

    addLine("> " + input.value);
    input.value = "";
}

function addLine(text) {
    const box = document.getElementById("chat-messages");
    const line = document.createElement("div");
    line.textContent = text;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
}

// INSTAGRAM
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
