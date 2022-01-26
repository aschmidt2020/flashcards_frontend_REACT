import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../CustomHooks/useForm";
import axios from 'axios';


const EditCollection = (props) => {
    const { formValues, handleChange, handleSubmit } = useForm(updateCollection);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {
    //     // eslint-disable-next-line
    //   }, [])

    async function updateCollection() {
        const jwt = localStorage.getItem("token");
        await axios({
          method: "put",
          url: `http://127.0.0.1:8000/api/flashcard/editcollection/${props.collection.id}/`,
          headers: {
            Authorization: "Bearer " + jwt
          },
          data: formValues,
        }).then(response => {
            window.location = "/";
        }
        ).catch(error => {
          alert("Collection not able to be added at this time. Please try again later.")
        })
      }

    return (
        <span id="add-collection">
        <Button variant="btn btn-outline-primary" onClick={handleShow} style={{ "marginLeft": "6em" }}>
        Edit Collection
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text">Collection Name</span>
                <input className="form-control" type="text" name="name" value={formValues.name} onChange={handleChange}></input>
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
 
export default EditCollection;