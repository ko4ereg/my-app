import BlogHeaderContainer from "./BlogHeader/BlogHeaderContainer"
import s from './Blog.module.css';
import BlogPostsContainer from "./BlogPosts/BlogPostsContainer";
 

const Blog = (props) => {
 
    return <div className={s.blog}>
        <BlogHeaderContainer/>
        <BlogPostsContainer />
    </div> 
}

export default Blog;