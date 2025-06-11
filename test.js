WITH hires AS (
  SELECT *
  FROM Global_Hires
  WHERE WEEK_NUM BETWEEN 'WW0125' AND 'WW0925'
),
terms AS (
  SELECT *
  FROM Global_Terminations
  WHERE WEEK_NUM BETWEEN 'WW0125' AND 'WW0925'
),
hire_transfers AS (
  SELECT *
  FROM Global_Hire_Transfers
  WHERE WEEK_NUM BETWEEN 'WW0125' AND 'WW0925'
),
term_transfers AS (
  SELECT *
  FROM Global_Termination_Transfers
  WHERE WEEK_NUM BETWEEN 'WW0125' AND 'WW0925'
)

SELECT
    COALESCE(h.EBVP_Top_Node_1, t.EBVP_Top_Node_1, ht.EBVP_Top_Node_1, tt.EBVP_Top_Node_1) AS EBVP_Top_Node_1,
    COALESCE(h.EBVP_Top_Node_2, t.EBVP_Top_Node_2, ht.EBVP_Top_Node_2, tt.EBVP_Top_Node_2) AS EBVP_Top_Node_2,
    COALESCE(h.EBVP_Top_Node_3, t.EBVP_Top_Node_3, ht.EBVP_Top_Node_3, tt.EBVP_Top_Node_3) AS EBVP_Top_Node_3,

    COUNT(DISTINCT h.ID) AS total_hires,
    COUNT(DISTINCT t.ID) AS total_terminations,
    COUNT(DISTINCT ht.ID) - COUNT(DISTINCT tt.ID) AS net_transfers

FROM hires h
FULL OUTER JOIN terms t
  ON h.EBVP_Top_Node_1 = t.EBVP_Top_Node_1
 AND h.EBVP_Top_Node_2 = t.EBVP_Top_Node_2
 AND h.EBVP_Top_Node_3 = t.EBVP_Top_Node_3

FULL OUTER JOIN hire_transfers ht
  ON h.EBVP_Top_Node_1 = ht.EBVP_Top_Node_1
 AND h.EBVP_Top_Node_2 = ht.EBVP_Top_Node_2
 AND h.EBVP_Top_Node_3 = ht.EBVP_Top_Node_3

FULL OUTER JOIN term_transfers tt
  ON h.EBVP_Top_Node_1 = tt.EBVP_Top_Node_1
 AND h.EBVP_Top_Node_2 = tt.EBVP_Top_Node_2
 AND h.EBVP_Top_Node_3 = tt.EBVP_Top_Node_3

GROUP BY
    EBVP_Top_Node_1,
    EBVP_Top_Node_2,
    EBVP_Top_Node_3