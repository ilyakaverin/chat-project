import "./style.css";
import socket from "../../../../socket";
import { useState, useRef, useEffect } from "react";
const InputPanel = ({ username, roomId, onAddMessage }) => {
    const init = {
        message: "",
        typing: false
    }
  const [messageValue, setMessageValue] = useState(init);

  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  
  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("room NEW_MESSAGE", {
        text: messageValue.message,
        username,
        roomId,
      });
      onAddMessage({
        text: messageValue.message,
        username,
      });
      setMessageValue(init);
      ref.current.focus();
  };
  return (
    <div className="input-wrapper">
      <form onSubmit={handleSend} >
        <input
          className="user-input-message"
          ref={ref}
          placeholder="type message here"
          value={messageValue.message}
          onChange={(e) => setMessageValue(prevState =>({
              ...prevState,
              message: e.target.value,
              typing: true
          }))}
        />
        <button
          type="submit"
          className="tui-button user-input-button"
          disabled={!messageValue.message}
        >
          Send(press Enter)
        </button>
      </form>
    </div>
  );
};
export default InputPanel;
