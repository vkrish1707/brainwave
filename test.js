Great. Here’s the updated backend AI prompt logic that adds your latest requirement:

⸻

🔁 AI Prompt: Backend API – Fetch BRP Issues by Query ID (Latest Snapshot)

Build an Express.js endpoint to return BRP issues based on a given queryId. The logic involves:

⸻

📦 Collections Involved
	•	brp_queries – Metadata for saved JQL-like queries
	•	brp_snapshots – Snapshot entries containing queryId, snapshotId, createdAt
	•	brp_issues – All fetched issues tied to a snapshotId

⸻

📥 Input
	•	queryId (from request param or query param): ID of the saved BRP query
	•	Optional: view param (overall, variant, etc.)

⸻

🧠 Core Logic
	1.	Find Latest Snapshot
	•	From brp_snapshots, find the document with the matching queryId and the most recent createdAt.
	•	Retrieve its snapshotId.
	2.	Fetch Issues
	•	From brp_issues, pull all issues where snapshotId matches the one found above.
	3.	Apply Business Logic
	•	For each issue, apply derived field logic using the helper functions in brpLogic.js:
	•	Complexity
	•	POR Status
	•	Has FW
	•	Has SW
	•	SOC Impact
	•	GC Impact
	4.	View-based Formatting
	•	Format the output depending on the view parameter:
	•	overall, variant, subsystem, sw, fw, gc
	•	Each view returns specific columns (defined in logic or a config file).
	5.	Return Formatted Result
	•	As JSON by default
	•	If export=csv, return downloadable CSV stream

⸻

✅ Example Endpoint

GET /api/brp/issues?queryId=abc123&view=overall


⸻

📝 Notes
	•	Reuse existing snapshot/issue resolution logic from jira_snapshots and jira_issues.
	•	Do not duplicate logic across views — use a view config file or formatter for columns.
	•	Store all business logic in brpLogic.js as reusable, testable functions.
	•	Make sure snapshot logic picks the latest by timestamp, not just ID.

⸻

Would you like a code scaffold for this now (including route + logic + utils)?
