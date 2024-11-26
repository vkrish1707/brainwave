const updateDashboardOrderByKeys = async (dashboardType, keysArray) => {
  try {
    // Fetch all entries for the given dashboard type
    const entries = await model.find({ "dashboards.name": dashboardType });

    if (!entries.length) {
      return { success: false, message: `No entries found for dashboard type: ${dashboardType}` };
    }

    // Create a map for the given keys with their new order
    const keyOrderMap = new Map();
    keysArray.forEach((key, index) => keyOrderMap.set(key, index + 1)); // Starting order from 1

    // Prepare bulk operations
    const bulkOperations = entries.map((entry) => {
      const { key } = entry; // Assuming `key` is the field for the mapping key

      // Determine the order
      const newOrder = keyOrderMap.has(key) ? keyOrderMap.get(key) : keysArray.length + 1; // Append missing keys to the end

      return {
        updateOne: {
          filter: { "dashboards.name": dashboardType, key: key }, // Match the dashboard type and key
          update: { $set: { "dashboards.$.order": newOrder } },
        },
      };
    });

    // Execute bulkWrite
    const result = await model.bulkWrite(bulkOperations);

    console.log("Order successfully updated via bulkWrite!");
    return {
      success: true,
      message: "Order successfully updated via bulkWrite!",
      result,
    };
  } catch (error) {
    console.error("Error updating dashboard order with bulkWrite:", error);
    return {
      success: false,
      message: "Error updating dashboard order with bulkWrite.",
      error,
    };
  }
};