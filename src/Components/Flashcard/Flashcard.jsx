import React, { useState } from 'react';

const Flashcard = (props) => {
    const [flip, setFlip] = useState(false);

    if(!flip){
        return (
            <div className="card">
            <div className="card-header">
                Collection: {props.collection}
                Number: {props.index + 1}
            </div>
            <div className="card-body">
                <p className="card-text">term</p>
                <h5 className="card-title">{props.flashcard.term}</h5>
                <button onClick={() => setFlip(!flip)} className="btn btn-primary">Flip</button>
            </div>
            </div>
        );
    }

    else if(flip){
        return (
            <div className="card">
            <div className="card-header">
                Collection: {props.collection}
            </div>
            <div className="card-body">
                <p className="card-text">definition</p>
                <h5 className="card-title">{props.flashcard.definition}</h5>
                <button onClick={() => setFlip(!flip)} className="btn btn-primary">Flip</button>
            </div>
            </div>
        );
    }
}
 
export default Flashcard;