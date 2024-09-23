import React, { useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from './context/userContext';
import Header from './components/Header';
import Home from './components/Home'
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ShowPost from './pages/ShowPost';
import ShowSinglePost from './pages/ShowSinglePost';



function App() {
  const [userData, setUserData] = useState({ token: undefined, user: undefined });

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<ShowSinglePost/>} />
            <Route path="/show" element={<ShowPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </UserContext.Provider>
      </Router>

    </div>
  );
}

export default App;
