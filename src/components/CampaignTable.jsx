import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import EditCampaign from "./EditCampaign";

const CampaignTable = ({ existingCampaigns, setStoredCampaigns }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {/* <EditCampaign
            existingCampaigns={existingCampaigns}
            setStoredCampaigns={setStoredCampaigns}
          /> */}
          <Button type="link">Set status</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={existingCampaigns?.map((campaign, index) => ({
          key: index,
          name: campaign.campaign_name,
          type:
            campaign.campaign_type === 1
              ? "Standard"
              : campaign.campaign_type === 2
              ? "AB-Test"
              : campaign.campaign_type === 3
              ? "MV-Test"
              : "",
          startDate: campaign.campaign_start_time,
          endDate: campaign.campaign_end_time,
          status:
            campaign.campaign_status_id === 1
              ? "Active"
              : campaign.campaign_status_id === 0
              ? "Deleted"
              : "",
        }))}
      />
      ;
    </>
  );
};

export default CampaignTable;
