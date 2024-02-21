import campaignModel from "./campaignModel";

const validateNewCampaign = (campaignData) => {
  const { campaign_start_time, campaign_end_time } = campaignData;

  for (const key in campaignData) {
    const value = campaignData[key];
    const { type, maxLength, allowedValues } = campaignModel[key];

    if (type === "string" && typeof value !== "string") {
      return {
        isValid: false,
        message: `Campaign name must be a string.`,
      };
    }
    if (type === "string" && value.length <= 1) {
      return {
        isValid: false,
        message: `Please enter a campaign name.`,
      };
    }

    if (type === "string" && maxLength && value.length > maxLength) {
      return {
        isValid: false,
        message: `Campaign name exceeds maximum length of ${maxLength}.`,
      };
    }

    // if (type === "number" && allowedValues && !allowedValues.includes(value)) {
    //   return {
    //     isValid: false,
    //     message: `${key} must be one of the allowed values: ${allowedValues.join(
    //       ", "
    //     )}.`,
    //   };
    // }
  }

  if (
    campaign_start_time &&
    campaign_end_time &&
    campaign_end_time <= campaign_start_time
  ) {
    return {
      isValid: false,
      message: "End date must be later than start date.",
    };
  }

  return { isValid: true };
};

export default validateNewCampaign;
