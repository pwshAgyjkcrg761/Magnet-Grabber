// ==============================================================================
// SCRIPT: background.js for Magnet Grabber™
// VERSION: 2026.07.01__10.36.12
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "downloadLog") {
        const blob = new Blob([request.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        chrome.downloads.download({
            url: url,
            filename: request.filename,
            saveAs: true,
            conflictAction: 'uniquify'
        }, (id) => {
            setTimeout(() => URL.revokeObjectURL(url), 10000);
        });
    }
    return true; 
});