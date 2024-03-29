import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const HeaderContainer = (props) => {
    const navigate = useNavigate();
    const [querySearch, setQuerySearch] = useState('');
    
    const handleInputChange = (event) => {
        setQuerySearch(event.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setQuerySearch('');
            navigate(`/search?q=${querySearch}`);
        }
    };
   
 
    return (
    <Header 
    querySearch={querySearch} 
    handleInputChange={handleInputChange} 
    handleKeyPress={handleKeyPress}/>)
}

export default HeaderContainer;