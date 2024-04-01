import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Masters.module.css';
import { getUsersWithPagination, requestUsers, requestUsersTotalCount, setCurrentPage,  setUsersNull } from '../../redux/masters-reducer';
import Masters from './Masters';
import InfiniteScroll from 'react-infinite-scroll-component';
import PreloaderMasters from '../common/Preloader/PreloaderMasters';
import SkeletonMasters from './SkeletonMasters';

const MastersContainer = () => {

  const dispatch = useDispatch();
  const isFetchingStatus = useSelector(state => state.masters.isFetching);
  const totalUsersCount = useSelector(state => state.masters.totalUsersCount);
  const pageSize = useSelector(state => state.masters.pageSize);
  const currentPage = useSelector(state => state.masters.currentPage);
  const [data, setData] = useState([]);
  const toggleFetchingPaginator = useSelector(state => state.masters.isFetchingPaginator);

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize)).then((response) => {
      setData(response);
    })
    dispatch(requestUsersTotalCount());
    return function () {
      setData([]);
      dispatch(setUsersNull());
      dispatch(setCurrentPage(1));
    }
  }, []);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      fetchMoreData();
    }
  };

  const fetchMoreData = () => {
    if (currentPage < totalUsersCount / pageSize) {
      const newPage = currentPage + 1;

      dispatch(getUsersWithPagination(newPage, pageSize)).then((response) => {
        setData([...data, ...response]);
      })
    }

  };
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
    <div className={s.scroll} onScroll={handleScroll}> <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={data.length < totalUsersCount}
      loader={toggleFetchingPaginator && <PreloaderMasters />} >
      <Masters mastersData={data} />
    </InfiniteScroll> </div>);
};





export default MastersContainer;
