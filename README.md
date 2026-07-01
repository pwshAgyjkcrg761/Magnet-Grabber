# <img src="https://codeberg.org/pwshAgyjkcrg761/Magnet-Grabber/raw/branch/main/icons/icon-toolbar/magnet-grabber-classic-red-white-horseshoe-magnet-indigo-background.svg" width="32" height="32"> MAGNET GRABBER™ <img src="https://codeberg.org/pwshAgyjkcrg761/Magnet-Grabber/raw/branch/main/icons/icon-toolbar/magnet-grabber-classic-red-white-horseshoe-magnet-indigo-background.svg" width="32" height="32">
**A privacy-focused magnet link utility designed for stealthy identification and logging.**

---

## Overview
Magnet Grabber™ is a specialized extension built for the **TOR Browser** environment. It provides a non-intrusive way to capture magnet links, page titles, and source URLs. Unlike standard scrapers, it uses a Shadow DOM injection method to prevent website fingerprinting and script-based detection of the extension’s UI.

**Primary Environment:** This extension was developed and tested exclusively on **TOR Browser 15.0.17** (based on Mozilla Firefox 140.12.0esr). Stability on standard Firefox builds is expected but not the primary design target.

### The Capture Engine
The extension monitors the DOM for magnet protocols and presents a floating, draggable interface only when a valid link is detected. 

Key operational features include:
1. **Stealth UI:** The copy button is injected into a closed Shadow Root, making it invisible to the host page's JavaScript and CSS.
2. **Context-Aware Logging:** Users can choose between "Magnet Only" mode (captures just the hash/link) or "Full" mode (captures `Title @@ URL @ Magnet`).
3. **Data Segregation:** Logs are stored locally per-site, with a "Primary Log" feature that aggregates all captured data into a single formatted report.
4. **Manual UI Control:** The interface can be repositioned via a right-click drag-and-drop mechanism, with the position persisting across sessions.

### Security & Privacy
The "Wipe All" protocol ensures that all locally stored logs are purged and the system clipboard is cleared in a single action. For maximum OPSEC, the "Primary Log" export is designed for offline analysis in spreadsheet applications like LibreOffice Calc to avoid data leakage to cloud-based document editors.

---

## Feature Reference

| Option | Description |
| :--- | :--- |
| **Allow Identical Page Links** | When disabled, the grabber only appears if the page contains a unique magnet link. When enabled, it allows capturing links even if they point to the same resource. |
| **Magnet Only Mode** | Strips all metadata. Only the raw `magnet:?xt=...` string is copied and logged. |
| **Enable Log to File** | Enables internal storage logging. When active, the UI confirms if a link is a "DUPLICATE" or if it was "COPIED TO LOG". |
| **Download Site Log** | Exports a timestamped `.txt` file containing all captures for the current active onion/domain. |
| **Wipe All Logs & Clipboard** | The "Panic Button." Nukes the extension's local storage and overwrites the clipboard with an empty string. |

---

## Assets & Licensing
This software is released under the **GNU General Public License v3**.

### Icon Credits
* **File:** `magnet-grabber-classic-red-white-horseshoe-magnet-indigo-background.svg`
    * **Copyright:** Copyright (C) 2026 pwshAgyjkcrg761. All rights reserved.
* **File:** `icon-wipe-all-logs-and-clipboard-skull-crossbones.svg`
    * **Asset:** Pirate Flag
    * **Source:** <a href="https://www.svgrepo.com/svg/407213/pirate-flag" target="_blank">https://www.svgrepo.com/svg/407213/pirate-flag</a>
    * **License:** <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>

---

## Dependencies
* **Browser:** TOR Browser 15.0.17+ (Recommended).
* **Manifest Version:** Built on Manifest V3 (Firefox/Gecko variant).
* **Permissions:** Requires `storage` for logging and `downloads` for log exportation.

## Support & Maintenance
**This repository is provided "as-is" for archival purposes.** The author is not actively looking for feedback, feature requests, or bug reports. The issue tracker is disabled.

## Disclaimer
*This extension is a tool for data management. The author is not responsible for the content of the magnet links captured or any legal implications arising from their use. Always practice standard TOR safety protocols and do not export logs to networked environments.*

---
> **Document Control**
> *This document is up-to-date with the following version of Magnet Grabber™.*
> *2026.07.01__14.21.56*