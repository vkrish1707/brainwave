const mongoose = require("mongoose");
const ActivityLog = require("../models/ActivityLog");
const SocCollection = require("../models/SocCollection");
const IpTypeCollection = require("../models/IpTypeCollection");

const getProcessedLogs = async (req, res) => {
    try {
        // Fetch the latest 20 records sorted by createdAt
        const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(20);

        // Fetch SOC names and IP Type names from other collections
        const socIds = logs.map((log) => log.sidId);
        const ipTypes = logs.map((log) => log.ipType);

        // Fetch SOC Names
        const socData = await SocCollection.find({ sidId: { $in: socIds } });
        const socMap = socData.reduce((acc, soc) => {
            acc[soc.sidId] = soc.name; // Map SIDID to SOC Name
            return acc;
        }, {});

        // Fetch IP Type Names
        const ipTypeData = await IpTypeCollection.find({ ipType: { $in: ipTypes } });
        const ipTypeMap = ipTypeData.reduce((acc, ip) => {
            acc[ip.ipType] = ip.name; // Map IP Type to Name
            return acc;
        }, {});

        // Define the fields to compare dynamically
        const fields = [
            { key: "value", type: "value" },
            { key: "color", type: "color", format: (val) => `#${val}` },
            { key: "derivedFrom", type: "derived" }
        ];

        // Process logs and detect changes
        const processedLogs = logs.flatMap((log) => {
            const { newValue, previousValue, changeMadeBy, createdAt } = log;
            const socName = socMap[log.sidId] || log.sidId;
            const ipTypeName = ipTypeMap[log.ipType] || log.ipType;
            const changes = [];

            newValue.forEach((newItem, index) => {
                const prevItem = previousValue[index] || {};

                fields.forEach(({ key, type, format }) => {
                    if (newItem[key] !== prevItem[key]) {
                        changes.push({
                            sidid: log.sidId,
                            socName,
                            ipType: ipTypeName,
                            changeMadeBy,
                            newValue: format ? format(newItem[key]) : newItem[key],
                            previousValue: format ? format(prevItem[key] || "N/A") : prevItem[key] || "N/A",
                            type, // Instead of 'changeType', we use only 'type'
                            createdAt
                        });
                    }
                });
            });

            return changes;
        });

        return res.json({ data: processedLogs });
    } catch (error) {
        console.error("Error fetching logs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getProcessedLogs };