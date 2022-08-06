import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/api/ws");
    socket.addEventListener("close", () => {
      console.log("closed");
    });
    socket.addEventListener("error", (error) => {
      console.log("error", error);
    });
    socket.addEventListener("message", (data) => {
      setCounter(data.data)
    });
    socket.addEventListener("open", () => {
      console.log("Opened");
    });
  }, []);

  return (
    <div className="App">
      {counter}
    </div>
  );
}

export default App;
