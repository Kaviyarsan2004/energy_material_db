import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

function App() {
  const [farmHavers, setFarmHavers] = useState([]);
  const [selectedHaver, setSelectedHaver] = useState("");
  const [formationEnergy, setFormationEnergy] = useState(null); 
  const [chargeTransition, setChargeTransition] = useState(null); 

  useEffect(() => {
    const fetchFarmHavers = async () => {
      try {
        const response = await axios.get("https://energy-material-backend.onrender.com/get-dopant");
        setFarmHavers(response.data);
      } catch (error) {
        console.error("Error fetching FARM havers:", error);
      }
    };

    fetchFarmHavers();
  }, []);

  const handleSelection = async () => {
      const selectedHaverData = farmHavers.find(haver => haver.element === selectedHaver);

      setFormationEnergy(selectedHaverData.formation_energy); // Set the retrieved formation energy
      setChargeTransition(selectedHaverData.charge_transition); // Set the retrieved charge transition
      console.log(selectedHaverData.element)
      
      console.log("Sending data to Dash:", {
        element: selectedHaverData.element,
        formationEnergy: selectedHaverData.formation_energy,
        charge_transition: selectedHaverData.charge_transition,
    });

    try {
      await axios.post("https://energy-material-backend.onrender.com/get-dopant", {
          element: selectedHaverData.element,
          formationEnergy: selectedHaverData.formation_energy,
          charge_transition: selectedHaverData.charge_transition,
      });
  } catch (error) {
      console.error("Error selecting FARM haver:", error);
  }
    
  };

  return (
    <div className="App">
      <h1>Defected Formation Energy</h1>
      <div className="select-container">
        <label htmlFor="host-material">Host Material</label>
        <select>
          <option value="" disabled>Select</option>
          <option value="CsSnI3">CsSnI3</option>
        </select>
      </div>

      <div className="select-container">
        <label htmlFor="host-material">Select Dopant</label>
        <select
          value={selectedHaver}
          onChange={(e) => setSelectedHaver(e.target.value)}
        >
          <option value="" disabled>Select</option>
          {farmHavers.map((haver) => (
            <option key={haver.element} value={haver.element}>
              {haver.element}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSelection}>Select</button>

      {/* Display Formation Energy */}
      {formationEnergy !== null && (
        <div>
          <h2>Formation Energy: {formationEnergy} eV</h2>
        </div>
      )}

      {chargeTransition !== null && (
        <div>
          <h2>Charge Transition: {chargeTransition} (+/0) (eV)</h2>
        </div>
      )}
      
      <h1>Crystal Structure Viewer</h1>
      <div>
        <iframe
          src={`http://localhost:8050`}
          width="100%"
          height="600px"
          title="Dash Crystal Viewer"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
