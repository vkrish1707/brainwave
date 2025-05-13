const sqlQuery = `
  UPDATE global_workforce AS target
  SET 
    SOURCE_LIST = src.SOURCE_LIST,
    SKILL_SET = src.SKILL_SET
  FROM global_workforce AS src
  WHERE src.EMPLOYEE_ID = target.EMPLOYEE_ID
    AND src.WORK_WEEK = '${previousWorkWeek}'
    AND target.WORK_WEEK = '${currentWorkWeek}';
`;