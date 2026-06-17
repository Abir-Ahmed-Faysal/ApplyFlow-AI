# 📧 Multiple Email Templates Guide

## Current System Overview

Your ApplyFlow AI currently uses a **3-tier template priority system**:

```
1. Gmail Draft (subject: "ApplyFlow Template")
   ↓ (if not found)
2. Google Sheet Tab ("Email Template")
   ↓ (if not found)
3. Built-in Default Template (fallback)
```

---

## 🆕 How to Add Multiple Templates to Your Excel Sheet

### **Option 1: Templates in "My Rules" Tab**

Add templates as separate rows in your Excel "My Rules" sheet:

| Template Name | Email Body | Type |
|---|---|---|
| Template 1 - Formal | Dear Hiring Team,\n\nI am excited to apply for {{position}}... | Formal |
| Template 2 - Casual | Hi Team,\n\nI'm interested in {{position}}... | Casual |
| Template 3 - Technical | I'm applying for {{position}}...\n\nTechnical Skills: ... | Technical |
| Template 4 - Follow-up | Following up on my {{position}} application... | Follow-up |

**To use:** The script can read these and let you select which template per job.

---

### **Option 2: Multiple Sheets in Google Sheets**

Create separate template sheets:

```
Google Sheets Tabs:
├── Applications (main data)
├── Email Template (default)
├── Email Template - Formal
├── Email Template - Casual
├── Email Template - Technical
└── My Rules
```

---

### **Option 3: Template Configuration in Excel**

Structure your "My Rules" sheet like:

```
A1: TEMPLATES
A2: Template_Formal_Dev
A3: Template_Casual_Dev
A4: Template_Technical_Lead
A5: Template_FollowUp

B1: (blank)
B2: Dear Hiring Team,\nI am excited to apply...
B3: Hi Team,\nI'm interested in the {{position}}...
B4: As a {{role}}, I'm seeking...
B5: Following up on my application...

C1: (blank)
C2: Formal
C3: Casual
C4: Technical
C5: FollowUp
```

---

## 🔧 Implementation Options

### **Easy: Use Google Sheets (No Code Change)**

1. Create a new tab: `Email Template - Formal`
2. Add formal template in A1
3. Create another tab: `Email Template - Casual`
4. Add casual template in A1
5. Select which one to use manually

**Pros:** No coding needed  
**Cons:** Manual selection per job

---

### **Advanced: Template Selection Dialog**

I can add a feature where:

1. Script reads all templates from your Excel/Sheets
2. Dialog shows template options
3. You select which template per job
4. Email uses selected template

**Code to add:**
```javascript
function getTemplateOptions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const templates = [];
  
  // Look for tabs named "Email Template - *"
  ss.getSheets().forEach(sheet => {
    const name = sheet.getName();
    if (name.startsWith("Email Template - ")) {
      const content = sheet.getRange("A1").getValue();
      templates.push({
        name: name.replace("Email Template - ", ""),
        content: content
      });
    }
  });
  
  return templates;
}
```

---

### **Pro: Template Management System**

Create a complete template manager:

1. **Storage:** Separate sheet `Email Templates`
   - Column A: Template Name
   - Column B: Template Body
   - Column C: Type (Formal/Casual/Technical)

2. **Dialog:** Show dropdown to select template
3. **Usage:** Apply selected template per job
4. **Tracking:** Log which template was used

---

## 📋 Examples of Different Templates

### **Template 1: Formal Professional**
```
Dear Hiring Team,

I am writing to express my strong interest in the {{position}} position at {{company}}.

With {{role}} expertise in {{skill1}}, {{skill2}}, and {{skill3}}, I am confident that my skills align perfectly with your requirements.

Please find attached my resume for your review.

Thank you for considering my application.

Best regards,
Md Faysal Ahmed
Full Stack Developer
+8801779161032
```

---

### **Template 2: Casual Friendly**
```
Hi {{company}} Team,

I'm really excited about the {{position}} opportunity with you!

As a {{role}}, I've worked with {{skill1}}, {{skill2}}, and I'm always keen to learn {{skill3}}.

I'd love to chat about how I can contribute to your team.

Thanks for your time!

Cheers,
Faysal Ahmed
```

---

### **Template 3: Technical Focused**
```
Dear {{company}},

I'm applying for the {{position}} role. 

**Technical Stack:** {{skill1}}, {{skill2}}, {{skill3}}
**Experience:** 3+ years in {{role}}
**Key Projects:** Built {{project1}}, developed {{project2}}

Looking forward to discussing technical challenges and solutions.

Best,
Md Faysal Ahmed
Portfolio: [link]
GitHub: [link]
```

---

### **Template 4: Follow-up**
```
Hi {{company}} Team,

I hope this email finds you well. I recently applied for the {{position}} position and wanted to follow up.

I remain very interested in joining your team and would love to hear about next steps.

Thanks!

Faysal Ahmed
```

---

## 🎯 How to Implement

### **Step 1: Choose Your Approach**

- [ ] **Easy:** Multiple Google Sheets tabs (manual selection)
- [ ] **Medium:** Template tabs + auto-detection in dialog
- [ ] **Advanced:** Template manager sheet with dropdown selection

### **Step 2: Set Up Templates**

1. In Google Sheets, create sheets:
   ```
   Email Template - Formal
   Email Template - Casual
   Email Template - Technical
   ```

2. In each sheet, add template in cell A1

3. Use placeholders: `{{position}}`, `{{company}}`, `{{role}}`, `{{skill1}}`

### **Step 3: Update Script** (if choosing Medium/Advanced)

I'll add code to:
- Detect available templates
- Show selection dialog
- Apply selected template per job

---

## 🚀 Next Steps

Tell me which approach you want:

1. **Just tell me you have templates in Excel** → I'll read them
2. **You want the selection dialog** → I'll add template picker to the Mail Merge dialog
3. **Full template management** → I'll create complete template system

**What would you prefer?** 📝

---

## 📌 Quick Reference

### **Current Placeholders Supported:**
- `{{position}}` → Job title
- `{{company}}` or `{{company name}}` → Company name
- `{{role}}` → Main role (no seniority)
- `{{salary}}` → Job salary
- `{{deadline}}` → Application deadline
- `- Md Faysal Ahmed` → Auto-added to subject

### **Adding More Placeholders:**

Edit `replacePlaceholders()` function in script (around line 1100):

```javascript
function replacePlaceholders(text, job) {
  return text
    .replace(/{{position}}/gi, job.jobTitle || "")
    .replace(/{{company}}/gi, job.company || "")
    .replace(/{{company name}}/gi, job.company || "")
    .replace(/{{role}}/gi, job.mainRole || "")
    .replace(/{{skill1}}/gi, "JavaScript")  // Your first skill
    .replace(/{{skill2}}/gi, "React.js")    // Your second skill
    .replace(/{{skill3}}/gi, "Node.js");    // Your third skill
}
```

---

**Ready to set up templates? Let me know which approach!** 🎯
