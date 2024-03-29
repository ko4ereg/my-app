import React, {   useEffect  } from 'react';
import Profile from './Profile'; 
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, isFetching } from '../../redux/profile-reducer';
import Skeleton from '../common/Skeleton/Skeleton';

  
 const ProfileContainer = () => {
   const dispatch = useDispatch();
   const userData = useSelector(state => state.profilePage.profile);
   const isAuth = useSelector(state => state.auth.isAuth);
   const userDataId = useSelector(state => state.auth.userId);
   let { userId } = useParams();
 
   const isFetchingStatus = useSelector(state => state.profilePage.isFetching);

        useEffect(() => {
          if (userId) {
              dispatch(getUserProfile(userId));
       
           }
           else  {
               userId = userDataId;
               if (userId){
              dispatch(getUserProfile(userId));
               }
           }
        }, [userId]);


         if (!isAuth && !userId) {
          window.location.replace('/login');
          setTimeout(() => {
            return <Navigate to={'/login'} replace={true} />
          }, 1000); 
         }
      
        if (!userData || Object.keys(userData).length === 0 || isFetchingStatus) {
          return <Skeleton />
        }
     
    return <Profile isAuth={isAuth} 
    isOwner={parseInt(userId) === userDataId || !userId } 
    userData={userData} />
 }

export default  ProfileContainer; 




// class ProfileContainer extends React.Component {

//     componentDidMount() {
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
//             this.props.setUserProfile(response.data);
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <Profile {...this.props} profile={this.props.profile} />
//             </div>)
//     }
// }



// ЗДЕСЬ ВЫДАЕТ НЕТВОРК ЕРОР ЧЗХ
// function ProfileContainer(props) {
//     const { userId } = useParams();
//     let currentUserId = userId || 2;

//     useEffect(() => {
         
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${currentUserId}`).then(response => {
//              props.setUserProfile(response.data);
//         });
//     }, [userId, props, currentUserId]);
//     if (!userId) {
//         return (
//             <Profile />
//         );
//     }

//     return (
//         <div>
//             <Profile profile={props.profile} />
//         </div>
//     );
// }
