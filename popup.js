(function () {
    const popupHTML = `
        <div id="supportPopup" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(30, 30, 30, 0.85);
            backdrop-filter: blur(8px);
            color: white;
            padding: 25px 35px;
            border-radius: 16px;
            z-index: 1000000;
            font-family: 'Poppins', sans-serif;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
            max-width: 400px;
            width: 90%;
            text-align: center;
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
        ">
            <h3 style="margin-bottom: 12px; font-size: 20px;">Need Assistance?</h3>
            <p style="font-size: 14px; line-height: 1.5;">
                If you encounter any issues, press <strong>Ctrl + R</strong> to reopen this support window at any time.<br>
                Once you’ve joined our <strong>Discord server</strong>, kindly open a support ticket so our team can assist you promptly!
            </p>
            <a href="https://discord.com/channels/1269583480631595039/1299749292441079849/1386324111529214072" target="_blank" style="
                display: inline-block;
                margin-top: 15px;
                padding: 10px 20px;
                background-color: #5865F2;
                color: white;
                font-weight: 500;
                text-decoration: none;
                border-radius: 8px;
                transition: background 0.3s ease;
            " onmouseover="this.style.backgroundColor='#4752c4'" onmouseout="this.style.backgroundColor='#5865F2'">
                Join Our Discord
            </a><br>
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
                Close
            </button>
        <p>If you click <strong>Close, Esc or Backspace</strong>, this popup will remain hidden for 1 hour—unless reopened manually by pressing <strong>Ctrl + R</strong>.</p>
        </div>
        <style>
            @keyframes fadeIn {
                to { opacity: 1; }
            }
        </style>
    `;

    const HIDE_DURATION_MS = 60 * 60 * 1000;

    function showPopup() {
        const lastClosed = sessionStorage.getItem('supportPopupClosedAt');
        const now = Date.now();

        if (lastClosed && now - parseInt(lastClosed, 10) < HIDE_DURATION_MS) {
            return;
        }

        if (!document.getElementById('supportPopup')) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = popupHTML;
            document.body.appendChild(wrapper.firstElementChild);

            document.getElementById('closePopup').onclick = () => {
                const popup = document.getElementById('supportPopup');
                if (popup) popup.remove();
                sessionStorage.setItem('supportPopupClosedAt', Date.now().toString());
            };
        }
    }

        document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'r') {
            e.preventDefault();
            sessionStorage.removeItem('supportPopupClosedAt');
            showPopup();
        }

        if (e.key === 'Escape' || e.key === 'Backspace') {
            const popup = document.getElementById('supportPopup');
            if (popup) {
                popup.remove();
                sessionStorage.setItem('supportPopupClosedAt', Date.now().toString());
            }
        }
    });
    showPopup();
})();
