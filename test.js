SELECT 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3,
  gw.REPORTS_TO_3 AS VP,
  COUNT(gw.HC) AS Q2_TO_DATE_HC,
  COUNT(gr.EMP_ID) AS HIRED_BY_WW19  -- New value from requisitions
FROM GLOBAL_WORKFORCE gw
LEFT JOIN GLOBAL_REQUISITIONS gr
  ON gw.EBVP_TOP_NODE = gr.EBVP_TOP_NODE
  AND gw.EBVP_TOP_NODE_2 = gr.EBVP_TOP_NODE_2
  AND gw.EBVP_TOP_NODE_3 = gr.EBVP_TOP_NODE_3
  AND gr.ACTUAL_START_DATE <= '<your_date_here>'  -- Replace with bound date
  AND gr.EMPLOYEE_GROUP IN ('Regular Salaried', 'Regular Hourly')
  AND gr.WEEK_NUM = '${weekToFetch}'  -- Work week match
WHERE ${reqMatchConditionQuery} 
  AND gw.WEEK_NUM = '${weekToFetch}'
GROUP BY 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3,
  gw.REPORTS_TO_3
ORDER BY 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3;