import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CampaignTable from "./components/CampaignTable";
import CreateCampaign from "./components/CreateCampaign";
import initialCampaigns from "./utils/seedData";
import { Spin } from "antd";

function App() {
  const [storedCampaigns, setStoredCampaigns] = useState([]);
  const [open, setOpen] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localStorageData = localStorage.getItem("campaigns");
    if (localStorageData) {
      setStoredCampaigns(JSON.parse(localStorageData));
    }
    // If there's no data in local storage, seed some initial data so the table isn't empty
    if (!localStorageData) {
      localStorage.setItem("campaigns", JSON.stringify(initialCampaigns));
      setStoredCampaigns(initialCampaigns);
    }
    setLoading(false);
  }, []);

  const existingCampaigns = storedCampaigns || [];

  const showModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="content-right">
          {loading ? (
            <div className="spinner-container">
              <Spin size="large" />
            </div>
          ) : (
            <>
              {/* Modal form */}
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
