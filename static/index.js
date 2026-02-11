window.addEventListener("load", () => {
    new Container(config.wish, config.time, config.texts);
});

function Container(wish, time, texts) {
    this.passedSeconds = 0;
    this.finalText = wish;
    this.beginDate = time
    this.texts = texts

    this.renderTexts(this.texts);
    document.querySelector('.pass-time .finalText').innerHTML = this.finalText;
    setInterval(() => {
        this.passedSeconds = Math.ceil((+ new Date() - new Date(this.beginDate).getTime()) / 1000);
        let list = ['days', 'hours', 'minutes', 'seconds'];

        list.forEach(item => {
            document.querySelector(`.pass-time .${item}`).innerHTML = this[item]();
        })
    }, 1000);
}

Container.prototype = {
    renderTexts(texts) {
        let div = document.createElement("div");
        texts.forEach(item => {
            let d = document.createElement("div");
            d.innerHTML = item;
            div.appendChild(d);
        })
        document.getElementById("marquee").innerHTML = div.innerHTML;
    },
    finalText() {
        return this.text || "";
    },
    beginDate() {
        return this.time;
    },
    days: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / (3600 * 24));
    },
    hours: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / 3600) % 24;
    },
    minutes: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / 60) % 60;
    },
    seconds: function () {
        if (this.passedSeconds === 0) return "";
        return this.passedSeconds % 60;
    },
};

// --- Riddle unlock (Part 4) ---
window.addEventListener("load", () => {
  const SECRET = "princess"; // <-- поменяй на нужное слово

  const input = document.getElementById("secretInput");
  const btn = document.getElementById("unlockBtn");
  const msg = document.getElementById("riddleMsg");
  const link = document.getElementById("nextLink");

  if (!input || !btn || !msg || !link) return;

  const normalize = (v) => (v || "").trim().toLowerCase();

  const tryUnlock = () => {
    if (normalize(input.value) === normalize(SECRET)) {
      msg.textContent = "Correct. ❤️";
      link.style.display = "inline-block";

      // Если хочешь, чтобы сразу открывалось без кнопки — раскомментируй:
      // window.open("https://vq4.vercel.app", "_blank", "noopener,noreferrer");
    } else {
      msg.textContent = "Not quite. Try again.";
      link.style.display = "none";
    }
  };

  btn.addEventListener("click", tryUnlock);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryUnlock();
  });
});