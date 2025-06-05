(() => {
const p = location.pathname.endsWith.bind(location.pathname),
      css = t => (document.head.appendChild(Object.assign(document.createElement('style'),{textContent:t}))),
      add = (q,o) => Object.assign(q.style,o);

    const ALLOW = !0,
      DIR   = "img/background/",
      LOAD  = p("loading.html"),
      CRE   = p("creator.html"),
      start = LOAD ? 1 : 0;

const V = [
  {s:"img/npc.png",   c:"",                           d:""},
  {s:`${DIR}v1.png`,  c:"Credits: 772 Modifications", d:"5XjvTFVRq3"},
  {s:`${DIR}v2.png`,  c:"Credits: 772 Modifications", d:"5XjvTFVRq3"},
  {s:`${DIR}v3.png`,  c:"Credits: 772 Modifications", d:"5XjvTFVRq3"},
  {s:`${DIR}v4.jpg`,  c:"Credits: Code Master",       d:"3MKyscCXkk"},
  {s:`${DIR}v5.jpg`,  c:"Credits: Code Master",       d:"3MKyscCXkk"},
  {s:`${DIR}v6.png`,  c:"Credits: Jack Gamer 45",     d:"JjARfPEpMP"},
  {s:`${DIR}v7.png`,  c:"Credits: Jack Gamer 45",     d:"JjARfPEpMP"},
  {s:`${DIR}v8.png`,  c:"Credits: Crip Developments", d:"ZDCGZCguBW"},
  {s:`${DIR}v9.png`,  c:"Credits: Jack Gamer 45",     d:"JjARfPEpMP"},
  {s:`${DIR}v10.jpg`, c:"Credits: Code Master",       d:"3MKyscCXkk"},
  {s:`${DIR}v11.jpg`, c:"Credits: Code Master",       d:"3MKyscCXkk"}
];

const box = document.querySelector(".bg-slideshow"), slides=[];
for (let i = start; i < V.length; i++){
  const im = Object.assign(new Image,{src:V[i].s});
  i === start && im.classList.add("active");
  box.appendChild(im); slides.push(im);
}

if (!CRE){
  const cred = document.createElement("div");
  add(cred,{position:"fixed",bottom:"30px",right:"28px",color:"rgba(255,255,255,.5)",fontSize:"15px",
            padding:"6px 14px",borderRadius:"8px",zIndex:"99999",fontFamily:"Poppins,sans-serif",
            overflow:"hidden",whiteSpace:"nowrap",width:"260px",boxSizing:"border-box"});
  cred.innerHTML = `<span class="credit-text">${V[start].c}</span>`;
  box.appendChild(cred);

  css(`.credit-text{display:inline-block;transform:translateX(100%);animation:s 1.2s cubic-bezier(.77,0,.18,1) forwards}
       @keyframes s{from{transform:translateX(100%);opacity:0}60%{opacity:1}to{transform:translateX(0);opacity:1}}`);

  const ico = document.createElement("div");
  add(ico,{position:"fixed",bottom:"10px",right:"28px",color:"#fff",fontSize:"15px",
           padding:"6px 14px",borderRadius:"8px",zIndex:"99999",fontFamily:"Poppins,sans-serif"});
  box.appendChild(ico);

  const SVG = `<svg width="22" height="22" viewBox="0 0 71 55" fill="none"
                 xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;">
                 <path d="M60.104 4.552A58.864 58.864 0 0 0 46.852.8...Z" fill="#5865F2"/></svg>`;

  const showDiscord = i => {
    const l = V[i+start].d;
    ico.innerHTML = l ? `<a href="https://discord.com/invite/${l}?utm_source=Discord%20Widget&utm_medium=Connect"
                            target="_blank" style="text-decoration:none;color:inherit;display:inline-block;">${SVG}</a>` : "";
    ico.style.cursor = l ? "pointer" : "default";
  };
  showDiscord(0);

  let cur = 0,
      hop = () => {
        slides[cur].classList.remove("active");
        cur++;
        if (cur >= slides.length) cur = LOAD ? 0 : 1;           // wrap-rule mirrors original
        if (cur === 0 && ALLOW && innerWidth < 768) location.href = "noShow.html";
        slides[cur].classList.add("active");
        cred.innerHTML = `<span class="credit-text">${V[cur+start].c}</span>`;
        showDiscord(cur);
      };

  (!LOAD && start === 0)
    ? setTimeout(() => { slides[0].classList.remove("active"); cur = 1;
                         slides[1].classList.add("active"); cred.textContent = V[1].c;
                         showDiscord(1); setInterval(hop,5e3); }, 5e3)
    : setInterval(hop,5e3);
}
else {
  let c = 0;
  setTimeout(() => {
    const im = box.querySelectorAll("img");
    im[c].classList.remove("active"); c = 1; im[1].classList.add("active");
    setInterval(()=>{im[c].classList.remove("active"); c++;
                     c>=im.length && (c=1); im[c].classList.add("active");},5e3);
  },5e3);
}
})();
