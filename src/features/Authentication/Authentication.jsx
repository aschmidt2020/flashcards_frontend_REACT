import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "./AuthenticationSlicer";
import { login, logout, register } from "../User/UserSlicer";
import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../../Components/CustomHooks/useForm";

const Authentication = (props) => {
    // const user = useSelector((state) => state.user.value);
    // const dispatch = useDispatch();
    const { formValues, handleChange, handleSubmit } = useForm(login);
   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  function login() {
    // dispatch(login(user))
    //  const { data = [] } = useLoginMutation({"username": formValues.username, "password": formValues.password});
    console.log('hello world')
  }

    return (
        <span id="log-in">
            <Button variant="btn btn-outline-primary" onClick={handleShow} style={{ "marginLeft": "6em" }}>
                Log In
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                    <span className="input-group-text">Username</span>
                    <input className="form-control" type="text" name="username" value={formValues.username} onChange={handleChange}></input>
                    </div>

                    <div className="input-group mb-3">
                    <span className="input-group-text">Password</span>
                    <input className="form-control" type="password" name="password" value={formValues.password} onChange={handleChange}></input>
                    </div>
                </form>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="btn btn-outline-dark" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="btn btn-outline-primary" onClick={handleSubmit}>
                    Log In
                </Button>
                </Modal.Footer>
            </Modal>
            </span>
    );
}
 
export default Authentication;