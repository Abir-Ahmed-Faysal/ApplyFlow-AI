const fs = require('fs');

const replacement = `function showSendDialog() {
  const html = HtmlService.createHtmlOutput(\`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 15px; background: #f9f9f9; }
    h2 { color: #1a73e8; margin-bottom: 5px; margin-top: 0; }
    label { font-size: 13px; color: #333; font-weight: bold; display: block; margin-bottom: 4px; margin-top: 10px;}
    select, input[type="file"] { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 13px; box-sizing: border-box; }
    .btn-primary { background: #1a73e8; color: white; width: 100%; margin-top: 15px; padding: 10px 20px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: bold; }
    .btn-primary:hover:not(:disabled) { background: #1558b0; }
    .btn-primary:disabled { background: #ccc; cursor: not-allowed; }
    .summary-box { background: #e8f0fe; padding: 12px; border: 1px solid #c6dafc; border-radius: 6px; margin-top: 15px; font-size: 13px; color: #333; display: none; }
    #status { margin-top: 12px; padding: 10px; border-radius: 6px; font-size: 13px; display: none; text-align: center; }
    .loading { background: #e8f0fe; color: #1a73e8; }
    .success { background: #e6f4ea; color: #137333; }
    .error   { background: #fce8e6; color: #c5221f; }
  </style>
</head>
<body>
  <h2>📧 Send Application</h2>
  
  <label>Select Job *</label>
  <select id="jobSelect" onchange="updatePreview()">
    <option value="">-- Loading... --</option>
  </select>

  <label>Resume / CV *</label>
  <select id="resumeSelect" onchange="toggleUpload('resumeSelect', 'resumeUpload')">
    <option value="">-- Loading... --</option>
  </select>
  <input type="file" id="resumeUpload" style="display:none;" accept=".pdf,.doc,.docx" onchange="updatePreview()" />

  <label>Additional File (Optional)</label>
  <select id="additionalSelect" onchange="toggleUpload('additionalSelect', 'additionalUpload')">
    <option value="">-- Select or Upload --</option>
  </select>
  <input type="file" id="additionalUpload" style="display:none;" onchange="updatePreview()" />

  <div id="previewPanel" class="summary-box">
    <strong>Final Preview:</strong><br><br>
    <b>Company:</b> <span id="prevCompany"></span><br>
    <b>Role:</b> <span id="prevRole"></span><br>
    <b>Subject:</b> <span id="prevSubject"></span><br>
    <b>Attachments:</b> <span id="prevAttachments"></span>
  </div>

  <button class="btn-primary" id="sendBtn" onclick="sendEmail()" disabled>📧 Send Email</button>

  <div id="status"></div>

  <script>
    let jobList = [];

    google.script.run.withSuccessHandler(onDataLoaded).withFailureHandler(onError).getSendDialogData();

    function onDataLoaded(data) {
      jobList = data.jobs;
      const jobSelect = document.getElementById('jobSelect');
      jobSelect.innerHTML = '<option value="">-- Select Job --</option>';
      jobList.forEach((job, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = job.company + " - " + job.title;
        jobSelect.appendChild(opt);
      });

      const resumeSelect = document.getElementById('resumeSelect');
      const additionalSelect = document.getElementById('additionalSelect');
      const optionsHTML = '<option value="">-- Select --</option><option value="upload">📤 Upload your own file...</option>' + 
        data.resumes.map(r => \\\`<option value="\\\${r.url}">\\\${r.name}</option>\\\`).join('');
      
      resumeSelect.innerHTML = optionsHTML;
      additionalSelect.innerHTML = optionsHTML;
    }

    function toggleUpload(selectId, uploadId) {
      const val = document.getElementById(selectId).value;
      document.getElementById(uploadId).style.display = val === 'upload' ? 'block' : 'none';
      updatePreview();
    }

    function updatePreview() {
      const jobIdx = document.getElementById('jobSelect').value;
      const sendBtn = document.getElementById('sendBtn');
      const previewPanel = document.getElementById('previewPanel');

      if (jobIdx === "") {
        previewPanel.style.display = 'none';
        sendBtn.disabled = true;
        return;
      }

      const job = jobList[jobIdx];
      document.getElementById('prevCompany').textContent = job.company;
      document.getElementById('prevRole').textContent = job.title;
      document.getElementById('prevSubject').textContent = job.computedSubject;

      // Attachments
      let attachments = [];
      
      const resVal = document.getElementById('resumeSelect').value;
      const resSelectElem = document.getElementById('resumeSelect');
      if (resVal && resVal !== 'upload') attachments.push(resSelectElem.options[resSelectElem.selectedIndex].text);
      else if (resVal === 'upload' && document.getElementById('resumeUpload').files[0]) attachments.push(document.getElementById('resumeUpload').files[0].name);

      const addVal = document.getElementById('additionalSelect').value;
      const addSelectElem = document.getElementById('additionalSelect');
      if (addVal && addVal !== 'upload') attachments.push(addSelectElem.options[addSelectElem.selectedIndex].text);
      else if (addVal === 'upload' && document.getElementById('additionalUpload').files[0]) attachments.push(document.getElementById('additionalUpload').files[0].name);

      document.getElementById('prevAttachments').textContent = attachments.length > 0 ? attachments.join(', ') : 'None';

      previewPanel.style.display = 'block';
      sendBtn.disabled = false;
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

    async function sendEmail() {
      const jobIdx = document.getElementById('jobSelect').value;
      if (jobIdx === "") return;

      const resVal = document.getElementById('resumeSelect').value;
      const resFile = document.getElementById('resumeUpload').files[0];
      const addVal = document.getElementById('additionalSelect').value;
      const addFile = document.getElementById('additionalUpload').files[0];

      if (!resVal && !resFile) {
        if (!confirm("You haven't selected a Resume/CV! Do you still want to send?")) return;
      }

      showStatus('⏳ Sending Email...', 'loading');
      document.getElementById('sendBtn').disabled = true;

      try {
        let payload = {
          job: jobList[jobIdx],
          resumeUrl: (resVal !== 'upload' && resVal !== '') ? resVal : null,
          resumeBase64: null,
          resumeMime: null,
          resumeName: null,
          addUrl: (addVal !== 'upload' && addVal !== '') ? addVal : null,
          addBase64: null,
          addMime: null,
          addName: null
        };

        if (resVal === 'upload' && resFile) {
          payload.resumeBase64 = await readFileAsBase64(resFile);
          payload.resumeMime = resFile.type;
          payload.resumeName = resFile.name;
        }

        if (addVal === 'upload' && addFile) {
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
          .sendSingleApplicationEmail(payload);

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
  \`)
  .setWidth(500).setHeight(600).setTitle("📧 Send Application");
  SpreadsheetApp.getUi().showModalDialog(html, "📧 Send Application");
}

// ============================================================
// Get Dialog Data (Server-Side)
// ============================================================
function getSendDialogData() {
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
  
  for (let i = 1; i < appData.length; i++) {
    const applyMethod = String(appData[i][6] || "").trim(); // G
    const applyEmail = String(appData[i][7] || "").trim();  // H
    const company = String(appData[i][2] || "").trim();     // C
    const title = String(appData[i][3] || "").trim();       // D
    const mailSent = appData[i][24];   // Y
    const subjectFormat = appData[i][25] ? String(appData[i][25]).trim() : "Default"; // Z
    
    if (applyMethod === "Email" && !mailSent) {
      let computedSubject = "";
      if (subjectFormat === "Default" || subjectFormat === "N/A" || !subjectFormat) {
        computedSubject = title + " Application - Md Faysal Ahmed";
      } else {
        computedSubject = subjectFormat.replace(/\\{{1,2}role\\}{1,2}|\\[role\\]/gi, title);
        computedSubject = computedSubject.replace(/\\[your name\\]|\\{{1,2}name\\}{1,2}|\\[name\\]/gi, "Md Faysal Ahmed");
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
  if (!email || typeof email !== 'string') return false;
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.trim());
}

// ============================================================
// Send Single Email Server Function
// ============================================================
function sendSingleApplicationEmail(payload) {
  const job = payload.job;
  if (!job) throw new Error("Job not found");

  if (!isValidEmail(job.applyEmail)) {
    throw new Error("Apply contact isn't a valid email format.");
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const appSheet = ss.getSheetByName("Applications");

  const mailSent = appSheet.getRange(job.rowIndex, 25).getValue();
  if (mailSent) {
    throw new Error("Row already marked sent! (Mail Sent is not empty).");
  }

  if (MailApp.getRemainingDailyQuota() < 1) {
    throw new Error("Gmail daily quota exceeded! Stop immediately.");
  }

  const tmplSheet = ss.getSheetByName("Email Template");
  if (!tmplSheet) throw new Error("Email Template tab is missing.");
  let rawText = tmplSheet.getRange("A1").getValue();
  if (!rawText) throw new Error("Empty template cell in Email Template tab.");
  
  let plainTemplate = String(rawText);
  let htmlTemplate = plainTemplate.replace(/\\n/g, "<br>"); 

  let mergedHtmlBody = htmlTemplate
    .replace(/\\{{1,2}role\\}{1,2}/gi, job.title)
    .replace(/\\{{1,2}company name\\}{1,2}/gi, job.company)
    .replace(/\\{{1,2}company\\}{1,2}/gi, job.company);

  let mergedPlainBody = plainTemplate
    .replace(/\\{{1,2}role\\}{1,2}/gi, job.title)
    .replace(/\\{{1,2}company name\\}{1,2}/gi, job.company)
    .replace(/\\{{1,2}company\\}{1,2}/gi, job.company);

  const placeholderMatch = mergedHtmlBody.match(/\\{{1,2}[^}]+\\}{1,2}/);
  if (placeholderMatch) {
    throw new Error(\`Unfilled merge placeholder found: \${placeholderMatch[0]}\`);
  }
  const subjectPlaceholderMatch = job.computedSubject.match(/\\{{1,2}[^}]+\\}{1,2}/);
  if (subjectPlaceholderMatch) {
    throw new Error(\`Unfilled merge placeholder in subject: \${subjectPlaceholderMatch[0]}\`);
  }

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
      throw new Error("Saved attachment file missing/inaccessible: Resume (" + e.message + ")");
    }
  } else if (payload.resumeBase64) {
    attachments.push(Utilities.newBlob(Utilities.base64Decode(payload.resumeBase64), payload.resumeMime, payload.resumeName));
    attachedFileNames.push(payload.resumeName);
  }

  if (payload.addUrl) {
    try {
      const idMatch = payload.addUrl.match(/[-\\w]{25,}/);
      if (idMatch) {
        const file = DriveApp.getFileById(idMatch[0]);
        attachments.push(file.getBlob());
        attachedFileNames.push(file.getName());
      } else throw new Error("Invalid Drive URL");
    } catch (e) {
      throw new Error("Saved attachment file missing/inaccessible: Additional File (" + e.message + ")");
    }
  } else if (payload.addBase64) {
    attachments.push(Utilities.newBlob(Utilities.base64Decode(payload.addBase64), payload.addMime, payload.addName));
    attachedFileNames.push(payload.addName);
  }

  let totalSize = attachments.reduce((acc, blob) => acc + blob.getBytes().length, 0);
  if (totalSize > 25 * 1024 * 1024) throw new Error("Attachments exceed 25MB combined.");

  GmailApp.sendEmail(job.applyEmail, job.computedSubject, mergedPlainBody, {
    htmlBody: mergedHtmlBody,
    attachments: attachments,
    name: "Md Faysal Ahmed"
  });

  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd MMM, yyyy HH:mm");
  appSheet.getRange(job.rowIndex, 25).setValue(timestamp);
  appSheet.getRange(job.rowIndex, 17).setValue("Applied");
  appSheet.getRange(job.rowIndex, 28).setValue(attachedFileNames.join(", "));

  return "Email sent successfully!";
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
      let isError = false;

      if (!applyEmail || applyEmail === "N/A" || !isValidEmail(applyEmail)) {
        issues.push("Invalid/Missing Email");
        isError = true;
      }
      if (!company || company === "N/A") {
        issues.push("Missing Company Name");
        isError = true;
      }
      if (!title || title === "N/A") {
        issues.push("Missing Job Title");
        isError = true;
      }
      if (deadline && deadline !== "N/A" && deadline !== "") {
        let dlDate = new Date(deadline);
        if (!isNaN(dlDate.getTime()) && dlDate < new Date()) {
          issues.push("Deadline Passed");
          isError = true;
        }
      }

      if (isError) {
        issuesToUpdate[i][0] = issues.join(", ");
        hasChanges = true;
        for (let j=0; j < backgroundColors[i].length; j++) {
          backgroundColors[i][j] = "#fce8e6";
        }
      } else {
        if (issuesToUpdate[i][0] !== "") {
          issuesToUpdate[i][0] = "";
          hasChanges = true;
        }
        for (let j=0; j < backgroundColors[i].length; j++) {
          backgroundColors[i][j] = "#ffffff";
        }
        const finalScore = data[i][14];
        if (finalScore >= 80) backgroundColors[i][14] = "#c6efce";
        else if (finalScore >= 70) backgroundColors[i][14] = "#ffeb9c";
      }
    }
  }

  if (hasChanges) {
    const range = sheet.getRange(1, 1, backgroundColors.length, backgroundColors[0].length);
    range.setBackgrounds(backgroundColors);
    sheet.getRange(1, 27, issuesToUpdate.length, 1).setValues(issuesToUpdate);
    if (showAlert) SpreadsheetApp.getUi().alert("✅ Row audit complete! Incomplete fields are marked in red.");
  } else {
    if (showAlert) SpreadsheetApp.getUi().alert("✅ Row audit complete! No errors found.");
  }
}
`;

let code = fs.readFileSync('c:/WorkSpace/exal-apply-though-email-sheet/JobTracker_Script.js', 'utf8');
const idx = code.indexOf('function showSendDialog() {');
if (idx !== -1) {
  // We need to make sure we don't accidentally lose any text before function showSendDialog()
  // Wait, let's search for the exact comment block to be cleaner.
  const commentIdx = code.indexOf('// ============================================================\n// ইমেইল পাঠান');
  
  if (commentIdx !== -1) {
    code = code.substring(0, commentIdx) + 
      "// ============================================================\n" +
      "// Send Application (Mail Merge) - Dialog\n" +
      "// ============================================================\n" + 
      replacement;
  } else {
    // Fallback to function definition
    code = code.substring(0, idx) + replacement;
  }
  
  fs.writeFileSync('c:/WorkSpace/exal-apply-though-email-sheet/JobTracker_Script.js', code, 'utf8');
  console.log("Success");
} else {
  console.log("Error: Could not find function showSendDialog() {");
}
