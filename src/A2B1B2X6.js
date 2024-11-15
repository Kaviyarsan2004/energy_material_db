import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailsPane from "./DetailsPane";
import './A2B1B2X6.css';

const A2B1B2X6 = () => {
  const [farmHavers, setFarmHavers] = useState([]);
  const [selectedHaver, setSelectedHaver] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [bandGap, setFormationEnergy] = useState(null);

  const plotImageURL = `${process.env.PUBLIC_URL}/ca_sc.png`;

  useEffect(() => {
    const fetchDopants = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get-bandgap");
        setFarmHavers(response.data || []); // Default to empty array if response.data is undefined
      } catch (error) {
        console.error("Error fetching FARM havers:", error);
        setFarmHavers([]); // Set an empty array on error
      }
    };
    fetchDopants();
  }, []);

  const handleSelection = () => {
    const selectedHaverData = farmHavers.find((haver) => haver.Element === selectedHaver);
    if (selectedHaverData) {
      if (selectedModel === "RFR") {
        setFormationEnergy(selectedHaverData.RFR);
      } else if (selectedModel === "NN") {
        setFormationEnergy(selectedHaverData.NN);
      } else if (selectedModel === "GPR") {
        setFormationEnergy(selectedHaverData.GPR);
      }
    }
  };

  return (
    <div className="app">
      <div className="farm-havers-container">
        <h1>Bandgap</h1>

        {/* Host Material Selection */}
        <div className="select-container">
          <label htmlFor="host-material">Material</label>
          <select
              id="dopant-select"
              value={selectedHaver}
              onChange={(e) => setSelectedHaver(e.target.value)}
            >
              <option value="" disabled>Select</option>
              {farmHavers?.map((haver) => (
                <option key={haver._id} value={haver.Element}>
                  {haver.Element}
                </option>
              ))}
            </select>
        </div>

        {/* Model Selection */}
        <div className="select-container">
          <label htmlFor="model-select">Select Model</label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="" disabled>Select</option>
            <option value="RFR">RFR</option>
            <option value="NN">NN</option>
            <option value="GPR">GPR</option>
          </select>
        </div>

        <button onClick={handleSelection}>Select</button>
      </div>

      <div className="plot-image-container">
        <img 
          src={plotImageURL} 
          alt="Plot Screenshot" 
          width="100%" 
          height="600px" 
          style={{ border: "none" }} 
        />
      </div>
      <DetailsPane 
          dataFields={[
            { label: "Band Gap", value: bandGap }
          ]}
        />

      {/* <DetailsPane bandGap={formationEnergy} /> */}
      
    </div>
  );
};

export default A2B1B2X6;
