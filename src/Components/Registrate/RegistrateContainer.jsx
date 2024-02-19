import Login from "./Registrate";
import { useDispatch, useSelector } from "react-redux";
import { registrate } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import Registrate from "./Registrate";


const RegistrateContainer = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);

    const dispatch = useDispatch();

  
    const  handleRegistre = (email, password) => {
        dispatch(registrate(email, password));
    }

    if (isAuth) {
        return <Navigate to="/profile" replace={true} />
    }

    return (
        <div >
            <Registrate handleRegistre={handleRegistre} />
        </div>)
}

export default RegistrateContainer;