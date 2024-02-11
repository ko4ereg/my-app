import s from './Header.module.css';
import logo from './../../assets/logo.svg'
import HeaderNavMenu from './HeaderNavMenu';
import HeaderLoginContainer from './HeaderLogin/HeaderLoginContainer';
const Header = (props) => {
  
    return ( <header>
        <div className={s.header}><img className={s.logo} src={logo} alt="" />
       
       <HeaderNavMenu />
       <HeaderLoginContainer />
      </div>
        </header>)
}

export default Header;