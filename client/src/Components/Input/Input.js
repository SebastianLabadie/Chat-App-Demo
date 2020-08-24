import React from "react";
import'./Input.css'

const Input = ({message,setMessage,sendMessage}) => {
  return (
    <form>
      <input type="text"
      className="input"
      placeholder="Type a message...."
      value={message}
      onChange={(e)=> setMessage(e.target.value)}
        onKeyPress={(e)=> e.key === 'ENTER' ? sendMessage(e) : null }
      />
      <button className="sendButton" onClick={(e)=>sendMessage(e)}>Send</button>
    </form>
  );
};

export default Input;
