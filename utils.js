(function(_) {
  const $ = (v) => v.split('.').map(Number),
        C = (A, B) => {
          const a = $(A), b = $(B), m = Math.max(a.length, b.length);
          for (let i = 0; i < m; i++) {
            const x = a[i] || 0, y = b[i] || 0;
            if (x !== y) return x > y ? 1 : -1;
          }
          return 0;
        };

  const W = window,
        L = W.location,
        U = L.href,
        I = 'index.html',
        R = 'noShow.html';

  if (W.innerWidth < 768 && !U.includes(I)) {
    L.href = R;
  }
})();
