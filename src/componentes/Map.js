import React, { useState, useEffect } from "react";
import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import io from 'socket.io-client';

// Conexion socket
const socket = io("wss://tarea-3-websocket.2021-2.tallerdeintegracion.cl",
{
  path: "/trucks/"
});


const Map = () => {
   
    //RECIBIR POSICION ACTUAL CAMION
    /*
    {
      code: String,
      position: [Float, Float]
    }
    */
    const [positions, setPositions] = useState([]); //array con todas las posiciones
    useEffect(() => {
      socket.on('POSITION', (position) => {
        setPositions(position); //reemplazo la posición
      });
  
      return () => {
        socket.off();
      };
    }, [positions]);
    

return (
    <div>
        <h1>3. Mapa Flota de Camiones</h1>

        {/* whenCreated={map => setMap(map)}  va al final de linea sgte*/}
        <MapContainer center={[-21.917426, -68.826737]} zoom={13} style={{ height: '100vh', width: '100wh' }} scrollWheelZoom={false} >
        {/* <MapContainer center={[origin_position[0], origin_position[1]]} zoom={13} style={{ height: '100vh', width: '100wh' }} scrollWheelZoom={false} > */}
        <TileLayer
            attribution='&copy; <a 
            href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[origin_position[0], origin_position[1]]}> */}
        <Marker position={[-21.917426, -68.826737]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>
    </div>

  );
};

export default Map;