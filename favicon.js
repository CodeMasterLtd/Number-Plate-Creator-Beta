(function () {
    const _IMG = [400, 150];
    const _A = ["Code Master", "Number Plate Creator", "https://number-plate-creator.codemaster.ltd/", "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/5bff1d705677c4f1603bd2d1d385f0c3315760cf/img/npc.png", "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/5bff1d705677c4f1603bd2d1d385f0c3315760cf/img/npc_trans.png"];
    const _D = "Empower yourself to craft and preserve custom uk number plates, seamlessly integrating them into your personalized vehicle designs for Grand Theft Auto V or any other creative project you have in mind. Developed by Code Master — Crafted with HTML, CSS, and JavaScript.";
    const _as = [57, 60, 72, 76, 114, 120, 144, 152], _ps = [16, 32, 96, 128, 196];
    let _F = "";
    _as.forEach(s => { _F += `<link rel="apple-touch-icon-precomposed" sizes="${s}x${s}" href="${_A[3]}">\n`; });
    _ps.forEach(s => { _F += `<link rel="icon" type="image/png" href="${_A[3]}" sizes="${s}x${s}">\n`; });
    _F += `
        <meta name="application-name" content="${_A[1]}">
        <meta name="msapplication-TileColor" content="#f1c40f">
        <meta name="msapplication-TileImage" content="${_A[4]}">
        <meta name="msapplication-square70x70logo" content="${_A[4]}">
        <meta name="msapplication-square150x150logo" content="${_A[4]}">
        <meta name="msapplication-wide310x150logo" content="${_A[4]}">
        <meta name="msapplication-square310x310logo" content="${_A[4]}">
`;
const _S = `
        <meta property="og:site_name" content="${_A[1]}">
        <meta property="og:url" content="${_A[2]}">
        <meta property="og:title" content="${_A[1]} - ${_A[0]}">
        <meta property="og:description" content="${_D}">
        <meta property="og:image" content="${_A[4]}">
        <meta property="og:image:secure_url" content="${_A[4]}">
        <meta property="og:image:width" content="${_IMG[0]}">
        <meta property="og:image:height" content="${_IMG[1]}"><meta name="twitter:card" content="summary_large_image">

        <meta name="twitter:title" content="${_A[1]} - ${_A[0]}">
        <meta name="twitter:url" content="${_A[2]}">
        <meta name="twitter:site" content="${_A[0]}">
        <meta name="twitter:description" content="${_D}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="${_A[4]}">
`;
const _M = `
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width">
`;
    function _I(h) {
        const t = document.createElement('div');
        t.innerHTML = h;
        Array.from(t.children).forEach(tag => {
            if (tag.tagName === "LINK" && document.querySelector(`link[rel="${tag.rel}"][sizes="${tag.sizes}"]`)) return;
            if (tag.tagName === "META" && tag.name && document.querySelector(`meta[name="${tag.name}"]`)) return;
            if (tag.tagName === "META" && tag.getAttribute('property') && document.querySelector(`meta[property="${tag.getAttribute('property')}"]`)) return;
            document.head.appendChild(tag);
        });
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            _I(_S);
            _I(_F);
            _I(_M);
        });
    } else {
        _I(_S);
        _I(_F);
        _I(_M);
    }
})();