import './App.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DateSection from "./components/DateSection"
import Header from "./components/Header"
import "./styles/reset.scss";
function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />

        <main className="main">
          <div className="shiftCard">
            <DateSection /></div>


        </main>
      </div>

    </div>
  );
}

export default App;
