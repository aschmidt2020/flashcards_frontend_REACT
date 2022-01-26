import { Link } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";


const NavBar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">


                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ "width": "100%" }}>
                            {!props.userInfo && <span> <LoginForm login={props.login} /> <RegistrationForm register={props.register} /> </span>}
                            {props.userInfo && <button type="button" className="btn btn-outline-danger" onClick={props.logout}>Log Out</button>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;