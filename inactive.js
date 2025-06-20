const InactivityTimer = {
    timeoutId: null,
    events: ["mousemove", "keydown", "mousedown", "touchstart"],
    timePresets: {
        "5s": 5e3,
        "30s": 30e3,
        "1m": 60e3,
        "2m": 120e3,
        "5m": 300e3,
        "10m": 600e3
    },
    getInactiveDuration() {
        const key = localStorage.getItem("inactiveTime") || "2m";
        return this.timePresets[key] || 30e3;
    },
    resetTimer() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            window.location.href = "slideshow.html";
        }, this.getInactiveDuration());
    },
    init() {
        this.events.forEach(event =>
            window.addEventListener(event, this.resetTimer.bind(this))
        );
        this.resetTimer();
    }
};

InactivityTimer.init();
