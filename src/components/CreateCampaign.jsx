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

const CreateCampaign = ({
  existingCampaigns,
  setStoredCampaigns,
  open,
  setOpen,
  editToggle,
  setEditToggle,
  currentCampaign,
}) => {
  // const [campaign, setCampaign] = useState({ ...campaignModel });
  const [campaignName, setCampaignName] = useState(null);
  const [campaignType, setCampaignType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const showModal = () => {
  //   setOpen(true);
  // };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setCampaignName("");
    setCampaignType("");
    setStartDate("");
    setEndDate("");
    setEditToggle(false);
    setOpen(false);
  };

  const newCampaign = {
    campaign_name: campaignName,
    campaign_type: Number(campaignType),
    campaign_start_time: startDate,
    campaign_end_time: endDate,
    campaign_status_id: 1,
  };

  const handleSubmit = () => {
    if (validateNewCampaign(newCampaign).isValid) {
      if (editToggle) {
        setConfirmLoading(true);
        // console.log("EDITED Campaign data:", newCampaign);
        const updatedCampaigns = [...existingCampaigns];
        updatedCampaigns[currentCampaign.key] = newCampaign;
        console.log(updatedCampaigns);
        setStoredCampaigns(updatedCampaigns);
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
        setCampaignName("");
        setCampaignType("");
        setStartDate("");
        setEndDate("");
        return setTimeout(() => {
          setEditToggle(false);

          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      } else {
        setConfirmLoading(true);
        console.log("Campaign data:", newCampaign);
        const updatedCampaigns = [...existingCampaigns, newCampaign];
        setStoredCampaigns(updatedCampaigns);
        localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
        setCampaignName("");
        setCampaignType("");
        setStartDate("");
        setEndDate("");
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);
      }
    } else {
      alert(validateNewCampaign(newCampaign).message);
    }
  };

  return (
    <>
      {/* <Button type="primary" size="large" onClick={showModal}>
        Create campaign
      </Button> */}
      <Modal
        title={editToggle ? "Edit campaign" : "Create a new campaign"}
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="modal"
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
