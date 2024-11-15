// DetailsPane.js
import React from "react";
import './App.css';

const DetailsPane = ({ dataFields }) => {
  return (
    <div className="details-pane">
      <h2>Details</h2>
      {dataFields.map((field, index) => (
        <p key={index}>
          <strong>{field.label}:</strong> {field.value !== null ? field.value : "Not available"}
        </p>
      ))}
      {/* <button className="export-btn">Export Materials Details</button> */}
    </div>
  );
};

export default DetailsPane;
