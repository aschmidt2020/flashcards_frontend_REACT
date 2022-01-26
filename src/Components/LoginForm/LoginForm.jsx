import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  function handleClose() {
    setShow(false);
    setUsername("");
    setPassword("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.login(username, password);
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
              <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Password</span>
              <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
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

export default LoginForm;