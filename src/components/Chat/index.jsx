import './style.css';
import UserPanel from './components/UserPanel';
import MessagePanel from './components/MessagePanel';
import InputPanel from './components/InputPanel';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Chat = (props) => {

    const navigate = useNavigate();

    useEffect(() => {

        if(!props.isEntered) {
            const currentHref = new URL(window.location.href);
            const getRoomId = currentHref.pathname.slice(1);
            navigate('/',{state: getRoomId})
        }
    });


    return (
      <div className="wrapper">
        <UserPanel users={props.users} />
        <div className="inner">
            <MessagePanel messages={props.messages} roomId={props.roomId} />
            <InputPanel username={props.username} roomId={props.roomId} onAddMessage={props.onAddMessage}  />
      </div>
      
      
   
      </div>
    )
}
export default Chat