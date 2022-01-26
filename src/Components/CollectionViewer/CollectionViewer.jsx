import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import AddFlashcard from '../AddFlashcard/AddFlashcard';
import DeleteFlashCard from '../DeleteFlashCard/DeleteFlashCard';
import EditFlashcard from '../EditFlashcard/EditFlashcard';

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
                                  <DeleteFlashCard flashcard={flashcard} />
                                  <EditFlashcard flashcard={flashcard} />
                               </li>
                           )
                        }
                        )}
                    </ul>
                </div>
            </div>
            <AddFlashcard collectionId={id}/>
        </div>
    );
}
 
export default CollectionViewer;