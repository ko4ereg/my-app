import s from './Header.module.css';
import logo from './../../assets/logo.svg'
import HeaderNavMenu from './HeaderNavMenu';
import HeaderLoginContainer from './HeaderLogin/HeaderLoginContainer';
const Header = (props) => {
  
    return ( <header>
        <div className={s.header}><img className={s.logo} src={logo} alt="" />
       
       <HeaderNavMenu handleKeyPress={props.handleKeyPress} querySearch={props.querySearch} handleInputChange={props.handleInputChange} />
       <HeaderLoginContainer />
      </div>
        </header>)
}

export default Header;