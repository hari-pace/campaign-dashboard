import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CampaignTable from "./components/CampaignTable";
import CreateCampaign from "./components/CreateCampaign";
import { Button } from "antd";

function App() {
  const [storedCampaigns, setStoredCampaigns] = useState([]);
  const [open, setOpen] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("campaigns");
    if (localStorageData) {
      setStoredCampaigns(JSON.parse(localStorageData));
    }
  }, []);

  // Define existingCampaigns based on storedCampaigns
  const existingCampaigns = storedCampaigns ? storedCampaigns : [];

  console.log(existingCampaigns);
  // localStorage.removeItem("campaigns");

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="content-right">
          {/* Filter campaigns form */}
          {/* Create campaign button */}
          <Button
            className="create-button"
            type="primary"
            size="large"
            onClick={showModal}
          >
            Create campaign
          </Button>
          <CreateCampaign
            existingCampaigns={existingCampaigns}
            setStoredCampaigns={setStoredCampaigns}
            open={open}
            setOpen={setOpen}
            editToggle={editToggle}
            setEditToggle={setEditToggle}
            currentCampaign={currentCampaign}
          />
          {/* Main campaigns table */}
          <CampaignTable
            existingCampaigns={existingCampaigns}
            setStoredCampaigns={setStoredCampaigns}
            open={open}
            setOpen={setOpen}
            showModal={showModal}
            setEditToggle={setEditToggle}
            currentCampaign={currentCampaign}
            setCurrentCampaign={setCurrentCampaign}
          />
        </div>
      </div>
    </>
  );
}

export default App;
