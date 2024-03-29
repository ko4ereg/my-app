import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
 
import { getUsersWithPagination, requestUsers,   requestUsersTotalCount,   toggleFollowingProgress } from '../../redux/masters-reducer';
import Preloader from '../common/Preloader/Preloader';
 
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import Masters from './Masters';


const MastersContainer = () => {
 
const dispatch = useDispatch();
const mastersData = useSelector(state => state.masters.users);
  const isFetchingStatus = useSelector(state => state.masters.isFetching);
  const totalUsersCount = useSelector(state => state.masters.totalUsersCount);
  const pageSize = useSelector(state => state.masters.pageSize);
  const currentPage = useSelector(state => state.masters.currentPage);
 
 const onPageChanged = (numberPage) => {
    dispatch(getUsersWithPagination(numberPage, pageSize));

}
 

       useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize));
        dispatch(requestUsersTotalCount());
       }, [currentPage]);

 
    
   return (<div>
    {isFetchingStatus ? <Preloader/> :
    <Masters 
    totalUsersCount={totalUsersCount}
    pageSize={pageSize}
    mastersData={mastersData}
    onPageChanged={onPageChanged}
    currentPage={currentPage}/>}
   </div>)
}

export default  MastersContainer; 


// class MastersContainer extends React.Component {

//     componentDidMount() {
//         this.props.requestUsers(this.props.currentPage, this.props.pageSize);
//     }

//     onPageChanged = (numberPage) => {
//         this.props.requestUsers(numberPage, this.props.pageSize);

//     }

//     render() {

        

//         return <>
//             {this.props.IsFetching ? <Preloader /> :
//                 <Users
//                     totalUsersCount={this.props.totalUsersCount}
//                     pageSize={this.props.pageSize}
//                     currentPage={this.props.currentPage}
//                     onPageChanged={this.onPageChanged}
//                     users={this.props.users}
//                     isAuth={this.props.isAuth}
//                     follow={this.props.follow}
//                     unfollow={this.props.unfollow}
//                     followingInProgress={this.props.followingInProgress}
//                     followingDoes={this.props.followingDoes}
//                     toggleFollowingProgress={this.props.toggleFollowingProgress} />}
//         </>
//     }
// }


// const mapStateToProps = (state) => {
//     return {
//         users: getUsers(state),
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         currentPage: getCurrentPage(state),
//         isFetching: getIsFetching(state),
//         followingInProgress: getFollowingInProgress(state),
//         isAuth: state.auth.isAuth

//     }
// }

 




// export default  MastersContainer;

 