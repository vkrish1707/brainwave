// Backend: Add new query to get hires and terminations per EBVP node and week
exports.getReqInfoByWeek = async function (req, res) {
  const userFullName = `${user.givenName} ${user.sn}`;
  let reqSqlQuery = '';
  let weekToFetch = workWeek;

  if (!workWeek) {
    const latestWorkWeekInfo = await getLatestWorkWeek(connection);
    weekToFetch = latestWorkWeekInfo.latestWeek;
  }

  let reqFullQuery = `SELECT 
    req,
    EBVP_TOP_NODE,
    EBVP_TOP_NODE_2,
    EBVP_TOP_NODE_3,
    application_status,
    sub_region,
    job_posting_country
  FROM global_requisitions
  WHERE week_num = '${weekToFetch}' AND status = 'Opened';`;

  let hireTermQuery = `SELECT 
    week_num,
    EBVP_TOP_NODE,
    EBVP_TOP_NODE_2,
    EBVP_TOP_NODE_3,
    COUNT(*) FILTER (WHERE table_name = 'global_hires') as hires,
    COUNT(*) FILTER (WHERE table_name = 'global_terminations') as terminations
  FROM (
    SELECT 'global_hires' as table_name, * FROM global_hires
    UNION ALL
    SELECT 'global_terminations' as table_name, * FROM global_terminations
  ) combined
  WHERE week_num = '${weekToFetch}'
  GROUP BY week_num, EBVP_TOP_NODE, EBVP_TOP_NODE_2, EBVP_TOP_NODE_3;`;

  if (!isAdmin && !isFullAccess) {
    const configList = await getUserDataConfig(connection, 'general', 'user');
    const userMatchConditions = generateHRFilterQuery(configList, userFullName, tableName);

    reqSqlQuery = `SELECT 
      req,
      EBVP_TOP_NODE,
      EBVP_TOP_NODE_2,
      EBVP_TOP_NODE_3,
      application_status,
      sub_region,
      job_posting_country
    FROM global_requisitions
    WHERE ${userMatchConditions} AND week_num = '${weekToFetch}' AND status = 'Opened';`;

    hireTermQuery += ` AND ${userMatchConditions}`;
  }

  const reqsInfo = await executeSync(connection, reqSqlQuery);
  const hireTermInfo = await executeSync(connection, hireTermQuery);

  return res.status(200).json({
    data: reqsInfo.data,
    hireTermData: hireTermInfo.data,
    message: 'Data fetched successfully'
  });
};

// Frontend: Handle new data and filtering
const setChartsData = (data, ebvpField, ebvpValue, hireTermData) => {
  if (!data.length) return;
  setInProgress(false);

  const filteredData = ebvpField && ebvpValue ? data.filter(item => item[ebvpField] === ebvpValue) : data;

  // Process hire vs terminations for scatter chart
  const scatterMap = {};
  const nodeField = ebvpField || 'EBVP_TOP_NODE';

  for (const item of hireTermData) {
    const nodeKey = item[nodeField];
    if (!scatterMap[nodeKey]) scatterMap[nodeKey] = [];
    scatterMap[nodeKey].push({
      week: item.week_num,
      hires: item.hires,
      terminations: item.terminations
    });
  }

  const scatterData = Object.entries(scatterMap).map(([key, data]) => ({ label: key, data }));
  setHireTermScatterData(scatterData);
};