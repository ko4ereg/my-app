import ProfileInfo from './ProfileInfo/ProfileInfo'; 
import ProfilePrice from './ProfilePrice/ProfilePrice';
import ProfilePortfolio from './ProfilePortfolio/ProfilePortfolio';
import s from './ProfileInfo/ProfileInfo.module.css';
const Profile = (props) => {

    return (
        <div className={s.profileContainer}>
            <ProfileInfo isOwner={props.isOwner} isAuth={props.isAuth} props={props.userData} /> 
            <ProfilePrice isOwner={props.isOwner} props={props.userData} />
            <ProfilePortfolio  isOwner={props.isOwner} props={props.userData}/>
        </div>)
}

export default Profile;