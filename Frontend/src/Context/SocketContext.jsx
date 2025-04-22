import  { createContext, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContextProvider = ({ children }) => {


  useEffect(() => {
     // change URL as needed
    

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected.');
    });

   
  }, []);

//   const sendMessage = (eventName, message) => {
//     if (socket) {
//         console.log(`Sending message to server: ${eventName}`, message);
//       socket.emit(eventName, message);
//     }
//   };

//   const receiveMessage = (eventName, callback) => {
//     // if (socket) {
//     //   socket.on(eventName, callback);
//     //   return () => socket.off(eventName, callback);
//     // }
//     socket.on(eventName, callback);
//   };

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
