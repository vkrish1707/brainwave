SELECT 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3,
  gw.REPORTS_TO_3 AS VP,

  COUNT(gw.HC) AS Q2_TO_DATE_HC,

  COUNT(gr.REQ) AS HIRED_BY_WW19,  -- Existing join

  COUNT(gr_after_q2.REQ) AS OPEN_REQS_AFTER_Q2  -- New join result

FROM GLOBAL_WORKFORCE gw

-- First JOIN for HIRED_BY_WW19
LEFT JOIN GLOBAL_REQUISITIONS gr
  ON gw.EBVP_TOP_NODE = gr.EBVP_TOP_NODE
  AND gw.EBVP_TOP_NODE_2 = gr.EBVP_TOP_NODE_2
  AND gw.EBVP_TOP_NODE_3 = gr.EBVP_TOP_NODE_3
  AND gr.ACTUAL_START_DATE <= '2025-05-05'  -- Inside Q2
  AND gr.EMPLOYEE_GROUP IN ('A-Regular Salaried', 'B-Regular Hourly')
  AND gr.WEEK_NUM = 'WW1925'

-- New JOIN for Open Reqs + Hired After Q2
LEFT JOIN GLOBAL_REQUISITIONS gr_after_q2
  ON gw.EBVP_TOP_NODE = gr_after_q2.EBVP_TOP_NODE
  AND gw.EBVP_TOP_NODE_2 = gr_after_q2.EBVP_TOP_NODE_2
  AND gw.EBVP_TOP_NODE_3 = gr_after_q2.EBVP_TOP_NODE_3
  AND gr_after_q2.ACTUAL_START_DATE > '2025-06-30'  -- End of Q2
  AND gr_after_q2.REQ_STATUS IN ('Opened', 'Future Hire', 'On Hold', 'Pending Approval')
  AND gr_after_q2.EMPLOYEE_GROUP IN ('A-Regular Salaried', 'B-Regular Hourly')

-- Filtering the Workforce dataset
WHERE gw.WEEK_NUM = 'WW1925'

GROUP BY 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3,
  gw.REPORTS_TO_3

ORDER BY 
  gw.EBVP_TOP_NODE,
  gw.EBVP_TOP_NODE_2,
  gw.EBVP_TOP_NODE_3;