 import Preloader from '../common/Preloader/Preloader';
import ProfileInfo from './ProfileInfo/ProfileInfo';

 

const Profile = (props) => {
   
    
    // if (!props.profile) {
    //     return <Preloader />
    // }  

    return (
        <div>
            <ProfileInfo /> 
        </div>)
}

export default Profile;