SELECT w.EBVP_TOP_NODE, w.EBVP_TOP_NODE_2, w.EBVP_TOP_NODE_3, w.VP,
       COUNT(*) as joined_rows
FROM workforce_cte w
LEFT JOIN hired_by_q2_cte h ON w.EBVP_TOP_NODE = h.EBVP_TOP_NODE
                           AND w.EBVP_TOP_NODE_2 = h.EBVP_TOP_NODE_2
                           AND w.EBVP_TOP_NODE_3 = h.EBVP_TOP_NODE_3
                           AND w.VP = h.VP
GROUP BY w.EBVP_TOP_NODE, w.EBVP_TOP_NODE_2, w.EBVP_TOP_NODE_3, w.VP
HAVING COUNT(*) > 1