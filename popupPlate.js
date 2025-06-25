(function () {
    const notePopupHTML = `
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
        <style>
            @keyframes fadeIn {
                to { opacity: 1; }
            }
        </style>
    `;

    const supportPopupHTML = `
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

    function showSupportPopup() {
        const lastClosed = sessionStorage.getItem('supportPopupClosedAt');
        const now = Date.now();
        if (lastClosed && now - parseInt(lastClosed, 10) < HIDE_DURATION_MS) return;

        if (!document.getElementById('supportPopup')) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = supportPopupHTML;
            document.body.appendChild(wrapper.firstElementChild);

            document.getElementById('closePopup').onclick = () => {
                document.getElementById('supportPopup')?.remove();
                sessionStorage.setItem('supportPopupClosedAt', Date.now().toString());
                showNotePopup(); // Open second popup after closing the first
            };
        }
    }

    function showNotePopup() {
        const lastClosed = sessionStorage.getItem('notePopupClosedAt');
        const now = Date.now();
        if (lastClosed && now - parseInt(lastClosed, 10) < HIDE_DURATION_MS) return;

        if (!document.getElementById('notePopup')) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = notePopupHTML;
            document.body.appendChild(wrapper.firstElementChild);

            document.getElementById('closePopup').onclick = () => {
                document.getElementById('notePopup')?.remove();
                sessionStorage.setItem('notePopupClosedAt', Date.now().toString());
            };
        }
    }

    // Keybindings for reopening or closing
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'r') {
            e.preventDefault();
            sessionStorage.removeItem('supportPopupClosedAt');
            sessionStorage.removeItem('notePopupClosedAt');
            showSupportPopup();
        }

        if (e.key === 'Escape' || e.key === 'Backspace') {
            const support = document.getElementById('supportPopup');
            const note = document.getElementById('notePopup');
            if (support) {
                support.remove();
                sessionStorage.setItem('supportPopupClosedAt', Date.now().toString());
                showNotePopup(); // Ensure second still shows
            } else if (note) {
                note.remove();
                sessionStorage.setItem('notePopupClosedAt', Date.now().toString());
            }
        }

        document.getElementById('openPopupNote')?.addEventListener('click', () => {
            sessionStorage.removeItem('notePopupClosedAt');
            showNotePopup();
        });
    });

    // Initial launch
    showSupportPopup();
})();
