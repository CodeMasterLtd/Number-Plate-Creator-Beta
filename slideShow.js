(() => {
  const p = location.pathname.endsWith.bind(location.pathname),
        css = t => document.head.appendChild(Object.assign(document.createElement('style'), { textContent: t })),
        add = (q, o) => Object.assign(q.style, o);

  const ALLOW = true,
        TIMER = 6000,
        PCREDIT = "Photo Credits: ",
        PTYPE = [".png", ".jpg", ".jpeg"],
        MPIC = "img/npc.png",
        DIR = "img/background/",
        LOAD = p("loading.html"),
        CRE = p("creator.html"),
        start = LOAD ? 1 : 0;

  const V = [
    { s: `${MPIC}`, c: "", d: "" },
    { s: `${DIR}v20${PTYPE[1]}`, c: "Code Master", d: "3MKyscCXkk" },
    { s: `${DIR}v19${PTYPE[2]}`, c: "Code Master", d: "3MKyscCXkk" },
    { s: `${DIR}v18${PTYPE[0]}`, c: "Dodo McGee", d: "sDSxcRcadH" },
    { s: `${DIR}v17${PTYPE[0]}`, c: "772 Modifications", d: "5XjvTFVRq3" },
    { s: `${DIR}v16${PTYPE[0]}`, c: "772 Modifications", d: "5XjvTFVRq3" },
    { s: `${DIR}v15${PTYPE[0]}`, c: "Jack Gamer 45", d: "JjARfPEpMP" },
    { s: `${DIR}v14${PTYPE[0]}`, c: "Jack Gamer 45", d: "JjARfPEpMP" },
    { s: `${DIR}v13${PTYPE[0]}`, c: "Jack Gamer 45", d: "JjARfPEpMP" },
    { s: `${DIR}v12${PTYPE[0]}`, c: "772 Modifications", d: "5XjvTFVRq3" },
    { s: `${DIR}v11${PTYPE[0]}`, c: "772 Modifications", d: "5XjvTFVRq3" },
    { s: `${DIR}v10${PTYPE[0]}`, c: "772 Modifications", d: "5XjvTFVRq3" },
    { s: `${DIR}v9${PTYPE[1]}`, c: "Code Master", d: "3MKyscCXkk" },
    { s: `${DIR}v8${PTYPE[1]}`, c: "Code Master", d: "3MKyscCXkk" },
    { s: `${DIR}v7${PTYPE[0]}`, c: "Jack Gamer 45", d: "JjARfPEpMP" },
    { s: `${DIR}v6${PTYPE[0]}`, c: "Jack Gamer 45", d: "JjARfPEpMP" },
    { s: `${DIR}v5${PTYPE[0]}`, c: "Crip Developments", d: "ZDCGZCguBW" },
    { s: `${DIR}v4${PTYPE[0]}`, c: "Jack Gamer 45", d: "JjARfPEpMP" },
    { s: `${DIR}v3${PTYPE[1]}`, c: "Code Master", d: "3MKyscCXkk" },
    { s: `${DIR}v2${PTYPE[1]}`, c: "Code Master", d: "3MKyscCXkk" },
    { s: `${DIR}v1${PTYPE[0]}`, c: "Jack Gamer 45", d: "JjARfPEpMP" }
  ];

  const box = document.querySelector(".bg-slideshow"),
        slides = [];

  for (let i = start; i < V.length; i++) {
    const im = Object.assign(new Image(), { src: V[i].s, title: "Number Plate Creator Slideshow" });
    if (i === start) im.classList.add("active");
    box.appendChild(im);
    slides.push(im);
  }

  if (!CRE) {
    const cred = document.createElement("div");
    add(cred, {
      position: "fixed", bottom: "30px", right: "28px", color: "rgba(255,255,255,0.5)", fontSize: "15px",
      padding: "6px 14px", borderRadius: "8px", zIndex: "99999", fontFamily: "Poppins,sans-serif",
      overflow: "hidden", whiteSpace: "nowrap", width: "260px", boxSizing: "border-box"
    });
    cred.innerHTML = `<span class="credit-text">${V[start].c}</span>`;
    box.appendChild(cred);

    css(`.credit-text{display:inline-block;transform:translateX(100%);animation:s 1.2s cubic-bezier(.77,0,.18,1) forwards}
         @keyframes s{from{transform:translateX(100%);opacity:0}60%{opacity:1}to{transform:translateX(0);opacity:0.5}}`);

    const ico = document.createElement("div");
    add(ico, {
      position: "fixed", bottom: "10px", right: "28px", color: "#fff", fontSize: "15px",
      padding: "6px 14px", borderRadius: "8px", zIndex: "99999", fontFamily: "Poppins,sans-serif"
    });
    box.appendChild(ico);

    const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord">
      <path fill="#ffffff" d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
    </svg>`;

    const showDiscord = i => {
      const l = V[i + start].d;
      ico.innerHTML = l ? `<a href="https://discord.com/invite/${l}?utm_source=Discord%20Widget&utm_medium=Connect"
                              target="_blank" style="text-decoration:none;color:inherit;display:inline-block;">${SVG}</a>` : "";
      ico.style.cursor = l ? "pointer" : "default";
    };

    showDiscord(1);

    let cur = 0;
    const hop = () => {
      slides[cur].classList.remove("active");
      cur++;
      if (cur >= slides.length) cur = LOAD ? 0 : 1;
      if (cur === 0 && ALLOW && screen.width < 768) location.href = "noShow.html";
      slides[cur].classList.add("active");
      cred.innerHTML = `<span class="credit-text">${PCREDIT} ${V[cur + start].c}</span>`;
      showDiscord(cur);
    };

    (!LOAD && start === 0)
      ? setTimeout(() => {
          slides[0].classList.remove("active");
          cur = 1;
          slides[1].classList.add("active");
          cred.innerHTML = `<span class="credit-text">${PCREDIT} ${V[1].c}</span>`;
          showDiscord(1);
          setInterval(hop, TIMER);
        }, TIMER)
      : setInterval(hop, TIMER);

  } else {
    let c = 0;
    setTimeout(() => {
      const im = box.querySelectorAll("img");
      im[c].classList.remove("active");
      c = 1;
      im[1].classList.add("active");
      setInterval(() => {
        im[c].classList.remove("active");
        c++;
        if (c >= im.length) c = 1;
        im[c].classList.add("active");
      }, TIMER);
    }, TIMER);
  }
})();

const musicInfo = document.getElementById("musciInfo");
musicInfo.addEventListener("click", () => {
    window.location.href = "music.html";
});
