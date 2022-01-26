import React, { useState } from 'react';
import axios from 'axios';

const DeleteFlashCard = (props) => {

    async function deleteFlashCard() {
        // eslint-disable-next-line no-restricted-globals
        let approveDelete = confirm(`Are you sure you would like to delete this flashcard?\n\nUser: ${props.flashcard.user.username}\Term:${props.flashcard.term}\n\nOK for yes. Cancel for no.`)
        if (approveDelete) {
          const jwt = localStorage.getItem("token");
          await axios({
            method: "delete",
            url: `http://127.0.0.1:8000/api/flashcard/deleteflashcard/collection/${props.flashcard.collection}/flashcard/${props.flashcard.id}/`,
            headers: {
              Authorization: "Bearer " + jwt
            },
          }).then(response => {
            window.location = "/collection";
          }
          ).catch(error => {
            alert("Flashcard not able to be deleted at this time. Please try again later.")
          })
        }
      }

    return (
        <button style={{ "marginLeft": "1em" }} className="btn btn-outline-secondary"onClick={deleteFlashCard} data-toggle="popover" title="Delete Flashcard" data-content="Delete Flashcard" trigger="hover">&nbsp;<i className="bi bi-trash">&nbsp;&nbsp;</i></button>
    );
}
 
export default DeleteFlashCard;