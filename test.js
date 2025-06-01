const pipeline = [
  {
    $match: {
      submit_period: "2025 Q2",
      cost_element_name: "HC_reg"
    }
  },
  {
    $group: {
      _id: {
        ebvp_top_node: "$cost_center_level_4_id",
        ebvp_top_node_2: "$cost_center_level_5_id",
        ebvp_top_node_3: "$cost_center_level_6_id",
        vp: "$reports_to_3"
      },
      total_target: { $sum: "$target" }
    }
  },
  {
    $project: {
      _id: 0,
      ebvp_top_node: "$_id.ebvp_top_node",
      ebvp_top_node_2: "$_id.ebvp_top_node_2",
      ebvp_top_node_3: "$_id.ebvp_top_node_3",
      vp: "$_id.vp",
      target: "$total_target"
    }
  }
];

const result = await pbaTargetModel.aggregate(pipeline);