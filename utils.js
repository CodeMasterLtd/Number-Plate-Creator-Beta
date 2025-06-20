(function(_) {
  const W = window,
        L = W.location,
        R = 'noShow.html';

  if (W.innerWidth < 768) {
    L.href = R;
  }
})();

function compareVersions(verA, verB) {
    const partsA = verA.split('.').map(Number);
    const partsB = verB.split('.').map(Number);
    
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
      const a = partsA[i] || 0;
      const b = partsB[i] || 0;
      if (a > b) return 1;
      if (a < b) return -1;
    }
    return 0;
  }

  
