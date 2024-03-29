import React, {   useEffect  } from 'react';
 
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, isFetching } from '../../redux/profile-reducer';
import Skeleton from '../common/Skeleton/Skeleton';
import Blog from './Blog';

  
 const BlogContainer = () => {
   const dispatch = useDispatch();
   const userData = useSelector(state => state.profilePage.profile);
  
   const isAuth = useSelector(state => state.auth.isAuth);
   const userDataId = useSelector(state => state.auth.userId);
 
   const isFetchingStatus = useSelector(state => state.profilePage.isFetching);

       

       
        // if (!userData || Object.keys(userData).length === 0 || isFetchingStatus) {
        //   return <Skeleton />
        // }
      
     
    return <Blog   />
 }

export default  BlogContainer; 

 
