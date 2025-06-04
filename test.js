{
  $group: {
    _id: {
      EBVP_TOP_NODE: "$COST_CENTER_LEVEL_4_ID",
      EBVP_TOP_NODE_2: {
        $cond: [
          { $regexMatch: { input: "$COST_CENTER_LEVEL_5_ID", regex: /^E-/ } },
          "$COST_CENTER_LEVEL_5_ID",
          "$COST_CENTER_LEVEL_5_NAME"
        ]
      },
      EBVP_TOP_NODE_3: {
        $cond: [
          { $regexMatch: { input: "$COST_CENTER_LEVEL_6_ID", regex: /^E-/ } },
          "$COST_CENTER_LEVEL_6_ID",
          "$COST_CENTER_LEVEL_6_NAME"
        ]
      },
      quarter: "$Quarter",
      submit_period: "$Submit_Period"
    },
    total_target: { $sum: "$QUANTITY" }
  }
}