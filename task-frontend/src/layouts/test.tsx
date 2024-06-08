import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const App: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [stompClient, setStompClient] = useState<any>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect(
      {},
      () => {
        client.subscribe("/topic/messages", (message: any) => {
          const receivedMessage = JSON.parse(message.body);
          // setMessages((prevMessages: any) => [
          //   ...prevMessages,
          //   receivedMessage,
          // ]);
          console.log(receivedMessage);
        });
      },
      (error) => {
        console.log("Failed to connect: ", error);
      }
    );

    setStompClient(client);

    return () => {
      client.disconnect(() => {});
    };
  }, []);

  return <div>App1111</div>;
};

export default App;
