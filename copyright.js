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