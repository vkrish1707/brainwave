const dashboardName = "exe"; // or "aecg"

// Find all documents containing the specified dashboard
const results = await model.find({
  "dashboards.name": dashboardName // Match dashboard name
});

// Extract and sort the results by the `order` field in the application layer
const sortedResults = results.map((doc) => {
  // Extract the specific dashboard's order for sorting
  const dashboard = doc.dashboards.find((d) => d.name === dashboardName);
  return { ...doc.toObject(), dashboardOrder: dashboard?.order || 0 };
}).sort((a, b) => a.dashboardOrder - b.dashboardOrder);

console.log(sortedResults);