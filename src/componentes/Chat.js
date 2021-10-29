import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "../App.css";
import moment from "moment";

const Chat = ({ nombre }) => {
    const [mensaje, setMensaje] = useState(""); //Mensaje que cada cliente escribe
    const [mensajes, setMensajes] = useState([]); //array con todos los msjes del chat

    useEffect(() => {
      socket.on('CHAT', (mensaje) => {
        setMensajes([...mensajes, mensaje]); //msje se agrega a la última posición del array
      });
  
      return () => {
        socket.off();
      };
    }, [mensajes]);

  
    const divRef = useRef(null);
    useEffect(() => {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    });

  
    // MANDAR MENSAJE EN CHAT
    const submit = (e) => {
      e.preventDefault();
      socket.emit('CHAT', {message: mensaje, name: nombre});
      setMensaje("");
    };
    
    return (
      <div>
        <div className="row">        
          <div className="column"></div>
          <h1> 1. Chat </h1>
            <div className="chat">
              {mensajes.map((e, i) => (
                <div key={i}>
                  <div>Nombre: {e.name}</div>
                  <div>{moment(new Date(e.date)).format('DD/MM/YYYY - hh:mm:ss')}</div>
                  <h4>{e.message}</h4>
                  <div> -----------------------------------------</div>
                  <br/>
                </div>
              ))}
              <div ref={divRef}></div>
            </div>
            <form onSubmit={submit}>
              <label className="intro" htmlFor="">Escriba su mensaje</label>
              <textarea
                name=""
                id=""
                cols="20"
                rows="2"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              ></textarea>
              <button className="button">Enviar</button> 
            </form>          

          <div className="column"></div>

        </div>
      </div>
    );
  };
  
  export default Chat;