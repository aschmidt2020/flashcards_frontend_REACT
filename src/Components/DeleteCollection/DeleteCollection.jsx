import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation} from "react-router-dom";

const DeleteCollection = (props) => {
    const {state} = useLocation();
    const { id, user, name } = state;
    
    useEffect(() => {
        deleteCollection(id);
        // eslint-disable-next-line
      }, [])

    async function deleteCollection(collection) {
        // eslint-disable-next-line no-restricted-globals
        let approveDelete = confirm(`Are you sure you would like to delete this collection?\n\nUser: ${user.name}\nCollection:${name}\n\nOK for yes. Cancel for no.`)
        if (approveDelete) {
          const jwt = localStorage.getItem("token");
          await axios({
            method: "delete",
            url: `http://127.0.0.1:8000/api/flashcard/deletecollection/${id}/`,
            headers: {
              Authorization: "Bearer " + jwt
            },
          }).then(response => {
            window.location = "/";
          }
          ).catch(error => {
            alert("Comment not able to be deleted at this time. Please try again later.")
          })
        }
      }

    return (null)

}
 
export default DeleteCollection;