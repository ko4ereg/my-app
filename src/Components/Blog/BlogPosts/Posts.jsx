import  Post  from './Post';
import s from './Posts.module.css';


const Posts = (props) => {
 
if (props.postsData.length === 0) return <div style={{display: "flex", justifyContent: 'center', marginTop: '100px'}}>Пока постов нет, создайте первый! :)</div>

  return <div className={s.wrapper}>
      <div className={s.content}>
      {props.postsData.map(post => <Post post={post} id={post.id}
       key={post.id} />
      )}
      </div>
  </div>
}


export default Posts;

