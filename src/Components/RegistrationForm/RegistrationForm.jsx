import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useForm from "../CustomHooks/useForm";

const RegistrationForm = (props) => {

  const { formValues, handleChange, handleSubmit } = useForm(register);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function register() {

    if (formValues.password === passwordCheck) {
      let userInfo = {...formValues}
      props.register(userInfo);
      setPasswordError(false);
    }
    else {
      alert("Passwords must match.");
      setPasswordError(true);
    }

  }

  return (
    <span id="sign-up">
      <Button variant="btn btn-outline-dark" onClick={handleShow} style={{ "marginLeft": "1em" }}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text">First name</span>
              <input className="form-control" type="text" name="first_name" value={formValues.first_name} onChange={handleChange} required={true}></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Last name</span>
              <input className="form-control" type="text" name="last_name" value={formValues.last_name} onChange={handleChange} required={true}></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Email</span>
              <input className="form-control" type="email" name="email" value={formValues.email} onChange={handleChange} required={true}></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Username</span>
              <input className="form-control" type="text" name="username" value={formValues.username} onChange={handleChange} required={true}></input>
            </div>

            {!passwordError &&
              <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input className="form-control" type="password" name="password" value={formValues.password} onChange={handleChange} required={true}></input>
              </div>
            }
            {passwordError &&
              <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input className="form-control is-invalid" type="password" name="password" value={formValues.password} onChange={handleChange} required={true}></input>
              </div>
            }

            {!passwordError &&
              <div className="input-group mb-3">
                <span className="input-group-text">Re-type Password</span>
                <input className="form-control" type="password" value={passwordCheck} onChange={(event) => setPasswordCheck(event.target.value)} required={true}></input>
              </div>
            }
            {passwordError &&
              <div className="input-group mb-3">
                <span className="input-group-text">Re-type Password</span>
                <input className="form-control is-invalid" type="password" value={passwordCheck} onChange={(event) => setPasswordCheck(event.target.value)} required={true}></input>
              </div>
            }

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="btn btn-outline-primary" onClick={handleSubmit}>
            Sign Up!
          </Button>
        </Modal.Footer>
      </Modal>
    </span>

  );

}

export default RegistrationForm;