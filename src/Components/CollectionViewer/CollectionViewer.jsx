import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const CollectionViewer = (props) => {
    const {state} = useLocation();
    const { id, user, name } = state;
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        getFlashcards(id);
        // eslint-disable-next-line
      }, [])

    async function getFlashcards(collection_id){
        let response = await axios.get(`http://127.0.0.1:8000/api/flashcard/allflashcards/${collection_id}/`);
        setFlashcards(response.data)

    }
    return (
        <div>
            <div className="row">
                <div className="col">
                    <ul className="ul-container">
                        {flashcards.map((flashcard, index) => {
                           return (
                               <li key={flashcard.id}>
                                  {flashcard.term}
                                  {flashcard.definition}
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
 
export default CollectionViewer;