const getGlobalSkills = async () => {
  const connection = snowflake.createConnection(configParams);

  try {
    if (!connection.isUp()) {
      await connection.connectAsync();
    }

    const sqlQuery = `SELECT SKILL_NAME FROM global_skill_mappings WHERE SOURCE_NAME = 'global'`;

    const rows = await new Promise((resolve, reject) => {
      connection.execute({
        sqlText: sqlQuery,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error("Failed to fetch global skills:", err);
            return reject(err);
          }
          resolve(rows);
        },
      });
    });

    // Map just the SKILL_NAME fields into an array of strings
    const skillsArray = rows.map(row => row.SKILL_NAME);
    return skillsArray;

  } catch (err) {
    console.error("getGlobalSkills error:", err.message);
    throw err;
  }
};