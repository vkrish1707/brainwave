// Step 3: Build nested hierarchy
const hierarchy = {};

for (const row of rawRows) {
  const node1 = row.EBVP_TOP_NODE;
  const node2 = row.EBVP_TOP_NODE_2;
  const node3 = row.EBVP_TOP_NODE_3;

  if (!node1) continue; // skip if node1 is falsy

  // Initialize node1 if not present
  if (!hierarchy[node1]) {
    hierarchy[node1] = {
      node2List: [],
      children: {}
    };
  }

  // Add node2 if valid and not already in node2List
  if (node2 && node2 !== 'null' && node2 !== '') {
    if (!hierarchy[node1].node2List.includes(node2)) {
      hierarchy[node1].node2List.push(node2);
    }

    // Initialize children[node2] if not already
    if (!Array.isArray(hierarchy[node1].children[node2])) {
      hierarchy[node1].children[node2] = [];
    }

    // Add node3 if valid and not already present
    if (node3 && node3 !== 'null' && node3 !== '') {
      if (!hierarchy[node1].children[node2].includes(node3)) {
        hierarchy[node1].children[node2].push(node3);
      }
    }
  }
}

// Return the structured response
return res.status(200).json({
  message: "EBVP hierarchy fetched successfully",
  latestWeek: weekToFetch,
  weeks,
  hierarchy,
});