import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "./AuthenticationSlicer";
import { loginReducer, logout, register } from "../User/UserSlicer";
import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../../Components/CustomHooks/useForm";

const AuthLogin = (props) => {
    const { formValues, handleChange, handleSubmit } = useForm(getToken);
    const [loginFunction, { isLoading }] = useLoginMutation();
    const canLogin = [formValues.username, formValues.password].every(Boolean) && !isLoading
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getToken() {
    if(canLogin){
        try{
            let response = await loginFunction({ "username": formValues.username, "password": formValues.password }).unwrap();
            localStorage.setItem("token", response.access);
            window.location = '/';
        }
        catch (err){
            console.log(err);
            alert(err)
        }
    }
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
 
export default AuthLogin;