import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './Pages/Signin';
import Singup from './Pages/Signup';
import Home from './Pages/Home';
import Notfound from './Pages/Notfound';
import Create from './Pages/Create';
import Profile from './Pages/Profile';
import Messenger from './Pages/Messenger/Messenger';
import PostView from './Pages/PostView';
import UserProfile from './Pages/UserProfile'
import GoTop from './components/GoTop';
import EditComment from './Pages/EditComment';
import EditPost from './Pages/EditPost';
import SearchView from './Pages/SearchView';

export default function App() {
  return (
    <BrowserRouter>
    <GoTop />
      <Routes>
        <Route path="/" element={<Singup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path='/create' element={< Create />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/messenger' element={<Messenger />} />
        <Route path='/posts/:id' element={<PostView />} />
        <Route path='/user/:id' element={<UserProfile />} />
        <Route path='/editComment' element={<EditComment />}/>
        <Route path='/editPost' element={<EditPost />}/>
        <Route path='/search' element={<SearchView />} />
        <Route path='*' element={<Notfound />} />
      </Routes >
    </BrowserRouter >
  )
}