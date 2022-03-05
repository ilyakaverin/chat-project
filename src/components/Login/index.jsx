import './style.css';
import socket from '../../socket'

const Login = ({socket}) => {

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(e.target)
    
      }
    return (
    <fieldset className="tui-fieldset">
        <legend>telegram killer</legend>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="room id" />
            <input type="text" placeholder="username" />
            <button type="submit" className="tui-button orange-168 white-text">join</button>
        </form>
    </fieldset>
     

  
    )
}
export default Login