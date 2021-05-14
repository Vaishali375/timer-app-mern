import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Timer from "./Timer";
import TimerHistory from "./TimerHistory";

function App() {
  
  return (
    <Router>
      <div className="App">
          <Route path="/" exact component={Timer} />
          <Route path="/history" exact component={TimerHistory}/>
      </div>
    </Router>  
  );
}

export default App;