import s from './HeaderNavMenu.module.css';
import searchIcon from './../../assets/icons/search.svg';
import { NavLink } from 'react-router-dom';

const HeaderNavMenu = (props) => {

    
    return (
        <div className={s.navmenu} >
        <form action="">
            <label className={s.label}   htmlFor="search"><img src={searchIcon} alt="" />
            <input onKeyDown={props.handleKeyPress} onChange={props.handleInputChange} value={props.querySearch} id='search' placeholder='Услуга или город' type="text" className={s.input} /></label></form>
       <div className={s.link} ><NavLink className={s.link} to={"/masters"}>Специалисты</NavLink></div> 
       <div className={s.link}   > <NavLink className={s.link} to={"/blog"}>Лента</NavLink>    </div>
        
        <div className={s.link + '' + s.disabled}>О проекте</div>
    </div>
    )
}

export default HeaderNavMenu;