import campaignModel from "./campaignModel";

const validateNewCampaign = (campaignData) => {
  for (const key in campaignData) {
    const value = campaignData[key];
    const { type, maxLength, allowedValues } = campaignModel[key];

    if (type === "string" && typeof value !== "string") {
      return false;
    }

    if (type === "number" && typeof value !== "number") {
      return false;
    }

    if (type === "date" && !(value instanceof Date)) {
      return false;
    }

    if (type === "string" && maxLength && value.length > maxLength) {
      return false;
    }

    if (type === "number" && allowedValues && !allowedValues.includes(value)) {
      return false;
    }
  }

  return true;
};

export default validateNewCampaign;
