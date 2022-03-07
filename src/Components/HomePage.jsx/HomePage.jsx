import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import EditCollection from '../EditCollection/EditCollection';
import { useSelector, useDispatch } from "react-redux";

const HomePage = (props) => {
    const navigate = useNavigate();
    const collections = useSelector((state) => state.collections.collections);

    function navigateCollection(collection) {
        debugger
        navigate(`/collection/${collection.id}`, { state: {...collection}});
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
                        {collections.map((collection, index) => {
                            return (
                                <li key={collection.id}>
                                    <button onClick={() => navigateCollection(collection)}>{collection.name}</button>
                                    <button style={{ "marginLeft": "1em" }} className="btn btn-outline-secondary"onClick={() => navigateDeletion(collection)} data-toggle="popover" title="Delete Collection" data-content="Delete Collection" trigger="hover">&nbsp;<i className="bi bi-trash">&nbsp;&nbsp;</i></button>
                                    <EditCollection collection={collection} />
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