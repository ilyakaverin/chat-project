import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';
import { useReducer, useEffect } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import reducer from './reducer';
import socket from './socket';
import axios from 'axios';

function App() {

  const [state, dispatch] = useReducer(reducer, {
    isEntered: false,
    roomId: null,
    username: null,
    users: [],
    messages: []
  });

  const handleLogin = async (object) => {
    dispatch({
      type: 'ENTERED',
      payload: object
    }); // join room
    socket.emit('room join', object); // connect to socket
    const { data } = await axios.get(`/rooms/${object.roomId}`); // get actual room and users

    dispatch({
      type: 'SET_DATA',
      payload: data
    })

  } 
  console.log(state);

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })

  }
  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message

    })
  }
  
  useEffect(() => {
    socket.on('room SET_USERS', setUsers)
    socket.on('room NEW_MESSAGE', addMessage)

  },[])


  
  


  return (
<>
<BrowserRouter>
   <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path=":roomId" element={<Chat {...state} onAddMessage={addMessage} />} />
    </Routes>
 </BrowserRouter>
 </>
    
  )
}

export default App;
