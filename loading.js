let storedVersion = localStorage.getItem("version");
let version = storedVersion ? `Outdated ${storedVersion}` : "Unknown Version";
let loadingStages;
        if (!storedVersion || compareVersions(currentVersion, storedVersion) > 0) {
            loadingStages = [
                "🔍 Checking current build version...",
                `📦 Detected version: ${version}`,
                "⬇️ Fetching latest update files...",
                "⚙️ Installing updates and optimizing performance...",
                `✅ Update complete — now running V${currentVersion}`,
                `🟢 System status: Up to date (V${currentVersion})`,
                "🚀 Launching Plate Creator..."
            ];
        } else {
            loadingStages = [
                "🔍 Checking current build version...",
                `🟢 System status: Up to date (V${currentVersion})`,
                "🚀 Launching Plate Creator..."
            ];
        }

    let stageIndex = 0;
    const textElement = document.getElementById('loading-text');
    const loadingBarContainer = document.getElementById('loading-bar-container');
    const loadingBar = document.getElementById('loading-bar');
    

    let updateProgress = 0;
    let updateAnimating = false;
    
    let estimatedTime;
    let currentSize = 1;
    if (currentSize < 4) {
    estimatedTime = 2000 + Math.random() * 1000;
    } else if (currentSize = 5) {
    estimatedTime = 5000 + Math.random() * 5000; 
    } else if (currentSize < 10) {
        estimatedTime = 10000 + Math.random() * 5000; 
    } else if (currentSize < 50) {
    estimatedTime = 20000 + Math.random() * 10000; 
    } else {
    estimatedTime = 40000 + Math.random() * 20000; 
    }

    const updateInterval = 500; 
    const totalSteps = estimatedTime / updateInterval;
    const increment = 100 / totalSteps;

    function animateUpdate() {
    if (!updateAnimating) return;
    
    updateProgress += increment;
    if (updateProgress > 100) updateProgress = 100;
    
    loadingBar.style.width = updateProgress.toFixed(2) + "%";

    if (updateProgress < 100) {
                setTimeout(animateUpdate, updateInterval);
            } else {
                setTimeout(() => {
                    textElement.textContent = `Successfully updated to version V${currentVersion}.`;
                    localStorage.setItem("version", currentVersion);
                    setTimeout(() => {
                        localStorage.setItem("version", currentVersion);
                    }, 2000); 
                }, 1000); 
            }
        }
    
    function changeText() {
        if (stageIndex < loadingStages.length) {
            const currentStage = loadingStages[stageIndex];
            textElement.textContent = currentStage;

            if (currentStage === "⚙️ Installing updates and optimizing performance...") {
                loadingBarContainer.style.display = 'block';
                updateProgress = 0;
                updateAnimating = true;
                animateUpdate();
            } else {
                loadingBarContainer.style.display = 'none';
                updateAnimating = false;
            }
            stageIndex++;
            let delay = currentStage === "⚙️ Installing updates and optimizing performance..." ? 20000 : 2500;
            requestAnimationFrame(() => setTimeout(changeText, delay));
        } else {
            setTimeout(handleFinalStage, 2500);
        }
    }
    
    function handleFinalStage() {
      localStorage.setItem("version", currentVersion);
      window.location.href = "creator.html"; 
    }
    
    changeText();

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

  
