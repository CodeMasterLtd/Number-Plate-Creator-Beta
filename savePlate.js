const fileBegin = "CM";
let lastSelectedPosition = "front";

const type = document.getElementById('plateType').value;

if (type !== 'motorbike') {
    type = 'car';
}

function showSaveModal() {
    document.getElementById("saveModal").style.display = "block";
}

function closeSaveModal() {
    document.getElementById("saveModal").style.display = "none";
}

function showMapModal() {
    document.getElementById("mapModal").style.display = "block";
}

function closeMapModal() {
    document.getElementById("mapModal").style.display = "none";
}

document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        showSaveModal();
    }
});

document.querySelectorAll('.button1').forEach(btn => {
    if (btn.closest('#saveModal')) return;
    btn.addEventListener('click', function (e) {
        if (btn.textContent.includes("Save")) {
            e.preventDefault();
            showSaveModal();
        }
    });
});
function generateSpecMap(imageData) {
    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const isYellow = r > 200 && g > 200 && b < 100;
        if (isYellow) {
            pixels[i] = pixels[i + 1] = pixels[i + 2] = 255; 
        } else {
            const brightness = (r + g + b) / 3;
            const shine = brightness > 200 ? 255 : 40;
            pixels[i] = pixels[i + 1] = pixels[i + 2] = shine;
        }
    }
    return imageData;
}

function generateNormalMap(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const src = imageData.data;
    const normalData = new Uint8ClampedArray(src.length);

    function getGray(x, y) {
        const i = (y * width + x) * 4;
        return (src[i] + src[i + 1] + src[i + 2]) / 3;
    }

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const dx = getGray(x + 1, y) - getGray(x - 1, y);
            const dy = getGray(x, y + 1) - getGray(x, y - 1);
            const dz = 1.0;

            const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const nx = dx / len;
            const ny = dy / len;
            const nz = dz / len;

            const i = (y * width + x) * 4;
            normalData[i] = (nx * 0.5 + 0.5) * 255;
            normalData[i + 1] = (ny * 0.5 + 0.5) * 255;
            normalData[i + 2] = (nz * 0.5 + 0.5) * 255;
            normalData[i + 3] = 255;
        }
    }

    return new ImageData(normalData, width, height);
}

function generateDirtMap(imageData) {
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    function rand(x, y, seed = 0) {
        return Math.abs(Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453) % 1;
    }

    const blotchCount = Math.floor((width * height) / 8000);
    const blotches = [];
    for (let i = 0; i < blotchCount; i++) {
        blotches.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: 20 + Math.random() * 60,
            strength: 0.3 + Math.random() * 0.5
        });
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const brightness = (r + g + b) / 3;

            let dirt = 180 - Math.floor((brightness / 255) * 120);

            dirt += (rand(x, y) - 0.5) * 30;

            for (const blotch of blotches) {
                const dx = x - blotch.x;
                const dy = y - blotch.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < blotch.r) {
                    const factor = 1 - (dist / blotch.r);
                    dirt += blotch.strength * factor * 60;
                }
            }

            dirt = Math.max(60, Math.min(200, dirt));
            pixels[i] = pixels[i + 1] = pixels[i + 2] = dirt;
        }
    }
    return imageData;
}

function generateBurntMap(imageData) {
    const pixels = imageData.data;
const width = imageData.width;
const height = imageData.height;

function rand(x, y, seed = 0) {
    return Math.abs(Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453) % 1;
}

const blotchCount = Math.floor((width * height) / 8000);
const blotches = [];
for (let i = 0; i < blotchCount; i++) {
    blotches.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 20 + Math.random() * 60,
        strength: 0.3 + Math.random() * 0.5
    });
}

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

        let dirt = 180 - Math.floor((brightness / 255) * 120);

        dirt += (rand(x, y) - 0.5) * 30;

        for (const blotch of blotches) {
            const dx = x - blotch.x;
            const dy = y - blotch.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < blotch.r) {
                const factor = 1 - (dist / blotch.r);
                dirt += blotch.strength * factor * 60;
            }
        }

        dirt = Math.max(60, Math.min(200, dirt));
        pixels[i]     = 133; // R
        pixels[i + 1] = 71;  // G
        pixels[i + 2] = 58;  // B
        pixels[i + 3] = Math.round((dirt - 60) / (200 - 60) * 255);
    }
}
return imageData;
}

function showLoadingModal() {
    const modal = document.getElementById('loadingModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loadingModalContent').focus();
    }, 50);
}
function hideLoadingModal() {
    document.getElementById('loadingModal').style.display = 'none';
}

function openMapPreview(position) {
    closeSaveModal();
    lastSelectedPosition = position;
    showLoadingModal();

    const fourDEffect = document.getElementById('showMisc').value;
    const is4D = fourDEffect === "4d-yes";
    const screws = document.getElementById('showMisc').value;
    const isScrews = screws !== "screws-hide";
    const metal = document.getElementById("plateTypes").value;
    const isMetal = metal === "style-metal";

    if (position === 'both') {
        const front = document.querySelector('.plate.front');
        const back = document.querySelector('.plate.back');

        if (!front || !back) {
            hideLoadingModal();
            return alert("Could not find both plate elements.");
        }

        Promise.all([
            html2canvas(front, { scale: 2, useCORS: true, backgroundColor: null }),
            html2canvas(back, { scale: 2, useCORS: true, backgroundColor: null })
        ]).then(([frontCanvas, backCanvas]) => {
            const width = Math.max(frontCanvas.width, backCanvas.width);
            const height = frontCanvas.height + backCanvas.height;

            const combinedCanvas = document.createElement('canvas');
            combinedCanvas.width = width;
            combinedCanvas.height = height;

            const ctx = combinedCanvas.getContext('2d');
            ctx.drawImage(frontCanvas, 0, 0);
            ctx.drawImage(backCanvas, 0, frontCanvas.height);

            const originalData = ctx.getImageData(0, 0, combinedCanvas.width, combinedCanvas.height);

            const burnt = ctx.createImageData(combinedCanvas.width, combinedCanvas.height);
            const dirt = ctx.createImageData(combinedCanvas.width, combinedCanvas.height);
            const spec = ctx.createImageData(combinedCanvas.width, combinedCanvas.height);
            const normal = ctx.createImageData(combinedCanvas.width, combinedCanvas.height);
            const frontData = ctx.getImageData(0, 0, combinedCanvas.width, frontCanvas.height);
            const burntFront = generateBurntMap(new ImageData(new Uint8ClampedArray(frontData.data), combinedCanvas.width, frontCanvas.height));
            const frontDirt = generateDirtMap(new ImageData(new Uint8ClampedArray(frontData.data), combinedCanvas.width, frontCanvas.height));
            const frontSpec = generateSpecMap(new ImageData(new Uint8ClampedArray(frontData.data), combinedCanvas.width, frontCanvas.height));
            const frontNormal = generateNormalMap(new ImageData(new Uint8ClampedArray(frontData.data), combinedCanvas.width, frontCanvas.height));

        for (let y = 0; y < combinedCanvas.height; y++) {
            for (let x = 0; x < combinedCanvas.width; x++) {
                const yf = y % frontCanvas.height;
                const i = (y * combinedCanvas.width + x) * 4;
                const fi = (yf * combinedCanvas.width + x) * 4;
                burnt.data[i] = burntFront.data[fi];
                burnt.data[i + 1] = burntFront.data[fi + 1];
                burnt.data[i + 2] = burntFront.data[fi + 2];
                burnt.data[i + 3] = burntFront.data[fi + 3];

                dirt.data[i] = frontDirt.data[fi];
                dirt.data[i + 1] = frontDirt.data[fi + 1];
                dirt.data[i + 2] = frontDirt.data[fi + 2];
                dirt.data[i + 3] = frontDirt.data[fi + 3];

                spec.data[i] = frontSpec.data[fi];
                spec.data[i + 1] = frontSpec.data[fi + 1];
                spec.data[i + 2] = frontSpec.data[fi + 2];
                spec.data[i + 3] = frontSpec.data[fi + 3];

                normal.data[i] = frontNormal.data[fi];
                normal.data[i + 1] = frontNormal.data[fi + 1];
                normal.data[i + 2] = frontNormal.data[fi + 2];
                normal.data[i + 3] = frontNormal.data[fi + 3];
            }
        }

            setMapCanvas('burnt', burnt, combinedCanvas.width, combinedCanvas.height);
            setMapCanvas('dirt', dirt, combinedCanvas.width, combinedCanvas.height);
            setMapCanvas('diffuse', originalData, combinedCanvas.width, combinedCanvas.height);
            setMapCanvas('spec', spec, combinedCanvas.width, combinedCanvas.height);
            if (is4D || isScrews || isMetal) {
                setMapCanvas('normal', normal, combinedCanvas.width, combinedCanvas.height);
                document.getElementById('canvas-normal').parentElement.style.display = "";
            } else {
                document.getElementById('canvas-normal').parentElement.style.display = "none";
            }

            window.lastPreviewCanvases = {
                diffuse: document.getElementById('canvas-diffuse'),
                spec: document.getElementById('canvas-spec'),
                normal: document.getElementById('canvas-normal'),
                dirt: document.getElementById('canvas-dirt'),
                burnt: document.getElementById('canvas-burnt')
            };

            showMapModal();
            hideLoadingModal();
            setTimeout(() => {
                document.getElementById('mapModal').focus();
            }, 10);
        }).catch(error => {
            hideLoadingModal();
            console.error("Error capturing both plates:", error);
        });
    } else {
        const plateElement = position === 'front' ? document.querySelector('.plate.front') :
                             position === 'back' ? document.querySelector('.plate.back') : null;

        if (!plateElement) {
            hideLoadingModal();
            return alert("Could not find plate for position: " + position);
        }
        html2canvas(plateElement, { scale: 2, useCORS: true, backgroundColor: null }).then(canvas => {
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            const originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            const dirt = generateDirtMap(new ImageData(new Uint8ClampedArray(originalData.data), canvas.width, canvas.height));
            const spec = generateSpecMap(new ImageData(new Uint8ClampedArray(originalData.data), canvas.width, canvas.height));
            const normal = generateNormalMap(new ImageData(new Uint8ClampedArray(originalData.data), canvas.width, canvas.height));
            const burnt = generateBurntMap(new ImageData(new Uint8ClampedArray(originalData.data), canvas.width, canvas.height));
            
            setMapCanvas('burnt', burnt, canvas.width, canvas.height);
            setMapCanvas('dirt', dirt, canvas.width, canvas.height);
            setMapCanvas('diffuse', originalData, canvas.width, canvas.height);
            setMapCanvas('spec', spec, canvas.width, canvas.height);
            if (is4D || isScrews || isMetal) {
                setMapCanvas('normal', normal, canvas.width, canvas.height);
                document.getElementById('canvas-normal').parentElement.style.display = "";
            } else {
                document.getElementById('canvas-normal').parentElement.style.display = "none";
            }

            window.lastPreviewCanvases = {
                diffuse: document.getElementById('canvas-diffuse'),
                spec: document.getElementById('canvas-spec'),
                normal: document.getElementById('canvas-normal'),
                dirt: document.getElementById('canvas-dirt'),
                burnt: document.getElementById('canvas-burnt')
            };

            showMapModal();
            hideLoadingModal();
            setTimeout(() => {
                document.getElementById('mapModal').focus();
            }, 10);
        }).catch(error => {
            hideLoadingModal();
            console.error("Error capturing plate:", error);
        });
    }
}


function setMapCanvas(type, imageData, width, height) {
    const canvas = document.getElementById(`canvas-${type}`);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.putImageData(imageData, 0, 0);
}

function downloadPreview(mapType) {
    let saveType;
    const plateTypeInput = document.getElementById("plateType").value;
    const saveTypes = document.getElementById('eType').value;
    const canvas = document.getElementById(`canvas-${mapType}`);
    if (!canvas) return;

    const scaledCanvas = document.createElement('canvas');

        let heightSize;
        let widthSize;

        if (plateTypeInput === "car") {
            if (lastSelectedPosition === "both") {
                heightSize = 2048;
                widthSize = 4096;
            } else {
                heightSize = 1024;
                widthSize = 2048;
            }
        } else if (plateTypeInput === "motorbike") {
            if (lastSelectedPosition === "both") {
                heightSize = 6990;
                widthSize = 4096;
            } else {
                heightSize = 1747;
                widthSize = 2048;
            }
        } else {
            // Default to car sizes if unknown
            if (lastSelectedPosition === "both") {
                heightSize = 2068;
                widthSize = 4096;
            } else {
                heightSize = 1024;
                widthSize = 4096;
            }
        }

        scaledCanvas.width = widthSize;
        scaledCanvas.height = heightSize;

    const ctx = scaledCanvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

    const plateTypeSave = plateTypeInput?.value || "car";

    let positionLabel = "";
    switch (lastSelectedPosition) {
        case "front": positionLabel = "front"; break;
        case "back": positionLabel = "rear"; break;
        case "both": positionLabel = "both"; break;
        default: positionLabel = "unknown";
    }

    const link = document.createElement('a');
    link.download = `${fileBegin}-${plateTypeSave}_${positionLabel}_plate_${mapType}.${saveTypes}`;
    link.href = scaledCanvas.toDataURL('image/png');
    link.click();
}

function showEnlargedCanvas(canvasId) {
    const srcCanvas = document.getElementById(canvasId);
    const enlargedCanvas = document.getElementById('enlargedCanvas');
    enlargedCanvas.width = srcCanvas.width * 2;
    enlargedCanvas.height = srcCanvas.height * 2;
    const ctx = enlargedCanvas.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, enlargedCanvas.width, enlargedCanvas.height);
    ctx.drawImage(srcCanvas, 0, 0, enlargedCanvas.width, enlargedCanvas.height);
    document.getElementById('canvasEnlargeModal').style.display = 'block';
}

function closeCanvasEnlargeModal() {
    document.getElementById('canvasEnlargeModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('canvasEnlargeModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}