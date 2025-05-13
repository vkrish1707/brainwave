const hierarchy = {};

for (const row of rawRows) {
    const node1 = row.EBVP_TOP_NODE;
    const node2 = row.EBVP_TOP_NODE_2;
    const node3 = row.EBVP_TOP_NODE_3;

    if (!hierarchy[node1]) {
        hierarchy[node1] = {
            node2List: [],
            children: {}
        };
    }

    // Initialize node2List and children for node1
    if (!hierarchy[node1].node2List.includes(node2)) {
        hierarchy[node1].node2List.push(node2);
        hierarchy[node1].children[node2] = [];
    }

    // Push node3 if not already added
    if (node3 && !hierarchy[node1].children[node2].includes(node3)) {
        hierarchy[node1].children[node2].push(node3);
    }
}