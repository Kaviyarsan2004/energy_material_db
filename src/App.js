import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'; 
import DetailsPane from './DetailsPane'; 
import ABX3_ML from './ABX3-ML';
import Home from "./Home";
import About from "./About";
import ABX3DFT from "./ABX3-DFT";
import A2B1B2X6 from "./A2B1B2X6";


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




// function Description() {
//   return (
//     <div className="description">
//       <p>CsSnI₃ is a cubic perovskite...</p>
//     </div>
//   );
// }


const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/materials">Materials</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="energy_material_db/">ABX3-DFT</Link>
            </li>
            <li>
              <Link to="/ABX3-ML">ABX3-ML</Link>
            </li>
            <li>
              <Link to="/A2B1B2X6">A2B1B2X6</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/Home" element={<Home />} />
          {/* <Route path="/materials" element={<Materials/>} /> */}
          {/* <Route path="/about" element={<About/>} /> */}
          <Route path="energy_material_db/" element={<ABX3DFT/>} /> 
          <Route path="/ABX3-ML" element={<ABX3_ML/>} />
          <Route path="/A2B1B2X6" element={<A2B1B2X6/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
