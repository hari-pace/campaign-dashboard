const campaignModel = {
  campaign_name: { type: "string", maxLength: 50 },
  campaign_type: { type: "number", allowedValues: [1, 2, 3] },
  campaign_start_time: { type: "date" },
  campaign_end_time: { type: "date" },
  campaign_status_id: { type: "number", allowedValues: [0, 1] },
};

export default campaignModel;
