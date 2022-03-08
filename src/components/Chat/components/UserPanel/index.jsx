import "./style.css";
import { useNavigate } from "react-router-dom";

const UserPanel = ({ users }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <div className="tui-panel">
        <div className="tui-panel-header user-panel-header">
          <span>Online {users.length}</span>
          <button onClick={handleLogout} className="user-panel-button">
            Exit
          </button>
        </div>
        <div className="tui-panel-content">
          <ul>
            {users.map((user, index) => (
              <li className="user-panel-user" key={index}>
                {user}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default UserPanel;
