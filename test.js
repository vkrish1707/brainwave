exports.resetSocExecDashboard = async (req, res) => {
  try {
    const latestDoc = await socExecDashboardModel
      .findOne()
      .sort({ reportDate: -1 });

    if (!latestDoc) {
      return res.status(404).json({ message: "No documents found" });
    }

    const latestReportDate = latestDoc.reportDate;
    const newSnapshotReportDate = new Date().toISOString();
    const newLiveReportDate = new Date(new Date().getTime() + 5000).toISOString();

    const records = await socExecDashboardModel.find({ reportDate: latestReportDate });
    if (!records.length) {
      return res.status(404).json({ message: "No documents to snapshot found" });
    }

    const newRecords = [];

    // Loop through each record and create its snapshot
    for (const record of records) {
      // Clone the record to create a new one
      const newRecord = {
        ...record._doc,
        reportDate: newLiveReportDate,
        isLive: true,
      };

      // Remove MongoDB internal fields that shouldn't be copied
      delete newRecord._id;
      delete newRecord.__v;

      // Transform ipType/soc fields as you did before
      Object.keys(newRecord).forEach((key) => {
        if (key.startsWith("ipType") || key === "soc") {
          newRecord[key] = newRecord[key].map((obj) => {
            const { previousColor, color } = getColors(obj.color);
            return {
              previousValue: obj.value,
              previousColor,
              value: obj.value,
              color,
            };
          });
        }
      });

      // Fetch additional data from another collection based on siDiId and conditions
      const siDiId = record.siDiId; // Ensure siDiId is accessible from the original record
      if (siDiId) {
        const externalData = await otherCollectionModel.findOne({
          siDiId: siDiId,
          milestone: 'A0',  // Example condition
          date: 'POR',      // Example condition
        }).sort({ updatedAt: -1 }); // if you need the latest record

        if (externalData) {
          // Update newRecord fields with the fetched external data
          // Adjust these fields to match what you need to update
          newRecord.node = externalData.node;
          newRecord.nodeColor = externalData.nodeColor;
          // ...any other fields that should be updated from externalData
        }
      }

      newRecords.push(newRecord);
    }

    // Update the old snapshot to not be live anymore
    await socExecDashboardModel.updateMany(
      { reportDate: latestReportDate },
      {
        $set: {
          reportDate: newSnapshotReportDate,
          isLive: false,
        },
      }
    );

    // Insert the newRecords to become the new "live" snapshot
    await socExecDashboardModel.insertMany(newRecords);

    return res.status(200).json({
      message: "Snapshot created and Live Documents updated successfully",
      liveReportDate: newLiveReportDate,
      snapshotReportDate: newSnapshotReportDate,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};