import React, { useState, useEffect } from 'react';
import axios from "axios";
import DetailsPane from './DetailsPane'; 
import './ABX3-DFT.css'; 

function ABX3DFT() {
  const [chargeTransition, setChargeTransition] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [selectedHost, setSelectedHost] = useState("CsSnI3");
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedValue, setSelectedValue] = useState('0'); // New state for the second dropdown
  const [formationEnergy, setFormationEnergy] = useState(null);

  useEffect(() => {
      // Replace this URL with your actual API endpoint
      axios.get('https://decent-valida-ecd517-adb7246d.koyeb.app/get-dopant')
        .then(response => {
          // Assuming the response is an array like [{ Dopants: "Nb_Cs" }, ...]
          setDropdownData(response.data);
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    const handleDopantChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleValueChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const handleSubmit = async () => {
      console.log('Selected Dopant:', selectedOption);
      console.log('Selected Value:', selectedValue);

      // Call the /get_formation_energy API
      try {
        const response = await axios.get('https://decent-valida-ecd517-adb7246d.koyeb.app/get_formation_energy', {
          params: {
            dopant: selectedOption,
            charge_state: selectedValue,
          },
        });

        setFormationEnergy(response.data);
        setIframeKey(prevKey => prevKey + 100);
      } catch (error) {
        console.error('Error fetching formation energy:', error);
        setFormationEnergy({ error: 'Error fetching formation energy.' });
        setIframeKey(prevKey => prevKey + 50);
      }
    };
 
  
    return (
      <div className="app">
        <div className="farm-havers-container">
          <h1>Defected Formation Energy</h1>
    
          <div className="select-container">
            <label>Host Material</label>
            <select value={selectedHost} onChange={(e) => setSelectedHost(e.target.value)}>
              <option value="CsSnI3">CsSnI3</option>
            </select>
          </div>
    
          <div className="select-container">
            <label>Select Dopant</label>
            <select id="dropdown" value={selectedOption} onChange={handleDopantChange} required>
              <option value="" disabled>Select</option>
              {dropdownData.map((item, index) => (
                <option key={index} value={item.Dopants}>
                  {item.Dopants}
                </option>
              ))}
            </select>
          </div>
    
          <div className="select-container">
            <label>Select Charge State</label>
            <select
              id="valueDropdown"
              value={selectedValue}
              onChange={handleValueChange}
            >
              <option value="0">0</option>
              <option value="1">1</option>
            </select>
          </div>
    
          <button onClick={handleSubmit}>Select</button>
        </div>
    
        {/* Adjust the height of the iframe to reduce its space */}
        <iframe
          key={iframeKey}
          src="https://decent-valida-ecd517-adb7246d.koyeb.app/dash/"
          
          title="Dash Crystal Viewer"
        
        ></iframe>

    
        <div>
          <h1>Formation Energy</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(formationEnergy ?? {}).map(([key, value]) => (
              <div key={key} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                <strong>{key}</strong>: {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default ABX3DFT;
