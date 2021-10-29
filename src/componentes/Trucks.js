import React, { useState, useEffect } from "react";
// import socket from "./Socket";
import "../trucks.css";

import io from 'socket.io-client';

// Conexion socket
const socket = io("wss://tarea-3-websocket.2021-2.tallerdeintegracion.cl",
{
  path: "/trucks/"
});


const Trucks = () => {
    const [trucks, setTrucks] = useState([]); 
    const [dic_fallas] = useState({});

    const submit = (e) => {
        e.preventDefault();
        socket.emit('TRUCKS');
        console.log("Pidiendo información trucks");
    };
      
    useEffect(() => {
    socket.on('TRUCKS', (truck) => {
        console.log(truck[0])
        setTrucks(truck); 
        console.log("Recibiendo información trucks");
    });

    socket.on('FAILURE', (falla) => {
        dic_fallas[falla.code] = falla.source;
        console.log("Fallas", dic_fallas)
      })
  
    socket.on('FIX', (arreglo) => {
    if (dic_fallas[arreglo.code]){
        delete dic_fallas[arreglo.code];
    }
    console.log("Fallas después de arreglos", dic_fallas)
    })

    return () => {
        socket.off();
    };
    }, [trucks, dic_fallas]);

    return (
        <div className="informacion">
        <h1> 2. Informacion camiones </h1>
        <form onSubmit={submit}>
              <button className="button">Actualizar</button> 
        </form>   

        {trucks.map((e, i) => (
            <div key={i}>
                <h3> INFORMACION CAMION {i+1} </h3>
                <div>- Code: {e.code}</div>
                <div>- Engine: {e.engine}</div>
                <div>- Capacity: {e.capacity}</div>
                <div>- Lat origin: {e.origin[0]}</div>
                <div>- Long origin: {e.origin[1]}</div>
                <div>- Lat dest: {e.destination[0]}</div>
                <div>- Long dest: {e.destination[1]}</div>
                
                <div>- Staff: </div>
                <div>{e.staff.map((e, i) => (
                    <div key={i}>
                        <div>Nombre: {e.name} - Edad: {e.age}</div>
                    </div>
                    ))
                }</div>

                <div>- Truck: {e.truck}</div>

                <h5>¿Tiene falla? </h5>
                    {e.code in dic_fallas &&
                        <div> Sí, el motivo es: {dic_fallas[e.code]} </div> 
                    }
                    {!(e.code in dic_fallas) &&
                        <div> No :D </div> 
                    }
                <br/>

                </div>
                ))}
            </div>
    )
}

export default Trucks;