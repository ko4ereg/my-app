import s from './../Posts.module.css';
import emoji from './../../../../assets/icons/emoji.svg';
import send from './../../../../assets/icons/send.svg';
import sendBlack from './../../../../assets/icons/sendBlack.svg';
import smallPreloader from './../../../../assets/preloaderSmall.svg';
import { useState } from 'react';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, addCommentReq } from '../../../../redux/posts-reducer';
import { NavLink } from 'react-router-dom';
import { ClickAwayListener } from '@mui/base';




export const CommentBlock = (props) => {

    const [showEmoji, setShowEmoji] = useState(false);
    const [emojiSetted, setEmoji] = useState('');
    const [value, setValue] = useState('');
    const toggleIsFetchingForm = useSelector(state => state.posts.isFetchingForm);
    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        dispatch(addCommentReq(props.userId, props.userName, props.post.id, value)).then(response => setValue(''));

    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            dispatch(addComment(props.userId, props.userName, props.post.id, value));
            setValue('');
        }
    };


    const onEmojiClick = (emojiData) => {
        const code = '0x' + emojiData.unified;
        const emoji = String.fromCodePoint(code);
        setValue(prevInput => prevInput + emoji);
        setShowEmoji(false);
    }

    const dispatch = useDispatch();



    return <div className={s.commentsBlock} >
        {props.post.comments.length > 0
            ? (
                props.showAllComments
                    ? props.post.comments.map((comment, index) => (

                        <div key={index} className={s.comment}>
                            {comment.authorId
                                ? <NavLink to={'/profile/' + comment.authorId} >{comment.author}</NavLink>
                                : `Незарегистрированный пользователь`}

                            <span>{comment.text}</span>
                        </div>
                    ))
                    : (
                        <div className={s.comment}>
                            {props.post.comments[props.post.comments.length - 1].authorId
                                ? <NavLink to={'/profile/' + props.post.comments[props.post.comments.length - 1].authorId} >{props.post.comments[props.post.comments.length - 1].author}</NavLink>
                                : 'Незарегистрированный пользователь'}


                            <span>{props.post.comments[props.post.comments.length - 1].text}</span>
                        </div>
                    )
            )
            : null}
        <div>
            <label className={s.label} htmlFor="comment">
                <input onKeyDown={(e) => handleKeyPress(e)} onChange={handleInputChange} id='comment' placeholder='Написать комментарий...' type="text" className={toggleIsFetchingForm ? s.input + '' + s.inputdisabled : s.input} value={value} />
                <img className={s.emoji} src={emoji} onClick={(e) => { e.preventDefault(); setShowEmoji(!showEmoji) }} alt="" />
                {toggleIsFetchingForm ? <img src={smallPreloader} className={s.sendDisabled} alt="" />
                    : <img onClick={(e) => handleAddComment(e)} className={s.send} src={value ? sendBlack : send} alt="" />}
                {showEmoji &&
                    <ClickAwayListener onClickAway={() => setShowEmoji(false)}>
                        <div className={s.emojiContainer}>
                            <EmojiPicker className={s.emojipicker}
                                searchDisabled={true}
                                width='350px'
                                height='250px'
                                onEmojiClick={onEmojiClick}
                                categories={[
                                    {
                                        category: "smileys_people",
                                        name: "Faces",
                                    },
                                ]}
                                style={{
                                    position: 'absolute',
                                    bottom: '50px',
                                    right: '50px'
                                }}
                                suggestedEmojisMode="false"
                                previewConfig={{ showPreview: false }} />
                        </div>
                    </ClickAwayListener>
                }
            </label>
        </div>
    </div>

}

export default CommentBlock;