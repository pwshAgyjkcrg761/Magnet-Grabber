# <img src="https://git.disroot.org/pwshAgyjkcrg761/Magnet-Grabber/raw/branch/main/icons/icon-toolbar/magnet-grabber-classic-red-white-horseshoe-magnet-indigo-background.svg" width="32" height="32"> MAGNET GRABBER™ - TESTING HUB <img src="https://git.disroot.org/pwshAgyjkcrg761/Magnet-Grabber/raw/branch/main/icons/icon-toolbar/magnet-grabber-classic-red-white-horseshoe-magnet-indigo-background.svg" width="32" height="32">
**Sandbox environment for verifying manifest logic and browser-triggered update protocols.**

---

<blockquote>
  <p><strong>⚠️ WARNING:</strong> Updating from the test xpi no longer works because TOR Browser triggers a bot check on Disroot raw links.</p>
</blockquote>

## Purpose
This directory serves as a QA staging area. It contains intentionally downgraded and unsigned variants of the extension to verify that the `update_url` mechanism correctly identifies, fetches, and validates newer signed releases from the main repository.

## Testing Assets
| Asset | Description |
| :--- | :--- |
| **Filename** | `MagnetGrabber_UNSIGNED-OLDER-VERSION-TEST.xpi.zip` |
| **Status** | Unsigned / Development Build |
| **SHA256 Hash** | `8EFE6D30390A28BB421E77056E4BA77CCAC6D823D19A67DABFEEFDF943BB59A2` |

## Update Verification Workflow
To test the update path from a lower version to the current production release:

1. **Preparation:** Download the `MagnetGrabber_UNSIGNED-OLDER-VERSION-TEST.xpi.zip` file.
2. **Configuration:** Ensure your browser is configured to allow unsigned extensions (e.g., `xpinstall.signatures.required` set to `false` in `about:config`).
3. **Deployment:** Navigate to `about:addons`, click the gear icon, and select **Install Add-on From File...**. Select the `.xpi.zip` file.
4. **Trigger Update:** 
   - Navigate to `about:addons`.
   - Click the gear icon (Tools for all add-ons).
   - Select **Check for Updates**.
5. **Validation:** The browser should compare the version in the test manifest against the `updates.json` in the root repository and prompt to install the signed production `.xpi`.

## Technical Requirements
* **ID Consistency:** The extension ID in the testing manifest must match `magnet-grabber@pwshagyjkcrg761.codeberg.org` for the update logic to bridge correctly.

---
> **QA Control**<br>
> **Static Baseline Version:** 2026.1.1.1<br>
> **Internal Date Stamp:** 2026.09.20__19.21.37<br>
> *Note: This testing build remains static to provide a consistent baseline for verifying update triggers to newer production releases.*