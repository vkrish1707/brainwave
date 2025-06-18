// From request
const rawHeadCountType = req.query.headCountType || '';

// Step 1: Always get an array of head count types
const headCountTypes = rawHeadCountType
  .split(',')
  .map(s => s.trim())
  .filter(Boolean); // removes any empty strings

console.log("📌 Parsed headCountTypes:", headCountTypes);

// Step 2: Map to employee group values from your hcMap
const empGroups = headCountTypes.flatMap(hc => hcMap[hc] || []);

console.log("📌 Resolved employee groups:", empGroups);

// Step 3: Format them for SQL IN clause
const formattedGroups = empGroups.map(g => `'${g}'`).join(', ');

console.log("📌 Formatted groups for SQL:", formattedGroups);

// 👉 Now use formattedGroups in your SQL:
// WHERE EMPLOYEE_GROUP IN (${formattedGroups})