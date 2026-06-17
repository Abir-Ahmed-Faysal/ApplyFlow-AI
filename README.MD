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

## 🛠️ Installation

### Prerequisites
- ✅ Google Account (Gmail + Google Drive)
- ✅ Google Sheet created
- ✅ Groq API Key (free from https://console.groq.com)

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: `Job Tracker - ApplyFlow AI`

### Step 2: Add Apps Script

1. Go to **Extensions → Apps Script**
2. Delete the default code
3. Paste entire content from [JobTracker_Script.js](./JobTracker_Script.js)
4. **Save** (Ctrl+S)

### Step 3: Set Groq API Key

1. Get your free API key: https://console.groq.com/keys
2. In Apps Script, line 14, replace:
   ```javascript
   const GROQ_API_KEY = "YOUR_GROQ_API_KEY"; // ← Paste your key here
   ```
3. Save again

### Step 4: Run Auto-Setup

1. Close Apps Script
2. Reload Google Sheet
3. You'll see new menu: **🤖 ApplyFlow AI**
4. Click **⚙️ অটো-সেটআপ (Auto Setup)**
5. Wait for completion ✅

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

## 📖 Usage

### Step 1: Add Job Circular

```
1. Open your Google Sheet
2. Click: 🤖 ApplyFlow AI → 📋 নতুন জব সার্কুলার যোগ করুন
3. Paste job circular text (any format)
4. Click: তথ্য সংগ্রহ করুন
```

**System will:**
- ✅ Analyze with Groq AI
- ✅ Extract all details
- ✅ Calculate skill match score
- ✅ Add to "Applications" sheet if score > 70%

### Step 2: View & Validate

```
1. Check "Applications" sheet
2. Review the new row
3. Click: 🤖 ApplyFlow AI → 🔍 রো যাচাই করুন (Audit)
4. Any red highlights = fix required data
```

### Step 3: Send Emails (Bulk)

```
1. Click: 🤖 ApplyFlow AI → 📧 ইমেইল পাঠান (Mail Merge)
2. Dialog shows all pending jobs
3. For each job:
   - Select your CV/Resume file (local machine)
   - Select Additional file (optional)
4. Click: 📧 সবাইকে ইমেইল পাঠান
5. Done! Emails sent with unique attachments ✅
```

### Step 4: Track Applications

```
Sheet automatically updates:
- Status → "Applied" ✅
- Mail Sent → Timestamp (17 Jun, 14:30)
- Attached Files → CV.pdf, Cover_Letter.pdf
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
