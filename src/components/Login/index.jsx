import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setRoomId(location.state);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const object = {
      roomId: roomId,
      username: username,
    };
    setLoading(true);
    try {
      await axios.post("/rooms", object);
      onLogin(object);
      setError(null)
      navigate(`/${roomId}`, { state: null });
    } catch (e) {
      setLoading(false)
      setError(`${e.name}:${e.message}`);
    }
    
  };
  return (
    <div className="login-container">
    <div className="tui-window login-window">
      <fieldset className="tui-fieldset login-fieldset">
        <legend>Telegram killer</legend>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            maxLength="15"
            type="text"
            autoFocus
            placeholder="room id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="login-input"
          />
          <input
            maxLength="15"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <button
            type="submit"
            className="tui-button orange-168 white-text login-button"
            disabled={!roomId || !username || isLoading}
          >
            { isLoading ? "Entering" : "Join" }
          </button>
        </form>
      </fieldset>
    </div>
    { error ? <div className="login-error">{ error }</div> : null }
    </div>
  );
};
export default Login;
