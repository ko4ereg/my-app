 import {  useSelector } from 'react-redux';
import ProfileInfo from './ProfileInfo/ProfileInfo';
 
import ProfilePrice from './ProfilePrice/ProfilePrice';
import ProfilePortfolio from './ProfilePortfolio/ProfilePortfolio';
import Skeleton from '../common/Skeleton/Skeleton';

 

const Profile = (props) => {
   const isAuth = useSelector(state => state.auth.isAuth);

    const userData = useSelector(state => state.profilePage.profile);
    // if (!props.profile) {
    //     return <Preloader />
    // }  

    // if(isAuth) {
    //     return  <Skeleton />
    // }

    return (
        <div >
            <ProfileInfo isAuth={isAuth} props={userData} /> 
            <ProfilePrice isAuth={isAuth} props={userData} />
            <ProfilePortfolio isAuth={isAuth} props={userData}/>
        </div>)
}

export default Profile;