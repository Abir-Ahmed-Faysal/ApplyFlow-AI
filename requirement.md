# Task: add mail-merge send + row-audit features to an existing Google Apps Script job tracker

*( — supersedes the earlier "AI_Agent_Prompt_MailMerge_Feature.md")*

## Context

You are extending an existing Google Sheets + Apps Script job application tracker. Two reference files are attached:

* `JobTracker_Script.js` — the current Apps Script (Google Sheets bound script)
* `job_tracker_v8.xlsx` — the spreadsheet structure

Read both fully before writing any code.

**Current sheet tabs:**

* `Applications` — one row per job, 24 columns (A–X): No., Applied Date, Company Name, Job Title, Job Type, Platform, Apply Method (Email/Link), Apply Link/Email, Work Mode, Location, Salary, Experience Req., Deadline, Key Info, Match Score, Score Notes, Application Status, Response, Follow-up Date, Interview Date, Recruiter Name, Referred By, Contact/WhatsApp, Notes.
* `My Rules`, `Dashboard`, `Quick Reference` (resume Drive links by role), `ChartData`.

**Current script behavior:** a custom menu opens an HtmlService dialog where the user pastes a job circular. The script calls Groq's API to extract structured job data, scores it against a hardcoded skills list, and appends a row to `Applications` if it clears a threshold. Preserve this flow exactly — you are adding to it, not replacing it.

**New columns to add to `Applications`:** `Mail Sent` (timestamp, blank until sent), `Subject Format` (AI-extracted custom subject instruction, or "Default"), `Audit Issue` (blank, or the reason a row failed validation).

## Objective

Let the user send a fully personalized application email — subject line computed correctly, right attachments included — from one click on a job row, with a final visual check before anything leaves the account. Separately, let the user run a one-click audit that flags any row with missing or invalid data in red, so broken rows never get attempted.

## Part 1 — AI extraction extension

In the existing `buildPrompt()` function, add one more field to the JSON the AI returns:

```
"customSubjectInstruction": "the exact subject format requested in the circular, or N/A"
```

Many job circulars explicitly state a required subject line ("Subject: Full Stack Developer Application – [Your Name]"). If found, store the raw extracted instruction in the new `Subject Format` column. If not found, store the literal string `"Default"`.

## Part 2 — Subject computation (at send time, not at analysis time)

* If `Subject Format` = `"Default"` → compute `{{role}} Application - Md Faysal Ahmed`, filling `{{role}}` from the row's Job Title.
* If `Subject Format` contains a real extracted instruction → parse out its placeholder slot for the role/position name, fill it from the row's Job Title, and append `- Md Faysal Ahmed` (or `- Md Faysal Ahmed` per the circular's exact separator if specified).
* This computed subject is always shown to the user in the preview step below — never sent without a human glance, since AI extraction can misread an unusual circular format.

## Part 3 — Send dialog

1. **Row picker** : dropdown of rows where Apply Method = "Email" and `Mail Sent` is empty (label: Company + Job Title).
2. **Body template** : read from the existing/new `Email Template` tab, merge `{{role}}` and `{{company name}}` (case-insensitive placeholder matching).
3. **Attachments — two fields** :

* Field 1, "Resume / CV" — required by default. Dropdown of saved role-based resumes (from `Quick Reference`) plus an "upload instead" toggle (`<input type="file">` → FileReader → base64 → server-side `Utilities.newBlob`). If left empty, warn but allow the user to confirm sending without it (some circulars explicitly say no attachment needed).
* Field 2, "Additional file" — optional, same saved-or-upload mechanism. Leaving it empty is silent and fine — no warning, no block.

1. **Final preview panel** (must show before the send button is enabled): Company Name, Job Title, the computed Subject line, and the names of whichever attachments are selected. This is the user's last check.
2. **Send button** : on click, runs all validations below, then sends via `GmailApp.sendEmail` (HTML body) with attachment blob(s) resolved from either Drive or the uploaded base64 data.

## Part 4 — Validation / error handling (must all be explicit)

* No apply email on the row (Apply Method = "Link") → row excluded from the picker entirely.
* Apply contact isn't a valid email format → regex-check before send; block with a specific message.
* Row already marked sent (`Mail Sent` non-empty) → excluded from the picker; if somehow re-selected, require explicit confirm.
* Unfilled merge placeholder after merging (any leftover `{{...}}` in subject or body) → block, name the exact placeholder.
* Saved attachment file missing/inaccessible → wrap `DriveApp.getFileById()` in try/catch, name the specific file.
* Attachments exceed ~25MB combined → check blob size, warn before send.
* Gmail daily quota exceeded → catch distinctly, stop immediately, report how many sent before the limit hit.
* Empty template cell in `Email Template` tab → refuse to send, point to the tab.

## Part 5 — Row audit (separate feature, separate menu item)

New menu item, e.g. `🔍 রো যাচাই করুন`. On click, runs a single pass over `Applications` (read once with `getDataRange().getValues()`, write once at the end — never per-cell get/set in a loop):

* **Skip** any row where `Mail Sent` is already filled — audit never touches already-sent rows.
* For every remaining row where Apply Method = "Email", check: Apply Email present and valid format; Company Name not empty/"N/A"; Job Title not empty/"N/A"; Deadline (if present) hasn't already passed.
* **If any check fails** : set the row's background to red, and write the specific reason (e.g. "Invalid email format", "Missing company name", "Deadline passed") into the `Audit Issue` column. Never silently fix or delete the underlying data — flag only.
* **If all checks pass** : clear any previous red background/issue note, leave the row as-is (ready to send).
* This is rule-based validation, not an AI call — deterministic, instant, and free. (An AI layer can be added later for fuzzier checks like "does this company name look fabricated," but start without it.)

## Constraints

* Pure Google Apps Script — `SpreadsheetApp`, `GmailApp`, `DriveApp`, `HtmlService`, `UrlFetchApp`. No external backend.
* Single-file deliverable, additive to the existing `JobTracker_Script.js` — do not remove or rename existing functions (`analyzeAndAddJob`, `addRowToSheet`, etc.).
* Audit must batch-read and batch-write (no per-row `getRange().setValue()` calls in a loop) for performance on large sheets.
* Respect Gmail's sending limits (100/day personal Gmail, 1500/day Workspace).

## Deliverable

1. Complete, updated `JobTracker_Script.js` (existing code preserved + new code added).
2. Short setup note: which new tabs/columns to add manually (`Email Template` tab; `Mail Sent`, `Subject Format`, `Audit Issue` columns).

## Definition of done

* [ ] A circular with an explicit required subject format gets that format extracted and used; otherwise the default format applies.
* [ ] The send dialog always shows a final preview (company, role, computed subject, attachment names) before the send button can be clicked.
* [ ] Leaving the "Additional file" field empty never blocks or warns.
* [ ] Leaving the "Resume/CV" field empty warns but can be confirmed through.
* [ ] Sending updates `Mail Sent` timestamp and `Application Status`.
* [ ] Running the audit flags rows with missing/invalid email, company, role, or a passed deadline in red with a written reason — and does not alter any underlying data.
* [ ] The audit skips every row that's already marked sent.
* [ ] Re-running the audit after fixing a flagged row clears its red background and issue note.
