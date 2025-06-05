const empGroups = hcMap[headCountType] || []; // fallback to empty if not found
const formattedGroups = empGroups.map(g => `'${g}'`).join(', '); // SQL-safe strings

const hiredArrayQuery = `
  SELECT
    EBVP_TOP_NODE,
    EBVP_TOP_NODE_2,
    EBVP_TOP_NODE_3,
    SUM(
      CASE
        WHEN (
          ACTUAL_START_DATE <= '${workWeekDetails[workWeekDetails.currentQuarter].end}' AND
          ACTUAL_START_DATE >= '${workWeekDetails[workWeekDetails.currentQuarter].start}' AND
          EMPLOYEE_GROUP IN (${formattedGroups}) AND
          WEEK_NUM = '${weekToFetch}' AND
          STATUS IN ('Future Hire', 'On Hold', 'Opened', 'Pending Approval')
        )
        THEN 1
        WHEN (
          ACTUAL_START_DATE = '${workWeekDetails.nextWeekMonday}' AND
          EMPLOYEE_GROUP IN (${formattedGroups})
        )
        THEN 1
        ELSE 0
      END
    ) AS OFFERS
  FROM GLOBAL_WORKFORCE
  WHERE ${reqMatchConditionQuery}
  GROUP BY EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3;
`;