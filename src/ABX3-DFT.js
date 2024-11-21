import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import DetailsPane from './DetailsPane'; 
import './ABX3-DFT.css'; 


function MainViewer() {
  return (
    <div className="main-viewer">
      <img src="crystal_placeholder.png" alt="Crystal Structure" />
    </div>
  );
}

function ABX3DFT() {
  const [farmHavers, setFarmHavers] = useState([]);
  const [selectedHaver, setSelectedHaver] = useState("");
  const [formationEnergy, setFormationEnergy] = useState(null);
  const [chargeTransition, setChargeTransition] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);
  // const iframeRef = useRef(null);

  useEffect(() => {
    const fetchFarmHavers = async () => {
      try {
        const response = await axios.get("https://broken-lesya-ecd517-23c05196.koyeb.app/get-dopant");
        setFarmHavers(response.data);
        console.log(response.data)

      } catch (error) {
        console.error("Error fetching FARM havers get:", error);
      }
    };

    fetchFarmHavers();
  }, []);

  const handleSelection = async () => {
    const selectedHaverData = farmHavers.find(haver => haver.element === selectedHaver);

    setFormationEnergy(selectedHaverData.formation_energy); // Set the retrieved formation energy
    setChargeTransition(selectedHaverData.charge_transition); // Set the retrieved charge transition

    try {

      await axios.post("https://broken-lesya-ecd517-23c05196.koyeb.app/select-dopant", {
        element: selectedHaverData.element
      });

      // Update iframe key to force reload
      setIframeKey(prevKey => prevKey + 1);

    } catch (error) {
      console.error("Error selecting FARM haver:", error);
    }
  };

  return (
    <div>
      
      <div className="app">
        {/* <Sidebar /> */}
        <div className="farm-havers-container">
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
        </div>
        {/* <MainViewer /> */}
        <iframe
          key={iframeKey}  // Use iframeKey to reload iframe on change
          src="https://broken-lesya-ecd517-23c05196.koyeb.app/dash/"
          width="100%"
          height="600px"
          title="Dash Crystal Viewer"
          style={{ border: 'none' }}
        ></iframe>
        {/* <DetailsPane 
          formationEnergy={formationEnergy} 
          chargeTransition={chargeTransition} 
        /> */}

        <DetailsPane 
          dataFields={[
            { label: "Formation Energy", value: formationEnergy },
            { label: "chargeTransition", value: chargeTransition }
          ]}
        />

      </div>
    </div>
  );
}

export default ABX3DFT;
