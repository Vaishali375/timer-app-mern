import React, { useState, useEffect } from "react";
import './Timer.css';
import axios from "./axios.js";
import {useHistory} from "react-router-dom";

function App() {
  
  const [isActive, setIsActive] = useState(false);
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [second, setSecond] = useState('00');
  const [milisecond, setMilisecond] = useState('00');
  const [counter, setCounter] = useState(0);
  const [stop, setStop] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let intervalId;

    if (isActive && stop === false) {
      intervalId = setInterval(() => {
        const milisecondCounter = counter % 1000;  
        const secondCounter = Math.floor((counter % (1000 * 60)) / 1000);
        const minuteCounter = Math.floor((counter % (1000 * 60 * 60))/ (60 * 1000));
        const hourCounter = Math.floor((counter % (1000 * 60 * 60)) / (3600 * 1000));
        

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
        const computedHour = String( hourCounter).length === 1 ? `0${ hourCounter}`: hourCounter;
        const computedMilisecond = String(milisecondCounter).length === 1 ? `0${milisecondCounter}` : milisecondCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHour(computedHour );
        setMilisecond(computedMilisecond)

        setCounter(counter => counter + 10);
      }, 10)
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter])

  
  function handleStart(){
    setIsActive(true);
    setStop(false); 
  };
  function handleStop(){
    setIsActive(false);
    setStop(true);
  };
  function handleReset(){
    setIsActive(false);
    setCounter(0);
    setSecond('00');
    setHour('00');
    setMinute('00');
    setMilisecond('00');
  };

  async function onClick(e){
    e.preventDefault();
    axios.post('/history/new', {
      action: e.target.innerHTML,
      stateOfTimer:`${hour}:${minute}:${second}:${milisecond}`,
      timestamp: new Date().toLocaleString()
    });

  }
  

  
  return (
    <div className="mainTimer">
      <div className="navbar" >
          <h1>Timer</h1>
          <button onClick={() => history.push("/history")}>Vie History</button>
      </div>
      <div className="Timer">
          <div className="timer">
            <h1 className="digits">
               {hour}:
            </h1>
            <h1 className="digits">
             {minute}:
            </h1>
            <h1 className="digits">
             {second}:
            </h1>
            <h1 className="digits">
             {milisecond}
            </h1>
           </div>
           <div className="image">
               <img src="https://images.freeimages.com/images/premium/large-thumbs/4822/48229682-clock-without-numbers-isolated-on-white-background.jpg" alt="" />
           </div>
           <div className="Control-Buttons">
               
               <div className="btn-grp">
                  <div className="btn btn-one btn-start"
                       onClick={(e) => {handleStart(); onClick(e);}}>
                          Start
                   </div>
                   <div className="btn btn-two" 
                        onClick={(e) => {handleReset(); onClick(e);}}>
                         Reset
                   </div>
                   <div className="btn btn-two" 
                        onClick={(e) => {handleStop(); onClick(e);}}>
                        Stop
                   </div>
                 </div>
            </div>
        </div>
    </div>
  );
}

export default App;