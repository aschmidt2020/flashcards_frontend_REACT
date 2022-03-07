import React, { useState, useEffect } from 'react';
import SideBar from './Components/SideBar/SideBar';
import NavBar from './Components/NavBar/NavBar';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from './Components/HomePage.jsx/HomePage';
import CollectionViewer from './Components/CollectionViewer/CollectionViewer';
import DeleteCollection from './Components/DeleteCollection/DeleteCollection';
import EditCollection from './Components/EditCollection/EditCollection';
import AuthLogin from './features/Authentication/AuthLogin';
import { loginReducer, logoutReducer, registerReducer } from "../src/features/User/UserSlicer";
import { useSelector, useDispatch } from "react-redux";
import { updateFlashcards } from './features/Flashcards/FlashcardSlicer';
import { updateCollections } from './features/Collections/CollectionSlicer';
import { updateUserInfo } from './features/User/UserInfoSlicer';
import { useFetchCollectionsQuery } from './features/Collections/CollectionsApiSlice';

function App() {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const { data = [] } = useFetchCollectionsQuery();
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    try {
      const decodedUser = jwt_decode(tokenFromStorage);
      dispatch(loginReducer(decodedUser));
      getUserInfo(decodedUser, tokenFromStorage);
    } catch { }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(data.length > 0){
      dispatch(updateCollections(data))
    }
  }, [data])

  // async function login(username, password) {
  //   await axios({
  //     method: "post",
  //     url: "http://127.0.0.1:8000/api/auth/login/",
  //     headers: {},
  //     data: {
  //       "username": username,
  //       "password": password
  //     }
  //   }).then(response => {
  //     localStorage.setItem("token", response.data.access);
  //     window.location = "/";
  //   }
  //   ).catch(error => {
  //     debugger
  //     alert(error.response.statusText)
  //   })
  // }

  async function getUserInfo(user, token) {
    await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/flashcard/user/${user.user_id}/`,
      headers: {
        Authorization: "Bearer " + token
      },
    }).then(response => {
      setUserInfo(response.data);
      dispatch(updateUserInfo(response.data));
    })
  }

  // async function logout() {
  //   localStorage.removeItem("token");
  //   window.location = "/";
  // }

  // async function register(userInfo) {
  //   await axios({
  //     method: "post",
  //     url: "http://127.0.0.1:8000/api/auth/register/",
  //     headers: {},
  //     data: userInfo
  //   }).then(response => {
  //     login(userInfo.username, userInfo.password)
  //   }
  //   ).catch(error => {
  //     debugger
  //     alert("Account creation failed. Please enter all required fields.")
  //   })

  // }

  if (collections !== undefined){
    return (

      <div className='row'>
        <NavBar/>
        <div className='col-2'>
          <SideBar />
        </div>

        <div className='col-10'>
          <Routes>
            <Route exact path='/' element={<HomePage />}/>
            <Route path='/collection/:collectionName' element={<CollectionViewer />}/>
            <Route path='/deletecollection' element={<DeleteCollection />}/>
          </Routes>
        </div>
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
