import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../CustomHooks/useForm";
import axios from 'axios';
import React, { useState, useEffect} from 'react';

const EditFlashcard = (props) => {
    const { formValues, handleChange, handleSubmit } = useForm(addCollection);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function addCollection() {
        const jwt = localStorage.getItem("token");
        await axios({
          method: "put",
          url: `http://127.0.0.1:8000/api/flashcard/editflashcard/collection/${props.flashcard.collection}/flashcard/${props.flashcard.id}/`,
          headers: {
            Authorization: "Bearer " + jwt
          },
          data: {"collection": props.flashcard.collection, ...formValues}
        }).then(response => {
            window.location = "/collection";
        }
        ).catch(error => {
          alert("Flashcard not able to be edited at this time. Please try again later.")
        })
      }

    return (
        <span id="add-collection">
        <Button variant="btn btn-outline-primary" onClick={handleShow} style={{ "marginLeft": "6em" }}>
        Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Flashcard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text">Term</span>
                <input className="form-control" type="text" name="term" value={formValues.term} onChange={handleChange}></input>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Definition</span>
                <input className="form-control" type="text" name="definition" value={formValues.definition} onChange={handleChange}></input>
              </div>


            </form>
  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-outline-dark" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="btn btn-outline-primary" onClick={handleSubmit}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
}
 
export default EditFlashcard;