const setChartsData = (data, ebvpField, ebvpValue) => {
    if (!data?.length) return;

    // Step 1: Filter by EBVP level if selected
    const filteredData = ebvpField && ebvpValue
        ? data.filter(item => item[ebvpField] === ebvpValue)
        : data;

    console.log("✅ Filtered Data:", filteredData);

    // Step 2: Country-wise Pie Chart (no change)
    const countryCountsMap = filteredData.reduce((acc, item) => {
        const country = item.JOB_POSTING_COUNTRY;
        if (country) {
            acc[country] = (acc[country] || 0) + 1;
        }
        return acc;
    }, {});

    const countryCountsArray = Object.entries(countryCountsMap)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count);

    setPieChartData(countryCountsArray);

    // Step 3: EBVP Drill-down Donut Chart
    let groupByField = "EBVP_TOP_NODE"; // default
    if (ebvpField === "EBVP_TOP_NODE") groupByField = "EBVP_TOP_NODE_1";
    else if (ebvpField === "EBVP_TOP_NODE_1") groupByField = "EBVP_TOP_NODE_2";
    else if (ebvpField === "EBVP_TOP_NODE_2") groupByField = "EBVP_TOP_NODE_3";

    const ebvpCountsMap = filteredData.reduce((acc, item) => {
        const key = item[groupByField];
        if (key) {
            acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
    }, {});

    const ebvpCountsArray = Object.entries(ebvpCountsMap)
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count);

    console.log("✅ EBVP Donut:", ebvpCountsArray);

    setDonutData(ebvpCountsArray);
};