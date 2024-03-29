import s from './ReactionsBlock.module.css';
import { ReactComponent as Like } from './../../../../assets/icons/like.svg';
import { ReactComponent as Comments } from './../../../../assets/icons/comment.svg';
import { addLikeReq } from '../../../../redux/posts-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const ReactionsBlock = (props) => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const handleLike = () => {
     dispatch(addLikeReq(props.userId, props.post.id));
    }
   

    return <div className={s.reactions}>
        {isAuth ?  <div onClick={handleLike} className={s.likes}> <div className={props.liked ? s.likedIcon : s.likeIcon}><Like /></div> {props.post.likes}</div>
        :  <div className={s.likesNotAuth}> <div className={s.likeIconNotAuth}><Like /></div> {props.post.likes}</div> }
   
   {props.post.comments.length > 1 
   ? <div onClick={props.toggleComments} className={s.comments} > <div className={props.showAllComments 
   ? s.allCommentIcon 
   : s.commentIcon}> <Comments /> </div> {props.post.comments.length} </div>: null } 
</div>
}

export default ReactionsBlock;