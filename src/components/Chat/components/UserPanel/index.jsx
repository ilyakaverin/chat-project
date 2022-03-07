import './style.css';

const UserPanel = ({users}) => {
    return (
        <>
        <div className="tui-panel  customWrap">
    <div className="tui-panel-header customHead">
        Online {users.length}
    </div>
    <div className="tui-panel-content">
        <ul>
            {
                users.map((user, index) => <li className="user" key={index}>{user}</li>)
            }
        </ul>
    </div>
</div>


        </>
    )
}
export default UserPanel