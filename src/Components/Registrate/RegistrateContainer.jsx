import Login from "./Registrate";
import { useDispatch, useSelector } from "react-redux";
import { registrate } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import Registrate from "./Registrate";
import { useEffect, useState } from "react";


const RegistrateContainer = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

  
    const  handleRegistrate = (email, password) => {
        dispatch(registrate(email, password))
        .catch((error) => {
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
            <Registrate errorMessage={errorMessage} handleRegistrate={handleRegistrate} />
        </div>)
}

export default RegistrateContainer;