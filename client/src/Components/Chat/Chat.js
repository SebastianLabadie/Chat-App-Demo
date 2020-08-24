import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
/* 
import TextContainer from '../TextContainer/TextContainer';*/
import Messages from '../Messages/Messages';
import Input from '../Input/Input'; 
import InfoBar from "../InfoBar/InfoBar";
import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:4000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message,messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
