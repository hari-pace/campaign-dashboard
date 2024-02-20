import React, { useState } from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  Modal,
  DatePicker,
  TimePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";

const EditCampaign = ({ existingCampaigns, setStoredCampaigns }) => {
  const [campaignIndex, setCampaignIndex] = useState(null);
  const [updatedCampaign, setUpdatedCampaign] = useState(null);
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
    // console.log("Campaign data:", newCampaign);
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

  const updatedCampaignData = {
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

  const editCampaign = (campaignIndex, updatedCampaignData) => {
    const updatedCampaigns = [...storedCampaigns];
    updatedCampaigns[campaignIndex] = updatedCampaignData;
    setStoredCampaigns(updatedCampaigns);
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  };

  // Function to delete a campaign
  const deleteCampaign = (campaignIndex) => {
    const updatedCampaigns = storedCampaigns.filter(
      (_, index) => index !== campaignIndex
    );
    setStoredCampaigns(updatedCampaigns);
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  };

  return (
    <>
      <Button type="link">Edit</Button>
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

export default EditCampaign;
