const openWebsite = document.getElementById("openWebsite");
const openCreator = document.getElementById("openCreator");
const donateBtn = document.getElementById('checkout-button');
localStorage.getItem("loginForm", loginForm);

donateBtn.addEventListener("click", () => {
    window.open('https://donate.stripe.com/6oE7u329x3KLaRi289', '_blank');
  });

openWebsite.addEventListener("click", () => {
    window.open('https://codemaster.ltd/', '_blank');
});

openCreator.addEventListener("click", () => {
    window.location.href = "loading.html";
});

function copyToClipboard() {
    const copyElement = document.getElementById("copyCode");
    const originalText = copyElement.textContent;
    
    const textArea = document.createElement("textarea");
    textArea.value = originalText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    copyElement.textContent = "Copied Code!";
    copyElement.style.color = 'green';
    
    setTimeout(() => {
        copyElement.textContent = originalText;
        copyElement.style.removeProperty('color');
    }, 2000);
}

window.addEventListener('DOMContentLoaded', function() {
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.style.opacity = 0;
    mainContainer.style.display = '';
    mainContainer.style.transition = 'opacity 1s';

    // Hide login modal initially
    const loginModal = this.document.getElementById("loginModal");
    loginModal.style.display = "none";

    // Create overlay blocker
    const blocker = document.createElement('div');
    blocker.style.position = 'fixed';
    blocker.style.top = 0;
    blocker.style.left = 0;
    blocker.style.width = '100vw';
    blocker.style.height = '100vh';
    blocker.style.zIndex = 999999;
    blocker.style.background = 'transparent';
    blocker.style.pointerEvents = 'auto';

    // Welcome message
    const welcomeMsg = document.createElement('div');
    welcomeMsg.style.position = 'fixed';
    welcomeMsg.style.top = '50%';
    welcomeMsg.style.left = '50%';
    welcomeMsg.style.transform = 'translate(-50%, -50%)';
    welcomeMsg.style.color = '#fff';
    welcomeMsg.style.padding = '32px 40px';
    welcomeMsg.style.borderRadius = '16px';
    welcomeMsg.style.fontSize = '5rem';
    welcomeMsg.style.fontFamily = 'Rubik Dirt, sans-serif';
    welcomeMsg.style.textAlign = 'center';
    welcomeMsg.style.zIndex = 1000000;
    welcomeMsg.innerHTML = `<strong>Welcome to</strong><br><br>`;
    welcomeMsg.style.transition = 'opacity 1s';

        // mainCredit message
    const mainCredit = document.createElement('div');
    mainCredit.style.position = 'fixed';
    mainCredit.style.bottom = '20px'; // Distance from bottom
    mainCredit.style.left = '32px';   // Distance from left
    mainCredit.style.transform = 'none'; // Remove center transform
    mainCredit.style.color = '#fff';
    mainCredit.style.padding = '18px 28px';
    mainCredit.style.borderRadius = '12px';
    mainCredit.style.fontSize = '0.8rem';
    mainCredit.style.fontFamily = 'Poppins, sans-serif';
    mainCredit.style.textAlign = 'left';
    mainCredit.style.zIndex = 1000000;
    mainCredit.innerHTML = `<strong>Developed by Code Master &mdash; Crafted with HTML, CSS, and JavaScript</strong>`;
    mainCredit.style.transition = 'opacity 1s';

    document.body.appendChild(blocker);
    document.body.appendChild(welcomeMsg);
    document.body.appendChild(mainCredit);

    setTimeout(function() {
        welcomeMsg.remove();
    }, 4500);

    setTimeout(function() {
        if (loginForm) {
            loginModal.style.display = "flex";
        }
        mainContainer.style.opacity = 1;
        blocker.remove();
        mainCredit.remove();
    }, 5000);
});

document.getElementById('visitVersions').addEventListener('click', function() {
    sessionStorage.setItem('fromIndex', 'yes');
    window.location.href = 'version.html';
});

document.getElementById('visitMusic').addEventListener('click', function() {
    sessionStorage.setItem('fromIndex', 'yes');
    window.location.href = 'music.html';
});

let storedVersion = localStorage.getItem("version");

if (storedVersion) {
    document.getElementById("indexV").textContent = storedVersion;
} else {
    document.getElementById("indexV").textContent = "Unknown Version";  
}

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    if ((user === "smurf" || user === "crip") && pass === "SmurfCrip2k25") {
        document.getElementById('loginModal').style.display = "none";
        document.getElementById('mainContainer').style.display = "";

            user.style.boxShadow = "0 0 10px rgb(0,255,0), inset 0 0 10px rgb(0,255,0)";
            pass.style.boxShadow = "0 0 10px rgb(0,255,0), inset 0 0 10px rgb(0,255,0)";
    } else {
        document.getElementById('loginError').style.display = "block";
    }
};