import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import moment from "moment";
// import 'leaflet/dist/leaflet.css';


const Chat = ({ nombre }) => {
    const [mensaje, setMensaje] = useState(""); //Mensaje que cada cliente escribe
    const [mensajes, setMensajes] = useState([]); //array con todos los msjes del chat
  
    // useEffect(() => {
    //   socket.emit("conectado", nombre); //enviamos el nombre del usuario al servidor
    // }, [nombre]);

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
      // socket.emit("mensaje", nombre, mensaje);
      socket.emit('CHAT', {message: mensaje, name: nombre});
      setMensaje("");
    };

    //FAILURE
    /*
      {
      code: String
      source: String
      }

    */
  //FALLAS CAMIONES

    const [dic_fallas, setFailures] = useState({});

    useEffect(() => {
      socket.on('FAILURE', (falla) => {
        dic_fallas[falla.code] = falla.source;
        console.log("DIC FALLAS", dic_fallas)
      })

      socket.on('FIX', (arreglo) => {
        if (dic_fallas[arreglo.code]){
          delete dic_fallas[arreglo.code];
        }
        console.log("DIC FALLAS con arreglos", dic_fallas)
      })

  
      return () => {
        socket.off();
      };
    }, [dic_fallas]);

   //////////////////////////

    //FIX
    /*
      {
      code: String
      }

    */
    
    // const [fix, setFix] = useState(""); //Mensaje que cada cliente escribe
    // const [fixes, setFixes] = useState([]); //array con todos los msjes del chat

    // useEffect(() => {
    //   socket.on('FIX', (fix) => {
    //     setMensajes([...fixes, fix]); //msje se agrega a la última posición del array
    //   });
  
    //   return () => {
    //     socket.off();
    //   };
    // }, [fixes]);

    // const submit_fix = (e) => {
    //   e.preventDefault();
    //   socket.emit('FIX', {code: fix});
    //   setMensaje("");
    // };

    //RECIBIR INFORMACION CAMIONES
    /*
    [{
      code: String,
      origin: [Float, Float] ,
      destination: [Float, Float],
      driver_name: String,
      status: String
      }]
    */ 

      // const [trucks, setTrucks] = useState([]); //array con todos los msjes del chat
      
      // useEffect(() => {
      //   socket.emit('TRUCKS'); //señal que gatilla
      //   socket.on('TRUCKS', (truck) => {
      //     console.log("1", truck[0]);
      //     console.log("2", truck[1]);
      //     console.log("3", truck[2]);
      //     console.log("4", truck[3]['origin']);
      //     console.log("5", truck[4]);
      //     setTrucks([...trucks, truck]); //msje se agrega a la última posición del array
      //   });
    
      //   return () => {
      //     socket.off();
      //   };
      // }, [trucks]);
  
    
      // const divRef = useRef(null);
      // useEffect(() => {
      //   divRef.current.scrollIntoView({ behavior: "smooth" });
      // });
    
    /////////////////////////
    // const origin_position = [];
    // // const [origen, setOrigen] = useState(""); //Mensaje que cada cliente escribe
    // // const [origenes, setOrigenes] = useState([]); //array con todos los msjes del chat

    // useEffect(() => {
    //   var dict_trucks = {}; //dict vacio para recibir señales
    //   socket.emit('TRUCKS'); //señal que gatilla
    //   socket.once('TRUCKS', (trucks) => {
    //     console.log(trucks.length);
    //     for (let step = 0; step < trucks.length; step++) {
    //       if (origin_position.length =! 0);
    //         origin_position.shift();

    //       // console.log(trucks[step]);
    //       // //Agregar origen y destino a mapa
    //       dict_trucks[step] = trucks[step];
    //       // console.log(dict_trucks);
    //       // const codigo = dict_trucks[step]['code'];
    //       // console.log(codigo);
    //       const lat_origin = dict_trucks[step]['origin'][0];
    //       console.log(lat_origin);
    //       const long_origin = dict_trucks[step]['origin'][1];
    //       console.log(long_origin);

    //       origin_position.push(lat_origin, long_origin);
    //       console.log(origin_position);
    //       // setOrigenes([...origenes, trucks[step]]);
    //       // console.log(trucks[step]);
    //     }
    //     // console.log(trucks[0]['origin']);
    //     // dict_trucks[0] = trucks;
    //     // console.log(dict_trucks['code']);
    //     // console.log(dict_trucks['origin']);
    //     // // dict_trucks = trucks;
    //     // console.log(info);
    //     // console.log(origin);
    //     // console.log(destination);
    //     // console.log(informacion.origin);
    //   });
  
    //   return () => {
    //     socket.off();
    //   };
    // }, [origin_position] );

    //RECIBIR POSICION ACTUAL CAMION
    /*
    {
      code: String,
      position: [Float, Float]
    }
    */
    // const [position, setPosition] = useState("");
    // const [positions, setPositions] = useState([]); //array con todas las posiciones

    // useEffect(() => {
    //   socket.on('POSITION', (position) => {
    //     setPositions([...positions, position]); //posicion se agrega a la última posición del array
    //   });
  
    //   return () => {
    //     socket.off();
    //   };
    // }, [positions]);
    // const [setMap] = useState(null);


    return (
      <div>
        <div className="row">
          <div className="column"></div>
            <h1>Mapa Flota de Camiones</h1>

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

          {/* <div className="column"></div> */}
        
          <div className="column"></div>
          <h1> Chat </h1>
            <div className="chat">
              {mensajes.map((e, i) => (
                <div key={i}>
                  <div>Nombre: {e.name}</div>
                  <div>{moment(new Date(e.date)).format('DD/MM/YYYY - hh:mm:ss')}</div>
                  <p>{e.message}</p>
                  <div> -----------------------------------------</div>
                  <br/>
                  {/* <div>{e.date}</div> */}
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

          {/* <div className="column"></div>
          <div className="informacion">
            <h1>--- Informacion camiones --- </h1>
            .map de todos los camiones e imprmimir todos los atributos. Comparar atributos: si es que el atributo de code existe en dic, lo imprime
            {trucks.map((e, i) => (
                <div key={i}>
                  <div>{e.code}</div>
                  <div>{e.origin}</div>
                  <div>{e.driver_name}</div>
                </div>
              ))}
          </div> */}

          
          {/* <div className="column"></div> */}
          {/* <div className="informacion">
            <h1>--- Fallas camiones --- </h1>
            .map de todos los camiones e imprmimir todos los atributos. Comparar atributos: si es que el atributo de code existe en dic, lo imprime
              
              {keys = Object.keys(dic_fallas)}
              {last = keys[keys.length-1]}
              <div>Código Camión: {last}</div>
              <br/>

              <div ref={divRef}></div>
          </div> */}


          {/* <h1>--- Fix --- </h1>
            <div className="fix">
              {fixes.map((e, i) => (
                <div key={i}>
                  <div>{e.code}</div>
                </div>
              ))}
              <div ref={divRef}></div>
            </div>
            <form onSubmit={submit_fix}>
              <label htmlFor="">Arreglar</label>
              <textarea
                name=""
                id=""
                cols="20"
                rows="2"
                value={mensaje}
                onChange={(e) => setFix(e.target.value)}
              ></textarea>
              <button>Enviar</button> 
            </form>           */}

          {/* <div className="column"></div> */}

        </div>
      </div>
    );
  };
  
  export default Chat;