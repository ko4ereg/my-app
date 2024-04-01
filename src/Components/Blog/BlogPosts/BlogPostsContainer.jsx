import { useDispatch, useSelector } from 'react-redux';
import s from './../Blog.module.css';
import Posts from './Posts';
import { getPostsWithPagination, requestPosts, requestPostsTotalCount, setCurrentPage, setPosts, setPostsNull } from '../../../redux/posts-reducer';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PreloaderMasters from '../../common/Preloader/PreloaderMasters';
import SkeletonPost from './SkeletonPost';

const BlogPostsContainer = (props) => {
  const pageSize = useSelector(state => state.posts.pageSize);
  const postsData = useSelector(state => state.posts.posts);
  const userId = useSelector(state => state.auth.userId);
  const currentPage = useSelector(state => state.posts.currentPage);
  const isFetchingStatus = useSelector(state => state.posts.isFetching);
  const totalPostsCount = useSelector(state => state.posts.totalPostsCount);
  const dispatch = useDispatch();
  const toggleFetchingPaginator = useSelector(state => state.posts.isFetchingPaginator);
  const [data, setData] = useState([]);
  const category = useSelector(state => state.posts.category);

  useEffect(() => {
    dispatch(requestPosts(currentPage, pageSize, category, userId))
    .then((response) => {
      setData(response);
    })
    return function () {
      setData(postsData);
      dispatch(setPostsNull());
      dispatch(setCurrentPage(1));
    }
  }, [category]);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      fetchMoreData();
    }
  };
 
 
useEffect(() => {
  setData(postsData);
}, [postsData]);

 
  const fetchMoreData = () => {
    if (currentPage < totalPostsCount / pageSize) {
      const newPage = currentPage + 1;
      dispatch(getPostsWithPagination(newPage, pageSize, category, userId)).then((response) => {
        setData([...data, ...response]);
      })
    }
  };

  if (isFetchingStatus) {
    return <div>
      < SkeletonPost /> 
      < SkeletonPost /> 
      < SkeletonPost /> 
    </div> 
     
  }
 
  return <div   className={s.scroll} 
    onScroll={handleScroll}> 
    <InfiniteScroll
    dataLength={data.length}
    next={fetchMoreData}
    hasMore={data.length < totalPostsCount}
    loader={toggleFetchingPaginator && <PreloaderMasters/>}
    scrollToTop={false}
    
  >
    <Posts postsData={data} />
  </InfiniteScroll> </div>
}

export default BlogPostsContainer;