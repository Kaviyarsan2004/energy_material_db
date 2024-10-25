import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './material.css'; 
import DetailsPane from './DetailsPane'; 

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-items">
        <li className="nav-item"><a href="#home">Home</a></li>
        <li className="nav-item"><a href="#materials">Materials</a></li>
        <li className="nav-item"><a href="#about">About</a></li>
        <li className="nav-item"><a href="#ABX3-DFT">ABX3-DFT</a></li>
        <li className="nav-item"><a href="#ABX3-ML">ABX3-ML</a></li>
        <li className="nav-item"><a href="#A2B1B2X6">A2B1B2X6</a></li>
      </ul>
    </nav>
  );
}


// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <ul>
//         <li>Summary</li>
//         <li>Crystal Structure</li>
//         <li>Properties</li>
//         <li>Contributed Data</li>
//         <li>Literature References</li>
//         <li>External Links</li>
//       </ul>
//     </div>
//   );
// }

function MainViewer() {
  return (
    <div className="main-viewer">
      <img src="crystal_placeholder.png" alt="Crystal Structure" />
    </div>
  );
}


// function Description() {
//   return (
//     <div className="description">
//       <p>CsSnI₃ is a cubic perovskite...</p>
//     </div>
//   );
// }

function App() {
  const [farmHavers, setFarmHavers] = useState([]);
  const [selectedHaver, setSelectedHaver] = useState("");
  const [formationEnergy, setFormationEnergy] = useState(null);
  const [chargeTransition, setChargeTransition] = useState(null);

  useEffect(() => {
    const fetchFarmHavers = async () => {
      try {
        const response = await axios.get("https://unable-shaylyn-ecd517-b88b5a87.koyeb.app/get-dopant");
        setFarmHavers(response.data);
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
      await axios.post("https://unable-shaylyn-ecd517-b88b5a87.koyeb.app/get-dopant", {
        element: selectedHaverData.element,
        formationEnergy: selectedHaverData.formation_energy,
        charge_transition: selectedHaverData.charge_transition,
      });
    } catch (error) {
      console.error("Error selecting FARM haver post:", error);
    }
  };

  return (
    <div>
      <NavBar />
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
        <MainViewer />
        <DetailsPane 
          formationEnergy={formationEnergy} 
          chargeTransition={chargeTransition} 
        />
      </div>
    </div>
  );
}

export default App;
