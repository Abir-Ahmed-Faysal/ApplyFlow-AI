// ============================================================
// ApplyFlow AI - AUTO ENTRY SCRIPT  v2.1
// Faysal Ahmed — Hybrid AI + Code Scoring + Follow-up System
// ============================================================
// HOW TO USE:
// 1. Open your Google Sheet
// 2. Click Extensions > Apps Script
// 3. Delete everything there and paste this entire code
// 4. Replace YOUR_GROQ_API_KEY below with your actual key
// 5. Click Save (Ctrl+S)
// 6. Reload your Sheet — a new menu "🤖 ApplyFlow AI" will appear
//
// FOLLOW-UP SETUP (one-time):
// After pasting, go to: Extensions > Apps Script > Triggers (⏰)
// Add trigger: runFollowUpCheck → Time-driven → Day timer → 9am–10am
// This runs daily and auto-sends follow-ups when due.
// ============================================================

const GROQ_API_KEY = "YOUR_GROQ_API_KEY"; // ← এখানে আপনার Groq API Key বসান

// ============================================================
// MY SKILLS — update whenever you learn something new
// ============================================================
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
  "Git", "Docker", "Vercel", "Postman",
  "Google Generative AI", "Stripe", "Nodemailer",
];

// ============================================================
// SKILL WEIGHTS — higher = more important to recruiters
// ============================================================
const SKILL_WEIGHTS = {
  "JavaScript":         10,
  "TypeScript":          9,
  "React.js":            9,
  "Node.js":             8,
  "Next.js":             7,
  "PostgreSQL":          7,
  "MongoDB":             7,
  "Express.js":          6,
  "Prisma":              5,
  "REST API":            5,
  "TanStack Query":      4,
  "Docker":              4,
  "Git":                 4,
  "JWT":                 4,
  "Mongoose":            3,
  "Tailwind CSS":        3,
  "Shadcn UI":           3,
  "Firebase Auth":       3,
  "Better Auth":         3,
  "Framer Motion":       2,
  "Vercel":              2,
  "Postman":             2,
  "Google Generative AI":2,
  "Stripe":              2,
  "Nodemailer":          2,
};

// ============================================================
// CORE SKILLS — at least one must be present or hard-skip
// ============================================================
const CORE_SKILLS = ["JavaScript", "TypeScript", "React.js", "Node.js", "Next.js"];

// ============================================================
// RED FLAG KEYWORDS — instant skip if found in circular
// ============================================================
const RED_FLAG_KEYWORDS = [
  "10+ years", "8+ years", "7+ years", "6+ years",
  "C++", "Java Spring", ".NET", "PHP Laravel", "PHP",
  "Angular", "Vue.js", "Ruby on Rails", "Django", "Flask",
  "Golang", "Rust", "Kotlin", "Swift", "Salesforce",
  "SAP", "WordPress developer", "Magento",
];

// ============================================================
// SKILL ALIASES — maps variants/shortcuts to canonical skill
// ============================================================
const SKILL_ALIASES = {
  // JavaScript
  "js": "JavaScript", "javascript": "JavaScript", "vanilla js": "JavaScript",
  "vanillajs": "JavaScript", "ecmascript": "JavaScript", "es6": "JavaScript",
  "জাভাস্ক্রিপ্ট": "JavaScript", "জেএস": "JavaScript",

  // TypeScript
  "ts": "TypeScript", "typescript": "TypeScript", "টাইপস্ক্রিপ্ট": "TypeScript",

  // React.js
  "react": "React.js", "reactjs": "React.js", "react js": "React.js",
  "রিয়েক্ট": "React.js", "frontend framework": "React.js", "ui library": "React.js",
  "ui framework": "React.js",

  // Next.js
  "nextjs": "Next.js", "next js": "Next.js", "next": "Next.js",
  "ssr": "Next.js", "ssg": "Next.js", "server side rendering": "Next.js",

  // Tailwind CSS
  "tailwind": "Tailwind CSS", "tailwindcss": "Tailwind CSS",
  "tailwind css": "Tailwind CSS", "css framework": "Tailwind CSS",

  // Shadcn UI
  "shadcn": "Shadcn UI", "shadcnui": "Shadcn UI", "shadcn ui": "Shadcn UI",
  "component library": "Shadcn UI",

  // Framer Motion
  "framer": "Framer Motion", "framermotion": "Framer Motion",
  "animation library": "Framer Motion",

  // TanStack Query
  "tanstack": "TanStack Query", "react query": "TanStack Query",
  "tanstackquery": "TanStack Query", "data fetching": "TanStack Query",

  // Node.js
  "node": "Node.js", "nodejs": "Node.js", "node js": "Node.js",
  "নোড": "Node.js", "backend runtime": "Node.js", "server side js": "Node.js",

  // Express.js
  "express": "Express.js", "expressjs": "Express.js", "express js": "Express.js",
  "web framework": "Express.js", "http framework": "Express.js",

  // REST API
  "rest": "REST API", "restful": "REST API", "restful api": "REST API",
  "api": "REST API", "web api": "REST API", "api development": "REST API",

  // PostgreSQL
  "postgres": "PostgreSQL", "postgresql": "PostgreSQL", "sql": "PostgreSQL",
  "rdbms": "PostgreSQL", "relational database": "PostgreSQL",
  "relational db": "PostgreSQL", "পোস্টগ্রেস": "PostgreSQL",

  // MongoDB
  "mongo": "MongoDB", "mongodb": "MongoDB", "nosql": "MongoDB",
  "document database": "MongoDB", "document db": "MongoDB",
  "মঙ্গোডিবি": "MongoDB", "no sql": "MongoDB",

  // Prisma
  "prisma": "Prisma", "prismaorm": "Prisma", "prisma orm": "Prisma",
  "orm": "Prisma", "database orm": "Prisma", "query builder": "Prisma",

  // Mongoose
  "mongoose": "Mongoose", "mongo orm": "Mongoose",
  "mongodb odm": "Mongoose", "odm": "Mongoose",

  // JWT
  "jwt": "JWT", "json web token": "JWT", "jsonwebtoken": "JWT",
  "token auth": "JWT", "bearer token": "JWT", "authentication": "JWT",
  "auth": "JWT", "authorization": "JWT", "অথেনটিকেশন": "JWT",

  // Better Auth
  "betterauth": "Better Auth", "better auth": "Better Auth",

  // Firebase Auth
  "firebase": "Firebase Auth", "firebaseauth": "Firebase Auth",
  "firebase auth": "Firebase Auth", "google auth": "Firebase Auth",
  "social login": "Firebase Auth", "oauth": "Firebase Auth", "oauth2": "Firebase Auth",

  // Git
  "git": "Git", "github": "Git", "gitlab": "Git", "bitbucket": "Git",
  "version control": "Git", "source control": "Git", "vcs": "Git", "গিট": "Git",

  // Docker
  "docker": "Docker", "containerization": "Docker", "container": "Docker",
  "dockerfile": "Docker", "docker compose": "Docker",

  // Vercel
  "vercel": "Vercel", "deployment": "Vercel", "cloud deployment": "Vercel",
  "hosting": "Vercel", "ci cd": "Vercel", "cicd": "Vercel",

  // Postman
  "postman": "Postman", "api testing": "Postman",

  // Google Generative AI
  "gemini": "Google Generative AI", "google ai": "Google Generative AI",
  "generative ai": "Google Generative AI", "llm integration": "Google Generative AI",
  "ai integration": "Google Generative AI",

  // Stripe
  "stripe": "Stripe", "payment gateway": "Stripe", "payment integration": "Stripe",
  "online payment": "Stripe", "পেমেন্ট": "Stripe",

  // Nodemailer
  "nodemailer": "Nodemailer", "email service": "Nodemailer",
  "smtp": "Nodemailer", "email integration": "Nodemailer",

  // Bengali general
  "ফুল স্ট্যাক": "JavaScript", "ব্যাকএন্ড": "Node.js",
  "ফ্রন্টএন্ড": "React.js", "ডেটাবেস": "MongoDB", "ক্লাউড": "Vercel",
};

// ============================================================
// CONFIG
// ============================================================
const MIN_SCORE          = 70;   // Final score threshold to apply
const MAX_EXP_HARD_SKIP  = 4;    // 4+ years = always skip
const EXP_PENALTY_YEARS  = 3;    // 3 years = apply code penalty
const EXP_PENALTY_POINTS = 10;   // Points deducted for EXP_PENALTY_YEARS

// ============================================================
// FOLLOW-UP CONFIG
// ============================================================
const FOLLOWUP_FREQUENCY_DAYS = 6;   // Days between follow-ups
const FOLLOWUP_MAX_COUNT      = 2;   // Maximum follow-ups per application

// Column indexes (0-based) in Applications sheet
// A=0  B=1  C=2  D=3  E=4  F=5  G=6  H=7  I=8  J=9
// K=10 L=11 M=12 N=13 O=14 P=15 Q=16 R=17 S=18 T=19
// U=20 V=21 W=22 X=23 Y=24 Z=25 AA=26 AB=27 AC=28 AD=29 AE=30
const COL = {
  ID:             0,   // A
  APPLIED_DATE:   1,   // B
  COMPANY:        2,   // C
  TITLE:          3,   // D
  JOB_TYPE:       4,   // E
  PLATFORM:       5,   // F
  APPLY_METHOD:   6,   // G
  APPLY_CONTACT:  7,   // H
  WORK_MODE:      8,   // I
  LOCATION:       9,   // J
  SALARY:         10,  // K
  EXPERIENCE:     11,  // L
  DEADLINE:       12,  // M
  KEY_INFO:       13,  // N
  SCORE:          14,  // O
  SCORE_NOTES:    15,  // P
  STATUS:         16,  // Q
  RESPONSE:       17,  // R
  FOLLOWUP_DATE:  18,  // S
  INTERVIEW_DATE: 19,  // T
  RECRUITER:      20,  // U
  REFERRED_BY:    21,  // V
  CONTACT:        22,  // W
  NOTES:          23,  // X
  MAIL_SENT:      24,  // Y
  SUBJECT_FORMAT: 25,  // Z
  AUDIT_ISSUE:    26,  // AA
  ATTACHED_FILES: 27,  // AB
  THREAD_ID:      28,  // AC ← NEW: Gmail Thread ID for reply-in-thread
  FOLLOWUP_COUNT: 29,  // AD ← NEW: How many follow-ups sent (0/1/2)
  LAST_FOLLOWUP:  30,  // AE ← NEW: Date of last follow-up sent
};

// ============================================================
// MENU
// ============================================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🤖 ApplyFlow AI")
    .addItem("📋 নতুন জব সার্কুলার যোগ করুন",      "showCircularDialog")
    .addItem("📧 ইমেইল পাঠান (Mail Merge)",         "showSendDialog")
    .addSeparator()
    .addItem("🔔 Follow-up এখনই চেক করুন",          "runFollowUpCheck")
    .addItem("📊 Follow-up স্ট্যাটাস দেখুন",         "showFollowUpStatus")
    .addSeparator()
    .addItem("🔍 রো যাচাই করুন (Audit)",             "runAudit")
    .addItem("⚙️ অটো-সেটআপ (Auto Setup)",            "autoSetup")
    .addItem("⚙️ সেটিংস দেখুন",                      "showSettings")
    .addToUi();
}

// ============================================================
// DIALOG — Paste job circular
// ============================================================
function showCircularDialog() {
  const html = HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; }
        h2   { color: #1a73e8; margin-bottom: 5px; }
        p    { color: #555; font-size: 13px; margin-bottom: 15px; }
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
        button { padding: 10px 20px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: bold; }
        .btn-primary { background: #1a73e8; color: white; width: 100%; margin-top: 10px; }
        .btn-primary:hover { background: #1558b0; }
        #status { margin-top: 12px; padding: 10px; border-radius: 6px; font-size: 13px; display: none; text-align: center; }
        .loading { background: #e8f0fe; color: #1a73e8; }
        .success { background: #e6f4ea; color: #137333; }
        .caution { background: #fff3e0; color: #e65100; }
        .skip    { background: #fef7e0; color: #b06000; }
        .error   { background: #fce8e6; color: #c5221f; }
        label    { font-size: 13px; color: #333; font-weight: bold; display: block; margin-bottom: 4px; }
        .badge   { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-left: 6px; }
      </style>
    </head>
    <body>
      <h2>📋 নতুন জব সার্কুলার</h2>
      <p>সম্পূর্ণ জব সার্কুলার পেস্ট করুন। Hybrid AI বিশ্লেষণ করে সিদ্ধান্ত নেবে।</p>

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

      <button class="btn-primary" onclick="processJob()">🔍 Hybrid AI দিয়ে বিশ্লেষণ করুন</button>
      <div id="status"></div>

      <script>
        function processJob() {
          const circular  = document.getElementById('circular').value.trim();
          const applyLink = document.getElementById('applyLink').value.trim();
          const platform  = document.getElementById('platform').value.trim();
          if (!circular) { showStatus('⚠️ জব সার্কুলার লিখুন!', 'error'); return; }
          showStatus('⏳ Hybrid AI বিশ্লেষণ করছে (Layer 1 → 2 → 3)...', 'loading');
          google.script.run
            .withSuccessHandler(onSuccess)
            .withFailureHandler(onError)
            .analyzeAndAddJob(circular, applyLink, platform);
        }
        function onSuccess(result) {
          const type = result.added
            ? (result.decision === 'APPLY_NOW' ? 'success' : 'caution')
            : (result.decision === 'SKIP' ? 'skip' : 'error');
          showStatus((result.added ? '✅ ' : '⏭️ ') + result.message, type);
          setTimeout(() => google.script.host.close(), 4000);
        }
        function onError(err) { showStatus('❌ সমস্যা: ' + err.message, 'error'); }
        function showStatus(msg, type) {
          const el = document.getElementById('status');
          el.innerHTML = msg;
          el.className = type;
          el.style.display = 'block';
        }
      </script>
    </body>
    </html>
  `)
    .setWidth(520)
    .setHeight(500)
    .setTitle("🤖 জব সার্কুলার বিশ্লেষণ");

  SpreadsheetApp.getUi().showModalDialog(html, "🤖 জব সার্কুলার বিশ্লেষণ");
}

// ============================================================
// MAIN PIPELINE — 4-Layer Hybrid
// ============================================================
function analyzeAndAddJob(circularText, applyLink, platform) {
  try {
    // ── LAYER 1: Hard Rules (instant, free) ──────────────────
    const hardResult = hardRuleFilter(circularText);
    if (hardResult.skip) {
      return { added: false, decision: "SKIP", message: `❌ Hard Rule: ${hardResult.reason}` };
    }

    // ── LAYER 2: AI parses circular + gives AI score ──────────
    const prompt    = buildDeepPrompt(circularText);
    const aiRaw     = callGroqAPI(prompt);
    const jobData   = parseAIResponse(aiRaw);

    // ── LAYER 1b: Experience hard-cutoff (from AI-parsed data) ─
    const expYears = Number(jobData.experienceYears) || 0;
    if (expYears >= MAX_EXP_HARD_SKIP) {
      return {
        added: false, decision: "SKIP",
        message: `❌ অভিজ্ঞতা ${expYears} বছর — ${MAX_EXP_HARD_SKIP}+ বছর হওয়ায় স্কিপ।`,
      };
    }

    // ── LAYER 3: Weighted Code Score ─────────────────────────
    const codeScore = weightedSkillScore(jobData.requiredSkills || [], expYears);

    // ── AI dimension scores (0–10 each from AI response) ──────
    const dims = {
      skill_fit:        clamp(Number(jobData.skill_fit)        || 0, 0, 10),
      experience_fit:   clamp(Number(jobData.experience_fit)   || 0, 0, 10),
      role_clarity:     clamp(Number(jobData.role_clarity)     || 0, 0, 10),
      growth_potential: clamp(Number(jobData.growth_potential) || 0, 0, 10),
      red_flags:        clamp(Number(jobData.red_flags)        || 5, 0, 10), // 10 = no flags
    };

    // AI composite (out of 100)
    const aiComposite = Math.round(
      dims.skill_fit        * 3.0 +
      dims.experience_fit   * 2.5 +
      dims.red_flags        * 2.0 +
      dims.growth_potential * 1.5 +
      dims.role_clarity     * 1.0
    ); // weights sum = 10.0 → composite range 0–100

    // ── LAYER 4: Final Hybrid Score & Decision ────────────────
    const finalScore = clamp(Math.round(codeScore * 0.35 + aiComposite * 0.65), 0, 100);
    const decision   = makeDecision(finalScore, dims, jobData.ai_summary || "");

    if (!decision.add) {
      return {
        added: false, decision: "SKIP",
        message: `${decision.label} — Score: ${finalScore} | ${decision.reason}`,
      };
    }

    // ── Write to sheet ────────────────────────────────────────
    addRowToSheet(jobData, finalScore, codeScore, aiComposite, dims,
                  circularText, applyLink, platform, decision.label);

    return {
      added: true, decision: decision.code,
      message: `${decision.label} (${finalScore}/100) | Code: ${codeScore} | AI: ${aiComposite} — "${jobData.company}" › "${jobData.title}" যোগ হয়েছে!`,
    };

  } catch (e) {
    throw new Error(e.message);
  }
}

// ============================================================
// LAYER 1 — Hard Rule Filter
// ============================================================
function hardRuleFilter(circularText) {
  const lower = circularText.toLowerCase();

  // Red-flag keyword check
  for (const flag of RED_FLAG_KEYWORDS) {
    if (lower.includes(flag.toLowerCase())) {
      return { skip: true, reason: `Red flag keyword: "${flag}"` };
    }
  }

  return { skip: false };
}

// ============================================================
// LAYER 3 — Weighted Code Score (0–100)
// ============================================================
function weightedSkillScore(requiredSkills, experienceYears) {
  if (!requiredSkills || requiredSkills.length === 0) return 0;

  let earned = 0, possible = 0;
  for (const rawSkill of requiredSkills) {
    const norm     = normalizeSkill(rawSkill);
    const resolved = resolveSkill(norm);
    const weight   = SKILL_WEIGHTS[resolved] || 3;
    possible += weight;
    if (resolved && MY_SKILLS.includes(resolved)) earned += weight;
  }

  let score = possible > 0 ? Math.round((earned / possible) * 100) : 0;

  // Experience penalty only in code score
  if (experienceYears >= EXP_PENALTY_YEARS) score -= EXP_PENALTY_POINTS;

  return clamp(score, 0, 100);
}

function normalizeSkill(skill) {
  return String(skill).toLowerCase().replace(/[.\-_]/g, "").replace(/\s+/g, " ").trim();
}

function resolveSkill(normalizedSkill) {
  // Step 1: Direct match on MY_SKILLS
  for (const s of MY_SKILLS) {
    if (normalizeSkill(s) === normalizedSkill) return s;
  }
  // Step 2: Alias lookup
  const aliasMatch = SKILL_ALIASES[normalizedSkill];
  if (aliasMatch && MY_SKILLS.includes(aliasMatch)) return aliasMatch;

  // Step 3: Partial prefix match (guarded against false positives)
  const EXACT_ONLY = ["java", "c", "c++", "c#", "go", "rust", "ruby", "swift", "kotlin", "php"];
  if (EXACT_ONLY.includes(normalizedSkill)) return null;

  for (const s of MY_SKILLS) {
    const myNorm = normalizeSkill(s);
    if (normalizedSkill.length >= 4 && myNorm.length >= 4) {
      if (myNorm.startsWith(normalizedSkill) || normalizedSkill.startsWith(myNorm)) return s;
    }
  }
  return null;
}

// ============================================================
// LAYER 4 — Decision Engine
// ============================================================
function makeDecision(finalScore, dims, aiSummary) {
  // Red flags override score
  if (dims.red_flags <= 3) {
    return {
      add: false, code: "RED_FLAG",
      label: "🚩 RED FLAG",
      reason: "AI detected serious concerns: " + aiSummary,
    };
  }
  if (finalScore >= 85) {
    return {
      add: true, code: "APPLY_NOW",
      label: "✅ APPLY NOW",
      reason: aiSummary,
    };
  }
  if (finalScore >= 70) {
    return {
      add: true, code: "APPLY_CAUTION",
      label: "⚠️ APPLY (CHECK GAPS)",
      reason: aiSummary,
    };
  }
  return {
    add: false, code: "SKIP",
    label: "❌ SKIP",
    reason: `Score ${finalScore} — below ${MIN_SCORE} threshold`,
  };
}

// ============================================================
// DEEP AI PROMPT (multi-dimension scoring)
// ============================================================
function buildDeepPrompt(circularText) {
  return `
You are an expert job application advisor for a junior full-stack developer.

## Candidate Profile
- Name: Md Faysal Ahmed
- Skills: ${MY_SKILLS.join(", ")}
- Experience: 0–2 years (fresh/junior level)
- Key Projects: MediStore (healthcare SaaS), Sustainify (green-tech platform)
- Location: Bangladesh. Open to: Remote (global) or Onsite (BD only)

## Job Circular
"""
${circularText}
"""

## Your Tasks
1. Extract structured info from the circular.
2. Score this job on 5 dimensions (integer 0–10 each).
3. Decide if this candidate should apply.

Return ONLY this JSON (no markdown, no explanation):
{
  "company": "Company name",
  "title": "Job title",
  "jobType": "Full-time / Part-time / Contract / Freelance",
  "workMode": "Remote / Onsite / Hybrid",
  "location": "City or Country",
  "salary": "Salary range or N/A",
  "experienceYears": 2,
  "deadline": "Deadline date or N/A",
  "requiredSkills": ["skill1", "skill2"],
  "responsibilities": "Core responsibilities in 1-2 sentences",
  "applyEmail": "email or N/A",
  "applyLink": "URL or N/A",
  "customSubjectInstruction": "exact subject format from circular or N/A",

  "skill_fit": 8,
  "experience_fit": 9,
  "role_clarity": 7,
  "growth_potential": 8,
  "red_flags": 9,

  "missing_skills": ["skill1", "skill2"],
  "standout_reason": "One sentence: what makes candidate strong for THIS role",
  "ai_summary": "One sentence: overall verdict (apply / skip reason)"
}

## Scoring Guide
- skill_fit (0–10): How many required skills does candidate have? Weight by importance.
- experience_fit (0–10): Is 0–2 yrs realistic? 10=perfect fit, 5=borderline, 0=clearly overqualified role.
- role_clarity (0–10): Is the job well-defined with clear responsibilities?
- growth_potential (0–10): Will candidate learn and grow in this role?
- red_flags (0–10): 10=zero red flags, 0=very suspicious/unrealistic. Consider: vague requirements, too many skills, unpaid, "internship disguised as full-time", 5+ yrs for junior pay.

## Rules
- requiredSkills: technical skills only (frameworks, languages, databases, tools)
- experienceYears: highest number mentioned (integer)
- If info not found: use "N/A"
`;
}

// ============================================================
// GROQ API CALL (Llama 3.3 70B)
// ============================================================
function callGroqAPI(prompt) {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const payload = {
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    max_tokens: 1200,
  };
  const options = {
    method: "POST",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + GROQ_API_KEY },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };
  const response = UrlFetchApp.fetch(url, options);
  const json     = JSON.parse(response.getContentText());
  if (json.error) throw new Error("Groq API Error: " + json.error.message);
  return json.choices[0].message.content;
}

// ============================================================
// PARSE AI RESPONSE
// ============================================================
function parseAIResponse(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("AI থেকে সঠিক JSON আসেনি। আবার চেষ্টা করুন।");
  }
}

// ============================================================
// WRITE ROW TO SHEET
// ============================================================
function addRowToSheet(jobData, finalScore, codeScore, aiComposite, dims,
                       circularText, applyLink, platform, decisionLabel) {

  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Applications");
  if (!sheet) throw new Error('"Applications" sheet পাওয়া যায়নি।');

  const lastRow = getLastDataRow(sheet);
  const newRow  = lastRow + 1;
  const nextId  = lastRow - 1;

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMM");

  const missingSkills = (jobData.missing_skills || []).join(", ") || "—";
  const scoreNote = [
    decisionLabel,
    `Code: ${codeScore}% | AI: ${aiComposite}%`,
    `skill_fit:${dims.skill_fit} exp_fit:${dims.experience_fit} clarity:${dims.role_clarity} growth:${dims.growth_potential} flags:${dims.red_flags}`,
    `Missing: ${missingSkills}`,
    jobData.standout_reason || "",
  ].filter(Boolean).join(" | ");

  const status          = finalScore >= 85 ? "Pending Apply" : "Review First";
  const finalApplyEmail = jobData.applyEmail || "N/A";
  const finalApplyLink  = applyLink || jobData.applyLink || "N/A";
  const applyMethod     = finalApplyEmail !== "N/A" ? "Email" : "Link";
  const applyContact    = finalApplyEmail !== "N/A" ? finalApplyEmail : finalApplyLink;

  const rowData = [
    nextId,                                                     // A: No.
    today,                                                      // B: Applied Date
    jobData.company      || "N/A",                             // C: Company Name
    jobData.title        || "N/A",                             // D: Job Title
    jobData.jobType      || "Full-time",                       // E: Job Type
    platform             || "Direct",                          // F: Platform
    applyMethod,                                               // G: Apply Method
    applyContact,                                              // H: Apply Link / Email
    jobData.workMode     || "N/A",                             // I: Work Mode
    jobData.location     || "N/A",                             // J: Location
    jobData.salary       || "N/A",                             // K: Salary
    (jobData.experienceYears || "N/A") + " yrs",              // L: Experience
    jobData.deadline     || "N/A",                             // M: Deadline
    "Skills: " + (jobData.requiredSkills || []).join(", ")
      + " | Resp: " + (jobData.responsibilities || ""),        // N: Key Info
    finalScore,                                                // O: Match Score
    scoreNote,                                                 // P: Score Notes
    status,                                                    // Q: Application Status
    "No",                                                      // R: Response
    "",                                                        // S: Follow-up Date
    "",                                                        // T: Interview Date
    "",                                                        // U: Recruiter Name
    "",                                                        // V: Referred By
    "",                                                        // W: Contact
    "",                                                        // X: Notes
    "",                                                        // Y: Mail Sent
    (jobData.customSubjectInstruction &&
     jobData.customSubjectInstruction !== "N/A")
      ? jobData.customSubjectInstruction : "Default",         // Z: Subject Format
    "",                                                        // AA: Audit Issue
    "",                                                        // AB: Attached Files
  ];

  sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

  // Color-code the score cell
  const scoreCell = sheet.getRange(newRow, 15);
  if      (finalScore >= 85) scoreCell.setBackground("#c6efce"); // green
  else if (finalScore >= 70) scoreCell.setBackground("#ffeb9c"); // yellow
  else                       scoreCell.setBackground("#fce8e6"); // red (shouldn't appear, but safety)
}

// ============================================================
// FIND LAST DATA ROW
// ============================================================
function getLastDataRow(sheet) {
  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][0] !== "") return i + 1;
  }
  return sheet.getLastRow() || 2;
}

// ============================================================
// SHOW SETTINGS
// ============================================================
function showSettings() {
  const info = `
⚙️ ApplyFlow AI v2.1 — বর্তমান সেটিংস

✅ সর্বনিম্ন স্কোর: ${MIN_SCORE}%
✅ APPLY NOW থ্রেশহোল্ড: 85%
✅ APPLY (CHECK GAPS): 70–84%
✅ অভিজ্ঞতা সীমা: ${MAX_EXP_HARD_SKIP}+ বছর হলে স্কিপ
✅ আমার স্কিলস: ${MY_SKILLS.join(", ")}

🆕 Hybrid Scoring (v2.0):
  • Layer 1: Hard rules (experience + red flags)
  • Layer 2: Groq AI — 5-dimension scoring
  • Layer 3: Weighted code skill match
  • Layer 4: Final = Code 35% + AI 65%
  • Decision: APPLY NOW / APPLY (CHECK GAPS) / RED FLAG / SKIP

🔔 Follow-up System (v2.1):
  • Max follow-ups per job: ${FOLLOWUP_MAX_COUNT}
  • Frequency: প্রতি ${FOLLOWUP_FREQUENCY_DAYS} দিন পর
  • Method: Original email thread-এ reply
  • Fallback: Thread না পেলে standalone email
  • Auto-run: Daily trigger (9am) → runFollowUpCheck

স্কিল বা সেটিং পরিবর্তন: Extensions > Apps Script
  `;
  SpreadsheetApp.getUi().alert(info);
}

// ============================================================
// AUTO SETUP
// ============================================================
function autoSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let appSheet = ss.getSheetByName("Applications");
  if (!appSheet) { appSheet = ss.insertSheet("Applications", 0); }
  else           { appSheet.moveToLocation(0); }

  appSheet.getRange("Y1").setValue("Mail Sent");
  appSheet.getRange("Z1").setValue("Subject Format");
  appSheet.getRange("AA1").setValue("Audit Issue");
  appSheet.getRange("AB1").setValue("Attached Files");
  appSheet.getRange("AC1").setValue("Gmail Thread ID");   // NEW
  appSheet.getRange("AD1").setValue("Follow-up Count");   // NEW
  appSheet.getRange("AE1").setValue("Last Follow-up");    // NEW

  let tmplSheet = ss.getSheetByName("Email Template");
  if (!tmplSheet) { tmplSheet = ss.insertSheet("Email Template", 1); }
  else            { tmplSheet.moveToLocation(1); }

  const emailTemplate =
    "Dear Hiring Team,\n\n" +
    "I am excited to apply for the {{position}} position at {{company name}}.\n\n" +
    "Please find attached my resume for your review. I have strong experience with the {{role}} stack and am eager to contribute to your team.\n\n" +
    "Thank you for your time and consideration.\n\n" +
    "Best regards,\n--\n\n" +
    "  Md Faysal Ahmed\n" +
    "  {{role}}\n" +
    "  P: +8801779161032\n" +
    "  LinkedIn | GitHub";

  tmplSheet.getRange("A1").setValue(emailTemplate);
  tmplSheet.setColumnWidth(1, 600);

  let rulesSheet = ss.getSheetByName("My Rules");
  if (rulesSheet) rulesSheet.moveToLocation(2);

  SpreadsheetApp.getUi().alert(
    "✅ Setup সম্পন্ন!\n\nSheet order: Applications → Email Template → My Rules\n" +
    "New columns added: Y (Mail Sent), Z (Subject Format), AA (Audit Issue),\n" +
    "AB (Attached Files), AC (Gmail Thread ID), AD (Follow-up Count), AE (Last Follow-up)\n\n" +
    "⏰ Follow-up auto-trigger সেট করতে:\nExtensions > Apps Script > Triggers > Add Trigger\n" +
    "Function: runFollowUpCheck | Time-driven | Day timer | 9am–10am"
  );
}

// ============================================================
// BULK EMAIL DIALOG
// ============================================================
function showSendDialog() {
  const html = HtmlService.createHtmlOutput(`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 15px; background: #f9f9f9; overflow-y: auto; }
    h2   { color: #1a73e8; margin: 0 0 5px; }
    p    { color: #555; font-size: 13px; margin-bottom: 15px; }
    label { font-size: 12px; color: #333; font-weight: bold; display: block; margin-bottom: 3px; margin-top: 8px; }
    input[type="file"] { width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; box-sizing: border-box; }
    .btn-primary { background: #1a73e8; color: white; width: 100%; margin-top: 15px; padding: 10px 20px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: bold; }
    .btn-primary:hover:not(:disabled) { background: #1558b0; }
    .btn-primary:disabled { background: #ccc; cursor: not-allowed; }
    .summary-box { background: #e8f0fe; padding: 12px; border: 1px solid #c6dafc; border-radius: 6px; margin-bottom: 15px; font-size: 13px; color: #1a73e8; }
    .job-row  { background: white; border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; margin-bottom: 12px; }
    .job-title { font-weight: bold; color: #1a73e8; font-size: 13px; margin-bottom: 10px; }
    .file-row { display: flex; gap: 8px; margin-bottom: 10px; }
    .file-col { flex: 1; }
    .file-col label { margin-top: 0; }
    #status { margin-top: 12px; padding: 10px; border-radius: 6px; font-size: 13px; display: none; text-align: center; }
    .loading { background: #e8f0fe; color: #1a73e8; }
    .success { background: #e6f4ea; color: #137333; }
    .error   { background: #fce8e6; color: #c5221f; }
    #jobsContainer { max-height: 400px; overflow-y: auto; border: 1px solid #ddd; border-radius: 6px; padding: 10px; background: white; }
  </style>
</head>
<body>
  <h2>🚀 Bulk Apply (ApplyFlow AI)</h2>
  <div class="summary-box" id="summaryBox">⏳ ডেটা লোড এবং অডিট করা হচ্ছে...</div>
  <div id="jobsContainer">⏳ লোড করছে...</div>
  <button class="btn-primary" id="sendBtn" onclick="sendEmails()" disabled>📧 সবাইকে ইমেইল পাঠান</button>
  <div id="status"></div>

  <script>
    let validJobs = [];
    google.script.run.withSuccessHandler(onDataLoaded).withFailureHandler(onError).getSendDialogData();

    function onDataLoaded(data) {
      validJobs = data.jobs.slice(0, 10);
      const box = document.getElementById('summaryBox');
      if (validJobs.length === 0) {
        box.innerHTML = 'পেন্ডিং কোনো জব নেই। <b>' + data.invalidCount + '</b> টি জবে সমস্যা আছে।';
        document.getElementById('sendBtn').disabled = true;
      } else {
        box.innerHTML = '<b>' + validJobs.length + '</b> টি জব রেডি। প্রতিটির জন্য CV সিলেক্ট করুন।';
        document.getElementById('sendBtn').disabled = false;
      }
      const container = document.getElementById('jobsContainer');
      container.innerHTML = '';
      validJobs.forEach((job, idx) => {
        const d = document.createElement('div');
        d.className = 'job-row';
        d.innerHTML =
          '<div class="job-title">' + (idx+1) + '. ' + job.company + ' — ' + job.title + '</div>' +
          '<div class="file-row">' +
            '<div class="file-col"><label>CV / Resume</label><input type="file" class="jobCvFile" data-jobidx="' + idx + '" accept=".pdf,.doc,.docx"/></div>' +
            '<div class="file-col"><label>Additional</label><input type="file" class="jobAddFile" data-jobidx="' + idx + '" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"/></div>' +
          '</div>';
        container.appendChild(d);
      });
    }

    function onError(err) { showStatus('❌ Error: ' + err.message, 'error'); }

    function showStatus(msg, type) {
      const el = document.getElementById('status');
      el.textContent = msg; el.className = type; el.style.display = 'block';
    }

    async function sendEmails() {
      if (validJobs.length === 0) return;
      showStatus('⏳ ফাইল প্রসেস করছি...', 'loading');
      document.getElementById('sendBtn').disabled = true;
      try {
        let jobsWithAttachments = [];
        for (let i = 0; i < validJobs.length; i++) {
          const cvInput  = document.querySelector('.jobCvFile[data-jobidx="' + i + '"]');
          const addInput = document.querySelector('.jobAddFile[data-jobidx="' + i + '"]');
          let cvBase64 = null, cvMime = null, cvName = null;
          let addBase64 = null, addMime = null, addName = null;
          if (cvInput && cvInput.files[0]) {
            cvBase64 = await readFileAsBase64(cvInput.files[0]);
            cvMime = cvInput.files[0].type; cvName = cvInput.files[0].name;
          }
          if (addInput && addInput.files[0]) {
            addBase64 = await readFileAsBase64(addInput.files[0]);
            addMime = addInput.files[0].type; addName = addInput.files[0].name;
          }
          jobsWithAttachments.push({...validJobs[i], cvBase64, cvMime, cvName, addBase64, addMime, addName});
        }
        showStatus('⏳ ইমেইল পাঠানো হচ্ছে...', 'loading');
        google.script.run
          .withSuccessHandler(res => { showStatus('✅ ' + res, 'success'); setTimeout(() => google.script.host.close(), 3000); })
          .withFailureHandler(err => { showStatus('❌ ' + err.message, 'error'); document.getElementById('sendBtn').disabled = false; })
          .sendBulkApplicationEmails({ jobs: jobsWithAttachments });
      } catch (e) {
        showStatus('❌ Error: ' + e.message, 'error');
        document.getElementById('sendBtn').disabled = false;
      }
    }

    function readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload  = () => resolve(r.result.split(',')[1]);
        r.onerror = reject;
        r.readAsDataURL(file);
      });
    }
  </script>
</body>
</html>
  `)
    .setWidth(600).setHeight(800).setTitle("🚀 Bulk Apply");
  SpreadsheetApp.getUi().showModalDialog(html, "🚀 Bulk Apply");
}

// ============================================================
// GET SEND DIALOG DATA (server side)
// ============================================================
function getSendDialogData() {
  runAudit(false);

  const ss       = SpreadsheetApp.getActiveSpreadsheet();
  const appSheet = ss.getSheetByName("Applications");
  if (!appSheet) throw new Error("Applications sheet not found.");

  const appData    = appSheet.getDataRange().getValues();
  let   jobs       = [];
  let   invalidCount = 0;

  for (let i = 1; i < appData.length; i++) {
    const applyMethod   = String(appData[i][6]  || "").trim();
    const applyEmail    = String(appData[i][7]  || "").trim();
    const company       = String(appData[i][2]  || "").trim();
    const title         = String(appData[i][3]  || "").trim();
    const mailSent      = appData[i][24];
    const subjectFormat = appData[i][25] ? String(appData[i][25]).trim() : "Default";
    const auditIssue    = appData[i][26] ? String(appData[i][26]).trim() : "";

    if (applyMethod === "Email" && !mailSent) {
      if (auditIssue === "") {
        jobs.push({
          rowIndex:        i + 1,
          company:         company,
          title:           title,
          applyEmail:      applyEmail,
          computedSubject: enhanceSubjectWithAI(title, subjectFormat),
        });
      } else {
        invalidCount++;
      }
    }
  }
  return { jobs, invalidCount };
}

function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ============================================================
// SUBJECT LINE GENERATION
// ============================================================
function generateSubjectLine(jobTitle, customInstruction) {
  let subject = (customInstruction && customInstruction !== "N/A")
    ? customInstruction
    : "Application for " + jobTitle;

  subject = subject
    .replace(/\[role\]|\{\{role\}\}|\{{1,2}position\}{1,2}/gi, jobTitle)
    .trim();

  if (!subject.toLowerCase().includes("faysal")) {
    subject += " - Md Faysal Ahmed";
  }
  return subject;
}

function enhanceSubjectWithAI(jobTitle, customInstruction) {
  if (!customInstruction || customInstruction === "N/A") {
    return "Application for " + jobTitle + " - Md Faysal Ahmed";
  }
  if (!GROQ_API_KEY || GROQ_API_KEY === "YOUR_GROQ_API_KEY") {
    return generateSubjectLine(jobTitle, customInstruction);
  }
  try {
    const url     = "https://api.groq.com/openai/v1/chat/completions";
    const payload = {
      model: "mixtral-8x7b-32768",
      messages: [{
        role: "user",
        content: `Format this email subject line. Replace [Role] or {{role}} with "${jobTitle}". Ensure it ends with "- Md Faysal Ahmed" if not already present.\n\nInstruction: "${customInstruction}"\n\nReply with ONLY the formatted subject line.`,
      }],
      max_tokens: 100, temperature: 0.2,
    };
    const options = {
      method: "post",
      headers: { "Authorization": "Bearer " + GROQ_API_KEY, "Content-Type": "application/json" },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    };
    const result = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
    if (result.choices && result.choices[0]) {
      let s = result.choices[0].message.content.trim();
      if (!s.toLowerCase().includes("faysal")) s += " - Md Faysal Ahmed";
      return s;
    }
  } catch (e) { console.warn("Subject AI error: " + e.message); }
  return generateSubjectLine(jobTitle, customInstruction);
}

function extractMainRole(jobTitle) {
  if (!jobTitle) return "Developer";
  let fallback = String(jobTitle)
    .replace(/\b(junior|senior|lead|principal|staff|intern|associate|entry.?level)\b/gi, "")
    .replace(/\s+/g, " ").trim() || jobTitle;

  if (!GROQ_API_KEY || GROQ_API_KEY === "YOUR_GROQ_API_KEY") return fallback;

  try {
    const url     = "https://api.groq.com/openai/v1/chat/completions";
    const payload = {
      model: "mixtral-8x7b-32768",
      messages: [{
        role: "user",
        content: `Remove seniority words (junior, senior, lead, intern, etc.) from this job title and return only the core role. Reply with ONLY the role.\n\nJob title: "${jobTitle}"`,
      }],
      max_tokens: 50, temperature: 0.3,
    };
    const options = {
      method: "post",
      headers: { "Authorization": "Bearer " + GROQ_API_KEY, "Content-Type": "application/json" },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    };
    const result = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
    if (result.choices && result.choices[0]) {
      return result.choices[0].message.content.trim() || fallback;
    }
  } catch (e) { console.warn("extractMainRole AI error: " + e.message); }
  return fallback;
}

// ============================================================
// DEFAULT EMAIL TEMPLATE
// ============================================================
function getDefaultEmailTemplate() {
  return {
    plain: `Dear Hiring Team,\n\nI am excited to apply for the {{position}} position at {{company name}}.\n\nPlease find attached my resume for your review. I have strong experience with the {{role}} stack and am eager to contribute to your team.\n\nThank you for your time and consideration.\n\nBest regards,\n\nMd Faysal Ahmed\n{{role only the main role}}\nP: +8801779161032`,
    html:  `<p>Dear Hiring Team,</p><p>I am excited to apply for the <b>{{position}}</b> position at <b>{{company name}}</b>.</p><p>Please find attached my <b>resume</b> for your review. I have strong experience with the <b>{{role}}</b> stack and am eager to contribute to your team.</p><p>Thank you for your time and consideration.</p><p>Best regards,</p><p><b>Md Faysal Ahmed</b><br>{{role only the main role}}<br>P: +8801779161032</p>`,
  };
}

// ============================================================
// SEND BULK EMAILS
// ============================================================
function sendBulkApplicationEmails(payload) {
  if (!payload.jobs || payload.jobs.length === 0) return "কোনো জব সিলেক্ট করা হয়নি।";

  if (MailApp.getRemainingDailyQuota() < payload.jobs.length) {
    throw new Error("Gmail daily quota exceeded!");
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Template priority: Gmail Draft → Sheet → Default
  let htmlTemplate = null, plainTemplate = null;

  try {
    const drafts = GmailApp.getDrafts();
    for (const draft of drafts) {
      const msg = draft.getMessage();
      if (msg.getSubject().trim().toLowerCase() === "applyflow template") {
        htmlTemplate  = msg.getBody();
        plainTemplate = msg.getPlainBody() || "";
        break;
      }
    }
  } catch (e) { console.error("Draft fetch error: " + e.message); }

  if (!htmlTemplate) {
    const tmplSheet = ss.getSheetByName("Email Template");
    if (tmplSheet) {
      const raw = tmplSheet.getRange("A1").getValue();
      if (raw) { plainTemplate = String(raw); htmlTemplate = plainTemplate.replace(/\n/g, "<br>"); }
    }
  }

  if (!htmlTemplate) {
    const def = getDefaultEmailTemplate();
    plainTemplate = def.plain;
    htmlTemplate  = def.html;
  }

  const appSheet    = ss.getSheetByName("Applications");
  let   successCount = 0, errorCount = 0;

  for (const job of payload.jobs) {
    const attachments     = [];
    const attachedNames   = [];

    if (job.cvBase64) {
      try {
        attachments.push(Utilities.newBlob(Utilities.base64Decode(job.cvBase64), job.cvMime || "application/pdf", job.cvName || "CV.pdf"));
        attachedNames.push(job.cvName || "CV");
      } catch (e) { console.warn("CV error: " + e.message); }
    }
    if (job.addBase64) {
      try {
        attachments.push(Utilities.newBlob(Utilities.base64Decode(job.addBase64), job.addMime || "application/pdf", job.addName || "Additional.pdf"));
        attachedNames.push(job.addName || "Additional");
      } catch (e) { console.warn("Additional file error: " + e.message); }
    }

    const totalSize = attachments.reduce((acc, b) => acc + b.getBytes().length, 0);
    if (totalSize > 25 * 1024 * 1024) { errorCount++; continue; }

    const safeCompany = (job.company && job.company !== "N/A") ? job.company : "your company";
    const safeTitle   = (job.title   && job.title   !== "N/A") ? job.title   : "the open position";
    const mainRole    = extractMainRole(safeTitle);

    const replacePlaceholders = (tmpl) => String(tmpl)
      .replace(/\{{1,2}position\}{1,2}/gi,            safeTitle)
      .replace(/\{{1,2}role\}{1,2}/gi,                safeTitle)
      .replace(/\{{1,2}company name\}{1,2}/gi,         safeCompany)
      .replace(/\{{1,2}company\}{1,2}/gi,              safeCompany)
      .replace(/\{?\{?role\s+only.*?\}?\}?/gi,         mainRole)
      .replace(/\[role\s+only.*?\]/gi,                 mainRole);

    try {
      GmailApp.sendEmail(job.applyEmail, job.computedSubject, replacePlaceholders(plainTemplate), {
        htmlBody:    replacePlaceholders(htmlTemplate),
        attachments: attachments,
        name:        "Md Faysal Ahmed",
      });

      const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMM, yyyy HH:mm");
      appSheet.getRange(job.rowIndex, 25).setValue(timestamp);
      appSheet.getRange(job.rowIndex, 17).setValue("Applied");
      appSheet.getRange(job.rowIndex, 28).setValue(attachedNames.join(", "));

      // ── Save Gmail Thread ID for reply-in-thread follow-ups ──
      try {
        Utilities.sleep(2000); // Wait 2s for Gmail to index the sent email
        const threadId = findSentThreadId(job.applyEmail, job.computedSubject);
        if (threadId) {
          appSheet.getRange(job.rowIndex, COL.THREAD_ID + 1).setValue(threadId);
        } else {
          // Log warning but don't fail — follow-up will use standalone email fallback
          appSheet.getRange(job.rowIndex, COL.THREAD_ID + 1).setValue("NOT_FOUND");
          console.warn("Thread ID not found for row " + job.rowIndex + ". Follow-ups will send as standalone emails.");
        }
      } catch (threadErr) {
        appSheet.getRange(job.rowIndex, COL.THREAD_ID + 1).setValue("ERROR: " + threadErr.message);
        console.error("Thread ID save error row " + job.rowIndex + ": " + threadErr.message);
      }

      // Initialize follow-up counters
      appSheet.getRange(job.rowIndex, COL.FOLLOWUP_COUNT + 1).setValue(0);

      successCount++;
    } catch (e) {
      errorCount++;
      console.error("Email failed row " + job.rowIndex + ": " + e.message);
    }
  }

  return errorCount > 0
    ? `${successCount} টি সফল, ${errorCount} টিতে এরর হয়েছে।`
    : `${successCount} টি ইমেইল সফলভাবে পাঠানো হয়েছে! ✅`;
}

// ============================================================
// ROW AUDIT
// ============================================================
function runAudit(showAlert = true) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Applications");
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;

  const bgColors      = sheet.getDataRange().getBackgrounds();
  const issuesToUpdate = data.map(row => [row[26] ? String(row[26]) : ""]);
  let   hasChanges    = false;

  for (let i = 1; i < data.length; i++) {
    const applyMethod = String(data[i][6]  || "").trim();
    const applyEmail  = String(data[i][7]  || "").trim();
    const company     = String(data[i][2]  || "").trim();
    const title       = String(data[i][3]  || "").trim();
    const deadline    = data[i][12];
    const mailSent    = data[i][24];
    const finalScore  = data[i][14];

    if (mailSent) continue;

    if (applyMethod === "Email") {
      const issues = [];

      // Reset row colors, preserve score cell color
      while (bgColors[i].length < 28) bgColors[i].push("#ffffff");
      for (let j = 0; j < bgColors[i].length; j++) bgColors[i][j] = "#ffffff";
      if      (finalScore >= 85) bgColors[i][14] = "#c6efce";
      else if (finalScore >= 70) bgColors[i][14] = "#ffeb9c";

      if (!applyEmail || applyEmail === "N/A" || !isValidEmail(applyEmail)) {
        issues.push("Invalid/Missing Email"); bgColors[i][7] = "#fce8e6";
      }
      if (!company || company === "N/A") {
        issues.push("Missing Company"); bgColors[i][2] = "#fce8e6";
      }
      if (!title || title === "N/A") {
        issues.push("Missing Title"); bgColors[i][3] = "#fce8e6";
      }
      if (deadline && deadline !== "N/A" && deadline !== "") {
        const dlDate = new Date(deadline);
        if (!isNaN(dlDate.getTime()) && dlDate < new Date()) {
          issues.push("Deadline Passed"); bgColors[i][12] = "#fce8e6";
        }
      }

      const issueStr = issues.join(", ");
      if (issueStr !== issuesToUpdate[i][0]) { issuesToUpdate[i][0] = issueStr; hasChanges = true; }
    }
  }

  if (hasChanges) {
    sheet.getRange(1, 1, bgColors.length, bgColors[0].length).setBackgrounds(bgColors);
    sheet.getRange(1, 27, issuesToUpdate.length, 1).setValues(issuesToUpdate);
  }

  if (showAlert) {
    SpreadsheetApp.getUi().alert(hasChanges
      ? "✅ অডিট সম্পন্ন! সমস্যাযুক্ত ফিল্ড লাল রঙে চিহ্নিত।"
      : "✅ অডিট সম্পন্ন! কোনো সমস্যা নেই।");
  }
}

// ============================================================
// FIND SENT THREAD ID
// Searches Gmail "Sent" for the email just sent and returns Thread ID
// ============================================================
function findSentThreadId(toEmail, subject) {
  try {
    // Search sent mail for this recipient + subject in last 10 mins
    const query = `to:${toEmail} subject:"${subject.substring(0, 40)}" in:sent newer_than:1h`;
    const threads = GmailApp.search(query, 0, 5);

    if (!threads || threads.length === 0) {
      // Broader fallback — just subject in last hour
      const fallbackQuery = `subject:"${subject.substring(0, 30)}" in:sent newer_than:1h`;
      const fallbackThreads = GmailApp.search(fallbackQuery, 0, 5);
      if (fallbackThreads && fallbackThreads.length > 0) {
        return fallbackThreads[0].getId();
      }
      return null;
    }
    return threads[0].getId();
  } catch (e) {
    console.error("findSentThreadId error: " + e.message);
    return null;
  }
}

// ============================================================
// MAIN FOLLOW-UP RUNNER — called by daily trigger or manually
// ============================================================
function runFollowUpCheck() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Applications");

  if (!sheet) {
    SpreadsheetApp.getUi().alert('❌ "Applications" sheet পাওয়া যায়নি।');
    return;
  }

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    SpreadsheetApp.getUi().alert("কোনো ডেটা নেই।");
    return;
  }

  const now          = new Date();
  let   sent         = 0;
  let   skipped      = 0;
  let   errors       = 0;
  const errorDetails = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // Skip empty rows
    if (!row[COL.COMPANY] || row[COL.COMPANY] === "") continue;

    const applyMethod   = String(row[COL.APPLY_METHOD]   || "").trim();
    const applyEmail    = String(row[COL.APPLY_CONTACT]  || "").trim();
    const mailSent      = row[COL.MAIL_SENT];
    const response      = String(row[COL.RESPONSE]       || "").trim().toLowerCase();
    const status        = String(row[COL.STATUS]         || "").trim().toLowerCase();
    const followupCount = Number(row[COL.FOLLOWUP_COUNT] || 0);
    const lastFollowup  = row[COL.LAST_FOLLOWUP];
    const threadId      = String(row[COL.THREAD_ID]      || "").trim();

    // ── Skip conditions ───────────────────────────────────────
    // Must be an Email-type application that was already sent
    if (applyMethod !== "Email") { skipped++; continue; }
    if (!mailSent)               { skipped++; continue; }

    // Already got a response / rejected / offer / interview
    if (response === "yes" || response === "received") { skipped++; continue; }
    if (["rejected", "offer received", "interview scheduled", "withdrawn"]
        .some(s => status.includes(s)))                { skipped++; continue; }

    // Maxed out follow-ups
    if (followupCount >= FOLLOWUP_MAX_COUNT) { skipped++; continue; }

    // Email must be valid
    if (!isValidEmail(applyEmail)) {
      errorDetails.push(`Row ${i + 1} (${row[COL.COMPANY]}): Invalid email "${applyEmail}"`);
      errors++;
      continue;
    }

    // ── Timing check ─────────────────────────────────────────
    // For first follow-up: count from Mail Sent date
    // For second follow-up: count from Last Follow-up date
    const referenceDate = (followupCount === 0)
      ? parseDateValue(mailSent)
      : parseDateValue(lastFollowup);

    if (!referenceDate) {
      errorDetails.push(`Row ${i + 1} (${row[COL.COMPANY]}): Cannot parse reference date.`);
      errors++;
      continue;
    }

    const daysSince = Math.floor((now - referenceDate) / (1000 * 60 * 60 * 24));
    if (daysSince < FOLLOWUP_FREQUENCY_DAYS) { skipped++; continue; }

    // ── Build and send follow-up ──────────────────────────────
    const followupNum  = followupCount + 1;
    const company      = String(row[COL.COMPANY]       || "").trim();
    const jobTitle     = String(row[COL.TITLE]         || "").trim();
    const appliedDate  = formatDisplayDate(parseDateValue(mailSent));
    const recruiter    = String(row[COL.RECRUITER]     || "").trim();
    const subject      = String(row[COL.SUBJECT_FORMAT] || "").trim();

    // Build the AI-polished follow-up message
    let followupBody, followupHtml;
    try {
      const generated  = buildFollowUpMessage(recruiter, jobTitle, company, appliedDate, followupNum);
      followupBody = generated.plain;
      followupHtml = generated.html;
    } catch (msgErr) {
      // Fallback to template without AI polish
      followupBody = buildFollowUpFallback(recruiter, jobTitle, company, appliedDate);
      followupHtml = followupBody.replace(/\n/g, "<br>");
      console.warn("AI follow-up generation failed, using fallback: " + msgErr.message);
    }

    // ── Send: reply-in-thread if Thread ID found, else standalone ──
    const sendResult = sendFollowUpEmail(
      applyEmail, subject, followupBody, followupHtml,
      threadId, company, jobTitle, followupNum, i + 1
    );

    if (sendResult.success) {
      const timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), "dd MMM, yyyy HH:mm");
      sheet.getRange(i + 1, COL.FOLLOWUP_COUNT + 1).setValue(followupNum);
      sheet.getRange(i + 1, COL.LAST_FOLLOWUP  + 1).setValue(timestamp);
      sheet.getRange(i + 1, COL.STATUS         + 1).setValue(
        followupNum === 1 ? "Followed Up (1/2)" : "Followed Up (2/2)"
      );
      // Append note to Notes column
      const existingNote = String(row[COL.NOTES] || "").trim();
      const newNote = existingNote
        ? existingNote + "\n" + `[Follow-up #${followupNum} sent ${timestamp}${sendResult.method}]`
        : `[Follow-up #${followupNum} sent ${timestamp}${sendResult.method}]`;
      sheet.getRange(i + 1, COL.NOTES + 1).setValue(newNote);
      sent++;
    } else {
      errorDetails.push(`Row ${i + 1} (${company}): ${sendResult.error}`);
      errors++;
    }
  }

  // ── Summary alert ─────────────────────────────────────────
  const ui = SpreadsheetApp.getUi();
  let summary = `🔔 Follow-up চেক সম্পন্ন!\n\n✅ পাঠানো হয়েছে: ${sent} টি\n⏭️ স্কিপ করা হয়েছে: ${skipped} টি`;
  if (errors > 0) {
    summary += `\n❌ এরর: ${errors} টি\n\nএরর details:\n${errorDetails.join("\n")}`;
  }
  ui.alert(summary);
}

// ============================================================
// SEND FOLLOW-UP EMAIL
// Tries reply-in-thread first, falls back to standalone
// ============================================================
function sendFollowUpEmail(toEmail, originalSubject, plainBody, htmlBody,
                           threadId, company, jobTitle, followupNum, rowNum) {
  // ── Attempt 1: Reply in original thread ──────────────────
  if (threadId && threadId !== "NOT_FOUND" && !threadId.startsWith("ERROR")) {
    try {
      const thread = GmailApp.getThreadById(threadId);

      if (!thread) {
        throw new Error(`Thread ID "${threadId}" not found in Gmail.`);
      }

      // Verify thread belongs to this conversation (sanity check)
      const messages = thread.getMessages();
      if (!messages || messages.length === 0) {
        throw new Error(`Thread "${threadId}" has no messages.`);
      }

      thread.replyAll(plainBody, {
        htmlBody: htmlBody,
        name:     "Md Faysal Ahmed",
      });

      console.log(`Follow-up #${followupNum} sent as thread reply for row ${rowNum} (${company})`);
      return { success: true, method: " via thread reply" };

    } catch (threadErr) {
      // Thread reply failed — log and fall through to standalone
      console.error(`Thread reply failed for row ${rowNum}: ${threadErr.message}. Falling back to standalone.`);

      // ── Attempt 2: Standalone fallback email ────────────────
      return sendStandaloneFollowUp(toEmail, originalSubject, plainBody, htmlBody,
                                    company, jobTitle, followupNum, rowNum,
                                    "Thread error: " + threadErr.message);
    }
  }

  // ── No valid Thread ID — send standalone ─────────────────
  return sendStandaloneFollowUp(toEmail, originalSubject, plainBody, htmlBody,
                                company, jobTitle, followupNum, rowNum,
                                "No thread ID available");
}

// ============================================================
// STANDALONE FOLLOW-UP (fallback when thread reply fails)
// ============================================================
function sendStandaloneFollowUp(toEmail, originalSubject, plainBody, htmlBody,
                                company, jobTitle, followupNum, rowNum, reason) {
  try {
    // Subject: Re: original subject (mimics a reply visually)
    const reSubject = originalSubject.startsWith("Re:")
      ? originalSubject
      : "Re: " + originalSubject;

    GmailApp.sendEmail(toEmail, reSubject, plainBody, {
      htmlBody: htmlBody,
      name:     "Md Faysal Ahmed",
    });

    console.log(`Follow-up #${followupNum} sent as standalone for row ${rowNum} (${company}). Reason: ${reason}`);
    return { success: true, method: " via standalone (Re:)" };

  } catch (sendErr) {
    console.error(`Standalone follow-up also failed for row ${rowNum}: ${sendErr.message}`);
    return {
      success: false,
      error:   `Both thread reply and standalone failed. Last error: ${sendErr.message}`,
    };
  }
}

// ============================================================
// BUILD FOLLOW-UP MESSAGE — AI polishes the template
// ============================================================
function buildFollowUpMessage(recruiterName, jobTitle, company, appliedDate, followupNum) {
  const greeting = recruiterName ? `Hi ${recruiterName},` : "Hi,";

  // If no API key, use the clean fallback directly
  if (!GROQ_API_KEY || GROQ_API_KEY === "YOUR_GROQ_API_KEY") {
    const plain = buildFollowUpFallback(recruiterName, jobTitle, company, appliedDate);
    return { plain, html: plain.replace(/\n/g, "<br>") };
  }

  // AI polishes the message — keeps it short and natural
  try {
    const prompt = `Write a very short, polite job application follow-up email body.

Details:
- Greeting: "${greeting}"
- Role applied for: "${jobTitle}" at "${company}"
- Applied on: ${appliedDate}
- This is follow-up #${followupNum} of 2

Use exactly this structure (do NOT add anything else):
${greeting}

Just following up on my application for the ${jobTitle} position I sent on ${appliedDate}. Wanted to check if there's any update on your end — no rush at all.

Still very interested in the role and happy to share anything else that might be helpful.

Thanks,
Md Faysal Ahmed

Rules:
- Keep it under 60 words (body only, not counting greeting/signature)
- Natural, not robotic
- Do NOT change the name "Md Faysal Ahmed"
- Do NOT add subject line
- Reply with ONLY the email body, nothing else`;

    const url     = "https://api.groq.com/openai/v1/chat/completions";
    const payload = {
      model:      "llama-3.3-70b-versatile",
      messages:   [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.4,
    };
    const options = {
      method:          "post",
      headers:         { "Authorization": "Bearer " + GROQ_API_KEY, "Content-Type": "application/json" },
      payload:         JSON.stringify(payload),
      muteHttpExceptions: true,
    };

    const result = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
    if (result.choices && result.choices[0] && result.choices[0].message) {
      const plain = result.choices[0].message.content.trim();
      // Safety: must contain candidate name
      if (plain.includes("Faysal") && plain.length > 50) {
        return { plain, html: plain.replace(/\n/g, "<br>") };
      }
    }
  } catch (e) {
    console.warn("AI follow-up polish failed: " + e.message);
  }

  // Fallback
  const plain = buildFollowUpFallback(recruiterName, jobTitle, company, appliedDate);
  return { plain, html: plain.replace(/\n/g, "<br>") };
}

// ============================================================
// FOLLOW-UP FALLBACK TEMPLATE (no AI needed)
// ============================================================
function buildFollowUpFallback(recruiterName, jobTitle, company, appliedDate) {
  const greeting = (recruiterName && recruiterName !== "N/A" && recruiterName.trim() !== "")
    ? `Hi ${recruiterName},`
    : "Hi,";

  return `${greeting}

Just following up on my application for the ${jobTitle} position I sent on ${appliedDate}. Wanted to check if there's any update on your end — no rush at all.

Still very interested in the role and happy to share anything else that might be helpful.

Thanks,
Md Faysal Ahmed`;
}

// ============================================================
// FOLLOW-UP STATUS DASHBOARD
// ============================================================
function showFollowUpStatus() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Applications");
  if (!sheet) { SpreadsheetApp.getUi().alert('❌ Applications sheet পাওয়া যায়নি।'); return; }

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) { SpreadsheetApp.getUi().alert("কোনো ডেটা নেই।"); return; }

  const now      = new Date();
  let   dueToday = [];
  let   upcoming = [];
  let   maxedOut = [];
  let   pending  = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[COL.COMPANY] || row[COL.COMPANY] === "")  continue;
    if (row[COL.APPLY_METHOD] !== "Email")             continue;
    if (!row[COL.MAIL_SENT])                           continue;

    const response      = String(row[COL.RESPONSE]       || "").trim().toLowerCase();
    const status        = String(row[COL.STATUS]         || "").trim().toLowerCase();
    const followupCount = Number(row[COL.FOLLOWUP_COUNT] || 0);
    const company       = String(row[COL.COMPANY]        || "");
    const title         = String(row[COL.TITLE]          || "");

    if (response === "yes" || ["rejected","offer received","interview scheduled","withdrawn"].some(s => status.includes(s))) continue;

    if (followupCount >= FOLLOWUP_MAX_COUNT) {
      maxedOut.push(`${company} — ${title}`);
      continue;
    }

    const refDate   = followupCount === 0
      ? parseDateValue(row[COL.MAIL_SENT])
      : parseDateValue(row[COL.LAST_FOLLOWUP]);
    if (!refDate) continue;

    const daysSince = Math.floor((now - refDate) / (1000 * 60 * 60 * 24));
    const daysLeft  = FOLLOWUP_FREQUENCY_DAYS - daysSince;
    const label     = `#${followupCount + 1} — ${company} (${title})`;

    if (daysLeft <= 0)      dueToday.push(label);
    else if (daysLeft <= 3) upcoming.push(`${label} — ${daysLeft} দিন বাকি`);
    else                    pending.push(`${label} — ${daysLeft} দিন বাকি`);
  }

  let msg = "📊 Follow-up স্ট্যাটাস\n";
  msg += "═".repeat(35) + "\n\n";

  if (dueToday.length > 0) {
    msg += `🔴 আজই পাঠানো দরকার (${dueToday.length} টি):\n`;
    dueToday.forEach(j => msg += `  • ${j}\n`);
    msg += "\n";
  }
  if (upcoming.length > 0) {
    msg += `🟡 শীঘ্রই (${upcoming.length} টি):\n`;
    upcoming.forEach(j => msg += `  • ${j}\n`);
    msg += "\n";
  }
  if (pending.length > 0) {
    msg += `🟢 অপেক্ষায় (${pending.length} টি):\n`;
    pending.forEach(j => msg += `  • ${j}\n`);
    msg += "\n";
  }
  if (maxedOut.length > 0) {
    msg += `⬛ সর্বোচ্চ follow-up হয়ে গেছে (${maxedOut.length} টি):\n`;
    maxedOut.forEach(j => msg += `  • ${j}\n`);
  }

  if (dueToday.length === 0 && upcoming.length === 0 && pending.length === 0 && maxedOut.length === 0) {
    msg += "কোনো pending follow-up নেই।";
  }

  SpreadsheetApp.getUi().alert(msg);
}

// ============================================================
// DATE HELPERS
// ============================================================
function parseDateValue(val) {
  if (!val || val === "" || val === "N/A") return null;
  if (val instanceof Date && !isNaN(val.getTime())) return val;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

function formatDisplayDate(dateObj) {
  if (!dateObj) return "N/A";
  return Utilities.formatDate(dateObj, Session.getScriptTimeZone(), "dd MMM yyyy");
}

// ============================================================
// UTILITY
// ============================================================
function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}