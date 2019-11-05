import React from 'react';
import logo from './assets/logo.svg';
import reshuffle from './assets/reshuffle.png';
import plus from './assets/plus.png';
import './App.css';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"



function App() {
  return (
    <div >
      <SwaggerUI url="/swagger" />
    </div>
  );
}

export default App;
