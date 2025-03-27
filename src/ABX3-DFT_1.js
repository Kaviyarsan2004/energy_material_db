import React, { useState, useEffect } from 'react';
import axios from "axios";
import DetailsPane from './DetailsPane'; 
import './ABX3-DFT.css'; 



const DropdownForm = () => {
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedValue, setSelectedValue] = useState('0'); // New state for the second dropdown
  const [formationEnergy, setFormationEnergy] = useState(null); // State to store the response

  // Fetch dropdown data from API on component mount
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
    } catch (error) {
      console.error('Error fetching formation energy:', error);
      setFormationEnergy({ error: 'Error fetching formation energy.' });
    }
  };

  return (
    <div>
      <label htmlFor="dropdown">Select Dopant:</label>
      <select id="dropdown" value={selectedOption} onChange={handleDopantChange} required>
        <option value="">--Select--</option>
        {dropdownData.map((item, index) => (
          <option key={index} value={item.Dopants}>
            {item.Dopants}
          </option>
        ))}
      </select>

      <div>
        <label htmlFor="valueDropdown">Select Value:</label>
        <select
          id="valueDropdown"
          value={selectedValue}
          onChange={handleValueChange}
        >
          <option value="0">0</option>
          <option value="1">1</option>
        </select>
      </div>

      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {formationEnergy && (
        <div>
          <h3>Formation Energy Response:</h3>
          <pre>{JSON.stringify(formationEnergy, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DropdownForm;