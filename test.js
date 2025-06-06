const targetWeek = parseInt(weekToFetch.slice(2, 4));  // "19" from "WW1925"
const targetYearSuffix = weekToFetch.slice(4);         // "25" from "WW1925"

const weeklyHCQuery = `
  SELECT
    EBVP_TOP_NODE,
    EBVP_TOP_NODE_2,
    EBVP_TOP_NODE_3,
    WEEK_NUM,
    COUNT(*) AS HC
  FROM global_workforce
  WHERE ${reqMatchConditionQuery}
    AND RIGHT(WEEK_NUM, 2) = '${targetYearSuffix}'
    AND CAST(SUBSTRING(WEEK_NUM, 3, 2) AS INTEGER) <= ${targetWeek}
    AND HC = '${headCountType}'
  GROUP BY WEEK_NUM, EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3
`;