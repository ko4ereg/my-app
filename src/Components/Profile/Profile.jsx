 import {  useSelector } from 'react-redux';
import ProfileInfo from './ProfileInfo/ProfileInfo';
 
import ProfilePrice from './ProfilePrice/ProfilePrice';
import ProfilePortfolio from './ProfilePortfolio/ProfilePortfolio';
import Skeleton from '../common/Skeleton/Skeleton';
import { useEffect, useState } from 'react';

 

const Profile = (props) => {
   const isAuth = useSelector(state => state.auth.isAuth);
   const [showSkeleton, setShowSkeleton] = useState(true);
    const userData = useSelector(state => state.profilePage.profile);
 
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowSkeleton(false);
        }, 1000); 
        return () => clearTimeout(timer);  
      }, []);
      if(showSkeleton) {
        return  <Skeleton />
    }

    return (
        <div >
            <ProfileInfo isAuth={isAuth} props={userData} /> 
            <ProfilePrice isAuth={isAuth} props={userData} />
            <ProfilePortfolio isAuth={isAuth} props={userData}/>
        </div>)
}

export default Profile;