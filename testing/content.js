// ==============================================================================
// SCRIPT: content.js for Magnet Grabber™ UNSIGNED OLDER VERSION TEST
// VERSION: 2026.07.02__08.10.24
// TARGET: TOR Browser 15.0.17 (based on Mozilla Firefox 140.12.0esr)
//
// Copyright (C) 2026 pwshAgyjkcrg761
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/gpl-3.0.html>.
// ==============================================================================
// <PROTECTED>
// ==============================================================================
// AI INSTRUCTIONS v2026.06.24__06.54.45 : 
//
// 1. MESSAGE STAMP: 
//    - Every response containing code MUST begin with a standalone version stamp.
//    - Use CHICAGO TIME (Central Time), 24-hour clock.
//    - Format: YYYY.MM.DD__HH.MM.SS.
//    - CRITICAL: Use the time provided in the prompt or at https://www.timeanddate.com/worldclock/usa/chicago. Ensure minutes are exact.
//
// 2. VERSION SNIPPET PROHIBITION:
//    - DO NOT provide code snippets, anchors, or steps to update the script's internal VERSION comment or $scriptVersion variable. 
//    - The user handles internal file versioning manually based on the Message Stamp.
//
// 3. SCRIPT OUTPUT (SURGICAL FIXES ONLY):
//    - Provide minimal, highly targeted, surgical edits. Do not rewrite large blocks or entire functions.
//    - Always use a codebox with a copy button.
//    - Multiple modifications MUST be presented strictly ONE step at a time. Wait for user confirmation before proceeding to the next step. 
//    - DO NOT modify or refactor any code inside <PROTECTED> tags.
//
// 4. VERBATIM ANCHOR PROTOCOL (FOR NOTEPAD++):
//    - To facilitate "Find" in Notepad++, always structure edits with:
//      - "Verbatim Anchor (Before)" - The exact lines of existing code immediately before the change.
//      - "Verbatim Anchor (After)" - The exact lines of existing code immediately after the change.
//      - "Snippet to REPLACE" - The exact code block to be deleted.
//      - "What to PASTE in its place" - The new code block to be inserted.
//    - Do not summarize, truncate, or refactor the existing code used as an anchor.
//    - Match spaces, comments, and symbols exactly as they appear in the file.
//
// 5. CONTENT PRESERVATION:
//    - Do not remove, modify, or strip out telemetry data or DevDebug information from any provided code.
// ==============================================================================
// </PROTECTED>

(function() {
    let allowDuplicates = false, magnetOnly = false, logEnabled = false;
    let currentTop = '150px', currentLeft = null, isProcessing = false;
    let shadowHost = null, shadowRoot = null;

    function applyStyles(btn, bg, txt, brd, op) {
        btn.style.setProperty('background-color', bg, 'important');
        btn.style.setProperty('color', txt, 'important');
        btn.style.setProperty('border', `2px solid ${brd}`, 'important');
        btn.style.setProperty('outline', `2px solid ${brd}`, 'important');
        btn.style.setProperty('opacity', op, 'important');
    }

    const runGrabber = () => {
        const check = () => {
            if (isProcessing) return;
            const links = Array.from(document.querySelectorAll('a[href^="magnet:"]'));
            if (links.length === 0) return;
            let shouldShow = allowDuplicates ? links.every(l => l.href === links[0].href) : (links.length === 1);
            if (!shouldShow) { if (shadowHost) { shadowHost.remove(); shadowHost = null; shadowRoot = null; } return; }
            if (shadowHost) {
                const btn = shadowRoot.getElementById('tor-copy-btn');
                const targetText = magnetOnly ? 'Copy Magnet' : 'Copy Magnet, URL, Title';
                if (!btn.classList.contains('active-status')) btn.innerText = targetText;
                return;
            }

            const magnetLink = links[0];
            shadowHost = document.createElement('div');
            shadowRoot = shadowHost.attachShadow({ mode: 'closed' });
            const btn = document.createElement('button');
            btn.id = 'tor-copy-btn';
            btn.innerText = magnetOnly ? 'Copy Magnet' : 'Copy Magnet, URL, Title';
            Object.assign(btn.style, {
                position: 'fixed', zIndex: '2147483647', fontFamily: 'Verdana', fontSize: '15pt',
                fontWeight: 'bold', borderRadius: '8px', cursor: 'move', width: '400px', height: '55px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            });
            applyStyles(btn, '#7B00FF', 'black', 'black', '0.5');
            btn.style.top = currentTop;
            if (currentLeft) { btn.style.left = currentLeft; btn.style.right = 'auto'; } else { btn.style.right = '20px'; }

            let isDragging = false, startX, startY;
            btn.addEventListener('mousedown', (e) => {
                if (e.button === 2) { 
                    isDragging = true; 
                    startX = e.clientX - btn.getBoundingClientRect().left; 
                    startY = e.clientY - btn.getBoundingClientRect().top; 
                }
            });
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                currentTop = (e.clientY - startY) + 'px';
                currentLeft = (e.clientX - startX) + 'px';
                btn.style.top = currentTop; btn.style.left = currentLeft;
            });
            document.addEventListener('mouseup', (e) => {
                if (isDragging && e.button === 2) {
                    isDragging = false;
                    chrome.storage.local.set({ btnTop: currentTop, btnLeft: currentLeft });
                }
            });
            btn.addEventListener('contextmenu', e => e.preventDefault());

            btn.onclick = () => {
                isProcessing = true; btn.classList.add('active-status');
                const finalString = magnetOnly ? magnetLink.href : `${document.title} @@ ${window.location.href} @ ${magnetLink.href}`;
                const siteKey = window.location.hostname.replace(/\./g, '_').replace(/[\\\/:*?"<>|]/g, '');
                const storageKey = `links_${siteKey}_${magnetOnly ? "MagnetOnly" : "Full"}`;

                navigator.clipboard.writeText(finalString).then(() => {
                    chrome.storage.local.get({ logEnabled: false, [storageKey]: [] }, (res) => {
                        const list = res[storageKey];
                        const isDup = list.includes(finalString);
                        
                        if (res.logEnabled) {
                            if (isDup) {
                                btn.innerText = 'DUPLICATE FOUND!';
                                applyStyles(btn, '#D2691E', 'black', 'black', '1.0');
                            } else {
                                btn.innerText = 'COPIED TO LOG!';
                                list.push(finalString);
                                chrome.storage.local.set({ [storageKey]: list });
                                applyStyles(btn, '#0000CD', '#8B008B', 'black', '1.0');
                            }
                        } else {
                            btn.innerText = 'COPIED!';
                            applyStyles(btn, '#0000CD', '#8B008B', 'black', '1.0');
                        }

                        setTimeout(() => {
                            btn.innerText = magnetOnly ? 'Copy Magnet' : 'Copy Magnet, URL, Title';
                            applyStyles(btn, '#7B00FF', 'black', 'black', '0.5');
                            btn.classList.remove('active-status'); isProcessing = false;
                        }, 2000);
                    });
                });
            };
            shadowRoot.appendChild(btn);
            document.body.appendChild(shadowHost);
        };
        setInterval(check, 1500);
    };

    chrome.storage.local.get({ allowDuplicates: false, magnetOnly: false, logEnabled: false, btnTop: '150px', btnLeft: null }, (res) => {
        allowDuplicates = res.allowDuplicates; magnetOnly = res.magnetOnly; logEnabled = res.logEnabled;
        currentTop = res.btnTop; currentLeft = res.btnLeft; runGrabber();
    });
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.allowDuplicates) allowDuplicates = changes.allowDuplicates.newValue;
        if (changes.magnetOnly) magnetOnly = changes.magnetOnly.newValue;
        if (changes.logEnabled) logEnabled = changes.logEnabled.newValue;
    });
})();