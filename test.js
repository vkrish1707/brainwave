const updateDashboardOrder = async (dashboardType, orderUpdates) => {
  try {
    // Loop through the array of order updates
    for (const update of orderUpdates) {
      const { keyName, newOrder } = update;

      // Find and update the specific dashboard's order
      await model.updateOne(
        { "dashboards.name": dashboardType, key: keyName }, // Match the dashboard type and key
        {
          $set: {
            "dashboards.$.order": newOrder, // Update the order
          },
        }
      );
    }

    console.log("Order updates successful!");
    return { success: true, message: "Order updates successful!" };
  } catch (error) {
    console.error("Error updating dashboard order:", error);
    return { success: false, message: "Error updating dashboard order.", error };
  }
};