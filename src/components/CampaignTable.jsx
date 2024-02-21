import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  Input,
  Radio,
  Select,
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../App.css";

const CampaignTable = ({
  existingCampaigns,
  setStoredCampaigns,
  open,
  setOpen,
  showModal,
  setEditToggle,
  currentCampaign,
  setCurrentCampaign,
}) => {
  const [searchValueName, setSearchValueName] = useState("");
  const [searchValueType, setSearchValueType] = useState(null);
  const [searchStartDate, setSearchStartDate] = useState(null);
  const [searchEndDate, setSearchEndDate] = useState(null);
  const [statusActive, setStatusActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    type: null,
    startDate: null,
    endDate: null,
  });

  const editButtonClick = (record) => {
    setCurrentCampaign(record);
    setEditToggle(true);
    showModal();
  };
  const changeCampaignStatus = (record) => {
    console.log(record.status);
    setCurrentCampaign(record);
  };

  const handleColumnSort = (columnKey) => {
    if (sortColumn === columnKey) {
      // Toggle the sorting order if the same column is clicked again
      setSortOrder((prevSortOrder) =>
        prevSortOrder === "ascend" ? "descend" : "ascend"
      );
    } else {
      // Set the new column key and initial sorting order
      setSortColumn(columnKey);
      setSortOrder("ascend");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",

      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortColumn === "name" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("name"),
      }),
    },
    {
      title: "Type",
      dataIndex: "type",

      sorter: (a, b) => a.type.localeCompare(b.type),
      sortOrder: sortColumn === "type" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("type"),
      }),
    },
    {
      title: "Start date",
      dataIndex: "startDate",

      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
      sortOrder: sortColumn === "startDate" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("startDate"),
      }),
    },
    {
      title: "End date",
      dataIndex: "endDate",

      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
      sortOrder: sortColumn === "endDate" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("endDate"),
      }),
    },
    {
      title: "Status",

      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortOrder: sortColumn === "status" && sortOrder,
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("status"),
      }),
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
          <Button type="link" onClick={() => editButtonClick(record)}>
            Edit
          </Button>
          <Button
            type="link"
            onClick={() => changeCampaignStatus(record)}
            className={
              record.status === "Active" ? "button-delete" : "button-activate"
            }
          >
            {record.status === "Active" ? "Delete" : "Activate"}
          </Button>
        </Space>
      ),
    },
  ];

  const filteredCampaignsByName = existingCampaigns?.filter(
    (campaign) =>
      campaign.campaign_name?.includes(searchValueName) ||
      campaign.campaign_name?.includes(
        searchValueName?.charAt(0).toUpperCase() + searchValueName?.slice(1)
      ) ||
      campaign.campaign_name?.includes(
        searchValueName?.charAt(0).toLowerCase() + searchValueName?.slice(1)
      )
  );

  const handleNameChange = (e) => {
    setFilters({ ...filters, name: e.target.value });
  };

  const handleTypeChange = (e) => {
    console.log(e);
    setFilters({ ...filters, type: e });
  };

  const handleStartDateChange = (date) => {
    setFilters({ ...filters, startDate: date });
  };

  const handleEndDateChange = (date) => {
    console.log(date);
    setFilters({ ...filters, endDate: date });
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      type: "",
      startDate: null,
      endDate: null,
    });
  };

  const filteredCampaigns = existingCampaigns.filter((campaign) => {
    const nameMatch = campaign.campaign_name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const typeMatch = filters.type
      ? campaign?.campaign_type === filters.type
      : true;
    const startDateMatch =
      !filters.startDate ||
      campaign.campaign_start_time ===
        new Date(filters.startDate).toLocaleDateString("de-DE", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
    const endDateMatch =
      !filters.endDate ||
      campaign.campaign_end_time ===
        new Date(filters.endDate).toLocaleDateString("de-DE", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
    return nameMatch && typeMatch && startDateMatch && endDateMatch;
  });

  return (
    <>
      <div className="filter">
        {" "}
        <h2>Filter campaigns</h2>
        <div className="filter-form">
          <SearchOutlined />
          <Input
            className="filter-search"
            type="text"
            placeholder="Enter campaign name"
            value={filters.name}
            onChange={(e) => {
              handleNameChange(e);
            }}
          />

          <Select
            className="filter-type"
            onChange={(e) => handleTypeChange(e)}
            value={filters.type}
            placeholder="Select campaign type"
          >
            <Select.Option value="1">Standard</Select.Option>
            <Select.Option value="2">AB-Test</Select.Option>
            <Select.Option value="3">MV-Test</Select.Option>
          </Select>
          <DatePicker
            placeholder="Select start date"
            onChange={handleStartDateChange}
            value={filters.startDate}
          />
          <DatePicker
            placeholder="Select end date"
            onChange={handleEndDateChange}
            value={filters.endDate}
          />
          <Button type="primary" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      </div>
      <div className="table">
        <h2>Campaigns</h2>
        <Table
          columns={columns}
          dataSource={filteredCampaigns?.map((campaign, index) => ({
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
      </div>
    </>
  );
};

export default CampaignTable;
