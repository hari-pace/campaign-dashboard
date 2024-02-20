import React, { useState } from "react";
import campaignModel from "../campaignModel";

const CampaignForm = () => {
  const [campaign, setCampaign] = useState({ ...campaignModel });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCampaign({ ...campaign, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Campaign data:", campaign);

    // Storing campaign data in LocalStorage
    // localStorage.setItem("campaigns", JSON.stringify(campaignData));

    // Retrieving campaign data from LocalStorage
    // const storedCampaigns = JSON.parse(localStorage.getItem("campaigns"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Campaign Name:
        <input
          type="text"
          name="campaign_name"
          value={campaign.campaign_name}
          onChange={handleInputChange}
        />
      </label>
      {/* Other input fields for campaign type, start/end date, etc. */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CampaignForm;
