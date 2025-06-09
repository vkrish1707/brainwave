WITH ranked_requisitions AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY REC_ID
      ORDER BY CAST(SUBSTRING(WEEK_NUM, 3, 2) AS INTEGER) * 100 + CAST(RIGHT(WEEK_NUM, 2) AS INTEGER) DESC
    ) AS rn
  FROM global_requisitions
  WHERE EBVP_TOP_NODE = 'E-TE'
    AND status = 'Opened'
    AND RIGHT(WEEK_NUM, 2) = '25'
    AND CAST(SUBSTRING(WEEK_NUM, 3, 2) AS INTEGER) <= 19
),
latest_requisitions AS (
  SELECT *
  FROM ranked_requisitions
  WHERE rn = 1
)

SELECT
  EBVP_TOP_NODE_2,
  COUNT(CASE WHEN application_status = 'Offer Pending Approval' THEN 1 END) AS "Pending Approval",
  COUNT(CASE WHEN application_status = 'Offer Extended' THEN 1 END) AS "Actively Recruiting",
  COUNT(CASE WHEN application_status = 'Offer Approved' THEN 1 END) AS "Offers in Progress",
  COUNT(CASE WHEN application_status IN ('Onboarding', '') THEN 1 END) AS "Onboarding",
  COUNT(CASE WHEN application_status = 'Hired' THEN 1 END) AS "Closed Hired",
  COUNT(*) AS "Grand Total"
FROM latest_requisitions
GROUP BY EBVP_TOP_NODE_2
ORDER BY EBVP_TOP_NODE_2;