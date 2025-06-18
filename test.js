const rawHeadCountType = req.query.headCountType || '';
const headCountTypes = rawHeadCountType.split(',').map(s => s.trim());

const empGroups = headCountTypes.flatMap(hc => hcMap[hc] || []);
const formattedGroups = empGroups.map(g => `'${g}'`).join(', ');