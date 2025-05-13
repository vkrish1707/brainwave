// controllers/ebvpHierarchyController.js

exports.getEBVPHierarchy = async function (req, res) {
  const connection = req.connection;

  try {
    // Step 1: Get latest week
    const weekQuery = `
      SELECT DISTINCT WEEK_NUM FROM global_workforce ORDER BY WEEK_NUM DESC LIMIT 1
    `;
    const latestWeek = await new Promise((resolve, reject) => {
      connection.execute({
        sqlText: weekQuery,
        complete: (err, stmt, rows) => {
          if (err) return reject(err);
          resolve(rows[0]?.WEEK_NUM);
        },
      });
    });

    if (!latestWeek) {
      return res.status(404).json({ message: "No week data found" });
    }

    // Step 2: Fetch EBVP nodes for latest week
    const dataQuery = `
      SELECT EBVP_NODE_1, EBVP_NODE_2, EBVP_NODE_3 
      FROM global_workforce 
      WHERE WEEK_NUM = '${latestWeek}'
    `;

    const rawRows = await new Promise((resolve, reject) => {
      connection.execute({
        sqlText: dataQuery,
        complete: (err, stmt, rows) => {
          if (err) return reject(err);
          resolve(rows);
        },
      });
    });

    // Step 3: Build nested hierarchy
    const hierarchy = {};
    for (const row of rawRows) {
      const node1 = row.EBVP_NODE_1;
      const node2 = row.EBVP_NODE_2;
      const node3 = row.EBVP_NODE_3;

      if (!hierarchy[node1]) {
        hierarchy[node1] = { node2List: [], children: {} };
      }

      if (!hierarchy[node1].node2List.includes(node2)) {
        hierarchy[node1].node2List.push(node2);
        hierarchy[node1].children[node2] = [];
      }

      if (!hierarchy[node1].children[node2].includes(node3)) {
        hierarchy[node1].children[node2].push(node3);
      }
    }

    return res.status(200).json({
      message: "EBVP hierarchy fetched successfully",
      week: latestWeek,
      hierarchy,
    });

  } catch (err) {
    console.error("Error fetching EBVP hierarchy:", err.message);
    return res.status(500).json({ error: err.message });
  }
};