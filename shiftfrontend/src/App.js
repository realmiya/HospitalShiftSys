import './App.scss';
import React from 'react';
import CardSection from "./components/CardSection"
import Header from "./components/Header"
import "./styles/reset.scss";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />

        <main className="main">

          <div className="shiftCard">
            <div className="inviteText">
              <div className="header1">Shifts</div>
              <div className="subtitle">You've been invited</div>
            </div>

            <CardSection />
          </div>


        </main>
      </div>

    </div>
  );
}

export default App;
