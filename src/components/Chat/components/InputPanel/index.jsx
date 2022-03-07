import  './style.css';
import socket from '../../../../socket'
import { useState, useRef, useEffect } from 'react';
const InputPanel = ({username, roomId, onAddMessage }) => {
    const [messageValue, setMessageValue] = useState('');

    const ref = useRef(null);
    useEffect(() => {
        ref.current.focus()
    },[]);


    const sendMessage = () => {

        socket.emit('room NEW_MESSAGE', {
            text: messageValue,
            username,
            roomId
        });
        onAddMessage({
            text: messageValue,
            username,
        })
        setMessageValue('');
        ref.current.focus();

    }
    
    const handleSend = (e) => {

        e.preventDefault();
        sendMessage()

    }
    const handleKey = (e) => {

        if( e.key === 'Alt' && messageValue ) {
            e.preventDefault();
            sendMessage()
        }
    }

    return (
        <div  className="input">
            <form onSubmit={handleSend} onKeyDown={handleKey}  >
                <textarea ref={ref}  rows="5" value={messageValue} onChange={(e) => setMessageValue(e.target.value)}  />
                <button type="submit" className="tui-button send" disabled={!messageValue}>Send(press Alt or Command)</button>
            </form>
        </div>
    )
}
export default InputPanel