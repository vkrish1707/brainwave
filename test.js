Perfect. Based on your direction, here’s how we’ll structure a robust, AI-friendly backend prompt for the BRP Page with snapshot management, JQL query saving, issue processing, and editable business rules.

We will match the existing architecture of how you’re handling JIRA Snapshots, JQL management, and issue storage, and introduce new collections: brp_queries, brp_snapshots, brp_issues, and brp_rules.

⸻

🧠 Backend AI Prompt (Modular & Reusable BRP API with Snapshot, Query, Rules)

📌 This AI prompt will instruct the agent to:
	•	Set up modular API endpoints
	•	Mirror the JIRA snapshot saving approach
	•	Build business logic processors (editable in DB)
	•	Allow full CRUD access to queries, snapshots, issues, and logic rules

⸻

💡 Prompt to AI Agent

Build a modular backend (Node.js + Express + MongoDB) that manages a new section called BRP Page, based on how jira_snapshots, jira_issues, and jira_queries are currently handled in the system.

🔧 Collections Required
	1.	brp_queries
	•	Fields: _id, name, jql, createdBy, createdAt, updatedAt
	2.	brp_snapshots
	•	Fields: _id, queryId, snapshotDate, issuesCount, savedAt, notes
	3.	brp_issues
	•	Fields: _id, snapshotId, jiraId, summary, priority, variant, functionalArea, impactedSubsystems, subsystemComplexity, affectedBlocks, jamaItem, referenceLink, featureArchitect, status, impactedIP, etc.
	•	Also store computed fields:
	•	porStatus
	•	complexity
	•	hasFW
	•	hasSW
	•	socImpact
	•	gcImpact
	4.	brp_rules
	•	A config-driven business logic rule engine for calculated fields.
	•	Example schema:

{
  "name": "HasFW",
  "field": "impactedIP",
  "matchAny": ["FW-CP", "FW-SDMA", "FW-VCN"],
  "resultIfMatch": "Yes",
  "resultIfNoMatch": "No"
}



📡 API Routes

📌 Query Management
	•	POST /api/brp/query → Save new JQL query
	•	GET /api/brp/query → List all queries
	•	GET /api/brp/query/:id → Get specific query
	•	PUT /api/brp/query/:id → Update query
	•	DELETE /api/brp/query/:id → Delete query

🧠 Snapshot Capture
	•	POST /api/brp/snapshot/:queryId → Trigger snapshot:
	1.	Run the JQL
	2.	Fetch issues from JIRA
	3.	Save snapshot metadata
	4.	Process each issue:
	•	Save in brp_issues
	•	Apply rules from brp_rules to calculate business fields

📊 Issues Retrieval
	•	GET /api/brp/issues?snapshotId=xyz → Return processed issues (with filters & pagination)

⚙️ Rule Engine Management
	•	GET /api/brp/rules → Get all rule definitions
	•	POST /api/brp/rules → Add new rule
	•	PUT /api/brp/rules/:id → Update rule
	•	DELETE /api/brp/rules/:id → Remove rule

🧪 Validation Notes
	•	Validate JQL before saving.
	•	Ensure issues are not duplicated per snapshot.
	•	Make rules dynamic and stored in DB for future editing by admins.
	•	Snapshot logic should use a utility similar to how existing jira_snapshot.service.js works.

⸻

✅ Optional Enhancements

If your architecture supports it:
	•	Use a common snapshotEngine utility (jira, brp, etc.) to generalize logic.
	•	Add N vs N-1 comparison logic using snapshot timestamps.
	•	Add cron job support for scheduled BRP snapshots (like brp_cron.controller.js).

⸻

🏁 Next Steps

Would you like me to:
	•	✅ Generate MongoDB schema + example JSON documents for each collection?
	•	✅ Write API endpoint skeletons in Express (routes, controllers, models)?
	•	✅ Write sample rule engine utility to calculate fields like hasFW, porStatus, etc.?

Let me know which ones you want next, and I’ll generate that immediately.
