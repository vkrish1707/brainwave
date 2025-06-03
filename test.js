WITH workforce_cte AS (
    SELECT 
        WEEK_NUM,
        COUNT(*) AS hc
    FROM global_workforce
    WHERE RIGHT(WEEK_NUM, 2) = '25'
    GROUP BY WEEK_NUM
),
offers_cte AS (
    SELECT 
        WEEK_NUM,
        COUNT(*) AS offer
    FROM (
        SELECT WEEK_NUM FROM global_hires
        WHERE RIGHT(WEEK_NUM, 2) = '25'
        UNION ALL
        SELECT WEEK_NUM FROM global_hire_transfers
        WHERE RIGHT(WEEK_NUM, 2) = '25'
    ) combined_offers
    GROUP BY WEEK_NUM
),
attrition_cte AS (
    SELECT 
        WEEK_NUM,
        COUNT(*) AS attrition
    FROM global_terminations
    WHERE RIGHT(WEEK_NUM, 2) = '25'
    GROUP BY WEEK_NUM
),
all_weeks AS (
    SELECT DISTINCT WEEK_NUM FROM (
        SELECT WEEK_NUM FROM global_workforce
        UNION
        SELECT WEEK_NUM FROM global_hires
        UNION
        SELECT WEEK_NUM FROM global_hire_transfers
        UNION
        SELECT WEEK_NUM FROM global_terminations
    ) allweeks
    WHERE RIGHT(WEEK_NUM, 2) = '25'
)
SELECT 
    w.WEEK_NUM AS week,
    COALESCE(hc.hc, 0) AS hc,
    COALESCE(o.offer, 0) AS offer,
    COALESCE(a.attrition, 0) AS attrition,
    SUM(COALESCE(a.attrition, 0)) OVER (
        ORDER BY w.WEEK_NUM
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS ytdAttrition
FROM all_weeks w
LEFT JOIN workforce_cte hc ON w.WEEK_NUM = hc.WEEK_NUM
LEFT JOIN offers_cte o ON w.WEEK_NUM = o.WEEK_NUM
LEFT JOIN attrition_cte a ON w.WEEK_NUM = a.WEEK_NUM
ORDER BY w.WEEK_NUM;