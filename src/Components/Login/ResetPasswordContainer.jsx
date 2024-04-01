import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  resetPassword } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import ResetPassword from "./ResetPassword";


const ResetPasswordContainer = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
     
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    
}, []);
    const handleReset = (email ) => {
        dispatch(resetPassword(email))
        .catch((error) => {
            // Обработка ошибки
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    
    }

    if (isAuth) {
        window.location.replace('/profile');
        setTimeout(() => {
            return <Navigate to={'/profile'} replace={true} />
          }, 1000); 
    }

    return (
        <div >
            <ResetPassword errorMessage={errorMessage} handleReset={handleReset} />
        </div>)
}

export default ResetPasswordContainer;