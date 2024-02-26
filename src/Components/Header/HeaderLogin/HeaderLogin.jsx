 import s from './HeaderLogin.module.css';
 import noPic from './../../../assets/icons/nopic.svg';
 import arrowDown from './../../../assets/icons/down.svg';
 import arrowUp from './../../../assets/icons/up.svg';
 import iconSetting from './../../../assets/icons/dropdown/settings.svg';
 import iconHelper from './../../../assets/icons/dropdown/helper.svg';
 import iconLogout from './../../../assets/icons/dropdown/logout.svg';
import {   Navigate } from 'react-router-dom';
 

const HeaderLogin = (props) => {
 
   const handleClick = () => {
  
      window.location.replace('/login');
      setTimeout(() => {
        return <Navigate to={'/login'} replace={true} />
      }, 1000); 
   }

    if(!props.isAuth){
      return ( 
        <div  >  <button onClick={handleClick}>Войти</button> </div>
      )
    }
    return ( <div className={s.dropdownBlock}>
    <div className={s.loginBlock}>
    <div className={props.isOpen ? s.profilePic_clicked : s.profilePic}><img  src={props.userPhoto ? props.userPhoto : noPic } alt="" /></div>
    <img className={s.arrowpic} src={props.isOpen ? arrowUp : arrowDown} alt="" />
   
      </div>
      {props.isOpen && 
      <ul className={s.dropdown}>
       <li className={s.dropdownItem}><img src={iconSetting } alt="" /> Настройки</li>
       <li  className={s.dropdownItem}> <img src={iconHelper } alt="" /> Помощь</li>
       <li onClick={props.handleClickLogout} className={s.dropdownItem}> <img src={iconLogout } alt="" /> Выйти</li>
      </ul> } 
      </div>  
    )
}

export default HeaderLogin;