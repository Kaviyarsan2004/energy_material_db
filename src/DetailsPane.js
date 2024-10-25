import React from "react";
import './material.css'; 

const DetailsPane = ({ formationEnergy, chargeTransition }) => {
  return (
    <div className="details-pane">
      <h2>Details</h2>
      {formationEnergy !== null ? (
        <p> <strong>Formation Energy:</strong> {formationEnergy} eV</p>
      ) : (
        <p><strong>Formation Energy: </strong>Not available</p>
      )}
      {chargeTransition !== null ? (
        <p> <strong>Charge Transition: </strong>{chargeTransition} (+/0) (eV)</p>
      ) : (
        <p>< strong>Charge Transition:</strong> Not available</p>
      )}
      <p><strong>Energy Above Hull:</strong> 0.000 eV/atom</p>
      <p><strong>Space Group:</strong> Pm3m</p>
      <p><strong>Band Gap:</strong> 0.45 eV</p>
      <p><strong>Predicted Formation Energy:</strong> -1.214 eV/atom</p>
      <p><strong>Magnetic Ordering:</strong> Non-magnetic</p>
      <p><strong>Total Magnetization:</strong> 0.00 μB/f.u.</p>
      <p><strong>Experimentally Observed:</strong> Yes</p>
      <button className="export-btn">Export Materials Details</button>
    </div>
  );
};

export default DetailsPane;
