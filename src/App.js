import React, { useState, useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from './Components/HomePage.jsx/HomePage';
import CollectionViewer from './Components/CollectionViewer/CollectionViewer';
import DeleteCollection from './Components/DeleteCollection/DeleteCollection';

function App() {
  const [user, setUser] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    getAllCollections();
    const tokenFromStorage = localStorage.getItem("token");
    try {
      const decodedUser = jwt_decode(tokenFromStorage);
      setUser(decodedUser);
      getUserInfo(decodedUser, tokenFromStorage);
    } catch { }
    // eslint-disable-next-line
  }, [])

  async function getAllCollections () {
    let response = await axios.get('http://127.0.0.1:8000/api/flashcard/allcollections/');
    setCollections(response.data)
  }
  async function login(username, password) {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/auth/login/",
      headers: {},
      data: {
        "username": username,
        "password": password
      }
    }).then(response => {
      localStorage.setItem("token", response.data.access);
      window.location = "/";
    }
    ).catch(error => {
      alert("Incorrect username or password. Please try again.")
    })
  }

  async function getUserInfo(user, token) {
    await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/flashcard/user/${user.user_id}/`,
      headers: {
        Authorization: "Bearer " + token
      },
    }).then(response => {
      setUserInfo(response.data);
    })
  }

  async function logout() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  async function register(userInfo) {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/auth/register/",
      headers: {},
      data: userInfo
    }).then(response => {
      login(userInfo.username, userInfo.password)
    }
    ).catch(error => {
      alert("Account creation failed. Please enter all required fields.")
    })

  }

  if (collections !== undefined){
    return (
      <div>
        <NavBar user={user} userInfo={userInfo} register={register} login={login} logout={logout}/>
        <Routes>
          <Route exact path='/' element={<HomePage collections={collections}/>}/>
          <Route path='/collection' element={<CollectionViewer />}/>
          <Route path='/deletecollection' element={<DeleteCollection />}/>
        </Routes>
      </div>
    );
  }

  else {
    return (
      <div className="spinner-border text-secondary position-absolute top-50 start-50" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }
}

export default App;
