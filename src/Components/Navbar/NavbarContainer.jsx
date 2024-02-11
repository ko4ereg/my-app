import { useMediaQuery } from "react-responsive";
import Navbar1280 from "./Navbar1280";
import Navbar1024 from "./Navbar1024";
import { useSelector } from "react-redux";

const NavbarContainer = () => {
  const isAuth = useSelector(state => state.auth.isAuth);

    const isDesktop1280 = useMediaQuery({
        query: "(min-width: 1280px)"
      });  
      const isDesktop1024 = useMediaQuery({
        query: "(max-width: 1279px)"
      });    
     
    return <div>{isDesktop1280 && <Navbar1280 isAuth={isAuth}/>} {isDesktop1024 && <Navbar1024 isAuth={isAuth} />}  </div> 
}

export default NavbarContainer;