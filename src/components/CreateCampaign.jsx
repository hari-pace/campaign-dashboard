import React, { useState } from "react";
import campaignModel from "../campaignModel";
import validateNewCampaign from "../validateNewCampaign";
import {
  Button,
  Modal,
  DatePicker,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";

const CreateCampaign = ({ existingCampaigns, setStoredCampaigns }) => {
  // const [campaign, setCampaign] = useState({ ...campaignModel });
  const [campaignName, setCampaignName] = useState(null);
  const [campaignType, setCampaignType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    console.log("Campaign data:", newCampaign);
    const updatedCampaigns = [...existingCampaigns, newCampaign];
    setStoredCampaigns(updatedCampaigns);
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const newCampaign = {
    campaign_name: campaignName,
    campaign_type: Number(campaignType),
    campaign_start_time: new Date(startDate).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
    campaign_end_time: new Date(endDate).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
    campaign_status_id: 1,
  };

  if (validateNewCampaign(newCampaign)) {
    // Add newCampaign to your campaign list
  } else {
    // Display an error message or handle invalid data
  }
  const handleSubmit = () => {
    // Storing campaign data in LocalStorage
    // localStorage.setItem("campaigns", JSON.stringify(campaignData));
    // Retrieving campaign data from LocalStorage
    // const storedCampaigns = JSON.parse(localStorage.getItem("campaigns"));
  };

  return (
    <>
      <Button type="primary" size="large" onClick={showModal}>
        Create campaign
      </Button>
      <Modal
        title="Create a new campaign"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Campaign name:"
            name="Campaign name:"
            rules={[
              {
                required: true,
                message: "Please enter a name",
              },
            ]}
          >
            <Input
              type="text"
              onChange={(e) => setCampaignName(e.target.value)}
              value={campaignName}
            />
          </Form.Item>
          <Form.Item
            label="Campaign type:"
            name="Campaign type:"
            rules={[
              {
                required: true,
                message: "Please enter a campaign type",
              },
            ]}
          >
            <Select onChange={setCampaignType} value={campaignType}>
              <Select.Option value="1">Standard</Select.Option>
              <Select.Option value="2">AB-Test</Select.Option>
              <Select.Option value="3">MV-Test</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Start date:"
            rootClassName="Start date:"
            rules={[
              {
                required: true,
                message: "Please select a start date",
              },
            ]}
          >
            <DatePicker onChange={setStartDate} value={startDate} />
          </Form.Item>
          <Form.Item
            label="End date:"
            rootClassName="End date:"
            rules={[
              {
                required: true,
                message: "Please select a end date",
              },
            ]}
          >
            <DatePicker onChange={setEndDate} value={endDate} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCampaign;
