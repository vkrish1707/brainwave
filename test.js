const submitPeriod = "2025Q2"; // pass dynamically

[
  {
    $match: {
      Quarter: { $regex: "^2025Q[1-4]$" },
      COST_ELEMENT_NAME: "HC_REG",
      CATEGORY: { $in: ["0000000225", "ACTUAL"] }
    }
  },
  {
    $group: {
      _id: {
        EBVP_TOP_NODE: "$COST_CENTER_LEVEL_4_ID",
        EBVP_TOP_NODE_2: "$COST_CENTER_LEVEL_5_ID",
        EBVP_TOP_NODE_3: "$COST_CENTER_LEVEL_6_ID",
        quarter: "$Quarter",
        submit_period: "$Submit_Period"
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
      Q1_target: {
        $sum: {
          $cond: [{ $eq: ["$_id.quarter", "2025Q1"] }, "$total_target", 0]
        }
      },
      Q2_target: {
        $sum: {
          $cond: [{ $eq: ["$_id.quarter", "2025Q2"] }, "$total_target", 0]
        }
      },
      Q3_target: {
        $sum: {
          $cond: [{ $eq: ["$_id.quarter", "2025Q3"] }, "$total_target", 0]
        }
      },
      Q4_target: {
        $sum: {
          $cond: [{ $eq: ["$_id.quarter", "2025Q4"] }, "$total_target", 0]
        }
      },
      Submit_Period_target: {
        $sum: {
          $cond: [{ $eq: ["$_id.submit_period", submitPeriod] }, "$total_target", 0]
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
      Q1_target: 1,
      Q2_target: 1,
      Q3_target: 1,
      Q4_target: 1,
      Submit_Period_target: 1
    }
  }
]