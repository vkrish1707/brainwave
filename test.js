Excellent — you’ve now created the base for GFXOpsTool, and you’re ready to build a modular, modern Next.js UI.

Here are the complete AI-executable instructions to structure and implement your project using JavaScript, Tailwind CSS, and SheetJS — with traceability features like JIRA–JAMA linking and syncing, based entirely on Excel files.

⸻

🧭 PROJECT OVERVIEW: GFXOpsTool

GFXOpsTool is a modular operations support UI for internal GFX teams. The first feature module to implement is Traceability Automation.

⸻

✅ 1. ✨ UI Overview

🔸 Home Page Layout
	•	Create a dashboard-style homepage with a center-aligned grid containing two clickable cards:

[📎 Link JIRA to JAMA Item]
[🔄 Sync JIRA and JAMA (Excel Compare)]

🔸 Visual Styling
	•	Use a modern, clean color theme:
	•	Primary: indigo-600
	•	Accent: teal-400
	•	Background: gray-50
	•	Use Tailwind CSS for layout, hover effects, rounded corners, and box shadows
	•	Add simple icons or emojis for visual distinction on cards

⸻

✅ 2. 🧱 Project Structure

GFXOpsTool/
├── public/
│   └── static_data/            # Excel files uploaded manually
│       ├── current.xlsx
│       └── previous.xlsx
├── pages/
│   ├── index.js                # Home page with cards
│   ├── link-jira-jama.js       # Module 1 UI
│   └── sync-jira-jama.js       # Module 2 UI
├── components/
│   ├── Card.js                 # Reusable UI card component
│   └── Table.js                # Table display of Excel data
├── utils/
│   ├── parseExcel.js           # Excel -> JSON logic using SheetJS
│   └── compareExcel.js         # Logic to compare current vs previous
├── styles/
│   └── globals.css             # Tailwind base styles


⸻

✅ 3. 📦 Dependencies to Install

npm install xlsx

Already installed:
	•	react, next, tailwindcss, etc. (from setup)

⸻

✅ 4. 🧩 Feature Modules to Implement

⸻

📎 Module 1: Link JIRA to JAMA Item

Page: /link-jira-jama

Functionality:
	•	Upload a JIRA Excel file (single file)
	•	Parse and display it in a table (tailwind-styled)
	•	Highlight rows where Linked_JAMA_ID is empty
	•	On row click, show ticket details in a side panel or modal
	•	Allow editing the Linked_JAMA_ID in-memory
	•	Export the modified data back as Excel

⸻

🔄 Module 2: Sync JIRA and JAMA (Excel Compare)

Page: /sync-jira-jama

Functionality:
	•	Upload two Excel files: current.xlsx, previous.xlsx
	•	Parse both and match rows using JIRA_ID
	•	Detect field changes (e.g., Status, Labels)
	•	Highlight changed rows in a diff view table
	•	Show summary stats: # of added, removed, changed tickets
	•	Export changes as new Excel report if needed

⸻

✅ 5. 🎨 UI Design Notes

Typography:
	•	Headings: text-3xl font-bold text-indigo-600
	•	Section titles: text-xl font-semibold text-gray-800

Components:
	•	Use hoverable, clickable cards with:
	•	Shadow: shadow-md hover:shadow-lg
	•	Rounded corners: rounded-xl
	•	Padding: p-6
	•	Cursor: cursor-pointer

Table UI:
	•	Use Tailwind table styles:
	•	Header row: bg-indigo-100 text-sm font-semibold
	•	Body rows: hover:bg-indigo-50 transition
	•	Conditional color tags for status changes

Modal/Panel UI:
	•	Use Tailwind modal or slide-over for showing details/editing

⸻

✅ 6. 🧠 UX Interactions

Action	Behavior
Card click	Navigates to the correct page (/link-jira-jama or /sync-jira-jama)
Excel upload	Automatically parses and displays results
Row click	Opens detail view for editing
Edit in UI	Stores changes temporarily (JSON state)
Export	Triggers Excel export using updated state


⸻

✅ 7. 💾 File Handling (Offline Mode)
	•	Use file input (<input type="file">) for uploading .xlsx files
	•	Do NOT use backend or APIs
	•	All Excel parsing happens in-browser using xlsx
	•	Files stored in-memory during session; not uploaded anywhere

⸻

✅ 8. 🚀 Launch & Demo Tips
	•	Run: npm run dev
	•	Open: http://localhost:3000
	•	Show homepage with two cards
	•	Click into each module to demonstrate Excel-based workflow

⸻

✅ Next Step

Let me know when you’re ready to:
	•	Build the homepage layout with cards
	•	Implement Excel upload and table display for Module 1

I’ll guide you feature-by-feature.

Would you like me to generate the homepage UI structure with Tailwind card layout next (without actual logic yet)?