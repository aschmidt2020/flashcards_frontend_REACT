import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../CustomHooks/useForm";
import { useAddCollectionMutation } from '../../features/Collections/CollectionsApiSlice';

const AddCollection = (props) => {
    const { formValues, handleChange, handleSubmit } = useForm(addCollection);
    const [show, setShow] = useState(false);
    const [addCollectionReducer, { isLoading }] = useAddCollectionMutation();
    const canAdd = [formValues.name].every(Boolean) && !isLoading

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function addCollection() {
      if(canAdd){
        try{
          let response = await addCollectionReducer({ "name": formValues.name});
          setShow(false);
          window.location.reload();
        }
        catch(err){
          console.log(err);
          alert(err)
        }
      }
    }

    return (
        <span id="add-collection">
        <Button variant="btn btn-outline-primary" onClick={handleShow} style={{ "marginLeft": "6em" }}>
        Add Collection
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Collection</Modal.Title>
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
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
}
 
export default AddCollection;