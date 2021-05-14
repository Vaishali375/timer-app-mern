import React,{useState, useEffect} from 'react';
import "./TimerHistory.css";
import axios from "./axios.js";
import {useHistory} from "react-router-dom";

function TimerHistory() {

    const [histories, setHistories] = useState([]);
    const history = useHistory();

    useEffect(() => {
      axios.get("/history/sync").then(respose =>{
        setHistories(respose.data);
      });
    }, []);


    return (
        <div className="timerHistory">
            <div className="nav">
              <button className="navbar-button" onClick={() => history.push("/")}>Back to Home</button>
            </div>
            <h1>Action History</h1>
            <div className="table">
            <table>
               <thead>
                 <tr>
                    <th>SrNo.</th>
                    <th>Action</th>
                    <th>State of Timer</th>
                    <th>Date&Time</th>
                 </tr>
              </thead>
              {histories.map((event, index) =>(
                <tbody>
                  <tr>
                    <td>{index+1}</td>
                    <td>{event.action}</td>
                    <td>{event.stateOfTimer}</td>
                    <td>{event.timestamp}</td>
                   </tr>
                </tbody>
              ))}
              
            </table>
            </div>
        </div>
    )
}

export default TimerHistory
