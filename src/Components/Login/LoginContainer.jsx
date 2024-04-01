import { useEffect, useState } from "react";
import Login from "./Login";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";


const LoginContainer = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
  console.log(window.location);
    const  handleLogin = (email, password) => {
        dispatch(login(email, password))
        .catch((error) => {
            // Обработка ошибки
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    
    }

    useEffect(() => {
     
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = "auto";
            }
        
    }, []);

    if (isAuth) {
        window.location.replace('/profile');
        setTimeout(() => {
            return <Navigate to={'/profile'} replace={true} />
          }, 1000); 
    }

    return (
        <div >
            <Login errorMessage={errorMessage} handleLogin={handleLogin} />
        </div>)
}

export default LoginContainer;