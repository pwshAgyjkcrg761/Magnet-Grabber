// ==============================================================================
// SCRIPT: popup.js for Magnet Grabber™ UNSIGNED OLDER VERSION TEST
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

const elements = ['dupToggle', 'magToggle', 'logToggle'];
const saveBtn = document.getElementById('saveBtn');
const masterBtn = document.getElementById('masterBtn');
const clearBtn = document.getElementById('clearBtn');
const wipeAllBtn = document.getElementById('wipeAllBtn');

async function getSiteKey() {
    const tabs = await new Promise(resolve => chrome.tabs.query({active: true, currentWindow: true}, resolve));
    if (!tabs[0] || !tabs[0].url) return "Global";
    return new URL(tabs[0].url).hostname.replace(/\./g, '_').replace(/[\\\/:*?"<>|]/g, '');
}

async function updateUI() {
    const siteKey = await getSiteKey();
    chrome.storage.local.get(null, (all) => {
        const settings = {
            allowDuplicates: all.allowDuplicates || false,
            magnetOnly: all.magnetOnly || false,
            logEnabled: all.logEnabled || false
        };
        const mode = settings.magnetOnly ? "Magnet Only" : "Full";
        const storageKey = `links_${siteKey}_${mode.replace(/\s/g, '')}`;
        const siteLinks = all[storageKey] || [];
        const total = Object.keys(all).filter(k => k.startsWith('links_')).reduce((s, k) => s + all[k].length, 0);

        primaryBtn.innerText = `Download Primary Log (${total})`;
        saveBtn.innerText = `Download ${siteKey} ${mode} (${siteLinks.length})`;
        document.getElementById('dupToggle').checked = settings.allowDuplicates;
        document.getElementById('magToggle').checked = settings.magnetOnly;
        document.getElementById('logToggle').checked = settings.logEnabled;
    });
}

elements.forEach(id => {
    document.getElementById(id).addEventListener('change', (e) => {
        let key = id === 'dupToggle' ? 'allowDuplicates' : (id === 'magToggle' ? 'magnetOnly' : 'logEnabled');
        chrome.storage.local.set({ [key]: e.target.checked }, updateUI);
    });
});

saveBtn.onclick = async () => {
    const siteKey = await getSiteKey();
    chrome.storage.local.get({ magnetOnly: false }, (settings) => {
        const mode = settings.magnetOnly ? "MagnetOnly" : "Full";
        const fileMode = settings.magnetOnly ? "Magnet_Only" : "Full";
        const storageKey = `links_${siteKey}_${mode}`;
        chrome.storage.local.get({ [storageKey]: [] }, (res) => {
            if (res[storageKey].length === 0) return;
            
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.getHours().toString().padStart(2, '0') + '-' + 
                            now.getMinutes().toString().padStart(2, '0') + '-' + 
                            now.getSeconds().toString().padStart(2, '0');
            
            chrome.runtime.sendMessage({
                action: "downloadLog",
                content: res[storageKey].join('\n'),
                filename: `MG__${siteKey}__${fileMode}__${dateStr}__${timeStr}.txt`
            });
        });
    });
};

clearBtn.onclick = async () => {
    const siteKey = await getSiteKey();
    chrome.storage.local.get({ magnetOnly: false }, (s) => {
        const mode = s.magnetOnly ? "MagnetOnly" : "Full";
        if(confirm(`Clear ${mode} log for ${siteKey}?`)) {
            chrome.storage.local.set({ [`links_${siteKey}_${mode}`]: [] }, updateUI);
        }
    });
};

primaryBtn.onclick = () => {
    chrome.storage.local.get(null, (all) => {
        const keys = Object.keys(all).filter(k => k.startsWith('links_')).sort();
        const total = keys.reduce((s, k) => s + all[k].length, 0);
        if (total === 0) return;

        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.getHours().toString().padStart(2, '0') + '-' + 
                        now.getMinutes().toString().padStart(2, '0') + '-' + 
                        now.getSeconds().toString().padStart(2, '0');
        const stamp = `${dateStr}__${timeStr}`;

        let content = `================================================================================\n`;
        content += `Magnet Grabber Primary Log - ${stamp}\n`;
        content += `================================================================================\n`;
        content += `SECURITY NOTICE: For maximum privacy, import this data into an offline \n`;
        content += `spreadsheet application like LibreOffice Calc. Avoid online spreadsheets.\n`;
        content += `================================================================================\n\n`;

        keys.forEach(k => {
            const parts = k.split('_');
            const siteName = parts.slice(1, -1).join('.');
            const displayMode = parts[parts.length - 1] === 'MagnetOnly' ? 'Magnet Only' : 'Full';
            content += `[SITE: ${siteName}] ${displayMode}\n`;
            content += `--------------------------------------------------------------------------------\n\n`;
            content += all[k].join('\n') + '\n\n\n';
        });

        content += `================================================================================\n`;
        content += `END OF LOG\n`;
        content += `================================================================================`;

        chrome.runtime.sendMessage({
            action: "downloadLog",
            content: content,
            filename: `MG__Primary_Log__${stamp}.txt`
        });
    });
};

wipeAllBtn.onclick = async () => {
    if (confirm("Are you sure? This will wipe logs for ALL sites and clear your clipboard.")) {
        chrome.storage.local.get(['allowDuplicates', 'magnetOnly', 'logEnabled', 'btnTop', 'btnLeft'], (settings) => {
            chrome.storage.local.clear(() => {
                chrome.storage.local.set(settings, async () => {
                    try {
                        await navigator.clipboard.writeText("");
                    } catch (err) {
                        console.error("Clipboard wipe failed:", err);
                    }
                    updateUI();
                });
            });
        });
    }
};

updateUI();
setInterval(updateUI, 1000);