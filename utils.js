    const majorVersion ="4";
    const currentVersion = "4.1.0.0";
    const loginForm = true;
    const inactiveTime = "2m";
    localStorage.setItem("loginForm", loginForm);
    localStorage.setItem("inactiveTime", inactiveTime);

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = parseInt(localStorage.getItem("Index")) || 1;

    // Ensure Index is always at least 1
    function clearCurrentSettings() {
        if (currentIndex < 1) {
            localStorage.clear();
            currentIndex = 1;
            localStorage.setItem("Index", currentIndex);
        }
    }

    // Redirect to loading screen
    function goToLoading() {
        window.location.href = 'loading.html';
    }

    // Button elements
    const musicBtn = document.getElementById('musicBtn');
    const creatorBtn = document.getElementById('creatorBtn');
    const miscBtn = document.getElementById('miscBtn');

    const onIndexPage = location.pathname.endsWith("index.html");
    const fromIndex = sessionStorage.getItem('fromIndex') === 'yes';

    if (musicBtn && creatorBtn && miscBtn) {
        if (onIndexPage) {
            sessionStorage.setItem('fromIndex', 'yes');
        }

        if (fromIndex) {
            musicBtn.addEventListener('click', goToLoading);
            creatorBtn.addEventListener('click', goToLoading);
            miscBtn.addEventListener('click', goToLoading);
            sessionStorage.removeItem('fromIndex');
        } else {
            musicBtn.onclick = () => window.location.href = 'music.html';
            creatorBtn.onclick = () => window.location.href = 'creator.html';
            miscBtn.onclick = () => window.location.href = 'miscPlates.html';
        }
    }

    clearCurrentSettings();
});


(async function trackGlobalVisit() {
    const v = typeof currentVersion !== "undefined" ? currentVersion : "v4";
    const today = new Date().toISOString().split('T')[0];
    const url = `number-plate-creator.codemaster_${v}.ltd`;
    const shouldFetchCounts = false;

    const dailyElem = document.getElementById('dailyUserCount');
    const allTimeElem = document.getElementById('allTimeUserCount');

    try {
        let dailyData = {};
        let allTimeData = {};

        if (shouldFetchCounts) {
            if (dailyElem) {
                const dailyRes = await fetch(`https://api.counterapi.dev/v1/${url}/visits-${today}/up`);
                dailyData = await dailyRes.json();
                dailyElem.style.display = "block";
            }
            if (allTimeElem) {
                const allTimeRes = await fetch(`https://api.counterapi.dev/v1/${url}/visits-alltime/up`);
                allTimeData = await allTimeRes.json();
                allTimeElem.style.display = "block";
            }
        } else {
            if (dailyElem) dailyElem.style.display = "none";
            if (allTimeElem) allTimeElem.style.display = "none";
        }

        const dailyCount = (dailyData && typeof dailyData.count !== "undefined") ? dailyData.count : "";
        const allTimeCount = (allTimeData && typeof allTimeData.count !== "undefined") ? allTimeData.count : "";
        if (dailyElem) dailyElem.textContent = `Daily Visitors: ${dailyCount}`;
        if (allTimeElem) allTimeElem.textContent = `All-Time Visitors: ${allTimeCount}`;
    } catch (error) {
        console.error("Counter API error:", error);
        if (dailyElem) dailyElem.style.display = "none";
        if (allTimeElem) allTimeElem.style.display = "none";
    }
})();

const _C = ["Code Master", "https://codemaster.ltd", 2024];
document.addEventListener("DOMContentLoaded", () => {
    const c = document.getElementById('copyright');
    if (!c) return;
    const y = new Date().getFullYear(), s = _C[2], r = _R, 
        d = s === y ? r(y) : `${r(s)} - ${r(y)}`,
        l = `<a href="${_C[1]}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">${_C[0]}</a>`;
    c.innerHTML = `&copy; ${d} ${l}. All rights reserved.`;
});
function _R(n) {
    if (typeof n !== "number" || n < 1) return "";
    const r = [
        [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
        [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
        [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    let s = "";
    for (let i = 0; i < r.length; i++)
        while (n >= r[i][0]) s += r[i][1], n -= r[i][0];
    return s;
}

document.addEventListener("DOMContentLoaded", () => {
    const PageNames = () => {
      const baseTitle = "Number Plate Creator";
      const baseDescription = "Empower yourself to craft and preserve custom uk number plates, seamlessly integrating them into your personalized vehicle designs for Grand Theft Auto V or any other creative project you have in mind.";

      const pageMap = {
        "index.html":        { title: "Home",         desc: "Create and customize your number plates with ease." },
        "loading.html":      { title: "Loading",      desc: "Preparing the Number Plate Creator experience." },
        "music.html":        { title: "Music Controls", desc: "Control your background music while designing plates." },
        "creator.html":      { title: "Creator",      desc: baseDescription },
        "miscPlates.html":   { title: "Misc Plates",  desc: "Explore miscellaneous plate styles and formats." },
        "slideshow.html":    { title: "Slideshow",    desc: "View your plates in a stylish slideshow mode." },
        "version.html":      { title: "Changelogs",   desc: "Check out the latest updates and changes." },
        "noShow.html":       { title: "Unsupported Device", desc: "This device is not supported by the Number Plate Creator." }
      };

      const currentPage = location.pathname.split("/").pop();
      const pageInfo = pageMap[currentPage] || { title: "Unknown Page", desc: "Explore the Number Plate Creator." };

      document.title = `${baseTitle} • ${pageInfo.title}`;

      let descMeta = document.querySelector("meta[name='description']");
      if (!descMeta) {
        descMeta = document.createElement("meta");
        descMeta.name = "description";
        document.head.appendChild(descMeta);
      }
      descMeta.content = pageInfo.desc;

      let keywordsMeta = document.querySelector("meta[name='keywords']");
      if (!keywordsMeta) {
        keywordsMeta = document.createElement("meta");
        keywordsMeta.name = "keywords";
        keywordsMeta.content = "GTA V, number plate generator, license plate maker, custom plates, GTA mods, GTA5Mods, LCPDFR, Code Master, Code Master Ltd, number plate creator, vehicle customization, GTA V number plates, carreg, crip developments, plate generator";
        document.head.appendChild(keywordsMeta);
      }
    };

    PageNames();
  });