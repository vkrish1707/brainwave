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

    // Iterate through all entries and update their order
    for (const entry of entries) {
      const { key } = entry; // Assuming `key` is the field for the mapping key

      // Determine the order
      const newOrder = keyOrderMap.has(key) ? keyOrderMap.get(key) : keysArray.length + 1; // Append to the last

      // Update the entry's order
      await model.updateOne(
        { "dashboards.name": dashboardType, key: key }, // Match dashboard type and key
        { $set: { "dashboards.$.order": newOrder } }
      );

      // Increment the "last order" for keys not in the provided array
      keysArray.length++;
    }

    console.log("Order successfully updated!");
    return { success: true, message: "Order successfully updated!" };
  } catch (error) {
    console.error("Error updating dashboard order:", error);
    return { success: false, message: "Error updating dashboard order.", error };
  }
};