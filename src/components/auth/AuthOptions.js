import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../context/userContext";
import '../style/style.css';
 function AuthOptions() {
     const { userData, setUserData } = useContext(UserContext);
     const navigate = useNavigate();
      const register = () => navigate("/register"); 
      const login = () => navigate("/login"); 
      const logout = () => { 
        setUserData({ token: undefined, user: undefined });
      localStorage.setItem("auth-token","");
      navigate("/");
    };
    return (
    <nav className="auth-options">
        {userData?.user ? (
        <button className="btn btn-primary mr-2" onClick={logout}>Logout</button>
        ) : (
            <>
            <button className="btn btn-primary mx-3" onClick={register}>Sign Up</button>
            <button className="btn btn-primary" onClick={login}>Login</button>
            </>
            )}
            </nav>
            )
        }
        export default AuthOptions;