import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CampaignTable from "./components/CampaignTable";
import CreateCampaign from "./components/CreateCampaign";
import { Button } from "antd";

function App() {
  const [storedCampaigns, setStoredCampaigns] = useState([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("campaigns");
    if (localStorageData) {
      setStoredCampaigns(JSON.parse(localStorageData));
    }
  }, []);

  // Define existingCampaigns based on storedCampaigns
  const existingCampaigns = storedCampaigns ? storedCampaigns : [];

  console.log(existingCampaigns);

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
          />
          {/* Main campaigns table */}
          <CampaignTable
            existingCampaigns={existingCampaigns}
            setStoredCampaigns={setStoredCampaigns}
          />
        </div>
      </div>
    </>
  );
}

export default App;
