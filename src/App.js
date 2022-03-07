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
import { useGetUserInfoMutation } from './features/User/UserApiSlicer';

function App() {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const { data = [] } = useFetchCollectionsQuery(); //automatically runs query on load
  const [getUserInfoReducer, { isUninitialized }] = useGetUserInfoMutation();
  
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    try {
      const decodedUser = jwt_decode(tokenFromStorage);
      dispatch(loginReducer(decodedUser));
      getUserInfo(decodedUser.user_id);
    } catch { }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(data.length > 0){
      dispatch(updateCollections(data))
    }
  }, [data])


  async function getUserInfo(userId) {
    try{
      let response = await getUserInfoReducer(userId);
      dispatch(updateUserInfo(response.data))
    }
    catch(err){
      alert(err);
      console.log(err)
    }
  }

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
