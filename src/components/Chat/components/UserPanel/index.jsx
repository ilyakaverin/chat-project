import "./style.css";

const UserPanel = ({ users }) => {
  return (
    <>
      <div className="tui-panel">
        <div className="tui-panel-header user-panel-header">
          Online {users.length}
        </div>
        <div className="tui-panel-content">
          <ul>
            {users.map((user, index) => (
              <li className="user" key={index}>
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
