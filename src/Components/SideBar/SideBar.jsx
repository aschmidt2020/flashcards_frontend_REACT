import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import AddCollection from "../AddCollection/AddCollection";

const SideBar = (props) => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        let baseurl = window.location.href;
        setUrl(parseInt(baseurl.slice(33)));
    },[window.location.href])

    const navigate = useNavigate();
    
    function navigateCollection(collection) {
        debugger
        navigate(`/collection/${collection.id}`, { state: {...collection}});
    }

    return (
        <div>
            <nav className="d-flex flex-column flex-shrink-0 p-3 bg-white text-dark">
                <ul className="nav flex-column" id="nav_accordion">
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
                            if(url === collection.id){
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
                        {props.userInfo && <span><AddCollection /></span>}
                    </li>
                </ul>
        </nav>
        </div>
    );
}

export default SideBar;