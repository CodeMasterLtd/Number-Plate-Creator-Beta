const _t = { s: null, v: localStorage.getItem("inactiveTime", inactiveTime)}, _e = ["mousemove", "keydown", "mousedown", "touchstart"];
const _ms = { "5s": 5e3, "30s": 3e4, "1m": 6e4, "2m": 12e4, "5m": 3e5, "10m": 6e5 };
function _iT() { return _ms[_t.v] || 5e3; }
function _rT() {
    clearTimeout(_t.s);
    _t.s = setTimeout(() => { location.href = "slideshow.html"; }, _iT());
}
_e.forEach(ev => addEventListener(ev, _rT));
_rT();
const _b = document.getElementById('btc');
_b && (_b.onclick = () => location.href = "creator.html");