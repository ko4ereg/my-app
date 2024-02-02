import { useMediaQuery } from "react-responsive";
import Navbar1280 from "./Navbar1280";
import Navbar1024 from "./Navbar1024";

const NavbarContainer = () => {
    const isDesktop1280 = useMediaQuery({
        query: "(min-width: 1280px)"
      });  
      const isDesktop1024 = useMediaQuery({
        query: "(max-width: 1279px)"
      });    
     
    return <div>{isDesktop1280 && <Navbar1280 />} {isDesktop1024 && <Navbar1024 />}  </div> 
}

export default NavbarContainer;