    const majorVersion ="4";
    const currentVersion = "4.1.0.0";
    const loginForm = true;
    const inactiveTime = "2m";
    localStorage.setItem("loginForm", loginForm);
    localStorage.setItem("inactiveTime", inactiveTime);

document.addEventListener('DOMContentLoaded', function() {
    localStorage.getItem("Index");
    let CurrentIndex = 1;

    function ClearCurrentSettings() {
        if (CurrentIndex < 1) {
            localStorage.clear();
            CurrentIndex = 1;
            localStorage.setItem("Index", CurrentIndex);
        }
    }

    const fromIndex = sessionStorage.getItem('fromIndex') === 'yes';
    function goToLoading() {
        window.location.href = 'loading.html';
    }
    const musicBtn = document.getElementById('musicBtn');
    const creatorBtn = document.getElementById('creatorBtn');
    const miscBtn = document.getElementById('miscBtn');

    if (musicBtn && creatorBtn && miscBtn) {
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

    ClearCurrentSettings();
});