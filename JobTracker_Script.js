// ============================================================
// ApplyFlow AI - AUTO ENTRY SCRIPT
// Faysal Ahmed - ApplyFlow AI Tracker
// ============================================================
// HOW TO USE:
// 1. Open your Google Sheet
// 2. Click Extensions > Apps Script
// 3. Delete everything there and paste this entire code
// 4. Replace YOUR_GEMINI_API_KEY below with your actual key
// 5. Click Save (Ctrl+S)
// 6. Reload your Sheet — a new menu "🤖 ApplyFlow AI" will appear
// ============================================================

const GROQ_API_KEY = "YOUR_GROQ_API_KEY"; // ← এখানে আপনার Groq API Key বসান

const MY_SKILLS = [
  // Frontend
  "JavaScript", "TypeScript", "React.js", "Next.js",
  "Tailwind CSS", "TanStack Query", "Shadcn UI", "Framer Motion",
  // Backend
  "Node.js", "Express.js", "REST API",
  // Database
  "PostgreSQL", "MongoDB", "Prisma", "Mongoose",
  // Auth
  "JWT", "Better Auth", "Firebase Auth",
  // Tools
  "Git", "Docker", "Vercel", "Postman", "Google Generative AI",
  // Payment / Email
  "Stripe", "Nodemailer"
];

const SKILL_ALIASES = {
  // ─── JavaScript ───
  "js": "JavaScript", "javascript": "JavaScript",
  "জাভাস্ক্রিপ্ট": "JavaScript", "জেএস": "JavaScript",
  "vanilla js": "JavaScript", "vanillajs": "JavaScript", "ecmascript": "JavaScript", "es6": "JavaScript",

  // ─── TypeScript ───
  "ts": "TypeScript", "typescript": "TypeScript", "টাইপস্ক্রিপ্ট": "TypeScript",

  // ─── React.js ───
  "react": "React.js", "reactjs": "React.js", "react js": "React.js",
  "রিয়েক্ট": "React.js", "ফ্রন্টএন্ড ফ্রেমওয়ার্ক": "React.js",
  "frontend framework": "React.js", "ui library": "React.js", "ui framework": "React.js",

  // ─── Next.js ───
  "nextjs": "Next.js", "next js": "Next.js", "next": "Next.js",
  "ssr": "Next.js", "ssg": "Next.js", "server side rendering": "Next.js",

  // ─── Tailwind CSS ───
  "tailwind": "Tailwind CSS", "tailwindcss": "Tailwind CSS", "tailwind css": "Tailwind CSS",
  "css framework": "Tailwind CSS", "utility css": "Tailwind CSS",

  // ─── Shadcn UI ───
  "shadcn": "Shadcn UI", "shadcnui": "Shadcn UI", "shadcn ui": "Shadcn UI",
  "component library": "Shadcn UI", "ui components": "Shadcn UI",

  // ─── Framer Motion ───
  "framer": "Framer Motion", "framermotion": "Framer Motion", "animation library": "Framer Motion",
  "css animation": "Framer Motion", "web animation": "Framer Motion",

  // ─── TanStack Query ───
  "tanstack": "TanStack Query", "react query": "TanStack Query",
  "tanstackquery": "TanStack Query", "data fetching": "TanStack Query",

  // ─── Node.js ───
  "node": "Node.js", "nodejs": "Node.js", "node js": "Node.js",
  "নোড": "Node.js", "backend runtime": "Node.js", "backend framework": "Node.js",
  "server side js": "Node.js",

  // ─── Express.js ───
  "express": "Express.js", "expressjs": "Express.js", "express js": "Express.js",
  "web framework": "Express.js", "http framework": "Express.js",

  // ─── REST API ───
  "rest": "REST API", "restful": "REST API", "restful api": "REST API",
  "api": "REST API", "web api": "REST API", "http api": "REST API",
  "api development": "REST API", "api design": "REST API",

  // ─── PostgreSQL ───
  "postgres": "PostgreSQL", "postgresql": "PostgreSQL",
  "sql": "PostgreSQL", "rdbms": "PostgreSQL", "relational database": "PostgreSQL",
  "পোস্টগ্রেস": "PostgreSQL", "relational db": "PostgreSQL",

  // ─── MongoDB ───
  "mongo": "MongoDB", "mongodb": "MongoDB",
  "nosql": "MongoDB", "document database": "MongoDB", "document db": "MongoDB",
  "মঙ্গোডিবি": "MongoDB", "no sql": "MongoDB",

  // ─── Prisma ───
  "prisma": "Prisma", "prismaorm": "Prisma", "prisma orm": "Prisma",
  "orm": "Prisma", "database orm": "Prisma", "query builder": "Prisma",

  // ─── Mongoose ───
  "mongoose": "Mongoose", "mongo orm": "Mongoose", "mongodb odm": "Mongoose", "odm": "Mongoose",

  // ─── JWT ───
  "jwt": "JWT", "json web token": "JWT", "jsonwebtoken": "JWT",
  "token auth": "JWT", "bearer token": "JWT",

  // ─── Authentication (General) ───
  "authentication": "JWT", "auth": "JWT", "authorization": "JWT",
  "অথেনটিকেশন": "JWT", "লগইন সিস্টেম": "JWT",

  // ─── Better Auth ───
  "betterauth": "Better Auth", "better auth": "Better Auth",

  // ─── Firebase Auth ───
  "firebase": "Firebase Auth", "firebaseauth": "Firebase Auth", "firebase auth": "Firebase Auth",
  "google auth": "Firebase Auth", "social login": "Firebase Auth",
  "oauth": "Firebase Auth", "oauth2": "Firebase Auth",

  // ─── Git ───
  "git": "Git", "github": "Git", "gitlab": "Git", "bitbucket": "Git",
  "version control": "Git", "source control": "Git", "vcs": "Git",
  "গিট": "Git",

  // ─── Docker ───
  "docker": "Docker", "containerization": "Docker", "container": "Docker",
  "dockerfile": "Docker", "docker compose": "Docker", "containers": "Docker",

  // ─── Vercel ───
  "vercel": "Vercel", "deployment": "Vercel", "cloud deployment": "Vercel",
  "hosting": "Vercel", "ci cd": "Vercel", "cicd": "Vercel",

  // ─── Postman ───
  "postman": "Postman", "api testing": "Postman", "api client": "Postman",

  // ─── Google Generative AI ───
  "google generative ai": "Google Generative AI", "gemini": "Google Generative AI",
  "google ai": "Google Generative AI", "generative ai": "Google Generative AI",
  "llm integration": "Google Generative AI", "ai integration": "Google Generative AI",

  // ─── Stripe ───
  "stripe": "Stripe", "payment gateway": "Stripe", "payment integration": "Stripe",
  "online payment": "Stripe", "payment api": "Stripe", "পেমেন্ট": "Stripe",

  // ─── Nodemailer ───
  "nodemailer": "Nodemailer", "email service": "Nodemailer", "smtp": "Nodemailer",
  "email integration": "Nodemailer", "transactional email": "Nodemailer",

  // ─── বাংলা সাধারণ ───
  "ফুল স্ট্যাক": "JavaScript", "ব্যাকএন্ড": "Node.js", "ফ্রন্টএন্ড": "React.js",
  "ডেটাবেস": "MongoDB", "ক্লাউড": "Vercel"
};

const MIN_SCORE = 70; // ৭০% এর নিচে স্কিপ করবে

// ============================================================
// মেনু তৈরি করা
// ============================================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🤖 ApplyFlow AI")
    .addItem("📋 নতুন জব সার্কুলার যোগ করুন", "showCircularDialog")
    .addItem("📧 ইমেইল পাঠান (Mail Merge)", "showSendDialog")
    .addItem("🔍 রো যাচাই করুন (Audit)", "runAudit")
    .addItem("⚙️ অটো-সেটআপ (Auto Setup)", "autoSetup")
    .addItem("⚙️ সেটিংস দেখুন", "showSettings")
    .addToUi();
}

// ============================================================
// সার্কুলার ইনপুট ডায়ালগ
// ============================================================
function showCircularDialog() {
  const html = HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; }
        h2 { color: #1a73e8; margin-bottom: 5px; }
        p { color: #555; font-size: 13px; margin-bottom: 15px; }
        textarea {
          width: 100%; height: 200px; padding: 10px;
          border: 1px solid #ddd; border-radius: 6px;
          font-size: 13px; resize: vertical; box-sizing: border-box;
        }
        .row { display: flex; gap: 10px; margin-top: 10px; }
        input[type=text] {
          flex: 1; padding: 8px 10px;
          border: 1px solid #ddd; border-radius: 6px; font-size: 13px;
        }
        button {
          padding: 10px 20px; border: none; border-radius: 6px;
          font-size: 14px; cursor: pointer; font-weight: bold;
        }
        .btn-primary { background: #1a73e8; color: white; width: 100%; margin-top: 10px; }
        .btn-primary:hover { background: #1558b0; }
        #status {
          margin-top: 12px; padding: 10px; border-radius: 6px;
          font-size: 13px; display: none; text-align: center;
        }
        .loading { background: #e8f0fe; color: #1a73e8; }
        .success { background: #e6f4ea; color: #137333; }
        .skip    { background: #fef7e0; color: #b06000; }
        .error   { background: #fce8e6; color: #c5221f; }
        label { font-size: 13px; color: #333; font-weight: bold; display: block; margin-bottom: 4px; }
      </style>
    </head>
    <body>
      <h2>📋 নতুন জব সার্কুলার</h2>
      <p>নিচে জব সার্কুলার পেস্ট করুন। AI নিজেই স্কোর করে Sheet-এ যোগ করবে।</p>

      <label>জব সার্কুলার টেক্সট *</label>
      <textarea id="circular" placeholder="এখানে সম্পূর্ণ জব সার্কুলার পেস্ট করুন..."></textarea>

      <div class="row">
        <div style="flex:1">
          <label>Apply Link / Email</label>
          <input type="text" id="applyLink" placeholder="https://... অথবা email@company.com">
        </div>
        <div style="flex:1">
          <label>Platform</label>
          <input type="text" id="platform" placeholder="LinkedIn, Bdjobs, Direct...">
        </div>
      </div>

      <button class="btn-primary" onclick="processJob()">🔍 AI দিয়ে বিশ্লেষণ করুন</button>

      <div id="status"></div>

      <script>
        function processJob() {
          const circular = document.getElementById('circular').value.trim();
          const applyLink = document.getElementById('applyLink').value.trim();
          const platform = document.getElementById('platform').value.trim();

          if (!circular) {
            showStatus('⚠️ জব সার্কুলার লিখুন!', 'error');
            return;
          }

          showStatus('⏳ AI বিশ্লেষণ করছে... একটু অপেক্ষা করুন', 'loading');

          google.script.run
            .withSuccessHandler(onSuccess)
            .withFailureHandler(onError)
            .analyzeAndAddJob(circular, applyLink, platform);
        }

        function onSuccess(result) {
          if (result.added) {
            showStatus('✅ ' + result.message, 'success');
            setTimeout(() => google.script.host.close(), 3000);
          } else {
            showStatus('⏭️ ' + result.message, 'skip');
            setTimeout(() => google.script.host.close(), 3000);
          }
        }

        function onError(err) {
          showStatus('❌ সমস্যা হয়েছে: ' + err.message, 'error');
        }

        function showStatus(msg, type) {
          const el = document.getElementById('status');
          el.textContent = msg;
          el.className = type;
          el.style.display = 'block';
        }
      </script>
    </body>
    </html>
  `)
  .setWidth(520)
  .setHeight(480)
  .setTitle("🤖 জব সার্কুলার বিশ্লেষণ");

  SpreadsheetApp.getUi().showModalDialog(html, "🤖 জব সার্কুলার বিশ্লেষণ");
}

// ============================================================
// মূল ফাংশন — AI দিয়ে বিশ্লেষণ করে Sheet-এ যোগ করা
// ============================================================
function analyzeAndAddJob(circularText, applyLink, platform) {
  try {
    const prompt = buildPrompt(circularText);
    const aiResult = callGeminiAPI(prompt);
    const jobData = parseAIResponse(aiResult);

    // ── দুটো স্কোর আলাদা হিসাব ──
    const codeScore  = calculateMatchScore(jobData.requiredSkills, jobData.experienceYears);
    const geminiScore = Math.max(0, Math.min(100, Math.round(Number(jobData.geminiScore) || 0)));

    // ── experience hard-cutoff (code logic থেকে) ──
    if (jobData.experienceYears >= 4) {
      return {
        added: false,
        message: `অভিজ্ঞতা ${jobData.experienceYears} বছর — ৪+ বছর হওয়ায় স্কিপ করা হয়েছে।`
      };
    }

    // ── ফাইনাল স্কোর = Weighted (Gemini 70% + Code 30%) ──
    const finalScore = Math.round((geminiScore * 0.7) + (codeScore * 0.3));

    if (finalScore < MIN_SCORE) {
      return {
        added: false,
        message: `ফাইনাল স্কোর ${finalScore}% (Code: ${codeScore}% | AI: ${geminiScore}%) — ৭০%-এর নিচে, স্কিপ করা হয়েছে।`
      };
    }

    addRowToSheet(jobData, finalScore, codeScore, geminiScore, circularText, applyLink, platform);

    return {
      added: true,
      message: `✅ স্কোর ${finalScore}% (Code: ${codeScore}% | AI: ${geminiScore}%) — "${jobData.company}" এ "${jobData.title}" সফলভাবে যোগ হয়েছে!`
    };

  } catch (e) {
    throw new Error(e.message);
  }
}

// ============================================================
// Groq API কল (Llama 3.3 70B — সম্পূর্ণ free)
// ============================================================
function callGeminiAPI(prompt) {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const payload = {
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    max_tokens: 1000
  };

  const options = {
    method: "POST",
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + GROQ_API_KEY },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());

  if (json.error) throw new Error("Groq API Error: " + json.error.message);

  return json.choices[0].message.content;
}

// ============================================================
// AI Prompt তৈরি
// ============================================================
function buildPrompt(circularText) {
  const mySkillsList = MY_SKILLS.join(", ");

  return `
আপনি একটি জব সার্কুলার বিশ্লেষণকারী AI। নিচের জব সার্কুলার থেকে তথ্য বের করুন।

জব সার্কুলার:
"""
${circularText}
"""

আবেদনকারীর বর্তমান দক্ষতা:
${mySkillsList}

নিচের JSON ফরম্যাটে উত্তর দিন (শুধু JSON, আর কিছু না):
{
  "company": "কোম্পানির নাম",
  "title": "পদের নাম",
  "jobType": "Full-time / Part-time / Contract / Freelance",
  "workMode": "Remote / Onsite / Hybrid",
  "location": "দেশ বা শহর",
  "salary": "বেতন রেঞ্জ বা N/A",
  "experienceYears": 2,
  "deadline": "Deadline তারিখ বা N/A",
  "requiredSkills": ["skill1", "skill2", "skill3"],
  "responsibilities": "মূল দায়িত্বসমূহ সংক্ষেপে",
  "applyEmail": "apply email বা N/A",
  "applyLink": "circular-এর apply URL বা N/A",
  "geminiScore": 75,
  "geminiReason": "সংক্ষেপে কেন এই স্কোর দিলেন (১ লাইন)",
  "customSubjectInstruction": "the exact subject format requested in the circular, or N/A"
}

গুরুত্বপূর্ণ:
- requiredSkills: শুধু technical skills (framework, language, database, tool)
- experienceYears: সর্বোচ্চ যত বছর চাওয়া হয়েছে (সংখ্যা)
- applyEmail: circular-এ যদি কোনো email থাকে (hr@company.com, career@...) সেটা দিন
- applyLink: circular-এ যদি apply URL থাকে (https://...) সেটা দিন
- geminiScore: আবেদনকারীর স্কিল এবং অভিজ্ঞতার সাথে এই জবটি কতটা মানানসই তার স্কোর (0–100)।
  বিবেচনায় নিন: required vs candidate skills overlap, experience fit, role seniority।
- geminiReason: স্কোরের সংক্ষিপ্ত কারণ (বাংলা বা English, ১ বাক্যে)
- customSubjectInstruction: if the circular explicitly states a required subject format (e.g. "Subject: Application for [Role] - [Name]"), extract it here. Otherwise "N/A"
- যদি কোনো তথ্য না পাওয়া যায় তাহলে "N/A" লিখুন
`;
}

// ============================================================
// AI Response পার্স করা
// ============================================================
function parseAIResponse(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("AI থেকে সঠিক উত্তর আসেনি। আবার চেষ্টা করুন।");
  }
}

// ============================================================
// Code-based স্কিল ম্যাচ স্কোর (Alias যাচাই)
// ── experience penalty/cutoff এখন analyzeAndAddJob-এ ──
// ============================================================
function calculateMatchScore(requiredSkills, experienceYears) {
  if (!requiredSkills || requiredSkills.length === 0) return 0;

  let matchCount = 0;
  for (const reqSkill of requiredSkills) {
    const normalized = normalizeSkill(reqSkill);
    if (isSkillMatched(normalized)) matchCount++;
  }

  const skillPercent = Math.round((matchCount / requiredSkills.length) * 100);

  // Experience penalty শুধু code score-এ
  let expPenalty = 0;
  if (experienceYears === 3) expPenalty = 10;

  return Math.max(0, Math.min(100, skillPercent - expPenalty));
}

function normalizeSkill(skill) {
  return skill.toLowerCase()
    .replace(/[.\-_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isSkillMatched(normalizedReqSkill) {
  // ধাপ ১: সরাসরি মিল
  for (const mySkill of MY_SKILLS) {
    if (normalizeSkill(mySkill) === normalizedReqSkill) return true;
  }

  // ধাপ ২: Alias মিল
  const aliasMatch = SKILL_ALIASES[normalizedReqSkill];
  if (aliasMatch && MY_SKILLS.includes(aliasMatch)) return true;

  // ধাপ ৩: আংশিক মিল — false positive এড়াতে সতর্ক (Java ≠ JavaScript)
  const EXACT_ONLY = ["java", "c", "c++", "c#", "go", "rust", "ruby", "swift", "kotlin"];
  if (EXACT_ONLY.includes(normalizedReqSkill)) return false;

  for (const mySkill of MY_SKILLS) {
    const myNorm = normalizeSkill(mySkill);
    if (normalizedReqSkill.length >= 4 && myNorm.length >= 4) {
      if (myNorm.startsWith(normalizedReqSkill) || normalizedReqSkill.startsWith(myNorm)) return true;
    }
  }

  return false;
}

// ============================================================
// Google Sheet-এ রো যোগ করা
// ============================================================
function addRowToSheet(jobData, finalScore, codeScore, geminiScore, circularText, applyLink, platform) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Applications");

  if (!sheet) throw new Error('"Applications" নামের Sheet পাওয়া যায়নি।');

  const lastRow = getLastDataRow(sheet);
  const newRow = lastRow + 1;
  const nextId = lastRow - 1; // হেডার বাদ দিয়ে

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMM");

  // স্কোর নোট — breakdown সহ
  let scoreLabel = "";
  if (finalScore >= 80) scoreLabel = "Strong match ✅";
  else if (finalScore >= 70) scoreLabel = "Good match ⚠️";

  const scoreNote = `${scoreLabel} | Code: ${codeScore}% | AI: ${geminiScore}% | ${jobData.geminiReason || ""}`;

  // Application Status
  const status = finalScore >= 80 ? "Pending Apply" : "Review First";

  // AI থেকে email/link না পেলে user-এর input ব্যবহার করবে
  const finalApplyLink = applyLink || jobData.applyLink || "N/A";
  const finalApplyEmail = jobData.applyEmail || "N/A";
  const applyMethod = finalApplyEmail !== "N/A" ? "Email" : "Link";
  const applyContact = finalApplyEmail !== "N/A"
    ? finalApplyEmail
    : finalApplyLink;

  const rowData = [
    nextId,                                    // A: No.
    today,                                     // B: Applied Date
    jobData.company || "N/A",                 // C: Company Name
    jobData.title || "N/A",                   // D: Job Title
    jobData.jobType || "Full-time",           // E: Job Type
    platform || "Direct",                     // F: Platform
    applyMethod,                               // G: Apply Method (Email or Link)
    applyContact,                             // H: Apply Link / Email
    jobData.workMode || "N/A",               // I: Work Mode
    jobData.location || "N/A",               // J: Location
    jobData.salary || "N/A",                 // K: Salary
    jobData.experienceYears + " yrs" || "N/A", // L: Experience
    jobData.deadline || "N/A",               // M: Deadline
    "Skills: " + (jobData.requiredSkills || []).join(", ") + " | Resp: " + (jobData.responsibilities || ""), // N: Key Info
    finalScore,                               // O: Match Score (Final = গড়)
    scoreNote,                                // P: Score Notes (breakdown)
    status,                                   // Q: Application Status
    "No",                                     // R: Response
    "",                                       // S: Follow-up Date
    "",                                       // T: Interview Date
    "",                                       // U: Recruiter Name
    "",                                       // V: Referred By
    "",                                       // W: Contact / WhatsApp No.
    "",                                       // X: Notes
    "",                                       // Y: Mail Sent
    jobData.customSubjectInstruction && jobData.customSubjectInstruction !== "N/A" ? jobData.customSubjectInstruction : "Default", // Z: Subject Format
    "",                                       // AA: Audit Issue
    ""                                        // AB: Attached Files
  ];

  sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

  // ফাইনাল স্কোর অনুযায়ী রঙ
  const scoreCell = sheet.getRange(newRow, 15);
  if (finalScore >= 80) scoreCell.setBackground("#c6efce");       // সবুজ
  else if (finalScore >= 70) scoreCell.setBackground("#ffeb9c");  // হলুদ
}

// ============================================================
// শেষ ডেটা রো খোঁজা
// ============================================================
function getLastDataRow(sheet) {
  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][0] !== "") return i + 1;
  }
  return 2; // হেডারের পরে
}

// ============================================================
// সেটিংস দেখানো
// ============================================================
function showSettings() {
  const info = `
⚙️ বর্তমান সেটিংস:

✅ সর্বনিম্ন স্কোর: ${MIN_SCORE}%
✅ আমার স্কিলস: ${MY_SKILLS.join(", ")}
✅ অভিজ্ঞতা সীমা: ৩ বছর পর্যন্ত (৪+ হলে স্কিপ)

স্কিল বা সেটিং পরিবর্তন করতে:
Extensions > Apps Script > কোড এডিট করুন
  `;
  SpreadsheetApp.getUi().alert(info);
}

// ============================================================
// অটো-সেটআপ (Auto Setup)
// ============================================================
function autoSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Applications Tab Columns
  let appSheet = ss.getSheetByName("Applications");
  if (appSheet) {
    appSheet.getRange("Y1").setValue("Mail Sent");
    appSheet.getRange("Z1").setValue("Subject Format");
    appSheet.getRange("AA1").setValue("Audit Issue");
    appSheet.getRange("AB1").setValue("Attached Files");
  }
  
  // 2. Setup Email Template Tab
  let tmplSheet = ss.getSheetByName("Email Template");
  if (!tmplSheet) {
    tmplSheet = ss.insertSheet("Email Template");
    tmplSheet.getRange("A1").setValue("Hello {{company}},\n\nI am writing to apply for the {{role}} position.\n\nBest regards,\nMd Faysal Ahmed");
    tmplSheet.setColumnWidth(1, 500);
  }
  
  SpreadsheetApp.getUi().alert("✅ সেটআপ সম্পন্ন হয়েছে! 'Applications' ট্যাবে নতুন কলাম এবং 'Email Template' ট্যাব যোগ করা হয়েছে।");
}

// ============================================================
// ইমেইল পাঠান (Mail Merge) - ডায়ালগ
// ============================================================
function showSendDialog() {
  const html = HtmlService.createHtmlOutput(`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 15px; background: #f9f9f9; }
    h2 { color: #1a73e8; margin-bottom: 5px; margin-top: 0; }
    p { color: #555; font-size: 13px; margin-bottom: 15px; }
    label { font-size: 13px; color: #333; font-weight: bold; display: block; margin-bottom: 4px; margin-top: 10px;}
    select, input[type="file"] { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 13px; box-sizing: border-box; }
    .btn-primary { background: #1a73e8; color: white; width: 100%; margin-top: 15px; padding: 10px 20px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: bold; }
    .btn-primary:hover:not(:disabled) { background: #1558b0; }
    .btn-primary:disabled { background: #ccc; cursor: not-allowed; }
    .preview-box { background: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 6px; margin-top: 15px; font-size: 13px; color: #444; }
    .preview-box strong { color: #222; }
    #status { margin-top: 12px; padding: 10px; border-radius: 6px; font-size: 13px; display: none; text-align: center; }
    .loading { background: #e8f0fe; color: #1a73e8; }
    .success { background: #e6f4ea; color: #137333; }
    .error   { background: #fce8e6; color: #c5221f; }
  </style>
</head>
<body>
  <h2>📧 ইমেইল পাঠান</h2>
  <p>যাদের Apply Method "Email", তাদের লিস্ট নিচে দেখাচ্ছে।</p>

  <label>জব নির্বাচন করুন *</label>
  <select id="jobSelect" onchange="updatePreview()">
    <option value="">-- লোড হচ্ছে... --</option>
  </select>

  <label>Resume / CV *</label>
  <select id="resumeSelect" onchange="toggleResumeUpload()">
    <option value="">-- লোড হচ্ছে... --</option>
  </select>
  <input type="file" id="resumeUpload" style="display:none;" accept=".pdf,.doc,.docx" />

  <label>Additional File (Optional)</label>
  <input type="file" id="additionalUpload" />

  <div class="preview-box" id="previewBox" style="display:none;">
    <strong>Company:</strong> <span id="prevCompany"></span><br>
    <strong>Role:</strong> <span id="prevRole"></span><br>
    <strong>Subject:</strong> <span id="prevSubject"></span><br>
    <strong>Attachments:</strong> <span id="prevAttach"></span>
  </div>

  <button class="btn-primary" id="sendBtn" onclick="sendEmail()" disabled>📧 ইমেইল পাঠান</button>

  <div id="status"></div>

  <script>
    let serverData = {};
    let selectedJob = null;

    // Load data on startup
    google.script.run.withSuccessHandler(onDataLoaded).withFailureHandler(onError).getSendDialogData();

    function onDataLoaded(data) {
      serverData = data;
      const jobSelect = document.getElementById('jobSelect');
      jobSelect.innerHTML = '<option value="">-- সিলেক্ট করুন --</option>';
      data.jobs.forEach(job => {
        const opt = document.createElement('option');
        opt.value = job.rowIndex;
        opt.textContent = \`\${job.company} - \${job.title}\`;
        jobSelect.appendChild(opt);
      });

      const resumeSelect = document.getElementById('resumeSelect');
      resumeSelect.innerHTML = '<option value="">-- সিলেক্ট করুন --</option><option value="upload">📤 নিজের ফাইল আপলোড করুন...</option>';
      data.resumes.forEach(res => {
        const opt = document.createElement('option');
        opt.value = res.url;
        opt.textContent = res.name;
        resumeSelect.appendChild(opt);
      });
    }

    function toggleResumeUpload() {
      const val = document.getElementById('resumeSelect').value;
      document.getElementById('resumeUpload').style.display = val === 'upload' ? 'block' : 'none';
      updatePreview();
    }

    function updatePreview() {
      const rowIndex = document.getElementById('jobSelect').value;
      const btn = document.getElementById('sendBtn');
      const box = document.getElementById('previewBox');
      
      if (!rowIndex) {
        box.style.display = 'none';
        btn.disabled = true;
        selectedJob = null;
        return;
      }

      selectedJob = serverData.jobs.find(j => j.rowIndex == rowIndex);
      
      document.getElementById('prevCompany').textContent = selectedJob.company;
      document.getElementById('prevRole').textContent = selectedJob.title;
      document.getElementById('prevSubject').textContent = selectedJob.computedSubject;

      // Attachments preview
      let attachTexts = [];
      const resVal = document.getElementById('resumeSelect').value;
      if (resVal === 'upload') {
        const file = document.getElementById('resumeUpload').files[0];
        if (file) attachTexts.push(file.name);
        else attachTexts.push("⚠️ Resume আপলোড করা হয়নি!");
      } else if (resVal) {
        const resName = document.getElementById('resumeSelect').options[document.getElementById('resumeSelect').selectedIndex].text;
        attachTexts.push(resName);
      } else {
        attachTexts.push("⚠️ কোনো Resume সিলেক্ট করা হয়নি");
      }

      const addFile = document.getElementById('additionalUpload').files[0];
      if (addFile) attachTexts.push(addFile.name);

      document.getElementById('prevAttach').textContent = attachTexts.join(", ");

      box.style.display = 'block';
      btn.disabled = false;
    }

    // Update preview when files change
    document.getElementById('resumeUpload').addEventListener('change', updatePreview);
    document.getElementById('additionalUpload').addEventListener('change', updatePreview);

    function onError(err) {
      showStatus('❌ Error: ' + err.message, 'error');
    }

    function showStatus(msg, type) {
      const el = document.getElementById('status');
      el.textContent = msg;
      el.className = type;
      el.style.display = 'block';
    }

    async function sendEmail() {
      if (!selectedJob) return;

      const resVal = document.getElementById('resumeSelect').value;
      const resFile = document.getElementById('resumeUpload').files[0];
      const addFile = document.getElementById('additionalUpload').files[0];

      if (!resVal && !resFile) {
        if (!confirm("আপনি কোনো Resume/CV সিলেক্ট করেননি! তবুও কি পাঠাতে চান?")) return;
      }

      showStatus('⏳ ইমেইল পাঠানো হচ্ছে...', 'loading');
      document.getElementById('sendBtn').disabled = true;

      try {
        let payload = {
          rowIndex: selectedJob.rowIndex,
          company: selectedJob.company,
          title: selectedJob.title,
          applyEmail: selectedJob.applyEmail,
          computedSubject: selectedJob.computedSubject,
          resumeUrl: (resVal !== 'upload') ? resVal : null,
          resumeBase64: null,
          resumeMime: null,
          resumeName: null,
          addBase64: null,
          addMime: null,
          addName: null
        };

        if (resVal === 'upload' && resFile) {
          payload.resumeBase64 = await readFileAsBase64(resFile);
          payload.resumeMime = resFile.type;
          payload.resumeName = resFile.name;
        }

        if (addFile) {
          payload.addBase64 = await readFileAsBase64(addFile);
          payload.addMime = addFile.type;
          payload.addName = addFile.name;
        }

        google.script.run
          .withSuccessHandler(res => {
            showStatus('✅ ' + res, 'success');
            setTimeout(() => google.script.host.close(), 2500);
          })
          .withFailureHandler(err => {
            showStatus('❌ ' + err.message, 'error');
            document.getElementById('sendBtn').disabled = false;
          })
          .sendJobApplicationEmail(payload);

      } catch (e) {
        showStatus('❌ Error processing files', 'error');
        document.getElementById('sendBtn').disabled = false;
      }
    }

    function readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  </script>
</body>
</html>
  `)
  .setWidth(500).setHeight(600).setTitle("📧 ইমেইল পাঠান (Mail Merge)");
  SpreadsheetApp.getUi().showModalDialog(html, "📧 ইমেইল পাঠান");
}

// ============================================================
// Get Dialog Data (Server-Side)
// ============================================================
function getSendDialogData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Get Resumes from Quick Reference tab
  const qrSheet = ss.getSheetByName("Quick Reference");
  let resumes = [];
  if (qrSheet) {
    const qrData = qrSheet.getDataRange().getValues();
    // Assuming A is Role/Name, B is Link
    for (let i = 1; i < qrData.length; i++) { // Skip header
      if (qrData[i][0] && qrData[i][1]) {
        resumes.push({ name: qrData[i][0], url: qrData[i][1] });
      }
    }
  }

  // 2. Get Pending Jobs from Applications tab
  const appSheet = ss.getSheetByName("Applications");
  if (!appSheet) throw new Error("Applications sheet not found.");
  
  const appData = appSheet.getDataRange().getValues();
  let jobs = [];
  
  for (let i = 1; i < appData.length; i++) {
    const applyMethod = appData[i][6]; // G
    const applyEmail = appData[i][7];  // H
    const mailSent = appData[i][24];   // Y
    const subjectFormat = appData[i][25] || "Default"; // Z
    
    if (applyMethod === "Email" && !mailSent && isValidEmail(applyEmail)) {
      let company = appData[i][2]; // C
      let title = appData[i][3];   // D
      
      // Compute Subject
      let computedSubject = "";
      if (subjectFormat === "Default" || subjectFormat === "N/A" || !subjectFormat) {
        computedSubject = title + " Application - Md Faysal Ahmed";
      } else {
        // Replace role placeholders like [Role], {{role}}, etc. with actual title
        computedSubject = subjectFormat.replace(/\{{1,2}role\}{1,2}|\[role\]/gi, title);
        
        // Append or replace name
        computedSubject = computedSubject.replace(/\[your name\]|\{{1,2}name\}{1,2}|\[name\]/gi, "Md Faysal Ahmed");
        
        if (!computedSubject.toLowerCase().includes("faysal")) {
          computedSubject += " - Md Faysal Ahmed";
        }
      }

      jobs.push({
        rowIndex: i + 1,
        company: company,
        title: title,
        applyEmail: applyEmail,
        computedSubject: computedSubject
      });
    }
  }

  return { resumes: resumes, jobs: jobs };
}

function isValidEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

// ============================================================
// Send Email Server Function
// ============================================================
function sendJobApplicationEmail(payload) {
  // Check Quota
  if (MailApp.getRemainingDailyQuota() < 1) {
    throw new Error("Gmail daily quota exceeded! Try again tomorrow.");
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Get Email Template
  const tmplSheet = ss.getSheetByName("Email Template");
  if (!tmplSheet) throw new Error("'Email Template' tab is missing.");
  let templateBody = tmplSheet.getRange("A1").getValue();
  if (!templateBody) throw new Error("Template cell A1 in 'Email Template' is empty!");

  // Merge placeholders
  let mergedBody = templateBody
    .replace(/\{{1,2}role\}{1,2}/gi, payload.title)
    .replace(/\{{1,2}company name\}{1,2}/gi, payload.company)
    .replace(/\{{1,2}company\}{1,2}/gi, payload.company);

  // Check leftover placeholders
  const leftover = mergedBody.match(/\{\{[^}]+\}\}/g);
  if (leftover) {
    throw new Error("Unfilled template placeholders remaining: " + leftover.join(", "));
  }

  // 2. Prepare Attachments
  let attachments = [];
  let attachedFileNames = [];
  
  // Main Resume
  if (payload.resumeUrl) {
    try {
      // extract ID from url
      const idMatch = payload.resumeUrl.match(/[-\w]{25,}/);
      if (idMatch) {
        const file = DriveApp.getFileById(idMatch[0]);
        attachments.push(file.getAs(MimeType.PDF));
        attachedFileNames.push(file.getName());
      } else {
        throw new Error("Invalid Google Drive URL in Quick Reference.");
      }
    } catch (e) {
      throw new Error("Could not access Resume on Drive: " + e.message);
    }
  } else if (payload.resumeBase64) {
    const blob = Utilities.newBlob(Utilities.base64Decode(payload.resumeBase64), payload.resumeMime, payload.resumeName);
    attachments.push(blob);
    attachedFileNames.push(payload.resumeName);
  }

  // Additional File
  if (payload.addBase64) {
    const blob = Utilities.newBlob(Utilities.base64Decode(payload.addBase64), payload.addMime, payload.addName);
    attachments.push(blob);
    attachedFileNames.push(payload.addName);
  }

  // Check Size (~25MB limit)
  let totalSize = attachments.reduce((acc, blob) => acc + blob.getBytes().length, 0);
  if (totalSize > 25 * 1024 * 1024) {
    throw new Error("Total attachment size exceeds 25MB limit.");
  }

  // 3. Send Email
  // Replace newlines with <br> for HTML email
  let htmlBody = mergedBody.replace(/\n/g, "<br>");
  
  GmailApp.sendEmail(payload.applyEmail, payload.computedSubject, mergedBody, {
    htmlBody: htmlBody,
    attachments: attachments,
    name: "Md Faysal Ahmed"
  });

  // 4. Update Sheet
  const appSheet = ss.getSheetByName("Applications");
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMM, yyyy HH:mm");
  
  appSheet.getRange(payload.rowIndex, 25).setValue(timestamp); // Y: Mail Sent
  appSheet.getRange(payload.rowIndex, 17).setValue("Applied"); // Q: Application Status
  appSheet.getRange(payload.rowIndex, 28).setValue(attachedFileNames.join(", ")); // AB: Attached Files
  
  return "Email sent successfully!";
}

// ============================================================
// Row Audit Function
// ============================================================
function runAudit() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Applications");
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return; // Only headers

  // We will build arrays to write back in batch
  const backgroundColors = sheet.getDataRange().getBackgrounds();
  
  // Expand backgroundColors array horizontally if they have fewer than 27 cols
  for (let i = 0; i < backgroundColors.length; i++) {
    while (backgroundColors[i].length < 27) {
      backgroundColors[i].push("#ffffff");
    }
  }

  const issuesToUpdate = []; // We will build a 2D array for column AA (index 26)

  // Start with existing issues, we will mutate it
  for (let i = 0; i < data.length; i++) {
    issuesToUpdate.push([data[i][26] || ""]);
  }

  let hasChanges = false;

  for (let i = 1; i < data.length; i++) { // Skip header
    const applyMethod = data[i][6];  // G
    const applyEmail = data[i][7];   // H
    const company = data[i][2];      // C
    const title = data[i][3];        // D
    const deadline = data[i][12];    // M
    const mailSent = data[i][24];    // Y
    
    // Skip already sent
    if (mailSent) {
      continue;
    }

    if (applyMethod === "Email") {
      let issues = [];

      if (!applyEmail || applyEmail === "N/A" || !isValidEmail(applyEmail)) {
        issues.push("Invalid/Missing Email");
      }
      if (!company || company === "N/A") {
        issues.push("Missing Company Name");
      }
      if (!title || title === "N/A") {
        issues.push("Missing Job Title");
      }

      // Check deadline if present and is date
      if (deadline && deadline !== "N/A" && deadline !== "") {
        let dlDate = new Date(deadline);
        if (!isNaN(dlDate.getTime()) && dlDate < new Date()) {
          issues.push("Deadline Passed");
        }
      }

      if (issues.length > 0) {
        // Has issue - set entire row to red
        for (let j=0; j < data[0].length; j++) {
            backgroundColors[i][j] = "#fce8e6"; // light red
        }
        issuesToUpdate[i][0] = issues.join(", ");
        hasChanges = true;
      } else {
        // Valid, clear previous flags
        if (issuesToUpdate[i][0] !== "" || backgroundColors[i][0] === "#fce8e6") {
          // Reset row color to white
          for (let j=0; j < data[0].length; j++) {
              backgroundColors[i][j] = "#ffffff"; 
          }
          // Restore score cell color (column O, index 14) 
          const finalScore = data[i][14];
          if (finalScore >= 80) backgroundColors[i][14] = "#c6efce";
          else if (finalScore >= 70) backgroundColors[i][14] = "#ffeb9c";
          
          issuesToUpdate[i][0] = "";
          hasChanges = true;
        }
      }
    }
  }

  if (hasChanges) {
    // Write back backgrounds and audit issues in batch
    sheet.getDataRange().setBackgrounds(backgroundColors);
    sheet.getRange(1, 27, issuesToUpdate.length, 1).setValues(issuesToUpdate); // AA is col 27
    SpreadsheetApp.getUi().alert("✅ রো যাচাই সম্পন্ন হয়েছে! যেকোনো ত্রুটি লাল রঙে চিহ্নিত করা হয়েছে।");
  } else {
    SpreadsheetApp.getUi().alert("✅ রো যাচাই সম্পন্ন হয়েছে! কোনো ত্রুটি পাওয়া যায়নি।");
  }
}
