exports.saveNewSoc = async (req, res) => {
  try {
    const { name, copyFrom } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Fetch the latest document for report date
    const latestDoc = await ipReuseModel
      .findOne()
      .sort({ reportDate: -1 })
      .exec();

    if (!latestDoc) {
      return res.status(404).json({
        error: "No documents found to derive report date from.",
      });
    }

    const reportDate = latestDoc.reportDate;

    // Generate a new temporary ID
    const existingTempIds = await ipReuseModel.find({
      siDieId: { $regex: "^SI-DIE-TMP[0-9]{3}$" },
    });

    const maxNumber = existingTempIds
      .map((doc) => parseInt(doc.siDieId.replace(/SI-DIE-TMP/, ""), 10))
      .filter((num) => !isNaN(num))
      .reduce((max, num) => Math.max(max, num), 0);

    const newTempNumber = String(maxNumber + 1).padStart(3, "0");
    const newTempId = `SI-DIE-TMP${newTempNumber}`;

    let ipTypeValues = {};

    // If copyFrom is provided, fetch the corresponding SOC
    if (copyFrom) {
      const copyFromDoc = await ipReuseModel
        .findOne({ siDieId: copyFrom, isLive: true })
        .sort({ reportDate: -1 })
        .exec();

      if (!copyFromDoc) {
        return res.status(404).json({
          error: `Document with SID ${copyFrom} not found.`,
        });
      }

      // Copy IP Type fields dynamically
      Object.keys(copyFromDoc).forEach((key) => {
        if (key.startsWith("ipType")) {
          ipTypeValues[key] = copyFromDoc[key];
        }
      });
    }

    const newTempDoc = new ipReuseModel({
      siDieId: newTempId,
      soc: [{ value: name, color: "000000" }],
      reportDate: reportDate,
      isLive: true,
      ...ipTypeValues, // Spread the copied IP Type fields here
    });

    await newTempDoc.save();

    res.status(201).json({
      message: "New TEMP ID created successfully",
      newTempId,
      document: newTempDoc,
    });
  } catch (error) {
    console.error("Error saving SOC:", error);
    res.status(500).json({ message: "Server error" });
  }
};