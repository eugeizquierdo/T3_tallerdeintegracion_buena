import React, { useState } from "react";
import Chat from "./componentes/Chat";
import Trucks from "./componentes/Trucks"
import Map from "./componentes/Map"
import "./App.css";


function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Centro de Control</h1>
        <h2>Flota de camiones mineros</h2>
        <p> 1. Chat - 2. Informacion Camiones - 3. Mapa </p>
      </div>
      <br/>
      <br/>

      {!registrado && (
        <form onSubmit={registrar}>
          <label className="intro" htmlFor="">Introduzca su nickname</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <br/>
          <br/>
          <button className="button">Ir al centro de control</button>
          {/* <button>Ir al centro de control</button> */}
        </form>
      )}

      {registrado && <Chat nombre={nombre} />}
        <br/>
        <br/>
        <br/>
      <div className="column"></div>
      <Trucks />
        <br/>
        <br/>
        <br/>
      <Map/>
      </div>
  );
}

export default App;