import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

const HomePage = (props) => {
    const navigate = useNavigate();

    function navigateCollection(collection) {
        debugger
        navigate("/collection", { state: {...collection}});
    }

    function navigateDeletion(collection) {
        debugger
        navigate("/deletecollection", { state: {...collection}});
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <ul className="ul-container">
                        {props.collections.map((collection, index) => {
                            return (
                                <li key={collection.id}>
                                    <button onClick={() => navigateCollection(collection)}>{collection.name}</button>
                                    <button style={{ "marginLeft": "1em" }} className="btn btn-outline-secondary"onClick={() => navigateDeletion(collection)} data-toggle="popover" title="Delete Collection" data-content="Delete Collection" trigger="hover">&nbsp;<i className="bi bi-trash">&nbsp;&nbsp;</i></button>
                                </li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
    
}
 
export default HomePage;