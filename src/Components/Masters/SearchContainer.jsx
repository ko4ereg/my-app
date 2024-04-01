import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import s from './Masters.module.css';
import {  sendQuerySearch, setCurrentPage, setSearchedUsersNull, setUsersNull, toggleFollowingProgress } from '../../redux/masters-reducer';
import Masters from './Masters';
import InfiniteScroll from 'react-infinite-scroll-component';
import PreloaderMasters from '../common/Preloader/PreloaderMasters';
import { useLocation } from 'react-router-dom';
import SkeletonMasters from './SkeletonMasters';


const SearchContainer = () => {

  const dispatch = useDispatch();
  const isFetchingStatus = useSelector(state => state.masters.isFetching);
 
  // const pageSize = useSelector(state => state.masters.pageSize);
  // const currentPage = useSelector(state => state.masters.currentPage);
  const [data, setData] = useState([]);
  
  const searchResults = useSelector(state => state.masters.searchResults);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const querySearch = queryParams.get('q');


 useEffect(() => {
  dispatch(sendQuerySearch(querySearch.toLowerCase().trim())).then((response) => {
    setData(response);
  })
    return function () {
      dispatch(setSearchedUsersNull()); 
    }
  }, [querySearch]);
 
  // const handleScroll = (e) => {
  //   const element = e.target;
  //   if (element.scrollHeight - element.scrollTop === element.clientHeight) {
  //     fetchMoreData();
  //   }
  // };

  // const fetchMoreData = () => {
  //   if (currentPage < totalUsersCount/pageSize) {
  //     const newPage = currentPage + 1;
 
  //   dispatch(getUsersWithPagination(newPage, pageSize)).then((response) => {
  //     setData([...data, ...response]);
  //   })
  //   }
    

  // };

  if (isFetchingStatus) {
    return <div className={s.wrapper}>
      <span className={s.title}>Доступные специалисты</span>
      < SkeletonMasters />
      < SkeletonMasters />
      < SkeletonMasters />
      < SkeletonMasters />
      < SkeletonMasters />
    </div>
  }
  return (
    <div className={s.scroll} 
    // onScroll={handleScroll}
    > 
    <InfiniteScroll 
      dataLength={data.length}
      // next={fetchMoreData}
      // hasMore={data.length < totalUsersCount}
      // loader={isFetchingStatus && <PreloaderMasters />}
       >
      <Masters   mastersData={data} />
    </InfiniteScroll> </div>);
};





export default SearchContainer;
