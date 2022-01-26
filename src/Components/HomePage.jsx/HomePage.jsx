import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

const HomePage = (props) => {
    const navigate = useNavigate();

    function handleClick(collection) {
        debugger
        navigate("/collection", { state: {...collection}});
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <ul className="ul-container">
                        {props.collections.map((collection, index) => {
                            return (
                                <li key={collection.id}>
                                    <button onClick={() => handleClick(collection)}>{collection.name}</button>
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