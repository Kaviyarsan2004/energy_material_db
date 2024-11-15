import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailsPane from "./DetailsPane"; // Assuming you have a DetailsPane component to display values
import './ABX3-ML.css';

const ABX3_ML = () => {
  // State for API data and selections
  const [farmHavers, setFarmHavers] = useState([]); // Data fetched from API
  const [selectedHaver, setSelectedHaver] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [formationEnergy, setFormationEnergy] = useState(null);
  const [iframeKey, setIframeKey] = useState(0); // Key to reload iframe

  const plotImageURL = `${process.env.PUBLIC_URL}/ca_sc.png`;

  // Fetch data on mount
  useEffect(() => {
    const fetchDopants = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get-ML");
        setFarmHavers(response.data); // Assuming response data is an array of dopants
        console.log(response)
      } catch (error) {
        console.error("Error fetching FARM havers:", error);
      }
    };
    fetchDopants();
  }, []);

  // Update displayed data based on selected Dopant and Model
  const handleSelection = () => {
    const selectedHaverData = farmHavers.find((haver) => haver.Dopant === selectedHaver);
    console.log(selectedHaverData)
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
        <h1>Predicted Formation Energy</h1>

        {/* Host Material Selection */}
        <div className="select-container">
          <label htmlFor="host-material">Host Material</label>
          <select>
            <option value="" disabled>Select</option>
            <option value="CsSnI3">CsSnI3</option>
          </select>
        </div>

        {/* Dopant Selection */}
        <div className="select-container">
          <label htmlFor="dopant-select">Select Dopant</label>
          <select
            id="dopant-select"
            value={selectedHaver}
            onChange={(e) => setSelectedHaver(e.target.value)}
          >
            <option value="" disabled>Select</option>
            {farmHavers.map((haver) => (
              <option key={haver._id} value={haver.Dopant}>
                {haver.Dopant}
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
            {/* Details Pane for displaying selected values */}


      <div className="plot-image-container">
        <img 
          src={plotImageURL} 
          alt="Plot Screenshot" 
          width="100%" 
          height="600px" 
          style={{ border: "none" }} 
        />
      </div>
      {/* <DetailsPane 
        formationEnergy={formationEnergy}
      /> */}

    <DetailsPane 
      dataFields={[
        { label: "Formation Energy", value: formationEnergy }
      ]}
    />


    </div>
  );
};

export default ABX3_ML;
