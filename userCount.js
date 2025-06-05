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