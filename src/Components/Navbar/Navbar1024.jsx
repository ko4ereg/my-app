import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import {ReactComponent as IconProfile} from './../../assets/icons/navbar/profile.svg';
import {ReactComponent as IconBlog} from './../../assets/icons/navbar/blog.svg';
import {ReactComponent as IconDialogs} from './../../assets/icons/navbar/dialogs.svg';
import {ReactComponent as IconFeedbacks} from './../../assets/icons/navbar/feedbacks.svg';
import {ReactComponent as IconStatistics} from './../../assets/icons/navbar/statistics.svg';
import {ReactComponent as IconIntegrations} from './../../assets/icons/navbar/integrations.svg';

const navActive = ({ isActive }) => (isActive ? s.activeLink : s.item);



const Navbar1024 = (props) => {
    
    
    return (
        <nav className= {s.nav}>
           <div className={s.items} > 
           <div className={s.item} >
                <NavLink to='/profile' className={navActive}><IconProfile className={s.icon} /> </NavLink>
            </div>
            <div className= {s.item}>
                <NavLink to='/blog' className={navActive}  ><IconBlog className={s.icon} /></NavLink>
            </div>
            <div className= {s.item}>
                <NavLink to='/dialogs' className={navActive}  ><IconDialogs className={s.icon} /> </NavLink>
            </div>
            <div className= {s.item}>
                <NavLink to='/feedbacks' className={navActive}> <IconFeedbacks className={s.icon} /></NavLink>
            </div>
            <div className= {s.item}>
                <NavLink to='/statistic' className={navActive} ><IconStatistics className={s.icon}/></NavLink>
            </div>
            <div className= {s.item}>
                <NavLink to='/integrations' className={navActive} > <IconIntegrations className={s.icon}/> </NavLink>
            
            </div>
            </div>
        </nav>)
}

export default Navbar1024;
