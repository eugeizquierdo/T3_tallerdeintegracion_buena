import io from 'socket.io-client';

// Conexion socket
const socket = io("wss://tarea-3-websocket.2021-2.tallerdeintegracion.cl",
{
  path: "/trucks/"
});

export default socket;