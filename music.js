(() => {
  const _s = [
    { f: "SameOldSong", n: "Same Old Song", a: "Vibe Chemistry & HARLEE" },
    { f: "Tattoo", n: "Tattoo", a: "Loreen" },
    { f: "TheFeeling", n: "The Feeling", a: "The Feeling Lost Frequencies (Andromedik Deluxe Mix)" },
    { f: "FeelTheVibration", n: "Feel The Vibration", a: "Kanine" },
    { f: "glue", n: "Glue", a: "Bicep (Original Mix)" },
    { f: "sweetlove", n: "Sweet Love", a: "Vibe Chemistry & Debbie" },
    { f: "touch", n: "Touch", a: "Hybrid Minds (ft. Catching Cairo)" },
    { f: "nevertooold", n: "Never Too Old", a: "Monrroe (ft. Emily Makis)" },
    { f: "overdrive", n: "Overdrive", a: "Ofenbach (ft. Norma Jean Martine)"},
    { f: "rage", n: "Rage", a: "Charlotte Plank (Lens Remix)"}
  ].sort((x, y) => x.n.localeCompare(y.n));

  const _q = (id) => document.getElementById(id),
        _p = (sel) => document.querySelector(sel),
        A = _q("loading-music"),
        I = _q("musciInfo"),
        M = _p(".music-info p");

  let i = parseInt(localStorage.getItem("musicIndex")) || 0;
  A.src = `audio/${_s[i].f}.mp3`;
  A.volume = parseFloat(localStorage.getItem("musicVolume")) || 0.05;
  A.muted = localStorage.getItem("musicMuted") === "true";
  A.currentTime = parseFloat(localStorage.getItem("musicTime")) || 0;

  const U = () => {
    if (screen.width < 768 && location.pathname.endsWith("slideshow.html")) {
      A.muted = true;
    }
    const t = _s[i];
    M.innerHTML = `<strong class="fancy-font" style="color: ${A.muted ? 'red' : 'green'};">${t.n} <span style="color: white;">•</span> <strong style="color: grey;">${t.a}</strong>`;
    I.classList[A.muted ? 'remove' : 'add']("rotating");

    if (location.pathname.endsWith("slideshow.html")) {
      if (A.muted) {
      document.title = `Number Plate Creator • Slideshow`;
      } else {
        document.title = `Number Plate Creator • Slideshow • ${t.n} - ${t.a}`;
      }
    }

  };

  document.addEventListener("DOMContentLoaded", () => {
    U();
    let z = false;

    const _play = () => !z && (A.play().catch(e => console.log("Autoplay blocked:", e)), z = true);
    document.body.addEventListener("click", _play);
    document.body.addEventListener("keydown", _play);
    _play();

    const p = _q("plateInput"),
          s = _q("sloganInput"),
          b = _q("BSDInput");

    document.addEventListener("keydown", (e) => {
      const a = document.activeElement;
      if ([p, s, b].includes(a)) return;

      switch (e.code) {
        case "Digit3": A.volume = Math.min(1, A.volume + 0.05); break;
        case "Digit4": A.volume = Math.max(0, A.volume - 0.05); break;
        case "Space": e.preventDefault(); A.muted = !A.muted; U(); localStorage.setItem("musicMuted", A.muted); break;
        case "Digit1":
          i = (i - 1 + _s.length) % _s.length;
          U();
          A.src = `audio/${_s[i].f}.mp3`;
          A.play().catch(console.log);
          break;
        case "Digit2":
          i = (i + 1) % _s.length;
          U();
          A.src = `audio/${_s[i].f}.mp3`;
          A.play().catch(console.log);
          break;
      }
    });

    ["play", "pause"].forEach(evt => A.addEventListener(evt, U));
  });

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("musicTime", A.currentTime);
    localStorage.setItem("musicIndex", i);
    localStorage.setItem("musicVolume", A.volume);
    localStorage.setItem("musicMuted", A.muted);
  });

  A.addEventListener("ended", () => {
    if (A.paused) return;
    i = (i + 1) % _s.length;
    A.src = `audio/${_s[i].f}.mp3`;
    A.play().catch(console.log);
    U();
  });
})();