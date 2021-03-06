import "./style.css";
import { useRef, useEffect } from "react";

const MessagePanel = ({ messages, roomId }) => {
  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [messages]);
  return (
    <div ref={messagesRef} className="outer-messages">
      <div className="message-header">Room: {roomId}</div>
      <div className="inner-messages">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            <span className="red-168-text">{message.username}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MessagePanel;
