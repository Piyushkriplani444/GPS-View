
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar= ()=>{
     const history = useNavigate();
     
     const Logout = async() =>{
        try {
            await axios.delete('http://localhost:5000/logout');
            history("/");
        } catch (error) {
            console.log(error);
        }
     }
     return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a href="/dashboard" className="navbar-item">
                        Welcome to GPS Dashboard
                        </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                        <button onClick={Logout} className="button is-light">
                            Log Out
                        </button>
                        </div>
                    </div>
               </div>
          </div>
          </div>
        </nav>
     );
}
export default Navbar;