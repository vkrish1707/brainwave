const colorLegend = [
  { name: "Physical re-use", value: "00b050", text: "000000" },
  { name: "Logical re-use", value: "92d050", text: "000000" },
  { name: "Re-use with major change", value: "ffff00", text: "000000" },
  { name: "New", value: "ff0000", text: "000000" },
  { name: "To be Updated", value: "0070C0", text: "000000" },
  { name: "Not Applicable", value: "000000", text: "ffffff" }
];

// Create a lookup map for color values to labels
const colorLegendMap = new Map(colorLegend.map(item => [item.value.toLowerCase(), item.name]));

const getLabelFromColor = (color) => {
  if (!color) return "";
  return colorLegendMap.get(color.toLowerCase()) || color; // Return label if found, otherwise return original color
};

const getIpReuseActivityLogs = async (req, res) => {
  try {
    const logs = await LogsCollection.find().sort({ createdAt: -1 }).limit(20);
    
    const processedLogs = logs.flatMap((log) => {
      const { newValue, previousValue, changeMadeBy, createdAt, siDieId, ipType } = log;

      // Fetch Names from Other Collections
      const siDieName = socMap[siDieId] || siDieId;
      const ipTypeName = ipTypeMap[ipType] || ipType;

      const changes = [];

      newValue.forEach((newItem, index) => {
        const prevItem = previousValue[index] || {};

        // Compare fields and push changes
        if (newItem.value !== prevItem.value || newItem.color !== prevItem.color || newItem.derivedFrom !== prevItem.derivedFrom) {
          changes.push({
            siDieId,
            socName: siDieName,
            ipType: ipTypeName,
            changeMadeBy,
            newValue: newItem.value,
            previousValue: prevItem.value || "",
            newValueLabel: getLabelFromColor(newItem.color),  // Get the label for the new color
            previousValueLabel: getLabelFromColor(prevItem.color), // Get the label for the previous color
            type: newItem.value !== prevItem.value ? "value" : newItem.color !== prevItem.color ? "color" : "derived",
            createdAt
          });
        }
      });

      return changes;
    });

    return res.json({ data: processedLogs });

  } catch (error) {
    console.error("Error fetching logs:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};