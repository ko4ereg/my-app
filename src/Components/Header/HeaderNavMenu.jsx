import s from './HeaderNavMenu.module.css';
import searchIcon from './../../assets/icons/search.svg';

const HeaderNavMenu = () => {
    return (
        <div className={s.navmenu} >
        <form action=""><label htmlFor="search"><img src={searchIcon} alt="" /><input id='search' placeholder='Поиск' type="text" className={s.input} /></label></form>
        <div className={s.link} >Лента</div>
        <div className={s.link}>Новости</div>
        <div className={s.link}>О проекте</div>
    </div>
    )
}

export default HeaderNavMenu;