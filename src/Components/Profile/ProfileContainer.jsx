import React from 'react';
import Profile from './Profile'; 

  
 const ProfileContainer = () => {
   

     
    return <Profile />
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
