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
    .summary-box { background: #e8f0fe; padding: 12px; border: 1px solid #c6dafc; border-radius: 6px; margin-bottom: 15px; font-size: 13px; color: #1a73e8; }
    #status { margin-top: 12px; padding: 10px; border-radius: 6px; font-size: 13px; display: none; text-align: center; }
    .loading { background: #e8f0fe; color: #1a73e8; }
    .success { background: #e6f4ea; color: #137333; }
    .error   { background: #fce8e6; color: #c5221f; }
  </style>
</head>
<body>
  <h2>🚀 Bulk Apply (ApplyFlow AI)</h2>
  <div class="summary-box" id="summaryBox">⏳ ডেটা লোড এবং অডিট করা হচ্ছে...</div>

  <label>Resume / CV (সবগুলোর জন্য একটি) *</label>
  <select id="resumeSelect" onchange="toggleResumeUpload()">
    <option value="">-- লোড হচ্ছে... --</option>
  </select>
  <input type="file" id="resumeUpload" style="display:none;" accept=".pdf,.doc,.docx" />

  <label>Additional File (Optional)</label>
  <input type="file" id="additionalUpload" />

  <button class="btn-primary" id="sendBtn" onclick="sendEmails()" disabled>📧 ইমেইল পাঠানো শুরু করুন</button>

  <div id="status"></div>

  <script>
    let validJobs = [];

    // Load data on startup
    google.script.run.withSuccessHandler(onDataLoaded).withFailureHandler(onError).getSendDialogData();

    function onDataLoaded(data) {
      validJobs = data.jobs.slice(0, 10); // Take max 10 jobs
      
      const summaryBox = document.getElementById('summaryBox');
      if (validJobs.length === 0) {
        summaryBox.innerHTML = \`পেন্ডিং কোনো জব নেই অথবা সবগুলোর তথ্য অসম্পূর্ণ। <b>\${data.invalidCount}</b> টি জবে ভুল/অসম্পূর্ণ তথ্য রয়েছে যা লাল রঙে মার্ক করা হয়েছে।\`;
        document.getElementById('sendBtn').disabled = true;
      } else {
        summaryBox.innerHTML = \`<b>\${validJobs.length}</b> টি জব রেডি আছে। (সর্বোচ্চ ১০টি একসাথে)।<br><br><b>\${data.invalidCount}</b> টি অসম্পূর্ণ জব লাল রঙে মার্ক করে স্কিপ করা হয়েছে।\`;
        document.getElementById('sendBtn').disabled = false;
      }

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
    }

    function onError(err) {
      showStatus('❌ Error: ' + err.message, 'error');
    }

    function showStatus(msg, type) {
      const el = document.getElementById('status');
      el.textContent = msg;
      el.className = type;
      el.style.display = 'block';
    }

    async function sendEmails() {
      if (validJobs.length === 0) return;

      const resVal = document.getElementById('resumeSelect').value;
      const resFile = document.getElementById('resumeUpload').files[0];
      const addFile = document.getElementById('additionalUpload').files[0];

      if (!resVal && !resFile) {
        if (!confirm("আপনি কোনো Resume/CV সিলেক্ট করেননি! তবুও কি পাঠাতে চান?")) return;
      }

      showStatus('⏳ ইমেইল পাঠানো হচ্ছে (Bulk Send)...', 'loading');
      document.getElementById('sendBtn').disabled = true;

      try {
        let payload = {
          jobs: validJobs,
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
            setTimeout(() => google.script.host.close(), 3000);
          })
          .withFailureHandler(err => {
            showStatus('❌ ' + err.message, 'error');
            document.getElementById('sendBtn').disabled = false;
          })
          .sendBulkApplicationEmails(payload);

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
  .setWidth(500).setHeight(500).setTitle("🚀 Bulk Apply (ApplyFlow AI)");
  SpreadsheetApp.getUi().showModalDialog(html, "🚀 Bulk Apply");
}


// ============================================================
// Get Dialog Data (Server-Side)
// ============================================================
function getSendDialogData() {
  // ১. ডায়ালগ ওপেন হওয়ার আগেই Audit রান করবে (যাতে লাল রঙ আপডেট হয়ে যায়)
  runAudit(false); // false means no popup alert
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get Resumes from Quick Reference tab
  const qrSheet = ss.getSheetByName("Quick Reference");
  let resumes = [];
  if (qrSheet) {
    const qrData = qrSheet.getDataRange().getValues();
    for (let i = 1; i < qrData.length; i++) {
      let name = qrData[i][0];
      let url = qrData[i][1];
      if (name && url) {
        resumes.push({ name: String(name).trim(), url: String(url).trim() });
      }
    }
  }

  // Get Pending Jobs
  const appSheet = ss.getSheetByName("Applications");
  if (!appSheet) throw new Error("Applications sheet not found.");
  
  const appData = appSheet.getDataRange().getValues();
  let jobs = [];
  let invalidCount = 0;
  
  for (let i = 1; i < appData.length; i++) {
    const applyMethod = String(appData[i][6] || "").trim(); // G
    const applyEmail = String(appData[i][7] || "").trim();  // H
    const company = String(appData[i][2] || "").trim();     // C
    const title = String(appData[i][3] || "").trim();       // D
    const mailSent = appData[i][24];   // Y
    const subjectFormat = appData[i][25] ? String(appData[i][25]).trim() : "Default"; // Z
    const auditIssue = appData[i][26] ? String(appData[i][26]).trim() : ""; // AA
    
    if (applyMethod === "Email" && !mailSent) {
      if (auditIssue === "") { // No issues found by runAudit!
        let computedSubject = "";
        if (subjectFormat === "Default" || subjectFormat === "N/A" || !subjectFormat) {
          computedSubject = title + " Application - Md Faysal Ahmed";
        } else {
          computedSubject = subjectFormat.replace(/\{{1,2}role\}{1,2}|\[role\]/gi, title);
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
      } else {
        invalidCount++;
      }
    }
  }

  return { resumes: resumes, jobs: jobs, invalidCount: invalidCount };
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.trim());
}

// ============================================================
// Send Bulk Emails Server Function
// ============================================================
function sendBulkApplicationEmails(payload) {
  if (!payload.jobs || payload.jobs.length === 0) return "কোনো জব সিলেক্ট করা হয়নি।";
  
  if (MailApp.getRemainingDailyQuota() < payload.jobs.length) {
    throw new Error("Gmail quota exceeded!");
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tmplSheet = ss.getSheetByName("Email Template");
  if (!tmplSheet) throw new Error("'Email Template' tab is missing.");
  let templateBody = tmplSheet.getRange("A1").getValue();
  if (!templateBody) throw new Error("Template cell A1 is empty!");

  let attachments = [];
  let attachedFileNames = [];
  
  if (payload.resumeUrl) {
    try {
      const idMatch = payload.resumeUrl.match(/[-\\w]{25,}/);
      if (idMatch) {
        const file = DriveApp.getFileById(idMatch[0]);
        attachments.push(file.getAs(MimeType.PDF));
        attachedFileNames.push(file.getName());
      } else throw new Error("Invalid Drive URL");
    } catch (e) {
      throw new Error("Resume Drive Error: " + e.message);
    }
  } else if (payload.resumeBase64) {
    attachments.push(Utilities.newBlob(Utilities.base64Decode(payload.resumeBase64), payload.resumeMime, payload.resumeName));
    attachedFileNames.push(payload.resumeName);
  }

  if (payload.addBase64) {
    attachments.push(Utilities.newBlob(Utilities.base64Decode(payload.addBase64), payload.addMime, payload.addName));
    attachedFileNames.push(payload.addName);
  }

  let totalSize = attachments.reduce((acc, blob) => acc + blob.getBytes().length, 0);
  if (totalSize > 25 * 1024 * 1024) throw new Error("Total attachment size > 25MB.");

  const appSheet = ss.getSheetByName("Applications");
  let successCount = 0;
  let errorCount = 0;

  for (let job of payload.jobs) {
    let mergedBody = String(templateBody)
      .replace(/\{{1,2}role\}{1,2}/gi, String(job.title))
      .replace(/\{{1,2}company name\}{1,2}/gi, String(job.company))
      .replace(/\{{1,2}company\}{1,2}/gi, String(job.company));

    let htmlBody = mergedBody.replace(/\\n/g, "<br>");
    
    try {
      GmailApp.sendEmail(job.applyEmail, job.computedSubject, mergedBody, {
        htmlBody: htmlBody,
        attachments: attachments,
        name: "Md Faysal Ahmed"
      });

      const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMM, yyyy HH:mm");
      appSheet.getRange(job.rowIndex, 25).setValue(timestamp);
      appSheet.getRange(job.rowIndex, 17).setValue("Applied");
      appSheet.getRange(job.rowIndex, 28).setValue(attachedFileNames.join(", "));
      successCount++;
    } catch (e) {
      errorCount++;
      console.error("Failed to send email for row " + job.rowIndex + ": " + e.message);
    }
  }
  
  if (errorCount > 0) {
    return `${successCount} টি সফল হয়েছে, ${errorCount} টিতে এরর হয়েছে!`;
  }
  return successCount + " টি ইমেইল সফলভাবে পাঠানো হয়েছে!";
}

// ============================================================
// Row Audit Function
// ============================================================
function runAudit(showAlert = true) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Applications");
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;

  const backgroundColors = sheet.getDataRange().getBackgrounds();
  
  for (let i = 0; i < backgroundColors.length; i++) {
    while (backgroundColors[i].length < 28) {
      backgroundColors[i].push("#ffffff");
    }
  }

  const issuesToUpdate = []; 
  for (let i = 0; i < data.length; i++) {
    issuesToUpdate.push([data[i][26] ? String(data[i][26]) : ""]);
  }

  let hasChanges = false;

  for (let i = 1; i < data.length; i++) {
    const applyMethod = String(data[i][6] || "").trim();  
    const applyEmail = String(data[i][7] || "").trim();   
    const company = String(data[i][2] || "").trim();      
    const title = String(data[i][3] || "").trim();        
    const deadline = data[i][12];    
    const mailSent = data[i][24];    
    
    if (mailSent) continue;

    if (applyMethod === "Email") {
      let issues = [];
      
      // Reset row color to white first (except Score at index 14)
      for (let j=0; j < backgroundColors[i].length; j++) {
        backgroundColors[i][j] = "#ffffff"; 
      }
      const finalScore = data[i][14];
      if (finalScore >= 80) backgroundColors[i][14] = "#c6efce";
      else if (finalScore >= 70) backgroundColors[i][14] = "#ffeb9c";

      if (!applyEmail || applyEmail === "N/A" || !isValidEmail(applyEmail)) {
        issues.push("Invalid/Missing Email");
        backgroundColors[i][7] = "#fce8e6"; // Red cell
      }
      if (!company || company === "N/A") {
        issues.push("Missing Company Name");
        backgroundColors[i][2] = "#fce8e6";
      }
      if (!title || title === "N/A") {
        issues.push("Missing Job Title");
        backgroundColors[i][3] = "#fce8e6";
      }
      if (deadline && deadline !== "N/A" && deadline !== "") {
        let dlDate = new Date(deadline);
        if (!isNaN(dlDate.getTime()) && dlDate < new Date()) {
          issues.push("Deadline Passed");
          backgroundColors[i][12] = "#fce8e6";
        }
      }

      if (issues.length > 0) {
        issuesToUpdate[i][0] = issues.join(", ");
        hasChanges = true;
      } else {
        if (issuesToUpdate[i][0] !== "") {
          issuesToUpdate[i][0] = "";
          hasChanges = true;
        }
      }
    }
  }

  if (hasChanges) {
    const range = sheet.getRange(1, 1, backgroundColors.length, backgroundColors[0].length);
    range.setBackgrounds(backgroundColors);
    sheet.getRange(1, 27, issuesToUpdate.length, 1).setValues(issuesToUpdate);
    if (showAlert) SpreadsheetApp.getUi().alert("✅ রো যাচাই সম্পন্ন হয়েছে! অসম্পূর্ণ ফিল্ডগুলো লাল রঙে চিহ্নিত করা হয়েছে।");
  } else {
    if (showAlert) SpreadsheetApp.getUi().alert("✅ রো যাচাই সম্পন্ন হয়েছে! কোনো ত্রুটি পাওয়া যায়নি।");
  }
}
