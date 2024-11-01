import React, { useState } from "react";


const A2B1B2X6 = () => {
  // State for form inputs and API response
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example API call
    //   const response = await fetch(`https://your-api.com/data?A=${inputA}&B=${inputB}`);
      const response = await fetch(`http://127.0.0.1:8000/get-bandgap`);
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      console.log(data)
      setApiData(data);
      setError(null);  // Clear any previous error
    } catch (err) {
      setError("Failed to fetch data");
      setApiData(null);
    }
  };

  return (
    <div>
      <h1>Bandgap Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputA">Input A:</label>
          <input
            type="text"
            id="inputA"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            placeholder="Enter value for A"
          />
        </div>

        <div>
          <label htmlFor="inputB">Input B:</label>
          <input
            type="text"
            id="inputB"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            placeholder="Enter value for B"
          />
        </div>

        <button type="submit">Fetch Data</button>
      </form>

      {/* Display the API Data */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {apiData && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default A2B1B2X6;
