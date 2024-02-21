import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CampaignTable from "./components/CampaignTable";
import CreateCampaign from "./components/CreateCampaign";
import initialCampaigns from "./seedData";
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
    // If no data exists, seed the initial data
    if (!localStorageData) {
      localStorage.setItem("campaigns", JSON.stringify(initialCampaigns));
      setStoredCampaigns(JSON.parse(initialCampaigns));
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
