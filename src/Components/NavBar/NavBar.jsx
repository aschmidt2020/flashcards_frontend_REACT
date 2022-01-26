import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Flash from '../Images/Flash.jpg'
import AddCollection from "../AddCollection/AddCollection";

const NavBar = (props) => {
    const navigate = useNavigate();
    
    function navigateCollection(collection) {
        debugger
        navigate(`/collection/${collection.id}`, { state: {...collection}});
    }

    return (
        <div>
            <nav className="d-flex flex-column flex-shrink-0 p-3 bg-white text-dark">
                <ul className="nav flex-column" id="nav_accordion">
                    <li className="nav-item">
                        <Link to="/" className="navbar-brand" data-toggle="popover" title="Home" data-content="Home" trigger="hover">
                        <img src={Flash} style={{ "height": "40px", "width": "30px", "marginTop": "0.4em" }} alt="OurTube Logo"/>
                        </Link>
                        <h4 style={{ "marginBottom": "0em" }}>FlashParadise</h4>
                        {props.userInfo && <span className="navbar-welcome-text">Welcome {props.userInfo.username}!</span>}
                        {!props.userInfo && <span className="navbar-welcome-text">Please log-in.</span>}
                    </li>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Collections
                        </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <ul>
                        {props.collections.map((collection, index) => {
                            if(window.location.href.includes(collection.id)){
                                return (
                                    <li key={collection.id} >
                                        <button className="btn btn-dark" onClick={() => navigateCollection(collection)}>{collection.name}</button>
                                    </li>
                                )
                            }
                            else {
                                return (
                                    <li key={collection.id}>
                                        <button onClick={() => navigateCollection(collection)}>{collection.name}</button>
                                    </li>
                                )
                            }
                            
                        }
                            )}  
                        </ul>
                        
                        </div>
                    </div>
                    </div>
                    <li className="nav-item">
                        {!props.userInfo && <span> <LoginForm login={props.login} /> <RegistrationForm register={props.register} /> </span>}
                        {props.userInfo && <button type="button" className="btn btn-outline-danger" onClick={props.logout}>Log Out</button>}
                    </li>
                    <li className="nav-item">
                        {props.userInfo && <span><AddCollection /></span>}
                    </li>
                </ul>
        </nav>
        </div>
    );
}

export default NavBar;