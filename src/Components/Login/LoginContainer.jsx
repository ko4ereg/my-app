import { useState } from "react";
import Login from "./Login";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";


const LoginContainer = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);

    const dispatch = useDispatch();
   
  
    const  handleLogin = (email, password) => {
        dispatch(login(email, password));
    }

    if (isAuth) {
        window.location.replace('/profile');
        setTimeout(() => {
            return <Navigate to={'/profile'} replace={true} />
          }, 1000); 
    }

    return (
        <div >
            <Login handleLogin={handleLogin} />
        </div>)
}

export default LoginContainer;