(function () {
    const popupHTML = `
        <div id="notePopup" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(30, 30, 30, 0.85);
            backdrop-filter: blur(8px);
            color: white;
            padding: 25px 35px;
            border-radius: 16px;
            z-index: 9999;
            font-family: 'Poppins', sans-serif;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
            max-width: 400px;
            width: 90%;
            text-align: center;
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
        ">
            <h3 style="margin-bottom: 12px; font-size: 20px;">Need Assistance with Plate Mode?</h3>
            <p style="font-size: 14px; line-height: 1.5;">
                When using the <strong>Default</strong> format (e.g., <strong>CO25 MSR</strong>), only current real-world plate years are permitted — such as <strong>COMSR</strong> for the year 2025.
                The <strong>Private</strong> format (e.g., <strong>C06 MSR</strong>) allows for full customization, including formats like <strong>1 MSR</strong>, <strong>11 MSR</strong>, or <strong>CO63 MSR</strong>.
                As for the <strong>Show</strong> format — if you're using it, you likely already know its purpose.
            </p>
            <button id="closePopup" style="
                margin-top: 20px;
                background: transparent;
                color: #ccc;
                border: 1px solid #555;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'" onmouseout="this.style.backgroundColor='transparent'">
                Ok
            </button>
            <p style="font-size: 12px; margin-top: 16px;">
                Clicking <strong>Ok</strong>, <strong>Esc</strong> or <strong>Backspace</strong> will hide this popup for 1 hour.
                Press <strong>i</strong> in the creator to show it again manually.
            </p>
        </div>
    `;

     const styleTag = document.createElement('style');
    styleTag.textContent = `
        @keyframes fadeIn {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(styleTag);

    const HIDE_DURATION_MS = 60 * 60 * 1000;

    function showPopup() {
        const lastClosed = sessionStorage.getItem('notePopupClosedAt');
        const now = Date.now();

        if (lastClosed && now - parseInt(lastClosed, 10) < HIDE_DURATION_MS) {
            return;
        }

        if (!document.getElementById('notePopup')) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = popupHTML.trim();
            document.body.appendChild(wrapper.firstElementChild);

            document.getElementById('closePopup').onclick = () => {
                const popup = document.getElementById('notePopup');
                if (popup) popup.remove();
                sessionStorage.setItem('notePopupClosedAt', Date.now().toString());
            };
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Backspace') {
            const popup = document.getElementById('notePopup');
            if (popup) {
                popup.remove();
                sessionStorage.setItem('notePopupClosedAt', Date.now().toString());
            }
        }
    });

    showPopup();

    document.getElementById('openPopupNote')?.addEventListener('click', () => {
        sessionStorage.removeItem('notePopupClosedAt');
        showPopup();
    });
})();