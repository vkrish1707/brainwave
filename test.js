const inheritSourceAndSkills = async (currentWorkWeek, previousWorkWeek) => {
  const connection = snowflake.createConnection(configParams);

  try {
    if (!connection.isUp()) {
      await connection.connectAsync();
    }

    const sqlQuery = `
      UPDATE global_workforce AS target
      SET 
        SOURCE_LIST = (
          SELECT src.SOURCE_LIST 
          FROM global_workforce AS src
          WHERE src.EMPLOYEE_ID = target.EMPLOYEE_ID
            AND src.WORK_WEEK = '${previousWorkWeek}'
        ),
        SKILL_SET = (
          SELECT src.SKILL_SET 
          FROM global_workforce AS src
          WHERE src.EMPLOYEE_ID = target.EMPLOYEE_ID
            AND src.WORK_WEEK = '${previousWorkWeek}'
        )
      WHERE target.WORK_WEEK = '${currentWorkWeek}'
        AND target.EMPLOYEE_ID IN (
          SELECT EMPLOYEE_ID 
          FROM global_workforce 
          WHERE WORK_WEEK = '${previousWorkWeek}'
        )
    `;

    await new Promise((resolve, reject) => {
      connection.execute({
        sqlText: sqlQuery,
        complete: (err) => {
          if (err) {
            console.error("Skill/source inheritance failed:", err.message);
            return reject(err);
          }
          console.log("Source list and skills inherited successfully.");
          resolve();
        },
      });
    });

  } catch (err) {
    console.error("inheritSourceAndSkills error:", err.message);
    throw err;
  }
};