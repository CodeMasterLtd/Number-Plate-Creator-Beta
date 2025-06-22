localStorage.getItem("version", currentVersion);
const updated = getLastModifiedDate();
const body = document.body;

const buttonfront = document.querySelector(".button1.button2col");
const buttonboth = document.querySelector(".button1.button3col");
const platef = document.querySelector(".plate.front");
const plateb = document.querySelector(".plate.back");
const frontPlateScrew2 = document.getElementById("frontPlateScrew2");
const backPlateScrew2 = document.getElementById("backPlateScrew2");
const frontPlateScrew2v2 = document.getElementById("frontPlateScrew2v2");
const backPlateScrew2v2 = document.getElementById("backPlateScrew2v2");
const frontPlateScrew4 = document.getElementById("frontPlateScrew4");
const backPlateScrew4 = document.getElementById("backPlateScrew4");
const plateInput = document.getElementById("plateInput");
const sloganInput = document.getElementById("sloganInput");
const BSDInput = document.getElementById("BSDInput");
const frontPlate = document.getElementById("frontPlate");
const backPlate = document.getElementById("backPlate");
const frontSlogan = document.getElementById("frontSlogan");
const backSlogan = document.getElementById("backSlogan");
const frontGreenBox = document.getElementById("frontGreenBox");
const backGreenBox = document.getElementById("backGreenBox");
const styleSelect = document.getElementById("styleSelect");
const frontBorder = document.getElementById("frontBorder");
const backBorder = document.getElementById("backBorder");
const frontStamp = document.getElementById("frontStamp");
const backStamp = document.getElementById("backStamp");
const borderColorInput = document.getElementById("borderColor");
const plateStyleElement = document.getElementById("plateTypes");
const plateColourElement = document.getElementById("plateTypes");

plateInput.addEventListener("input", updatePlate);
sloganInput.addEventListener("input", updateSlogan);
sloganInput.addEventListener('input', checkDVLAInput);
BSDInput.addEventListener("input", updateBSD);
BSDInput.addEventListener('input', checkDVLAInput);
plateInput.addEventListener('input', checkDVLAInput);
styleSelect.addEventListener("change", toggleBoxStyle);
document.getElementById("showMisc").addEventListener("change", changeTextShadow);
document.getElementById("plateTypes").addEventListener("change", updatePlate);
plateColourElement.addEventListener("change", updatePlate);
document.getElementById("genPlate").addEventListener("change", GenPlate);
plateStyleElement.addEventListener("change", toggleBoxStyle);
plateStyleElement.addEventListener("change", updatePlate);



showElectricBox("none", 'none')
showBorder("none");

const plateDimensions = {
    car: {
      width: 1200,
      height: 270
    },
    motorbike: {
      width: 700,
      height: 550
    }
  }; 

  function updatePlateSize() {
    const plateType = document.getElementById("plateType").value;
    const showCarPreivBtn = document.getElementById('showCarPreview');
    const showBikePreivBtn = document.getElementById('showBikePreview'); 
    const dimensions = plateDimensions[plateType];

    if (plateType === "motorbike") {    
        plateb.style.display = "block";
        plateb.style.width = `${dimensions.width}px`;
        plateb.style.height = `${dimensions.height}px`;
        plateb.style.margin = "0 auto";

        platef.style.display = "block";
        platef.style.width = `${dimensions.width}px`;
        platef.style.height = `${dimensions.height}px`;
        platef.style.margin = "0 auto";
        platef.style.marginBottom = "5px";
        platef.style.marginTop = "30px";

        styleSelect.disabled = true;

        showCarPreivBtn.style.display = 'none';

        showBikePreivBtn.style.display = 'block';
        showBikePreivBtn.style.position = 'relative';
        showBikePreivBtn.style.margin = '0 auto'; 
        showBikePreivBtn.style.left = '0';
        showBikePreivBtn.style.right = '0';
    } else {
        styleSelect.disabled = false;
    
        plateb.style.display = "block";
    
        platef.style.width = `${dimensions.width}px`;
        platef.style.height = `${dimensions.height}px`;
        plateb.style.width = `${dimensions.width}px`;
        plateb.style.height = `${dimensions.height}px`;
    
        platef.style.display = "block";
        buttonfront.style.display = "block";
        buttonboth.style.display = "block";
        platef.style.marginTop = "30px";
        platef.style.marginBottom = "5px";

        styleSelect.disabled = false;

        showBikePreivBtn.style.display = 'none';

        showCarPreivBtn.style.position = 'relative';
        showCarPreivBtn.style.margin = '0 auto'; 
        showCarPreivBtn.style.display = 'block';
        showCarPreivBtn.style.left = '0';
        showCarPreivBtn.style.right = '0';
    }    
  }

const elements = [
    frontPlateScrew2, backPlateScrew2, frontPlateScrew2v2, backPlateScrew2v2, frontPlateScrew4, backPlateScrew4,
    plateInput, sloganInput, BSDInput, frontPlate, backPlate,
    frontSlogan, backSlogan, frontGreenBox, backGreenBox,
    styleSelect, frontBorder, backBorder,
    frontStamp, backStamp, borderColorInput, plateStyleElement
  ];

  function updatePlateContent() {
    plateb.innerHTML = `
      <div class="plateInput">${plateInput.value}</div>
      <div class="slogan">${sloganInput.value}</div>
      <div class="bsd">${BSDInput.value}</div>
    `;
  }

  function updatePlateStyles() { 
    const plateTypes = document.getElementById("plateTypes").value;
    const front = document.querySelector(".front");
    const back = document.querySelector(".back");

    let frontBase = "#ffffff";
    let backBase = "#ffe70b";
    let frontSloganBase = "#ffffff";
    let backSloganBase = "#ffe70b";

    if (plateTypes.startsWith('colour-')) {
        if (plateTypes === "colour-old")
        {
            frontBase = "#ffffff";
            backBase = "#ffdf1e";
            frontSloganBase = "#ffffff";
            backSloganBase = "#ffdf1e";
        } else if (plateTypes === "colour-new") {
            frontBase = "linear-gradient(180deg, #ffffff, #c6c8ca)";
            backBase = "linear-gradient(180deg, #f7b009, #f78711)";
            frontSloganBase = "#c6c8ca";
            backSloganBase = "#f78711";
        }
        ElectricBoxStyle();

        front.style.background = frontBase;
        back.style.background = backBase;
        frontSlogan.style.background = frontSloganBase;
        backSlogan.style.background = backSloganBase;
    }
}
  
function Reload() {
    let reload = false;
    window.location.reload();
    reload = true;
    if (reload) {
        plateInput.scrollIntoView({ behavior: "smooth", block: "start" });
    } 
}

let currentImageSrc = '';

function openModal(imgElement) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  currentImageSrc = imgElement.src;
  modalImg.src = currentImageSrc;
  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) {
    closeModal();
  }
}

function getCurrentPlateYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const plateYears = currentYear - 2000;
    const currentMonth = currentDate.getMonth(); 
    let plateYear = '';

    if (currentYear >= 2025 && currentYear <= 2029) {
        if (currentMonth >= 2 && currentMonth <= 7) { 
            plateYear = plateYears;
        } else {  
            plateYear = plateYears + 50;  
        }
    } else {
        plateYear = plateYears + 50;
    }

    return plateYear;
}

function getCurrentPlateYear2() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const plateYears = currentYear - 2000;
    const currentMonth = currentDate.getMonth(); // Months are zero-based (0 = January, 1 = February, etc.)
    let plateYear = '';

    if (currentYear >= 2025 && currentYear <= 2029) {
        if (currentMonth >= 2 && currentMonth <= 7) { 
            plateYear = Math.floor(Math.random() * (plateYears + 1)) 
        } else {  
            plateYear = plateYears + 50;  
        }
    } else {
        plateYear = plateYears + 50;
    }

    return plateYear;
}


document.addEventListener("DOMContentLoaded", () => {
    updateBoxStyleVisibility();
    updateGenPlateYearsVisibility();
    showMiscs();
    document.getElementById("styleSelect").addEventListener("change", updateBoxStyleVisibility);
    document.getElementById("genPlate").addEventListener("change", updateGenPlateYearsVisibility);

    updatePlate(); // Ensure the plate updates on page load
    updatePlateStyles();
    updatePlateSize();

plateInput.addEventListener("input", function () {
    const plateMode = document.getElementById("plateTypes").value;
    if (plateMode.startsWith('mode-')) {
    if (plateMode !== "mode-show") {
        this.value = this.value.replace(/\s+/g, ""); // Remove spaces for all modes except showPlate
    }
}
});
});

const areaCodes = [
    "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AJ", "AK", "AL", "AM", "AN",
    "AO", "AP", "AR", "AS", "AT", "AU",
    "AV", "AW", "AX", "AY",
    "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BR", "BS", "BT", "BU", "BV", "BW", "BX", "BY",
    "CA", "CB", "CC", "CD", "CE", "CF", "CG", "CH", "CJ", "CK", "CL", "CM", "CN", "CO",
    "CP", "CR", "CS", "CT", "CU", "CV",
    "CW", "CX", "CY",
    "DA", "DB", "DC", "DD", "DE", "DF", "DG", "DH", "DJ", "DK",
    "DL", "DM", "DN", "DO", "DP", "DR", "DS", "DT", "DU", "DV", "DW", "DX", "DY",
    "EA", "EB", "EC", "ED", "EE", "EF", "EG", "EH", "EJ", "EK", "EL", "EM", "EN", "EO", "EP", "ER", "ES", "ET", "EU", "EV", "EW", "EX", "EY",
    "FA", "FB", "FC", "FD", "FE", "FF", "FG", "FH", "FJ", "FK", "FL", "FM", "FN", "FP",
    "FR", "FS", "FT", "FV", "FW", "FX", "FY",
    "GA", "GB", "GC", "GD", "GE", "GF", "GG", "GH", "GJ", "GK", "GL", "GM", "GN", "GO",
    "GP", "GR", "GS", "GT", "GU", "GV", "GX", "GY",
    "HA", "HB", "HC", "HD", "HE", "HF", "HG", "HH", "HJ",
    "HK", "HL", "HM", "HN", "HO", "HP", "HR", "HS", "HT", "HU", "HV", "HX", "HY", "HW",
    "KA", "KB", "KC", "KD", "KE", "KF", "KG", "KH", "KJ", "KK", "KL",
    "KM", "KN", "KO", "KP", "KR", "KS", "KT", "KU", "KV", "KW", "KX", "KY",
    "LA", "LB", "LC", "LD", "LE", "LF", "LG", "LH", "LJ",
    "LK", "LL", "LM", "LN", "LO", "LP", "LR", "LS", "LT",
    "LU", "LV", "LW", "LX", "LY",
    "MA", "MB", "MC", "MD", "ME", "MF", "MG", "MH", "MJ", "MK", "ML", "MM", "MN", "MO", "MP", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY",
    "NA", "NB", "NC", "ND", "NE", "NF", "NG", "NH", "NJ", "NK", "NL", "NM", "NN", "NO",
    "NP", "NR", "NS", "NT", "NU", "NV", "NW", "NX", "NY",
    "OA", "OB", "OC", "OD", "OE", "OF", "OG", "OH", "OJ", "OK", "OL", "OM", "ON", "OO", "OP", "OR", "OS", "OT", "OU", "OV", "OW", "OX", "OY",
    "PA", "PB", "PC", "PD", "PE", "PF", "PG", "PH", "PJ", "PK", "PL", "PM", "PN", "PO", "PP", "PR", "PS", "PT",
    "PU", "PV", "PW", "PX", "PY",
    "RA", "RB", "RC", "RD", "RE", "RF", "RG", "RH", "RJ", "RK", "RL", "RM", "RN", "RO", "RP", "RR", "RS", "RT", "RU", "RV", "RW", "RX", "RY",
    "SA", "SB", "SC", "SD", "SE", "SF", "SG", "SH", "SJ",
    "SK", "SL", "SM", "SN", "SO",
    "SP", "SR", "SS", "ST",
    "SU", "SV", "SW",
    "SX", "SY",
    "VA", "VB", "VC", "VD", "VE", "VF", "VG", "VH", "VJ", "VK", "VL", "VM", "VN", "VO", "VP", "VR", "VS", "VT", "VU", "VV", "VW", "VX", "VY",
    "WA", "WB", "WC", "WD", "WE", "WF", "WG", "WH", "WJ",
    "WK", "WL",
    "WM", "WN", "WO", "WP", "WR", "WS", "WT", "WU", "WV", "WW", "WX", "WY",
    "YA", "YB", "YC", "YD", "YE", "YF", "YG", "YH", "YJ", "YK",
    "YL", "YM", "YN", "YO", "YP", "YR", "YS", "YT", "YU",
    "YV", "YW", "YX", "YY"
  ];

function GenPlateYears() {
    const genplateValue = document.getElementById("genPlateYears").value;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const isSeptOrLater = currentMonth >= 8;

    let plateYear = "";

    if (genplateValue !== "ran") {
        const ranges = {
            "00-03": [0, 3],
            "04-06": [4, 6],
            "07-09": [7, 9],
            "10-12": [10, 12],
            "13-15": [13, 15],
            "17-19": [17, 19],
            "20-23": [20, 23],
            "24-25": [24, 25]
        };

        if (ranges[genplateValue]) {
            const [start, end] = ranges[genplateValue];
            const possibleYears = [];

            for (let baseYear = start; baseYear <= end; baseYear++) {
                // Always add March plate
                possibleYears.push(baseYear.toString());

                // For 24, always add 74
                if (baseYear === 24) {
                    possibleYears.push("74");
                }
                // For 25, only add 75 if it's September 2025 or later
                else if (baseYear === 25) {
                    if (currentYear > 2025 || (currentYear === 2025 && isSeptOrLater)) {
                        possibleYears.push("75");
                    }
                } else {
                    // For all other years, add September plate
                    possibleYears.push((baseYear + 50).toString());
                }
            }

            if (possibleYears.length > 0) {
                const randomIndex = Math.floor(Math.random() * possibleYears.length);
                plateYear = possibleYears[randomIndex];
            }
        }
    }

    window.forcedPlateYear = plateYear;
    
}

function updateBoxStyleVisibility() {
    const styleSelect = document.getElementById("styleSelect");
    const boxStyleContainer = document.getElementById("boxStyleContainer");
    if (styleSelect && boxStyleContainer) {
        if (styleSelect.value === "none") {
            boxStyleContainer.style.display = "none";
        } else {
            boxStyleContainer.style.display = "";
        }
    }
}

function updateGenPlateYearsVisibility() {
    const genPlate = document.getElementById("genPlate");
    const genPlateYears = document.getElementById("genPlateYearsContainer");
    if (genPlate && genPlateYears) {
        if (genPlate.value === "hide") {
            genPlateYears.style.display = "none";
        } else {
            genPlateYears.style.display = "";
        }
    }
}


function GenPlate() {
    const genplateValue = document.getElementById("genPlate").value;
    const generateButton = document.getElementById("generatePlate");
    const plateInput = document.getElementById("plateInput");
    const sloganInput = document.getElementById("sloganInput");
    const defaultSlogan = sloganInput.value || "Code Master";
    let PlateText;
    let PlateSlogan;

    const allowedTypes = ["private", "private1", "private2", "normal", "urz", "ic"];
    const allowedTypesForce = ["tvp", "msp", "met", "gmp", "scot", "hp", "rbfrs", "hfrs", "lfb", "las", "scas", "wmas"];

    if (allowedTypesForce.includes(genplateValue)) {
            sloganInput.disabled = true;
            sloganInput.style.backgroundColor = "rgba(255,0,0,0.5)";
            sloganInput.style.color = "rgba(255,255,255,0.2)";
            sloganInput.textContent = "";
    } else if (allowedTypes.includes(genplateValue)) {
            sloganInput.disabled = false;
            sloganInput.style.backgroundColor = "";
            sloganInput.style.color = "";
    }
    if (allowedTypes.includes(genplateValue) || allowedTypesForce.includes(genplateValue)) {
        generateButton.style.display = "block";
        plateInput.disabled = true;
        plateInput.style.backgroundColor = "rgba(255,0,0,0.5)";
        plateInput.style.color = "rgba(255,255,255,0.2)";
        plateInput.textContent = "";

        generateButton.onclick = function () {
            const plate = generatePlate(genplateValue);
            frontPlate.textContent = plate;
            backPlate.textContent = plate;
        };

        // Update button text
        if (genplateValue === "private") {
            generateButton.textContent = "Generate Private Random Plate";
            PlateText = "C06 MSR";
            PlateSlogan = defaultSlogan;
        } else if (genplateValue === "private1") {
            generateButton.textContent = "Generate Private 1 Random Plate";
            PlateText = "C1 MSR";
            PlateSlogan = defaultSlogan;
        } else if (genplateValue === "private2") {
            generateButton.textContent = "Generate Private 2 Random Plate";
            PlateText = "1 MSR";
            PlateSlogan = defaultSlogan;
        } else if (genplateValue === "urz") {
            generateButton.textContent = "Generate URZ Random Plate";
            PlateText = "URZ 1234";
            PlateSlogan = defaultSlogan;
        } else if (genplateValue === "ic") {
            generateButton.textContent = "Generate IC Random Plate";
            PlateText = "IC 12345";
            PlateSlogan = defaultSlogan;
        } else if (genplateValue === "tvp") {
            generateButton.textContent = "Generate TV Police Random Plate";
            PlateText = "OU21 BHJ";
            PlateSlogan = "Thames Valley Police";
        } else if (genplateValue === "msp") {
            generateButton.textContent = "Generate MS Police Random Plate";
            PlateText = "DK70 FRL";
            PlateSlogan = "MerseySide Police";
        } else if (genplateValue === "met") {
            generateButton.textContent = "Generate MET Police Random Plate";
            PlateText = "EU68 FZT";
            PlateSlogan = "Metropolitan Police";
        } else if (genplateValue === "gmp") {
            generateButton.textContent = "Generate GM Police Random Plate";
            PlateText = "MX68 FNV";
            PlateSlogan = "Greater Manchester Police";
        } else if (genplateValue === "scot") {
            generateButton.textContent = "Generate Scottish Police Random Plate";
            PlateText = "SF20 DVP";
            PlateSlogan = "Scottish Police";
        } else if (genplateValue === "hp") {
            generateButton.textContent = "Generate Hampshire Police Random Plate";
            PlateText = "HX70 BVP";
            PlateSlogan = "Hampshire Police";
            // FIRE
        } else if (genplateValue === "rbfrs") { 
            generateButton.textContent = "Generate Royal Berkshire Fire Service Random Plate";
            PlateText = "KY71 ELU";
            PlateSlogan = "Royal Berkshire Fire & Rescue Service";
        } else if (genplateValue === "hfrs") { 
            generateButton.textContent = "Generate Hampshire Fire Service Random Plate";
            PlateText = "KR16 XMH";
            PlateSlogan = "Hampshire Fire & Rescue Service";
        } else if (genplateValue === "lfb") { 
            generateButton.textContent = "Generate London Fire Brigade Random Plate";
            PlateText = "WX69 ZFP";
            PlateSlogan = "London Fire Brigade";
            // AMB
        } else if (genplateValue === "scas") { 
            generateButton.textContent = "Generate South Central Ambulance Service Random Plate";
            PlateText = "HX69 YZK";
            PlateSlogan = "South Central Ambulance Service";
        } else if (genplateValue === "wmas") { 
            generateButton.textContent = "Generate West Midlands Ambulance Service Random Plate";
            PlateText = "BU20 YOO";
            PlateSlogan = "West Midlands Ambulance Service";
        } else if (genplateValue === "las") { 
            generateButton.textContent = "Generate London Ambulance Service Random Plate";
            PlateText = "EK72 ZFU";
            PlateSlogan = "London Ambulance Service";
        } else {
            generateButton.textContent = "Generate Default Random Plate";
            PlateText = "CO63 MSR";
            PlateSlogan = defaultSlogan;
        }

    } else {
        generateButton.style.display = "none";
        plateInput.disabled = false;
        sloganInput.disabled = false;
        const frontPlate = document.getElementById("frontPlate");
        const backPlate = document.getElementById("backPlate");
        const frontSlogan = document.getElementById("frontSlogan");
        const backSlogan = document.getElementById("backSlogan");
        const plateText = updatePlate();
        const sloganText1 = updateSlogan();
        frontSlogan.value = sloganText1;
        backSlogan.value = sloganText1;
        frontPlate.value = plateText;
        backPlate.value = plateText;
        plateInput.style.backgroundColor = "";
        plateInput.style.color = "";
        sloganInput.style.backgroundColor = "";
        sloganInput.style.color = "";
        PlateText = defaultPlate;
        PlateSlogan = defaultSlogan;
    }

        frontPlate.textContent = PlateText;
        backPlate.textContent = PlateText;
        frontSlogan.textContent = PlateSlogan;
        backSlogan.textContent = PlateSlogan;
}

const codes = {
    ThamesValleyPolice: ["LJ", "OU", "BX", "FY", "OY", "PO", "LC", "DV"],
    MerseySidePolice: ["DK", "DG", "YJ", "PO", "LJ", "NK", "MD", "PE"],
    MetPolice: ["BX", "YD", "FX", "OE", "LC", "LD", "LJ", "LM", "GM", "BF", "EU"],
    GreaterManchesterPolice: ["MX", "ML", "LJ", "KM", "LD", "GV", "KP", "LB", "KN", "GN"],
    ScottishPolice: ["SF", "AK", "SN", "VF", "KP", "KY", "AE", "EK", "SD", "KS", "SV"],
    HampshirePolice: ["HX", "HN", "HY"],
    // FIRE
    RoyalBerkshireFireService: ["KY", "RX", "KL"],
    HampshireFireService: ["HX", "GN", "KR"],
    LondonFireBridgade: ["WX", "RX", "BV", "WU", "LK"],
    // AMB
    LondonAmbulanceService: ["LJ", "LX", "EK", "LC", "LK"],
    SouthCAmbulanceService: ["HX", "WX"],
    WestMidlandsAmbulanceService: ["BU", "GN", "GL"],
};

function getPoliceCodes(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getFirstCharsNormal() {
    return areaCodes[Math.floor(Math.random() * areaCodes.length)];
}

function getFirstCharPrivate() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

function getRandomDigits(length) {
    let digits = "";
    for (let i = 0; i < length; i++) {
        digits += Math.floor(Math.random() * 10);
    }
    return digits;
}

function generatePlate(type) {
    const lastChars = "ABCDEFGHIJKLMNOPRSTUVWXYZ";

    const getRandomItem = (str) => str[Math.floor(Math.random() * str.length)];

    const randomChars = () => {
        return `${getRandomItem(lastChars)}${getRandomItem(lastChars)}${getRandomItem(lastChars)}`;
    };

    let randomYear = window.forcedPlateYear || getCurrentPlateYear2().toString();
    if (randomYear.length < 2) {
        randomYear = randomYear.padStart(2, '0');
    }

    let plate;
    if (type === "private") {
        plate = `${getFirstCharPrivate()}${randomYear} ${randomChars()}`;
    } else if (type === "private1") {
        plate = `${getFirstCharPrivate()}${getRandomDigits(1)} ${randomChars()}`;
    } else if (type === "private2") {
        plate = `${getRandomDigits(1)} ${randomChars()}`;
    } else if (type === "urz") {
        plate = `URZ ${getRandomDigits(4)}`;
    } else if (type === "ic") {
        plate = `IC ${getRandomDigits(5)}`;
    } else if (type === "hp") {
        plate = `${getRandomItem(codes.HampshirePolice)}${randomYear} ${randomChars()}`;
    } else if (type === "tvp") {
        plate = `${getRandomItem(codes.ThamesValleyPolice)}${randomYear} ${randomChars()}`;
    } else if (type === "msp") {
        plate = `${getRandomItem(codes.MerseySidePolice)}${randomYear} ${randomChars()}`;
    } else if (type === "met") {
        plate = `${getRandomItem(codes.MetPolice)}${randomYear} ${randomChars()}`;
    } else if (type === "gmp") {
        plate = `${getRandomItem(codes.GreaterManchesterPolice)}${randomYear} ${randomChars()}`;
    } else if (type === "scot") {
        plate = `${getRandomItem(codes.ScottishPolice)}${randomYear} ${randomChars()}`;
    // FIRE
    } else if (type === "rbfrs") {
        plate = `${getRandomItem(codes.RoyalBerkshireFireService)}${randomYear} ${randomChars()}`;
    } else if (type === "hfrs") {
        plate = `${getRandomItem(codes.HampshireFireService)}${randomYear} ${randomChars()}`;
    } else if (type === "lfb") {
        plate = `${getRandomItem(codes.LondonFireBridgade)}${randomYear} ${randomChars()}`;
    // AMB
    } else if (type === "scas") {
        plate = `${getRandomItem(codes.SouthCAmbulanceService)}${randomYear} ${randomChars()}`;
    } else if (type === "wmas") {
        plate = `${getRandomItem(codes.WestMidlandsAmbulanceService)}${randomYear} ${randomChars()}`;
    } else if (type === "las") {
        plate = `${getRandomItem(codes.LondonAmbulanceService)}${randomYear} ${randomChars()}`;
    } else {
        plate = `${getFirstCharsNormal()}${randomYear} ${randomChars()}`;
    }

    return plate;
}

function updatePlate() {
    const begin = "CO";
    const end = " MSR";
    const plateModeElement = document.getElementById("plateTypes");
    const plateMode = plateModeElement.value;

    let rawInput;

    if (plateMode === "mode-default") {
        rawInput = plateInput.value.toUpperCase().replace(/[^A-Za-z]/g, '').replace(/\s+/g, '').slice(0, 5); 
        plateInput.maxLength = 5;
    } else if (plateMode === "mode-show") {
        rawInput = plateInput.value.toUpperCase().slice(0, 12);
        plateInput.maxLength = 9;
    } else {
        rawInput = plateInput.value.toUpperCase().replace(/[^A-Z0-9\s]/g, '').replace(/\s+/g, '').slice(0, 7); 
        plateInput.maxLength = 7; 
    }

 const currentPlateYear = getCurrentPlateYear().toString();
    const defaultPlate = `${begin}${currentPlateYear}${end}`;
    let plateText = "";
    if (plateMode.startsWith('mode-')) {
        if (plateMode === "mode-default") {
            let prefix = rawInput.substring(0, 2);
            if (prefix.length < 1) {
                prefix = begin;
            }
            let suffix = rawInput.substring(2);
            suffix = suffix.replace(/^\d{1,2}/, "");
            if (suffix === "") {
                suffix = end;
            } else {
                if (suffix[0] !== " ") {
                    suffix = " " + suffix;
                }
            }
            plateText = prefix + currentPlateYear + suffix;
            plateInput.setAttribute("placeholder", `Enter number plate eg: (${prefix + suffix.replace(end, "MSR")})`);
            plateInput.style.fontSize = '14px';
        } else if (plateMode === "mode-private") {
            const plateYears = "06";
            const plateYearSuffix = plateYears.toString().slice(-2); 
            plateText = rawInput || `C${plateYearSuffix}${end}`;
            plateText = plateText.replace("-", "");
            plateInput.setAttribute("placeholder", `Enter number plate eg: (${plateText})`);
            plateInput.style.fontSize = '14px';
        } else {
    // ...existing code...
    plateText = rawInput || `C M4S7ER`;
    plateText = plateText.replace("-", "");
    plateInput.setAttribute("placeholder", `Enter number plate eg: (${plateText})`);
    plateInput.style.fontSize = '14px';
}
if (plateMode !== "mode-show") {
    if (plateText.length === 7 && plateText.startsWith("URZ") || plateText.startsWith("FER") && !plateText.includes(" ")) {
        plateText = plateText.slice(0, 3) + " " + plateText.slice(3); // "IC" + " 48455"
    }
    else if (plateText.length === 7 && plateText.startsWith("IC") && !plateText.includes(" ")) {
        plateText = plateText.slice(0, 2) + " " + plateText.slice(2); // "URZ" + " 4455"
    }
    else if (plateText.length === 7 && !plateText.includes(" ")) {
        plateText = plateText.slice(0, 4) + " " + plateText.slice(4); // Format 4455 -> "44 55"
    }
    else if (plateText.length === 6 && !plateText.includes(" ")) {
        plateText = plateText.slice(0, 3) + " " + plateText.slice(3); // Format 123456 -> "123 456"
    }
    else if (plateText.length === 5 && !plateText.includes(" ")) {
        plateText = plateText.slice(0, 2) + " " + plateText.slice(2); // Format 12345 -> "12 345"
    }
}
    }
    frontPlate.textContent = plateText || defaultPlate;
    backPlate.textContent = plateText || defaultPlate;

const front = document.querySelector(".front");
const back = document.querySelector(".back");
const plateStyleElement = document.getElementById("plateTypes");

const plateStyle = plateStyleElement.value;

const oldOverlays = document.querySelectorAll('.platebackground-overlay');
oldOverlays.forEach(o => o.remove());

// Reset text color
[front, back, frontStamp, backStamp, frontSlogan, backSlogan].forEach(el => {
    el.style.color = "";
});

// === 2. Apply plateStyle OVERLAY (doesn't overwrite base) ===
if (plateStyle === "style-metal") {
    const metalGradient = "linear-gradient(180deg,rgb(10, 10, 10),rgb(0, 0, 0))";
    front.style.background = metalGradient;
    back.style.background = metalGradient;
    front.style.color = "#c6c8ca";
    back.style.color = "#c6c8ca";
    frontSlogan.style.color = "#ffffff";
    backSlogan.style.color = "#ffffff";
    frontSlogan.style.background = "transparent";
    backSlogan.style.background = "transparent";

} else if (plateStyle === "style-honeycomb") {
    const honeycombTexture = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/af468b892105b344a994623bcd8a71ccf8addc7f/img/misc/honeycomb.png";

    const honeycombStyles = {
        backgroundRepeat: "repeat",
        backgroundSize: "500px",
        backgroundPosition: "center center"
    };

    plateOverlay(front, honeycombTexture, 0.2, honeycombStyles);
    plateOverlay(back, honeycombTexture, 0.2, honeycombStyles);
} else if (plateStyle === "style-tinted" || plateStyle === "style-tinteded") {
    const opacity = plateStyle === "tinted" ? 0.2 : 0.5;
    const tintedTexture = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/af468b892105b344a994623bcd8a71ccf8addc7f/img/misc/tinted.PNG";

    const tintedStyles = {
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center"
    };

    plateOverlay(front, tintedTexture, opacity, tintedStyles);
    plateOverlay(back, tintedTexture, opacity, tintedStyles);
} else if (plateStyle === "style-shine") {
    const shineTexture = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/ea19e57a315f519f325d032747bb170f53d0408e/img/misc/glass.png";

    const shineStyles = {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center"
    };

    plateOverlay(front, shineTexture, 1.0, shineStyles);
    plateOverlay(back, shineTexture, 1.0, shineStyles);
}
}


function plateOverlay(targetElement, imageUrl, opacity = 0.5, customStyles = {}) {
    const overlay = document.createElement("div");
    overlay.classList.add("platebackground-overlay");

    Object.assign(overlay.style, {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundImage: `url('${imageUrl}')`,
        opacity: opacity.toString(),
        pointerEvents: "none",
        zIndex: "1000",
        borderRadius: "15px",
        ...customStyles
    });

    targetElement.style.position = "relative";
    targetElement.appendChild(overlay);
}



function updateSlogan() {
    let sloganText = sloganInput.value.slice(0, 100);
    sloganInput.value = sloganText;
    frontSlogan.textContent = sloganText || "Code Master";
    backSlogan.textContent = sloganText || "Code Master";

    syncSloganBackground(); 
    //sloganInput.value = sloganText;
}

function syncSloganBackground() {
    const plateStyle = document.getElementById("plateTypes").value;
    const frontSlogan = document.getElementById("frontSlogan");
    const backSlogan = document.getElementById("backSlogan");

    if (plateStyle === "new") {
        frontSlogan.style.background = "#c6c8ca";
        backSlogan.style.background = "#f78711";
    } else if (plateStyle === "style-metal") {
        frontSlogan.style.background = "#000000";
        backSlogan.style.background = "#000000";
    } else {
        frontSlogan.style.background = "#ffffff";
        backSlogan.style.background = "#ffe70b";
    }
}

function updateBSD() {
    const origianl = "CO DE 025m";
    let BSDText = BSDInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/\s+/g, '');
    if (BSDText.length > 8) BSDText = BSDText.slice(0, 8);
    if (BSDText.length === 8 && !BSDText.includes(" ")) {
        BSDText = BSDText.slice(0, 2) + " " + BSDText.slice(2, 4) + " " + BSDText.slice(4);
    }

    // If BSDText is empty, reset input and stamps to original
    if (!BSDText) {
        frontStamp.textContent = origianl;
        backStamp.textContent = origianl;
        return;
    }

    frontStamp.textContent = BSDText;
    backStamp.textContent = BSDText;
}

function toggleBoxStyle() {
    const style = document.getElementById('styleSelect').value; 
    const plateTexts = document.querySelectorAll('.plate');

    plateTexts.forEach(text => {
        if (style === "electric" || style === "electric1" || style === "electric5" || style === "electric3" || style === "electric2" || style === "electric4" || style === "gb" || style === "uk" || style === "eng" || style === "cym" || style === "sco" || style === "eu" || style === "eu1" || style === "euirl" || style === "iow" || style === "crip" || style === "crip3" || style === "gbm") {
            text.style.fontSize = '235px';
        }
        else {
            text.style.fontSize = '240px';
        }
            text.style.lineHeight = "270px";
            text.style.height = "270px";
    });

    let translateXValue = "50px";
    let borderLeftValue = "105px";

    if (window.innerWidth <= 480) {
        translateXValue = "0px";
        borderLeftValue = "5px";
    } else if (window.innerWidth <= 768) {
        translateXValue = "40px";
        borderLeftValue = "55px";
    }

    if (style === "none") {
        showElectricBox("none", 'none');
        translateXValue = "0px";
        borderLeftValue = "8px";
    } else if (style === "electric" || style === "electric1" || style === "electric5" || style === "electric3" || style === "electric2" || style === "electric4" || style === "gb" || style === "uk" || style === "eng" || style === "cym" || style === "sco" || style === "eu" || style === "eu1" || style === "euirl" || style === "iow" || style === "crip" || style === "crip3" || style === "gbm") {
        showElectricBox("block", style);
    }

    frontPlate.style.transform = `translateX(${translateXValue})`;
    backPlate.style.transform = `translateX(${translateXValue})`;
    frontBorder.style.left = borderLeftValue;
    backBorder.style.left = borderLeftValue;
}

let lastColour = null;

function ElectricBoxStyle() {
    const effect = document.getElementById('showMisc').value;
    const boxStyle = document.getElementById('boxStyle').value;
    const plateColour = document.getElementById('plateTypes').value;

    let width = "95px";
    let height = "95%";
    let marginLeft = "6px";
    let borderRadius = "10px";
    let shadow = "none";
    let bgColor = "transparent";
    let textColorfront = "#fff";
    let textColorback = "#ffe70b";

    // Shape options
    if (boxStyle.startsWith("shape-")) {
        if (boxStyle === "shape-default") {
            width = "100px";
            height = "100%";
            marginLeft = "0px";
            borderRadius = "10px 0 0 10px";
        } else if (boxStyle === "shape-compact") {
            width = "95px";
            height = "95%";
            marginLeft = "6px";
            borderRadius = "10px";
            shadow = effect === "4d-yes"
                ? "0px 0px 0px rgba(0, 0, 0, 0.0)"
                : "0px 0px 5px rgba(0, 0, 0, 0.5)";
        }

        // Reapply the last selected colour
        if (lastColour) {
            bgColor = lastColour;
        }
    }

    // Colour options
    if (boxStyle.startsWith("colour-")) {
        switch (boxStyle) {
            case "colour-green": bgColor = "#019e4d"; break;
            case "colour-blue": bgColor = "#104188"; break;
            case "colour-transparent":
                bgColor = "transparent";
                textColorfront = "#000";
                textColorback = "#000";
                break;
            case "colour-iow": bgColor = "#00a4d3"; break;
            case "colour-black": bgColor = "#000"; break;
        }

        lastColour = bgColor; // Save the last selected colour
    }

    // Plate text colours
    if (plateColour.startsWith("colour-")) {
        switch (plateColour) {
            case "colour-new":
                textColorfront = "#fff";
                textColorback = "#f78711";
                break;
            case "colour-old":
                textColorfront = "#fff";
                textColorback = "#ffe70b";
                break;
            default:
                if (boxStyle === "colour-transparent") {
                    textColorfront = "#000";
                    textColorback = "#000";
                }
                break;
        }
    }

    [frontGreenBox, backGreenBox].forEach(box => {
        box.style.width = width;
        box.style.height = height;
        box.style.marginLeft = marginLeft;
        box.style.borderRadius = borderRadius;
        box.style.boxShadow = shadow;
        box.style.backgroundColor = bgColor;
    });

    frontGreenBox.style.color = textColorfront;
    backGreenBox.style.color = textColorback;
}


function showElectricBox(displayStyle, type) {
    frontGreenBox.style.display = displayStyle;
    backGreenBox.style.display = displayStyle;

    if (displayStyle !== 'block') return;

    if (type === 'electric') {
        removeBadge(frontGreenBox);
        removeBadge(backGreenBox);
    } else {
        const frontBadgeColor = '#ffffff';
        const backBadgeColor = '#f7b009';
        addBadge(type, frontGreenBox, frontBadgeColor);
        addBadge(type, backGreenBox, backBadgeColor);
    }
}


function removeBadge(box) {
    const existingFlag = box.querySelector(".uk-flag");
    const existingText = box.querySelector(".uk-text");

    if (existingFlag) existingFlag.remove();
    if (existingText) existingText.remove();
}

function addBadge(type, box, textColor) {
    const existingFlag = box.querySelector(".uk-flag");
    const existingText = box.querySelector(".uk-text");

    if (existingFlag) existingFlag.remove();
    if (existingText) existingText.remove();

    let image, text, fSize, top; 
    const Flag = document.createElement("img");
    const Text = document.createElement("span");

    if (type === 'electric1') {
        fSize = "70px";
        text = "🗲";
        top = "0%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = false;
    } else if (type === 'electric5') {
        fSize = "60px";
        text = "EV";
        top = "0%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = false;
    } else if (type === 'electric3') {
        fSize = "70px";
        text = "🔌";
        top = "0%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = false;
    } else if (type === 'electric2') {
        fSize = "70px";
        text = "⚡️";
        top = "0%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = false;
    } else if (type === 'electric4') {
        fSize = "70px";
        text = "🔋";
        top = "0%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = false;
    } else if (type === 'gb') {
        fSize = "50px";
        text = "GB";
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/gb_flag.png";
        top = "20%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = true;
    } else if (type === 'uk') {
        fSize = "50px";
        text = 'UK'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/eng_flag.png";
        top = "20%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = true;
    } else if (type === 'eng') {
        fSize = "40px";
        text = 'ENG'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/eng_flag.png";
        top = "20%";  
        fWidth = "80px";
        fHeight = "40px";
        border = true;
    } else if (type === 'cym') {
        fSize = "22px";
        text = 'CYMRU'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/wales_flag.png";
        top = "20%";  
        fWidth = "80px";
        fHeight = "40px";
        border = true;
    } else if (type === 'sco') {
        fSize = "40px";
        text = 'SCO'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/scotland_flag.png";
        top = "20%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = true;
    } else if (type === 'gbm') {
        fSize = "40px";
        text = 'GBM'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/4e056f3a709f6f63e068e4bd3166938834c92580/img/plate/gbm_flag.PNG";
        top = "20%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = true;
    } else if (type === 'eu') {
        fSize = "50px";
        text = 'GB'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/eu_flag.png";
        top = "20%"; 
        fWidth = "100px";
        fHeight = "60px";
        border = true;
    } else if (type === 'eu1') {
        fSize = "50px";
        text = 'UK'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/eu_flag.png";
        top = "20%";  
        fWidth = "100px";
        fHeight = "60px";
        border = true;
    } else if (type === 'euirl') {
        fSize = "50px";
        text = 'IRL'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/eu_flag.png";
        top = "20%";  
        fWidth = "100px";
        fHeight = "60px";
        border = true;
    } else if (type === 'iow') {
        fSize = "40px";
        text = 'IOW'
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/iow_flag.png";
        top = "20%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = true;
    } else if (type === 'crip') {
        fSize = "70px";
        text = "♿︎";
        top = "0%"; 
        fWidth = "80px";
        fHeight = "40px";
        border = false;
    } else if (type === 'crip3') {
        fSize = "35px";
        text = "CRIP";
        image = "https://raw.githubusercontent.com/CodeMasterLtd/NumberPlateCreator/85f52aa3a7a5d12a85cc0d5182e79a058c8ebadc/img/plate/cripple_flag.png";
        top = "20%"; 
        fWidth = "80px";
        fHeight = "80px";
        border = false;
    }

    Flag.classList.add("uk-flag");
    Flag.style.position = "absolute";
    Flag.style.top = "30%"; 
    Flag.style.left = "50%";
    Flag.style.transform = "translate(-50%, -50%)"; 
    Flag.style.border = border ? '1px #fff solid' : 'none';

    Text.classList.add("uk-text");
    Text.style.position = "absolute";
    Text.style.left = "50%";
    Text.style.fontWeight = "bold";
    Text.style.fontFamily = 'Arial';
    Text.style.transform = "translateX(-50%)"; 

    Flag.style.height = fHeight;
    Flag.style.width = fWidth;
    Text.style.top = top;
    Text.style.fontSize = fSize;
    Text.textContent = text;
    Flag.src = image;

    box.appendChild(Flag);
    box.appendChild(Text);
}


function showBorder(display) {
    frontBorder.style.display = display;
    backBorder.style.display = display;
}

function showMiscs() {
    const textShadowOptions = document.getElementById('textShadowOptions');
    const value = document.getElementById('showMisc').value;
    const borderOptions = document.getElementById("borderOptions");
    const frontBorder = document.getElementById("frontBorder");
    const backBorder = document.getElementById("backBorder");

    frontPlateScrew2v2.style.display = "none";
    backPlateScrew2v2.style.display = "none";
    frontPlateScrew2.style.display = "none";
    backPlateScrew2.style.display = "none";
    frontPlateScrew4.style.display = "none";
    backPlateScrew4.style.display = "none";

    if (value.startsWith('screws-')) {
        if (value === "screws-2") {
            frontPlateScrew2.style.display = "block";
            backPlateScrew2.style.display = "block";
        } else if (value === "screws-2v2") {
            frontPlateScrew2v2.style.display = "block";
            backPlateScrew2v2.style.display = "block";
        } else if (value === "screws-4") {
            frontPlateScrew4.style.display = "block";
            backPlateScrew4.style.display = "block";
        } else if (value === "screws-hide") {
            frontPlateScrew2.style.display = "none";
            backPlateScrew2.style.display = "none";
            frontPlateScrew4.style.display = "none";
            backPlateScrew4.style.display = "none";
        }
    }

    if (value.startsWith('stamp-')) {
        frontStamp.style.display = value === "stamp-yes" ? "block" : "none";
        backStamp.style.display = value === "stamp-yes" ? "block" : "none";
    }

    if (value.startsWith('slogan-')) {
        frontSlogan.style.display = value === "slogan-yes" ? "block" : "none";
        backSlogan.style.display = value === "slogan-yes" ? "block" : "none";       
    }

    if (value.startsWith('border-')) {
        if (value === "border-yes") {
            showBorder("block");
            borderOptions.style.display = "block";
            if (window.innerWidth <= 480) {
                frontBorder.style.borderWidth = "2px";
                backBorder.style.borderWidth = "2px";
                frontBorder.style.marginBottom = "-5px";
                frontBorder.style.marginTop = "-5px";
                backBorder.style.marginBottom = "-5px";
                backBorder.style.marginTop = "-5px";
            } else {
                frontBorder.style.borderWidth = "4px";
                backBorder.style.borderWidth = "4px";
            }
        } else if (value === "border-no") {
                showBorder("none");
                borderOptions.style.display = "none";
                frontBorder.style.borderWidth = "0px";
                backBorder.style.borderWidth = "0px";
                frontBorder.style.marginBottom = "0";
                frontBorder.style.marginTop = "0";
                backBorder.style.marginBottom = "0";
                backBorder.style.marginTop = "0";
        }
    }

    if (value.startsWith('4d-')) {
            if (value === "4d-yes") {
            textShadowOptions.style.display = 'block';
            changeTextShadow();
        } else if (value === '4d-no') {
            textShadowOptions.style.display = 'none';
            frontPlate.style.textShadow = 'none';
            backPlate.style.textShadow = 'none';
            changeTextShadow();
        }
    }
}

function changeBorderColor() {
    const borderColor = document.getElementById("borderColor").value;
    const borderElements = document.querySelectorAll('.border');
    borderElements.forEach(element => {
        element.style.borderColor = borderColor;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    window.onload = function() {
        plateInput.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.onload = function() {
        updatePlate();
        showMiscs();
    };    

    const version = document.getElementById('version');
    if (version) {
        version.textContent = `V${currentVersion}`;
    }

    const update = document.getElementById('update');
    if (update) {
        update.textContent = `Last Updated: ${updated}`;
    }
});

function checkDVLAInput() {
    const Banword = "B4N LM4O";
    const dvlaText = BSDInput.value;
    const dvlaText2 = sloganInput.value;
    const dvlaText3 = plateInput.value;

    const badWords = [
        'fuck', 'shit', 'cunt', 'bitch', 'asshole', 'dick', 'piss', 'slut', 
        'motherfucker', 'twat', 'bastard', 'prick', 'cock', 'fag', 'wanker', 
        'whore', 'douche', 'idiot', 'retard', 'cum', 'pussy', 'gay', 'nigger',
        'sex', 'sexy', 'trans', 'tranny', 'n1gga', 'nigga', 'n19gga', 'n19gaa',
        'd1ck', 'dlck', 'bj69 abj', 'bj69 sex', 'f16 kpm', 'n1gg4r', 'nigg4r', 
        'n1gg3r', 'nigg3r'
    ];

    // Function to check for bad words
    function containsBadWords(text) {
        return badWords.some(word => new RegExp(`\\b${word}\\b`, 'i').test(text));
    }

    // Check if bad words are in the inputs
    if (containsBadWords(dvlaText))
        {
            BSDInput.value = Banword;
            frontStamp.textContent = Banword;
            backStamp.textContent = Banword;
    }
    if (containsBadWords(dvlaText2))
        {
            sloganInput.value = Banword;
            frontSlogan.textContent = Banword;
            backSlogan.textContent = Banword;
    }

    if (containsBadWords(dvlaText3))
        {
            plateInput.value = Banword;
            frontPlate.textContent = Banword;
            backPlate.textContent = Banword;
    }

    // Existing checks for specific patterns
    if (/BS\s?AU\s?145[a-e]/i.test(dvlaText.replace(/\s+/g, '')) || /BS\s?AU\s?145/i.test(dvlaText.replace(/\s+/g, '')) || /BS\s?AU\s?/i.test(dvlaText.replace(/\s+/g, ''))) {
        frontStamp.textContent = "INVALID";
        backStamp.textContent = "INVALID";
    }

    if (/DVLA/i.test(dvlaText2.replace(/\s+/g, '')) || /GOV/i.test(dvlaText2.replace(/\s+/g, ''))) {
        frontSlogan.textContent = "INVALID";
        backSlogan.textContent = "INVALID";
    }

    if (/DVLA/i.test(dvlaText3.replace(/\s+/g, '')) || /GOV/i.test(dvlaText3.replace(/\s+/g, ''))) {
        frontPlate.textContent = "INVALID";
        backPlate.textContent = "INVALID";
    }
}

function changeTextShadow() {
    const effect = document.getElementById('showMisc').value;

    var shadowX = parseInt(document.getElementById('textShadowX').value);
    var shadowY = parseInt(document.getElementById('textShadowY').value);
    var shadowBlur = parseInt(document.getElementById('textShadowBlur').value);
    var shadowColor = document.getElementById('textShadowColor').value;

    var frontPlate = document.getElementById('frontPlate');
    var backPlate = document.getElementById('backPlate');

    var frontBorder = document.getElementById("frontBorder");
    var backBorder = document.getElementById("backBorder");

    if (effect === '4d-yes') {
        var textShadowValue = `
            ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor},
            ${shadowX * 1.5}px ${shadowY * 1.5}px ${shadowBlur * 1.5}px rgba(0, 0, 0, 0.5),
            ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, 0.2)
        `;

        var boxShadowValue = `
            ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor},
            inset ${shadowX * 1.5}px ${shadowY * 1.5}px ${shadowBlur * 1.5}px ${shadowColor},
            inset ${-shadowX}px ${-shadowY}px ${shadowBlur}px rgba(255, 255, 255, 0.2)
        `;

        frontPlate.style.textShadow = textShadowValue;
        backPlate.style.textShadow = textShadowValue;

        //frontBorder.style.boxShadow = boxShadowValue;
        //backBorder.style.boxShadow = boxShadowValue;
    } else {
        frontPlate.style.textShadow = "none";
        backPlate.style.textShadow = "none";
        frontBorder.style.boxShadow = "none";
        backBorder.style.boxShadow = "none";
    }
}

document.getElementById("discordInfo").addEventListener("click", function() {
        window.location.href = "music.html";
});

function getLastModifiedDate() {
    let modifiedDate = new Date(this.document.lastModified);
    let day = "22";
    let month = "June"; // Months are zero-based
    let year = modifiedDate.getFullYear();

    let hour = "16";
    let min = "20";
    let type = hour > 12 ? "pm" : "am";

    let isBST = new Date().getTimezoneOffset() === -60;
    let timeZone = isBST ? "BST" : "GMT";

    return `${day}|${month}|${year} • ${hour}:${min}${type} (${timeZone})`;
}

function showCarPreview(type) {
    if (type === "car") {
        document.getElementById('carPreviewModal').style.display = 'flex';

        const plateElement = document.querySelector('.plate.front');
        const previewCanvas = document.getElementById('plateOnCar');
        const ctx = previewCanvas.getContext('2d');
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

        html2canvas(plateElement, {useCORS: true, backgroundColor: null , scale: 2}).then(canvas => {
            ctx.drawImage(canvas, 0, 0, previewCanvas.width, previewCanvas.height);
        });
    } else {
        document.getElementById('bikePreviewModal').style.display = 'flex';

        const plateElement = document.querySelector('.plate.back');
        const previewCanvas = document.getElementById('plateOnBike');
        const ctx = previewCanvas.getContext('2d');
        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

        html2canvas(plateElement, {useCORS: true, backgroundColor: null , scale: 2}).then(canvas => {
            ctx.drawImage(canvas, 0, 0, previewCanvas.width, previewCanvas.height);
        });
    }
}

function closeCarPreview(type) {
    if (type === "car") {
    document.getElementById('carPreviewModal').style.display = 'none';
    } else {
    document.getElementById('bikePreviewModal').style.display = 'none';
    }
}

showMiscs();
updatePlate(); 
GenPlateYears();
syncSloganBackground();
updatePlateStyles();
//toggleTintedPlate();
ElectricBoxStyle();

setInterval(() => {
    if (document.getElementById("genPlate").value !== "hide") {
  GenPlateYears();
}
}, 1000);
