import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import AddFlashcard from '../AddFlashcard/AddFlashcard';
import DeleteFlashCard from '../DeleteFlashCard/DeleteFlashCard';
import EditFlashcard from '../EditFlashcard/EditFlashcard';
import Flashcard from '../Flashcard/Flashcard';

const CollectionViewer = (props) => {
    const {state} = useLocation();
    const { id, user, name } = state;
    const [flashcards, setFlashcards] = useState([]);
    const [flashcard, setFlashCard] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getFlashcards(id);
        // eslint-disable-next-line
      }, [id])

    async function getFlashcards(collection_id){
        let response = await axios.get(`http://127.0.0.1:8000/api/flashcard/allflashcards/${collection_id}/`);
        setFlashcards(response.data);
        setFlashCard(response.data[0])
    }

    function handleNext() {
        let newFlashcardIndex = currentIndex + 1;
        if(newFlashcardIndex + 1 <= flashcards.length){
            setCurrentIndex(newFlashcardIndex);
            setFlashCard(flashcards[newFlashcardIndex]);
        }
        else if(newFlashcardIndex + 1 > flashcards.length){
            setCurrentIndex(0);
            setFlashCard(flashcards[0]);
        }
    }

    function handlePrev() {
        let newFlashcardIndex = currentIndex - 1;
        if(newFlashcardIndex >= 0){
            setCurrentIndex(newFlashcardIndex);
            setFlashCard(flashcards[newFlashcardIndex]);
        }
        else if(newFlashcardIndex < 0){
            setCurrentIndex((flashcards.length - 1));
            setFlashCard(flashcards[flashcards.length - 1]);
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                <Flashcard index={currentIndex} flashcard={flashcard} collection={name}/>
                <DeleteFlashCard flashcard={flashcard} />
                <button onClick={handlePrev}>Previous Flashcard</button>
                <button onClick={handleNext}>Next Flashcard</button>
                <EditFlashcard flashcard={flashcard} />


                   
                </div>
            </div>
            <small># Flashcards: {flashcards.length}</small>
            <AddFlashcard collectionId={id}/>
        </div>
    );
}
 
export default CollectionViewer;

// {/* <ul className="ul-container"> */}
// {flashcards.map((flashcard, index) => {
//     return (
//         <li key={flashcard.id}>
//           <Flashcard flashcard={flashcard} collection={name}/>
//           <DeleteFlashCard flashcard={flashcard} />
//           <EditFlashcard flashcard={flashcard} />
//         </li>
//    )
// }
// )}
{/* </ul> */}