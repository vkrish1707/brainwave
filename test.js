SELECT 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3,
  gw.REPORTS_TO_3 AS VP,
  COUNT(gw.HC) AS Q2_TO_DATE_HC,

  COUNT(gr1.EMP_ID) AS HIRED_BY_WW19,

  COUNT(
    CASE 
      WHEN gr2.ACTUAL_START_DATE > TO_DATE('2025-06-30') -- Replace dynamically
        AND gr2.REQ_STATUS IN ('Opened', 'Future Hire', 'On Hold', 'Pending Approval')
      THEN 1 
    END
  ) AS OPEN_REQS_HIRED_AFTER_Q2

FROM GLOBAL_WORKFORCE gw

LEFT JOIN GLOBAL_REQUISITIONS gr1
  ON gw.EBVP_TOP_NODE = gr1.EBVP_TOP_NODE
  AND gw.EBVP_TOP_NODE_2 = gr1.EBVP_TOP_NODE_2
  AND gw.EBVP_TOP_NODE_3 = gr1.EBVP_TOP_NODE_3
  AND gr1.WEEK_NUM = '${weekToFetch}'
  AND gr1.EMPLOYEE_GROUP IN ('Regular Salaried', 'Regular Hourly')

LEFT JOIN GLOBAL_REQUISITIONS gr2
  ON gw.EBVP_TOP_NODE = gr2.EBVP_TOP_NODE
  AND gw.EBVP_TOP_NODE_2 = gr2.EBVP_TOP_NODE_2
  AND gw.EBVP_TOP_NODE_3 = gr2.EBVP_TOP_NODE_3
  AND gr2.ACTUAL_START_DATE > TO_DATE('2025-06-30') -- Replace dynamically
  AND gr2.EMPLOYEE_GROUP IN ('Regular Salaried', 'Regular Hourly')

WHERE gw.WEEK_NUM = '${weekToFetch}'
  ${reqMatchConditionQuery ? `AND ${reqMatchConditionQuery}` : ''}

GROUP BY 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3,
  gw.REPORTS_TO_3
ORDER BY 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3;