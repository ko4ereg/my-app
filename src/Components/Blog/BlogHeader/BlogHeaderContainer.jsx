import { useEffect, useRef, useState } from "react";
import BlogHeader from "./BlogHeader";
import { useSelector } from "react-redux";
import SkeletonHeaderBlog from "./SkeletonHeaderBlog";

 

const BlogHeaderContainer = (props) => {
    const [isOpen, setOpen] = useState(false);
    const isFetchingStatus = useSelector(state => state.posts.isFetching);
    const isAuth = useSelector(state => state.auth.isAuth);
    
    if (isFetchingStatus) {
      return <SkeletonHeaderBlog/>
    }

    return (
        <div >
          <BlogHeader 
          setOpen={setOpen}
          isOpen={isOpen} 
          isAuth={isAuth}/>
        </div>)
}

export default BlogHeaderContainer;