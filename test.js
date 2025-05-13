exports.modify_skill = async (req, res) => {
  const { source, action, skill, previousSkill } = req.body;
  const user = req.user || 'vmyLavar'; // replace with real user session if needed

  const connection = snowflake.createConnection(configParams);
  try {
    if (!connection.isUp()) {
      await connection.connectAsync();
    }

    let sqlQuery = '';

    if (action === 'add') {
      sqlQuery = `
        INSERT INTO global_skill_mappings 
        (SOURCE_NAME, SKILL_NAME, CREATED_BY, CREATED_AT) 
        VALUES ('${source}', '${skill}', '${user}', CURRENT_TIMESTAMP)
      `;
    } else if (action === 'delete') {
      sqlQuery = `
        DELETE FROM global_skill_mappings 
        WHERE SOURCE_NAME = '${source}' AND SKILL_NAME = '${skill}'
      `;
    } else if (action === 'update') {
      sqlQuery = `
        UPDATE global_skill_mappings 
        SET SKILL_NAME = '${skill}', UPDATED_BY = '${user}', UPDATED_AT = CURRENT_TIMESTAMP 
        WHERE SOURCE_NAME = '${source}' AND SKILL_NAME = '${previousSkill}'
      `;
    } else {
      return res.status(400).json({ error: 'Invalid action type' });
    }

    await new Promise((resolve, reject) => {
      connection.execute({
        sqlText: sqlQuery,
        complete: (err) => {
          if (err) {
            console.error('Skill update failed:', err);
            return reject(err);
          }
          resolve();
        },
      });
    });

    res.status(200).json({ message: `Skill ${action} successful` });
  } catch (err) {
    console.error('modify_skill error:', err.message);
    res.status(500).json({ error: err.message });
  }
};