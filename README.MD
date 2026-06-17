# 🚀 ApplyFlow AI - Intelligent Job Application Automation

> Automate your job applications with AI-powered analysis, intelligent file management, and bulk email sending from Google Sheets.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with ❤️ by Md Faysal Ahmed](https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20by-Md%20Faysal%20Ahmed-blue)](https://github.com/Abir-Ahmed-Faysal)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps-Script-red)
![Groq API](https://img.shields.io/badge/AI-Groq%20API-orange)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [How It Works](#-how-it-works)
- [Demo](#-demo)
- [File Structure](#-file-structure)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**ApplyFlow AI** is a Google Sheets + Apps Script solution that revolutionizes job application workflow:

- **Parse job circulars** using AI (Groq API)
- **Auto-extract** company, position, requirements, email, deadline
- **Calculate skill match** score (0-100%)
- **Validate data** with automated audit
- **Send bulk emails** with **per-job unique attachments** from local machine
- **Track all applications** with timestamps and attachment records

**Perfect for:** Job seekers applying to multiple positions daily without manual repetition.

---

## 📋 Requirements & Setup Checklist

### ✅ Before You Start - What You Need

#### **Accounts & Access**
- [ ] **Google Account** (Gmail + Google Drive access)
- [ ] **Groq API Key** (free, no payment required)
- [ ] Modern web browser (Chrome, Firefox, Safari, Edge)

#### **Files You Should Have Ready**
- [ ] **CV/Resume** (PDF/DOC) - Keep on your local machine
- [ ] **Cover Letter** (optional) - Any format
- [ ] **Portfolio Link** (optional) - For technical roles
- [ ] **Job Circular** - Any format (text, PDF, email, link)

#### **System Requirements**
- [ ] Internet connection (always required)
- [ ] Read/Write access to local file system
- [ ] JavaScript enabled in browser
- [ ] Pop-ups allowed (for dialogs)
- [ ] File size: Max 5MB per attachment

#### **Time & Skills Needed**
| Aspect | Time | Skill Level |
|--------|------|---|
| Initial Setup | 5-10 mins | Beginner |
| Per Job | 1-2 mins | Beginner |
| Bulk Send (5 jobs) | 5-10 mins | Beginner |
| Troubleshooting | 10-15 mins | Intermediate |

### 🔑 Required API Setup

#### **Groq API (Must Have)**
```
⏱️ Time: 2 minutes
💰 Cost: FREE (no credit card)
```

**Steps:**
1. Go to https://console.groq.com/keys
2. Click "Sign Up" → Create account (email + password)
3. Verify email
4. Click "Create API Key"
5. Copy your key: `gsk_xxxxxxxxxxxxx`
6. Paste in script (see Installation Step 3)

✅ **Free tier includes:**
- 30 requests/minute (plenty for jobs)
- No time limit
- No credit card needed
- Generous free quota

#### **Gmail API (Automatic)**
- ✅ No setup needed!
- Apps Script auto-enables for your account
- System uses your Gmail to send emails

---

## 🚀 Quick Start (5 Minutes)

### **Minimum Setup Required:**
1. ✅ Google Account
2. ✅ Groq API Key
3. ✅ Google Sheet
4. ✅ Apps Script pasted
5. ✅ Local CV file

### **Then You Can:**
- Add job circular → AI extracts data → Choose your CV → Send email ✅

---

## 🎯 Overview

**ApplyFlow AI** is a Google Sheets + Apps Script solution that revolutionizes job application workflow:

- **Parse job circulars** using AI (Groq API)
- **Auto-extract** company, position, requirements, email, deadline
- **Calculate skill match** score (0-100%)
- **Validate data** with automated audit
- **Send bulk emails** with **per-job unique attachments** from local machine
- **Track all applications** with timestamps and attachment records

**Perfect for:** Job seekers applying to multiple positions daily without manual repetition.

---

## ✨ Key Features

### 🤖 AI-Powered Job Analysis
- Uses **Groq AI (Mixtral 8x7b)** for intelligent parsing
- Extracts: Company, Position, Email, Salary, Location, Requirements, Deadline
- Skill matching against your profile
- Automatic score calculation (0-100%)

### 📧 Intelligent Email Sending
- **Per-job unique attachments** - Different resume/CV for each application
- Custom email templates with placeholder support
- **Auto-detect custom subject formats** from job circulars
- Always appends your name to subject line: "Application for [Role] - Md Faysal Ahmed"
- Supports both Gmail drafts and Sheet templates

### 📝 Advanced Email Templates
- **HTML & Plain text** support
- **Placeholder replacement:**
  - `{{position}}` or `{{role}}` → Job Title
  - `{{company}}` or `{{company name}}` → Company Name
  - `{{role only the main role}}` → Main role (removes junior, senior, intern, etc.)
- **Fallback:** If template missing, uses built-in default template

### 🎯 Role Processing with AI
- Extracts **main role** from job titles
- Example: "Senior Backend Developer Intern" → "Backend Developer"
- Uses Groq AI when available, fallback regex otherwise

### 📊 Data Validation & Audit
- One-click row audit system
- Flags missing/invalid data in red
- Prevents sending incomplete applications
- Tracks audit issues per row

### 💾 Application Tracking
- Records: Mail Sent timestamp, Subject format, Attached files
- Prevents duplicate applications
- Email status: "Applied", "Pending", "Follow-up", etc.
- Interview date tracking

### 🔄 Bulk Operations
- Process up to **10 jobs simultaneously**
- File picker for each job
- Progress status updates
- Error handling per application

---

## 🛠️ Installation (Step by Step with Screenshots)

### Prerequisites
- ✅ Google Account (Gmail + Google Drive)
- ✅ Google Sheet created
- ✅ Groq API Key (free from https://console.groq.com)

### Step 1️⃣: Create Google Sheet

**What you'll see:**

```
1. Go to → https://sheets.google.com
2. Click → "+ New" (bottom left)
3. Select → "Blank spreadsheet"
4. Name it → "Job Tracker - ApplyFlow AI"
5. You now have a blank sheet ✅
```

**Expected result:** Blank Google Sheet with default columns (A, B, C, D...)

---

### Step 2️⃣: Add Apps Script Code

**What you'll do:**

```
1. In Google Sheet, top menu → Extensions
2. Select → Apps Script
3. Delete the default code shown (select all, delete)
4. Copy entire code from → JobTracker_Script.js file
5. Paste it in the Apps Script editor
6. Press → Ctrl+S (Save)
7. Click → "Save" button if dialog appears
```

**Expected result:** 
```
✅ No errors shown
✅ File saved as "Code.gs"
✅ Script is now bound to your sheet
```

**Permissions Dialog (First Run):**
When you first run a function, Google will ask:
```
"This app wants to:
- Send emails on your behalf (Gmail)
- Access your files (Google Drive)
- Modify this spreadsheet"

Click: ✅ "Allow" to proceed
```

✅ **This is normal and required!**

---

### Step 3️⃣: Set Your Groq API Key

**Time: 2 minutes**

**A. Get your API key:**
```
1. Go to → https://console.groq.com/keys
2. Sign up if needed (free, no credit card!)
3. Click → "Create API Key"
4. Copy the key (looks like: gsk_abc123xyz...)
5. Keep it safe!
```

**B. Add to script:**
```
1. Go back to Apps Script editor
2. Find line 14: const GROQ_API_KEY = "YOUR_GROQ_API_KEY";
3. Replace "YOUR_GROQ_API_KEY" with your actual key
   BEFORE: const GROQ_API_KEY = "YOUR_GROQ_API_KEY";
   AFTER:  const GROQ_API_KEY = "gsk_abc123xyz...";
4. Press → Ctrl+S (Save)
```

**Expected result:**
✅ Line 14 now has your key in quotes
✅ No error messages

---

### Step 4️⃣: Run Auto-Setup

**What to do:**

```
1. Close Apps Script tab/window
2. Go back to Google Sheet
3. Reload the page (F5 or Ctrl+R)
4. Wait 5 seconds for sheet to load
5. Top menu → Should see "🤖 ApplyFlow AI" (new menu!)
6. Click → 🤖 ApplyFlow AI
7. Select → ⚙️ অটো-সেটআপ (Auto Setup)
8. Wait for completion (1-2 minutes)
```

**What happens automatically:**
```
✅ Creates "Applications" tab with correct columns
✅ Sets up headers and formatting
✅ Creates "My Rules" tab
✅ Creates "Dashboard" tab
✅ Initializes all settings
✅ Shows "Setup Complete!" message
```

**Expected result:**
- ✅ Sheet now has multiple tabs (Applications, My Rules, Dashboard, etc.)
- ✅ Green check appears
- ✅ Menu items show: "📋 নতুন জব সার্কুলার যোগ করুন", "📧 ইমেইল পাঠান", etc.

---

### ✅ Verification Checklist

After installation, verify everything:

- [ ] "🤖 ApplyFlow AI" menu appears in Google Sheet
- [ ] "Applications" tab exists with columns (Company, Job Title, Email, etc.)
- [ ] Groq API key is set (no errors in Apps Script console)
- [ ] You can click → "📋 নতুন জব সার্কুলার যোগ করুন" without errors
- [ ] Dashboard shows 0 jobs (normal for fresh setup)

**If something is wrong:**
```
1. Check Apps Script console for errors (Tools → View logs)
2. Verify Groq API key is correct (no quotes missing)
3. Reload Google Sheet (Ctrl+R)
4. Try Auto-Setup again
```

---

## ⚙️ Configuration

### Email Template Setup (Optional)

You have **3 options** (in priority order):

#### Option 1: Gmail Draft (Recommended)
1. Open Gmail
2. Create new draft with Subject: **"ApplyFlow Template"**
3. Write your email body with placeholders:
   ```
   Dear Hiring Team,
   
   I am excited to apply for the {{position}} at {{company name}}.
   
   Please find attached my resume for your review.
   
   Best regards,
   {{role only the main role like except intern jonor senior etc.}}
   P: +8801779161032
   ```
4. Save draft (don't send)
5. Done! System will use this

#### Option 2: Sheet Template
1. In Google Sheet, create new tab: **"Email Template"**
2. Paste template in cell A1:
   ```
   Dear Hiring Team,
   
   I am excited to apply for the {{position}} position at {{company name}}.
   
   Best regards,
   {{role only the main role like except intern jonor senior etc.}}
   ```
3. Done!

#### Option 3: Built-in Default
- If both above missing, system uses built-in professional template
- No setup needed ✅

### Supported Template Placeholders

| Placeholder | Replaced With | Example |
|---|---|---|
| `{{position}}` or `{{role}}` | Job Title | "Full Stack Developer" |
| `{{company}}` or `{{company name}}` | Company | "TechStart BD" |
| `[role]`, `[position]` | Job Title | "Full Stack Developer" |
| `{{role only}}` | Main role (no seniority) | "Full Stack Developer" (from "Senior Full Stack Developer Intern") |
| `- Md Faysal Ahmed` | Auto-added to email | Always included |

---

## 📖 Usage Guide

### 🔄 Complete Workflow (4 Simple Steps)

#### **Step 1️⃣: Add Job Circular**

**Where to find it:**
- Job posting email
- Company website
- LinkedIn post
- Facebook page
- WhatsApp message
- SMS circular

**What to do:**
```
1. Copy job circular text (any format - doesn't matter!)
2. Go to your Google Sheet
3. Click: 🤖 ApplyFlow AI menu (top-right)
4. Select: 📋 নতুন জব সার্কুলার যোগ করুন (Add New Job Circular)
5. Paste the circular in the dialog
6. Click: তথ্য সংগ্রহ করুন (Gather Information)
7. Wait 3-5 seconds for AI to process
```

**System automatically:**
- ✅ Analyzes with Groq AI
- ✅ Extracts: Company name, Job title, Requirements, Deadline, Email, Salary, Location
- ✅ Calculates: Skill match score (0-100%)
- ✅ Detects: Custom subject format (if any)
- ✅ Adds row to "Applications" sheet if score > 70%

**Example:**
```
Input: "We are looking for a Senior Backend Developer with 3+ years..."
Output: Parsed JSON with company, role, requirements, deadline, email, etc.
Score: 85% ✅ (Added to sheet)
```

---

#### **Step 2️⃣: Review & Validate Data**

**Why this step?**
- Ensure AI extracted correct email address
- Verify deadline is correct
- Flag any missing data

**What to do:**
```
1. Go to "Applications" sheet
2. Review the new row added
3. Check email address column (Column D)
4. Check deadline column (Column O)
5. Manually fix if AI misread anything

Optional - Run Audit:
1. Click: 🤖 ApplyFlow AI menu
2. Select: 🔍 রো যাচাই করুন (Audit Row)
3. Red highlights show errors to fix
4. Green highlights = data is valid ✅
```

**What the audit checks:**
```
✅ Email address format (must be valid)
✅ Company name (cannot be empty)
✅ Job title (cannot be empty)
✅ Deadline date (valid format)
✅ All required columns filled
```

---

#### **Step 3️⃣: Send Emails (Bulk Apply)**

**This is where the magic happens!**

**What to do:**
```
1. Go to your Google Sheet
2. Click: 🤖 ApplyFlow AI menu
3. Select: 📧 ইমেইল পাঠান (Send Email / Mail Merge)
4. Dialog appears showing all pending jobs
5. For EACH job:
   a) Click "Select file" under CV/Resume
   b) Choose your CV from your local machine
   c) Click "Select file" under Additional
   d) Choose cover letter or portfolio (optional)
   e) Click "Add" or confirm selection
6. Review your selections
7. Click: 📧 সবাইকে ইমেইল পাঠান (Send Emails to All)
8. Done! ✅ Confirmation message appears
```

**Important Notes:**
- 🎯 Each job can have **different CV and cover letter**
- 💾 Files come from your **local machine** (not Google Drive)
- ⏰ Takes 2-3 seconds per email to send
- 📧 Gmail quota checked automatically

**Example - Sending to 3 companies:**
```
Company A (Full Stack Dev)
  → CV_fullstack.pdf + Cover_A.pdf

Company B (Frontend Dev)
  → CV_frontend.pdf + Portfolio.pdf

Company C (Backend Dev)
  → CV_backend.pdf (no cover letter)

Result: 3 different emails with unique attachments! ✅
```

---

#### **Step 4️⃣: Track Your Applications**

**Automatic tracking:**
```
After email is sent, sheet updates with:
- Status column: Changes to "Applied" ✅
- Mail Sent: Shows timestamp (e.g., "17 Jun, 14:30")
- Subject Format: Shows email subject used
- Attached Files: Lists the files sent
- Email Log: Records delivery status
```

**View your progress:**
```
1. Go to "Applications" sheet
2. Look at column Y (Mail Sent)
3. If has date = Successfully sent ✅
4. If empty = Pending (ready to send)
5. Sort by Mail Sent to see recent applications
```

---

### ⚙️ Optional: Customize Your Setup

#### **Email Templates (Choose 1 of 3):**

**Option A: Gmail Draft (Easiest)**
- Open Gmail
- Create draft titled: "ApplyFlow Template"
- Write your message with placeholders
- System auto-finds and uses it ✅

**Option B: Google Sheet Template Tab**
- In your sheet, create new tab: "Email Template"
- Paste your template in cell A1
- System auto-uses it ✅

**Option C: Use Built-in Default**
- No setup needed!
- Professional template auto-included ✅

#### **Available Placeholders in Templates:**
```
{{position}} → Job title
{{company}} → Company name
{{company name}} → Company name (alternative)
{{role}} → Job title (alternative)
[role] → Job title (bracket format)
{{role only}} → Main role (removes "Senior", "Junior", "Intern", etc.)
```

Example template:
```
Dear Hiring Team,

I am excited to apply for the {{position}} position at {{company}}.
My expertise in {{role only}} aligns perfectly with your requirements.

Please find attached my resume and portfolio.

Best regards,
Your Name
```

---

### 🎓 Learning by Example

**Scenario: First Time Using ApplyFlow AI**

```
BEFORE:
- Manual searching for job circulars
- Copy-paste job details
- Find company email manually
- Write custom email each time
- Manually track applications
Time per job: 15-20 minutes ⏱️

AFTER with ApplyFlow AI:
- Paste job circular
- Click "Add Job Circular"
- AI extracts everything
- Click "Send Email"
- Choose your CV
- Done! Email sent automatically
- Sheet auto-tracked
Time per job: 2-3 minutes ⏱️ (90% faster!)
```

---

## 🔄 How It Works

### Architecture Flow

```
┌─────────────────────┐
│   Job Circular      │
│   (Any Format)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Groq AI Analysis               │
│  - Extract company, role, email │
│  - Required skills analysis     │
│  - Skill match scoring          │
│  - Custom subject detection     │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────┐
│  Store in Sheet     │
│  Applications tab   │
│  (Auto Row Add)     │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────┐
│  Data Audit          │
│  - Email validation  │
│  - Completeness check│
│  - Red flag missing  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────┐
│  Bulk Email Dialog           │
│  - File picker per job       │
│  - Review before send        │
│  - Per-job attachments       │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Send Emails                 │
│  - Unique subject per job    │
│  - Unique attachment per job │
│  - Auto signature            │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Track & Update              │
│  - Timestamp recorded        │
│  - Status = "Applied"        │
│  - Files logged              │
└──────────────────────────────┘
```

---

## 📸 Demo

See [DEMO_EXAMPLE.md](./DEMO_EXAMPLE.md) for complete step-by-step example with:
- Sample job circular
- AI extracted data
- Dialog screenshots
- Email output
- Sheet tracking

**Quick Preview:**

| Step | Action | Result |
|------|--------|--------|
| 1 | Paste job circular | ✅ AI analyzes |
| 2 | Click "নতুন জব যোগ করুন" | ✅ Row added to sheet |
| 3 | Click "ইমেইল পাঠান" | ✅ Dialog with file pickers |
| 4 | Select files for each job | ✅ Ready to send |
| 5 | Click "সবাইকে ইমেইল পাঠান" | ✅ Emails sent with unique attachments |
| 6 | Sheet updates | ✅ Status = "Applied", timestamp logged |

---

## 📁 File Structure

```
exal-apply-though-email-sheet/
├── JobTracker_Script.js          # Main Apps Script (paste in Google Apps Script)
├── README.MD                      # This file
├── DEMO_EXAMPLE.md               # Complete demo walkthrough
├── job_tracker_exalsheet.xlsx    # Sample Excel structure (reference)
└── requirement.md                # Original requirements document
```

### Google Sheet Structure (Auto-created)

```
Sheet Tabs:
├── Applications              # Main tab (auto-created)
│   ├── Columns A-X: Job details
│   ├── Column Y: Mail Sent (timestamp)
│   ├── Column Z: Subject Format (custom or "Default")
│   ├── Column AA: Audit Issue (validation errors)
│   └── Column AB: Attachment URL (for reference)
│
├── Email Template           # (Optional) Your custom template
│   └── A1: Email body with {{placeholders}}
│
├── Quick Reference          # (Optional) Resume links
│   └── Column A: Role name
│   └── Column B: Google Drive link
│
├── My Rules                 # Configuration
├── Dashboard                # Stats & charts
├── ChartData                # Data for dashboard
└── Settings                 # (Optional) System settings
```

---

## 🔑 API Keys

### Groq API (Free)

1. Go to: https://console.groq.com/keys
2. Sign up (free, no payment needed)
3. Click "Create API Key"
4. Copy key
5. In script, line 14:
   ```javascript
   const GROQ_API_KEY = "gsk_your_key_here";
   ```

**Free Tier Limits:**
- ✅ 30 requests/minute
- ✅ Perfect for job applications
- ✅ No credit card needed

---

## ❓ FAQ

### Q: Can I use my local CV files?
**A:** Yes! In the Mail Merge dialog, select your local CV/Resume file from your machine for each job.

### Q: Will it send duplicate emails?
**A:** No! System checks if `Mail Sent` timestamp exists. Only pending jobs (empty Mail Sent column) are shown.

### Q: Can different jobs get different CVs?
**A:** Yes! That's the main feature. Each job can have its own CV and cover letter from your local machine.

### Q: What if job circular format is unusual?
**A:** Groq AI is flexible and can parse most formats. If it fails, system asks you to manually enter key details.

### Q: Is Gmail quota an issue?
**A:** Gmail allows ~300 emails/day. System checks quota before sending and warns if exceeded.

### Q: Can I customize the email signature?
**A:** Yes! Use the Email Template (Gmail draft or Sheet tab) to customize signature, placeholders, etc.

### Q: Does it support multiple languages?
**A:** Yes! Supports Bangla, English, and mixed text in job circulars.

### Q: What if I want to change my name in emails?
**A:** Edit line in `generateSubjectLine()` or email template. Replace "Md Faysal Ahmed" with your name.

### Q: How do I know if the API key is working?
**A:** Try adding a job circular. If AI extracts data successfully → API is working ✅

### Q: What if I see "API Error" or "Failed to connect"?
**A:** 
1. Check your Groq API key is correct (no spaces, full key pasted)
2. Check internet connection
3. Visit https://status.groq.com to verify API is up
4. Try again in 30 seconds

### Q: Can I send to more than 10 jobs at once?
**A:** Currently limited to 10 jobs per batch to stay within Gmail limits. You can run multiple batches.

### Q: Where are my attachments stored after sending?
**A:** Files stay on your local machine. ApplyFlow only references them for 1-2 seconds during send. No copy is stored.

### Q: What if email sending fails for one job?
**A:** System reports which job failed. You can retry just that job without re-selecting files for others.

---

## 🔧 Troubleshooting Guide

### Problem 1: "Menu not appearing" (🤖 ApplyFlow AI not visible)

**Cause:** Script not bound properly or Auto-Setup didn't run

**Solution:**
```
1. Close Google Sheet completely
2. Wait 30 seconds
3. Open it again
4. Reload (Ctrl+R)
5. Menu should appear
If not:
6. Go to Extensions → Apps Script
7. Check code is there (not empty)
8. Run Auto-Setup again: Run → Auto-Setup function
9. Check console for errors (Tools → View logs)
```

---

### Problem 2: "Error: API Key not found" or "Invalid API Key"

**Cause:** Groq API key not set correctly in line 14

**Solution:**
```
1. Go to Apps Script editor
2. Find line 14: const GROQ_API_KEY = "...";
3. Make sure key is between quotes: "gsk_..."
4. Verify you copied full key (should be 50+ characters)
5. Visit https://console.groq.com/keys to get correct key
6. Replace, save, try again
```

**Example - WRONG ❌:**
```javascript
const GROQ_API_KEY = "gsk_"; // Too short
const GROQ_API_KEY = gsk_abcd...; // Missing quotes
const GROQ_API_KEY = "YOUR_GROQ_API_KEY"; // Placeholder not replaced
```

**Example - CORRECT ✅:**
```javascript
const GROQ_API_KEY = "gsk_1a2b3c4d5e6f7g8h9i0j..."; // Full key in quotes
```

---

### Problem 3: "No jobs shown in Send Email dialog"

**Cause:** No pending jobs, or all already have "Mail Sent" timestamp

**Solution:**
```
1. Check "Applications" sheet
2. Look for rows where column Y (Mail Sent) is EMPTY
3. If column Y has date → Already sent, can't send again
4. Add new job circular first (📋 নতুন জব সার্কুলার যোগ করুন)
5. Try Mail Merge again
```

**Check your sheet:**
```
| Company | ... | Mail Sent | 
|---------|-----|-----------|
| Company A | ... | (empty) | ← Will show in dialog ✅
| Company B | ... | 17 Jun | ← Already sent, won't show ❌
| Company C | ... | (empty) | ← Will show in dialog ✅
```

---

### Problem 4: "File picker not working" or "Can't select CV"

**Cause:** Browser permissions or file too large

**Solution:**
```
1. Check file size: Max 5MB per file
2. Use PDF or common format (PDF, DOC, DOCX)
3. Try different browser (Chrome, Firefox)
4. Check pop-ups are allowed:
   - Browser settings → Pop-ups & Redirects
   - Add Google Sheets to allowed sites
5. Hard reload: Ctrl+Shift+R (clear cache)
```

---

### Problem 5: "Email not sending" or "403 Forbidden error"

**Cause:** Gmail quota exceeded or permissions not granted

**Solution:**
```
1. First time running? Grant permissions:
   - Click "Allow" when prompted
   - This is normal and required
2. Check Gmail quota (Gmail allows ~300 emails/day)
3. Wait 1 hour if quota exceeded
4. Go to Apps Script → View logs to see exact error
5. If permission issue:
   - Go to Extensions → Apps Script
   - Run test function: Run → testGmailPermissions
```

---

### Problem 6: "Wrong data extracted by AI" or "Email not correct"

**Cause:** Job circular format unusual or AI misread

**Solution:**
```
1. Manually check "Applications" sheet row
2. Look at each column for errors
3. Click 🤖 ApplyFlow AI → 🔍 রো যাচাই করুন (Audit)
4. Red highlights show errors
5. Edit directly in sheet to fix
6. Now safe to send email
```

**Manual fixes:**
```
Wrong: Email = "contact@company.com" (domain only)
Fix: Change to correct email in column D

Wrong: Deadline = "Empty"  
Fix: Manually enter date in column O

Wrong: Main role = "Senior Backend Developer Intern"
Fix: Edit to "Backend Developer" in role column
```

---

### Problem 7: "All jobs show same score (0%)" 

**Cause:** Skills not configured or Groq API not working

**Solution:**
```
1. Check MY_SKILLS array in Apps Script (around line 20)
2. Make sure your skills are listed
3. Verify Groq API key is set correctly
4. Try adding a job circular again
5. Check Apps Script console: Tools → View logs
```

**Edit your skills:**
```
Find in Apps Script (around line 20):
const MY_SKILLS = ["JavaScript", "React", "Node.js", ...];

Add your actual skills:
const MY_SKILLS = ["JavaScript", "React", "Node.js", "Python", 
                    "MongoDB", "TypeScript", "HTML", "CSS", "Git"];

Save and try again
```

---

### Problem 8: "Subject line shows [Role]" instead of actual role

**Cause:** Placeholder not replaced in email template

**Solution:**
```
1. Check your email template (Gmail draft or Sheet tab)
2. Make sure it uses correct placeholders:
   - {{position}} ✅
   - {{role}} ✅
   - [role] ❌ (This won't work anymore)
3. Update template with correct syntax
4. Send email again
```

**Example templates:**

WRONG ❌:
```
Subject: Application for [role] - My Name
Body: I apply for [position] at [company]
```

CORRECT ✅:
```
Subject: Application for {{role}} - Md Faysal Ahmed
Body: I apply for {{position}} at {{company name}}
```

---

### Problem 9: "Getting rate limited" or "Groq API slow"

**Cause:** Too many requests to Groq API

**Solution:**
```
Free tier: 30 requests per minute
If adding >2 jobs/minute, you'll hit limit

What to do:
1. Add jobs one at a time (with 5 seconds between)
2. Wait 1 minute if rate limited
3. Try again
4. Consider upgrading Groq plan if needed
```

---

### Problem 10: "Can't find my Gmail draft template"

**Cause:** Draft subject doesn't match exactly

**Solution:**
```
System looks for draft with subject: "ApplyFlow Template"

Make sure:
1. Draft exists in Gmail
2. Subject is EXACTLY: "ApplyFlow Template"
3. Not in Trash or Spam folder
4. Not sent (should be in Drafts folder)

If still not found:
- Use Sheet template instead (Tab: "Email Template")
- Or use built-in default template
```

---

### 🆘 Still Having Issues?

```
1. Check Apps Script logs: Tools → View logs
2. Read error message carefully (Google is very specific)
3. Create GitHub Issue: Link to this repo
4. Include:
   - Error message (exact text)
   - What you were doing
   - Screenshot if possible
   - Browser type
5. Contact: faysal.ahmed.dev@gmail.com
```

---

## ❓ FAQ

---

## 🚀 Advanced Features

### Custom Score Calculation
- **Skill Match:** % of required skills you have
- **Experience Fit:** Checks if years match
- **Role Relevance:** Seniority level matching
- **Final Score:** (Skill% + Experience + Role) / 3

### Role Extraction with AI
```
Input: "Senior Backend Developer Intern"
AI Output: "Backend Developer"  ← Main role
```

### Subject Line Intelligence
```
If circular says: "Use: Application for [Role]"
System generates: "Application for Backend Developer - Md Faysal Ahmed"

If no custom format:
System generates: "Application for Backend Developer - Md Faysal Ahmed"
```

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork this repo
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

### Suggestions:
- [ ] MongoDB/Firestore integration for tracking
- [ ] Scheduled bulk sends
- [ ] Interview scheduling integration
- [ ] Multi-language support enhancement
- [ ] Dashboard analytics improvements
- [ ] Resume/CV upload storage
- [ ] Interview preparation guides

---

## 📄 License

This project is **MIT Licensed** - see [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use privately
- ✅ Use in derivative works

**Conditions:**
- ℹ️ Include license and copyright notice
- ℹ️ Provide changelog

---

## 👨‍💻 Author

**Md Faysal Ahmed** (Abir Ahmed Faysal)
- Portfolio: [faysal-ahmed-abir.github.io](https://faysal-ahmed-abir.github.io)
- LinkedIn: [linkedin.com/in/faysal-ahmed-abir](https://linkedin.com/in/faysal-ahmed-abir)
- GitHub: [@Abir-Ahmed-Faysal](https://github.com/Abir-Ahmed-Faysal)
- Email: faysal.ahmed.dev@gmail.com

---

## 🙏 Acknowledgments

- **Groq API** - For intelligent job circular parsing
- **Google Apps Script** - For seamless Google Sheets integration
- **Community** - For feedback and suggestions

---

## 📞 Support

Have questions or issues? 

1. Check [DEMO_EXAMPLE.md](./DEMO_EXAMPLE.md) for walkthroughs
2. Review this README's FAQ section
3. Create GitHub Issue with details
4. Contact via email

---

## 📈 Roadmap

### v1.1 (Next)
- [ ] Multi-resume management
- [ ] Template library
- [ ] Interview scheduler

### v1.5 (Future)
- [ ] Web UI dashboard
- [ ] Mobile app integration
- [ ] Job recommendation engine

### v2.0 (Long-term)
- [ ] Collaboration features
- [ ] Team management
- [ ] Analytics & reporting

---

## ⭐ If you found this helpful, please star the repo!

```
Made with ❤️ by Md Faysal Ahmed
```

---

**Last Updated:** June 17, 2026
**Version:** 1.0.0
**Status:** ✅ Stable & Production-Ready

```json
{
  "company": "TechStart Bangladesh Ltd",
  "title": "Full Stack Developer",
  "jobType": "Full-time",
  "workMode": "Hybrid",
  "location": "Dhaka, Bangladesh",
  "salary": "50,000 - 80,000 BDT/month",
  "experienceYears": 3,
  "deadline": "30 June 2026",
  "requiredSkills": [
    "React.js",
    "Node.js",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "REST API",
    "Git",
    "Docker"
  ],
  "responsibilities": "Build scalable web applications, develop API backends, collaborate with teams",
  "applyEmail": "careers@techstart.bd",
  "applyLink": "N/A",
  "geminiScore": 92,
  "geminiReason": "Strong match - has all required skills (React, Node, MongoDB, TypeScript, Next.js, Docker)",
  "customSubjectInstruction": "Application for Full Stack Developer - [Your Name]"
}
```

---

## **Step 3: Data Added to Sheet**

সব data Google Sheet এ auto add হয়েছে। **Applications tab এ এই row দেখাবে:**

| No | Applied Date | Company | Job Title | Job Type | Apply Method | Apply Email | **Match Score** | **Subject Format** |
|----|---|---|---|---|---|---|---|---|
| 1 | 17 Jun 2026 | TechStart Bangladesh Ltd | Full Stack Developer | Full-time | Email | careers@techstart.bd | **92%** ✅ | Application for Full Stack Developer |

**Columns visible:**
- Status: ✅ Pending (Yellow highlight = ready to apply)
- No red marks = ✅ All data valid

---

## **Step 4: Mail Merge Dialog**

আপনি **📧 ইমেইল পাঠান (Mail Merge)** ক্লিক করলে এই dialog আসবে:

### **Dialog Screenshot (Text Version):**

```
╔════════════════════════════════════════════════╗
║         🚀 Bulk Apply (ApplyFlow AI)           ║
╠════════════════════════════════════════════════╣
║                                                ║
║  ✅ 1 টি জব রেডি আছে।                          ║
║                                                ║
║  ─────────────────────────────────────────     ║
║  1. TechStart Bangladesh Ltd - Full Stack Dev  ║
║                                                ║
║  📄 CV / Resume        📎 Additional           ║
║  [Select file] ▼      [Select file] ▼         ║
║  ✅ Select: CV.pdf   ✅ Select: CoverLetter.pdf║
║  ─────────────────────────────────────────     ║
║                                                ║
║                                                ║
║              [📧 সবাইকে ইমেইল পাঠান]           ║
║                                                ║
╚════════════════════════════════════════════════╝
```

**কী করবেন:**
1. **1. TechStart Bangladesh Ltd** পড়ুন
2. প্রথম **CV/Resume field** এ ক্লিক করে আপনার `CV.pdf` select করুন
3. **Additional field** এ `Cover_Letter.pdf` select করুন
4. **সবাইকে ইমেইল পাঠান** ক্লিক করুন

---

## **Step 5: Email Sent**

### **What TechStart BD এ পাঠানো হবে:**

#### **Email Subject Line:**
```
Application for Full Stack Developer - Md Faysal Ahmed
```
✅ (Custom format from job circular + আপনার নাম)

#### **Email Body:**
```
Dear Hiring Team,

I am excited to apply for the Full Stack Developer position at TechStart Bangladesh Ltd.

Please find attached my resume and cover letter for your review. I have strong 
experience with the Full Stack Developer stack and am eager to contribute to your team.

Thank you for your time and consideration.

Best regards,

Md Faysal Ahmed
Full Stack Developer
P: +8801779161032

LinkedIn | Facebook | GitHub
```

#### **Attachments:**
```
✅ CV.pdf
✅ Cover_Letter.pdf
```

---

## **Step 6: Sheet Updated**

Email পাঠানোর পর, **Applications sheet automatically update হয়:**

| No | Company | Job Title | Status | **Mail Sent** | **Subject Format** | **Attached Files** |
|----|---------|-----------|--------|---|---|---|
| 1 | TechStart Bangladesh Ltd | Full Stack Developer | **Applied** | 17 Jun, 14:30 | Application for Full Stack Developer | CV.pdf, Cover_Letter.pdf |

✅ Status = "Applied" (সবুজ)
✅ Mail Sent = "17 Jun, 14:30" (Timestamp)
✅ Attached Files = "CV.pdf, Cover_Letter.pdf"

---

## **Quick Comparison: Different Job Circulars**

### **Example 2: Junior Frontend Developer**

**Job Circular সেইম process:**
```
Position: Junior Frontend Developer
Company: WebFlow Studio
Subject Format: "Applying for Frontend Developer Role"
Email: apply@webflowstudio.com
```

**AI Extract:**
```json
{
  "title": "Junior Frontend Developer",
  "customSubjectInstruction": "Applying for Frontend Developer Role"
}
```

**Dialog বলবে:**
```
1. WebFlow Studio - Junior Frontend Developer
   📄 CV: [Select] → modern_resume.pdf
   📎 Additional: [Select] → portfolio.pdf
```

**Email পাঠাবে:**
```
Subject: Applying for Frontend Developer Role - Md Faysal Ahmed
Body: Same template...
Attachments: modern_resume.pdf, portfolio.pdf
```

**Sheet Update:**
```
Status: Applied ✅
Mail Sent: 17 Jun, 14:35
Attached: modern_resume.pdf, portfolio.pdf
```

---

## **Example 3: Multiple Jobs at Once**

### **Scenario: একসাথে 3টা job এ apply করছেন**

**Dialog দেখাবে:**
```
╔═══════════════════════════════════════════════╗
║         🚀 Bulk Apply (ApplyFlow AI)          ║
╠═══════════════════════════════════════════════╣
║                                               ║
║  ✅ 3 টি জব রেডি আছে।                        ║
║  প্রতিটির জন্য আলাদা ফাইল সিলেক্ট করুন।      ║
║                                               ║
║  ─────────────────────────────────────────    ║
║  1. TechStart BD - Full Stack Developer       ║
║     📄 CV: [CV_fullstack.pdf] ✓              ║
║     📎 Add: [Cover_TechStart.pdf] ✓          ║
║  ─────────────────────────────────────────    ║
║  2. WebFlow Studio - Frontend Developer       ║
║     📄 CV: [CV_frontend.pdf] ✓               ║
║     📎 Add: [Portfolio_Link.pdf] ✓           ║
║  ─────────────────────────────────────────    ║
║  3. CloudTech - Backend Engineer              ║
║     📄 CV: [CV_backend.pdf] ✓                ║
║     📎 Add: (empty - optional)               ║
║  ─────────────────────────────────────────    ║
║                                               ║
║          [📧 সবাইকে ইমেইল পাঠান]              ║
║                                               ║
╚═══════════════════════════════════════════════╝
```

**পাঠাবে 3টা আলাদা email, প্রতিটায় unique attachment:**

```
Email 1 → careers@techstart.bd
  Subject: Application for Full Stack Developer - Md Faysal Ahmed
  Attachments: CV_fullstack.pdf, Cover_TechStart.pdf ✅

Email 2 → apply@webflowstudio.com
  Subject: Applying for Frontend Developer Role - Md Faysal Ahmed
  Attachments: CV_frontend.pdf, Portfolio_Link.pdf ✅

Email 3 → jobs@cloudtech.io
  Subject: Application for Backend Engineer - Md Faysal Ahmed
  Attachments: CV_backend.pdf ✅
```

**Sheet বলবে:**
```
| Company | Status | Mail Sent | Attached Files |
|---------|--------|-----------|---|
| TechStart BD | Applied | 14:30 | CV_fullstack.pdf, Cover_TechStart.pdf |
| WebFlow Studio | Applied | 14:31 | CV_frontend.pdf, Portfolio_Link.pdf |
| CloudTech | Applied | 14:32 | CV_backend.pdf |
```

✅ **সব 3টা email পাঠানো হয়েছে, প্রতিটা uniquely!**

---

## **Key Features Demonstrated:**

✅ **AI Job Analysis** - Automatically extract company, role, requirements
✅ **Score Matching** - 92% match calculated based on your skills
✅ **Per-Job Attachments** - Each job gets different files
✅ **Custom Subject Lines** - Extracted from job circular
✅ **Automatic Name Inclusion** - "- Md Faysal Ahmed" always added
✅ **Bulk Send** - Multiple jobs at once with unique attachments
✅ **Sheet Tracking** - Timestamp, attachment records, status updates

---

## **Next Step:**

1. **Set your Groq API Key** in line 13
2. Paste actual job circular
3. Click "📋 নতুন জব সার্কুলার যোগ করুন"
4. See the magic happen! 🚀

---

**Made with ❤️ by Md Faysal Ahmed**
