db.collection1.aggregate([
  {
    "$group": {
      "_id": "$reportDate"
    }
  },
  {
    "$sort": { "_id": -1 }  // Sort by reportDate (latest first)
  },
  {
    "$skip": 1  // Skip the latest report date
  },
  {
    "$group": {
      "_id": null,
      "uniqueReportDates": { "$push": "$_id" }
    }
  },
  {
    "$project": {
      "_id": 0,
      "createdAt": { "$arrayElemAt": ["$uniqueReportDates", 0] },  // Use the first reportDate
      "sidId": "12345",  // Hardcoded values
      "ipType": "TypeA",
      "newValue": "SampleNewValue",
      "previousValue": "SampleOldValue",
      "changeMadeBy": "UserX"
    }
  },
  {
    "$merge": { "into": "collection2", "on": "_id", "whenMatched": "merge", "whenNotMatched": "insert" }
  }
])