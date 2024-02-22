import React, { useState } from "react";
import validateNewCampaign from "../utils/validateNewCampaign";
import { Modal, DatePicker, Form, Input, Select, message } from "antd";

const CreateCampaign = ({
  existingCampaigns,
  setStoredCampaigns,
  open,
  setOpen,
  editToggle,
  setEditToggle,
  currentCampaign,
}) => {
  const [campaignName, setCampaignName] = useState(null);
  const [campaignType, setCampaignType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  // Entered campaign info from user
  const newCampaign = {
    campaign_name: campaignName,
    campaign_type: Number(campaignType),
    campaign_start_time: startDate,
    campaign_end_time: endDate,
    campaign_status_id: 1,
  };

  // Form submit via create or edit
  const handleSubmit = () => {
    // Using validate function to check the entered data fits the schema
    if (validateNewCampaign(newCampaign).isValid) {
      // Edit campaign logic
      if (editToggle) {
        setConfirmLoading(true);
        const updatedCampaigns = [...existingCampaigns];
        updatedCampaigns[currentCampaign.key] = newCampaign;
        console.log(updatedCampaigns);
        setStoredCampaigns(updatedCampaigns);
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
        setCampaignName("");
        setCampaignType("");
        setStartDate("");
        setEndDate("");
        form.resetFields();
        return setTimeout(() => {
          setEditToggle(false);
          message.success("Campaign updated successfully");
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      } else {
        // Create campaign logic
        setConfirmLoading(true);
        console.log("Campaign data:", newCampaign);
        const updatedCampaigns = [...existingCampaigns, newCampaign];
        setStoredCampaigns(updatedCampaigns);
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
        setCampaignName("");
        setCampaignType("");
        setStartDate("");
        setEndDate("");
        form.resetFields();
        setTimeout(() => {
          message.success("Campaign created successfully");
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      }
    } else {
      // Error message if validation fails
      message.error(validateNewCampaign(newCampaign).message);
    }
  };

  // If user starts completing modal form and then backs out
  const handleCancel = () => {
    setCampaignName("");
    setCampaignType("");
    setStartDate("");
    setEndDate("");
    form.resetFields();
    setEditToggle(false);
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={editToggle ? "Edit campaign" : "Create a new campaign"}
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="modal"
      >
        <Form onFinish={handleSubmit} form={form}>
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
              placeholder="Enter campaign name"
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
            <Select
              onChange={setCampaignType}
              value={campaignType}
              placeholder="Select campaign type"
            >
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
