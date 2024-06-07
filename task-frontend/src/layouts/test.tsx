import React, { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const App: React.FC = () => {
  // const socketRef = useRef<Socket | null>(null);

  // useEffect(() => {
  //   const socket = io("http://localhost:9092/chat?token=abc123", {
  //     transports: ["polling", "websocket"],
  //   });
  //   socketRef.current = socket;

  //   socket.on("connect", () => {
  //     console.log("Connected to the server");
  //   });

  //   socket.on("connect_error", (error: any) => {
  //     console.log("Failed to connect to the server", error);
  //   });

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.disconnect();
  //     }
  //   };
  // }, []);

  return <div>App</div>;
};

export default App;
