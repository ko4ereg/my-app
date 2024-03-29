import s from './Masters.module.css';
import userPhoto from './../../assets/icons/nopic.svg';
import { NavLink } from 'react-router-dom';

export const Master = (props) => {

    return <div className={s.item} key={props.user.id}>
        <div className={s.block} >
            <div>
                <NavLink to={'/profile/' + props.user.id} > <img src={props.user.photo != null
                    ? props.user.photo
                    : userPhoto} alt="" />
                </NavLink>
            </div>
        </div>
        <NavLink to={'/profile/' + props.user.id} >
            <div className={s.info} >
                <div className={s.info_bio} >
                    <div >{props.user.name}   </div>

                    {props.user.services &&
                        <div className={s.location} >
                            <div> {props.user.services
                                ? props.user.services.join(', ')
                                : ''} </div>
                            <div className={s.dot}></div>
                            <div className={s.city}> {props.user.city} </div>
                        </div>}
                    <div className={s.aboutMe}>{props.user.aboutMe}</div>
                </div>


            </div>
        </NavLink>
    </div>
}

export default Master;