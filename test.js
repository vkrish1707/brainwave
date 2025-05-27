SELECT 
  REGEXP_REPLACE(column_name, '_0([1-9])$', '_\\1') AS normalized_column,
  reports_to_value
FROM (
  SELECT
    REPORTS_TO_01,
    REPORTS_TO_02,
    REPORTS_TO_03,
    REPORTS_TO_04,
    REPORTS_TO_05,
    REPORTS_TO_06,
    REPORTS_TO_07,
    REPORTS_TO_08,
    REPORTS_TO_09,
    REPORTS_TO_10
  FROM SNF_CE_OPERATIONS_RW.GLOBAL_HIRES
) src
UNPIVOT (
  reports_to_value FOR column_name IN (
    REPORTS_TO_01,
    REPORTS_TO_02,
    REPORTS_TO_03,
    REPORTS_TO_04,
    REPORTS_TO_05,
    REPORTS_TO_06,
    REPORTS_TO_07,
    REPORTS_TO_08,
    REPORTS_TO_09,
    REPORTS_TO_10
  )
);