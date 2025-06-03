[
  {
    $match: {
      Quarter: { $regex: "^2025Q[1-4]$" }, // all quarters of 2025
      COST_ELEMENT_NAME: "HC_REG",
      CATEGORY: { $in: ["0000000225", "ACTUAL"] },
      Submit_Period: "2025Q2" // dynamic filter — you will pass this in
    }
  },
  {
    $group: {
      _id: {
        EBVP_TOP_NODE: "$COST_CENTER_LEVEL_4_ID",
        EBVP_TOP_NODE_2: "$COST_CENTER_LEVEL_5_ID",
        EBVP_TOP_NODE_3: "$COST_CENTER_LEVEL_6_ID",
        quarter: "$Quarter"
      },
      total_target: { $sum: "$QUANTITY" }
    }
  },
  {
    $group: {
      _id: {
        EBVP_TOP_NODE: "$_id.EBVP_TOP_NODE",
        EBVP_TOP_NODE_2: "$_id.EBVP_TOP_NODE_2",
        EBVP_TOP_NODE_3: "$_id.EBVP_TOP_NODE_3"
      },
      Q1: {
        $sum: {
          $cond: [{ $eq: ["$_id.quarter", "2025Q1"] }, "$total_target", 0]
        }
      },
      Q2: {
        $sum: {
          $cond: [{ $eq: ["$_id.quarter", "2025Q2"] }, "$total_target", 0]
        }
      },
      Q3: {
        $sum: {
          $cond: [{ $eq: ["$_id.quarter", "2025Q3"] }, "$total_target", 0]
        }
      },
      Q4: {
        $sum: {
          $cond: [{ $eq: ["$_id.quarter", "2025Q4"] }, "$total_target", 0]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      EBVP_TOP_NODE: "$_id.EBVP_TOP_NODE",
      EBVP_TOP_NODE_2: "$_id.EBVP_TOP_NODE_2",
      EBVP_TOP_NODE_3: "$_id.EBVP_TOP_NODE_3",
      Q1_target: "$Q1",
      Q2_target: "$Q2",
      Q3_target: "$Q3",
      Q4_target: "$Q4"
    }
  }
]