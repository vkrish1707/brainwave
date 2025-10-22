Great — based on everything you described and showed (including the screenshots and requirements), here is a clear, step-by-step instruction set you can pass to your AI agent for implementing this new API.

⸻

✅ New API Spec: GET /brp-snapshot/issue-diff/:snapshotId

🌐 Purpose

Compare the issues from:
	•	BRP Snapshot Issues collection (Collection A)
	•	Temporary JIRA Issues collection (Collection B)

…and return view-based field differences for each jiraKey.

⸻

🧠 Input Parameters
	•	snapshotId (path param)
	•	view (query param) — optional, defaults to a base view

⸻

📤 Output

For each jiraKey, return:
	•	Only changed fields
	•	Empty string or array for unchanged fields
	•	Comparison string for changed fields (e.g. "added: X", "removed: Y", "changed: NO → YES")

Also always include:
	•	jiraKey, summary, status (even if unchanged)

⸻

⚙️ Step-by-Step Logic

1. Fetch BRP Snapshot Issues

const brpIssues = await BrpSnapshotIssueModel.find({ snapshotId });

2. Fetch Temporary BRP Issues

const tempIssues = await TemporaryBrpIssueModel.find({}); // Adjust filter if needed

3. Loop through BRP Snapshot Issues

For each issue in brpIssues (let’s call it issueA):
	•	Match issue from tempIssues (call it issueB) by jiraKey
	•	Pass each to the existing service logic that handles field formatting by view (just like getBrpIssuesBySnapshotId)

const formattedA = brpIssueFormatter(issueA, view);
const formattedB = brpIssueFormatter(issueB, view);


⸻

4. Field-by-Field Diff

For each field in the view result:

a. If primitive:

if (formattedA[field] !== formattedB[field]) {
   result[field] = `changed: ${formattedB[field] || "empty"} → ${formattedA[field]}`;
} else {
   result[field] = ""; // No change
}

b. If array:

Do a set diff:
	•	Show added: X, removed: Y
	•	If nothing changed, return []

const added = A.filter(x => !B.includes(x));
const removed = B.filter(x => !A.includes(x));

Format as:

variant: [
  "added: Medusa Halo (Client-Halo)",
  "removed: Legacy Chip X"
]


⸻

5. Final Payload per Issue

{
  "jiraKey": "GFXIPARCH-2286",
  "summary": "Auto testing ticket 1",
  "status": "Proposal",
  "variant": ["added: Medusa Halo (Client-Halo)"],
  "priority": "", 
  ...
}

All unchanged fields will be empty string or empty array.

⸻

🏷️ Naming Conventions
	•	API Name: getBrpIssueDiffBySnapshotId
	•	File: brpIssue.controller.ts (if following modular pattern)
	•	URL: GET /api/brp-snapshot/issue-diff/:snapshotId

⸻

📋 Notes
	•	Don’t use +/- for array changes — only "added: X" / "removed: Y"
	•	If field exists in A but not in B: treat B as empty
	•	Can skip comparison if jiraKey not found in both
	•	Reuse getBrpIssuesBySnapshotId logic for consistent field computation

⸻

Let me know if you want the API boilerplate code in Express or NestJS format — I can scaffold it out.