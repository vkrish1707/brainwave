WITH workforce_cte AS (...),
     hired_by_q2_cte AS (...),
     open_reqs_after_q2_cte AS (...)

SELECT
    EBVP_TOP_NODE,
    EBVP_TOP_NODE_2,
    EBVP_TOP_NODE_3,
    VP,
    SUM(Q2_TO_DATE_HC) AS Q2_TO_DATE_HC,
    SUM(HIRED_BY_Q2) AS HIRED_BY_Q2,
    SUM(OPEN_REQS_AFTER_Q2) AS OPEN_REQS_AFTER_Q2
FROM (
    SELECT
        w.EBVP_TOP_NODE,
        w.EBVP_TOP_NODE_2,
        w.EBVP_TOP_NODE_3,
        w.VP,
        w.Q2_TO_DATE_HC,
        COALESCE(h.HIRED_BY_Q2, 0) AS HIRED_BY_Q2,
        COALESCE(o.OPEN_REQS_AFTER_Q2, 0) AS OPEN_REQS_AFTER_Q2
    FROM workforce_cte w
    LEFT JOIN hired_by_q2_cte h ON
        w.EBVP_TOP_NODE = h.EBVP_TOP_NODE AND
        w.EBVP_TOP_NODE_2 = h.EBVP_TOP_NODE_2 AND
        w.EBVP_TOP_NODE_3 = h.EBVP_TOP_NODE_3 AND
        w.VP = h.VP
    LEFT JOIN open_reqs_after_q2_cte o ON
        w.EBVP_TOP_NODE = o.EBVP_TOP_NODE AND
        w.EBVP_TOP_NODE_2 = o.EBVP_TOP_NODE_2 AND
        w.EBVP_TOP_NODE_3 = o.EBVP_TOP_NODE_3 AND
        w.VP = o.VP
) AS base
GROUP BY EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3, VP
ORDER BY EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3, VP;