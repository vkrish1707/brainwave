SELECT 
  week_num,
  EBVP_TOP_NODE,
  EBVP_TOP_NODE_2,
  EBVP_TOP_NODE_3,
  SUM(hires_count) AS hires,
  SUM(term_count) AS terminations
FROM (
  -- Hires
  SELECT 
    week_num,
    EBVP_TOP_NODE,
    EBVP_TOP_NODE_2,
    EBVP_TOP_NODE_3,
    COUNT(*) AS hires_count,
    0 AS term_count
  FROM global_hires
  WHERE week_num = '${weekToFetch}'
  GROUP BY week_num, EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3

  UNION ALL

  -- Terminations
  SELECT 
    week_num,
    EBVP_TOP_NODE,
    EBVP_TOP_NODE_2,
    EBVP_TOP_NODE_3,
    0 AS hires_count,
    COUNT(*) AS term_count
  FROM global_terminations
  WHERE week_num = '${weekToFetch}'
  GROUP BY week_num, EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3
) AS combined
GROUP BY week_num, EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3
ORDER BY week_num;