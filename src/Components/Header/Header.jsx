import s from './Header.module.css';
import logo from './../../assets/logo.svg'
import HeaderNavMenu from './HeaderNavMenu';
const Header = (props) => {
  
    return ( <header>
        <div className={s.header}><img className={s.logo} src={logo} alt="" />
       
       <HeaderNavMenu />
       <div><button>Войти</button></div></div>
        </header>)
}

export default Header;