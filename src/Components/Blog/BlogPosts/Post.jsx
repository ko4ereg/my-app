import s from './Posts.module.css';
import { useEffect, useState } from 'react';
import Gallery from '../../common/Gallery/Gallery';
import ModalGallery from '../../common/Modal/ModalGallery';
import CommentBlock from './PostParts/CommentBlock';
import ReactionsBlock from './PostParts/ReactionsBlock';
import menu from './../../../assets/icons/menu.svg';
import { Box, ImageList, ImageListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { deletePost, setPostNotShow } from '../../../redux/posts-reducer';
import { NavLink } from 'react-router-dom';
import noAvatar from './../../../assets/icons/nopic.svg';

export const Post = (props) => {
    const userId = useSelector(state => state.auth.userId);
    const userName = useSelector(state => state.auth.name);
    const liked = props.post.likedBy && props.post.likedBy.includes(userId);

    const [showAllComments, setShowAllComments] = useState(false);
    const [showMenu, setshowMenu] = useState(false);

    const [modalGalleryActive, setModalGalleryActive] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [images, setImagesArray] = useState(props.post.pictures || [])

    useEffect(() => {
        setImagesArray(props.post.pictures || []);
    }, [props.post.pictures]);

    const toggleComments = () => {
        setShowAllComments(prevState => !prevState);
    }


    const dispatch = useDispatch();

    const handleClick = (index) => {
        setCurrentImageIndex(index);
        setModalGalleryActive(true);
    }
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const formatDate = (date) => {
        return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true, locale: ru });
    };
    const formattedDate = formatDate(props.post.createdAt);
    const service = () => {
        if (props.post.authorService) {


            if ((props.post.authorService).includes('маникюр')) {
                return 'Мастер маникюра'
            }
            if ((props.post.authorService).includes('педикюр')) {
                return 'Мастер педикюра'
            }
            if ((props.post.authorService).includes('массаж')) {
                return 'Мастер массажа'
            }
            if ((props.post.authorService).includes('волосы')) {
                return 'Мастер по волосам'
            }
        }
        else {
            return 'Мастер непонятно чего :)'
        }

    }
    const serviceType = service();


    const handleClickonImage = (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const imageWidth = rect.width;
        const clickedSide = clickX <= imageWidth / 2 ? 'left' : 'right';
        if (clickedSide === 'left' && currentImageIndex > 0) {
            handlePrevImage();
        }
        if (clickedSide === 'right' && currentImageIndex < images.length - 1) {
            handleNextImage();
        }
    }

    const handleDeletePost = () => {
        dispatch(deletePost(props.post.id, props.post.pictures));
    }
    const handleNotShowPost = () => {
        dispatch(setPostNotShow(props.post.id, userId));
    }

    const lines = props.post.text.split('<br>');
   

    const formattedText = (props.post.text).replace(/<br>/g, "\n");

    return <div className={s.item} key={props.post.id}>
        <div className={s.block} >
            <div className={s.header}>
                <NavLink to={'/profile/' + props.post.authorId} >  <div className={s.authorPic}><img src={props.post.authorPhoto ? props.post.authorPhoto : noAvatar} alt="" /></div> </NavLink>
                <div className={s.authorInfo}>
                    <div className={s.creator}>
                        <NavLink to={'/profile/' + props.post.authorId} >
                            <div>{props.post.author ? props.post.author : "Безымянный автор"}</div>
                        </NavLink>
                        <div className={s.time}>{formattedDate}</div>
                    </div>
                    <div className={s.service}>{serviceType}</div>
                </div>
                {props.post.authorId === userId &&  <ClickAwayListener onClickAway={() => setshowMenu(false)}>
                    <div>
                        <img onClick={() => setshowMenu(true)} className={s.menuIcon} src={menu} alt="" />
                        {showMenu && <ul className={s.dropdown}>
                            <li className={s.dropdownItem}>  <span onClick={handleDeletePost}>Удалить пост</span>
                                </li>
                        </ul>}
                    </div>
                </ClickAwayListener>}
                {/* {userId &&  <ClickAwayListener onClickAway={() => setshowMenu(false)}>
                    <div>
                        <img onClick={() => setshowMenu(true)} className={s.menuIcon} src={menu} alt="" />
                        {showMenu && <ul className={s.dropdown}>
                            <li className={s.dropdownItem}> {props.post.authorId === userId
                                ? <span onClick={handleDeletePost}>Удалить пост</span>
                                : <span onClick={handleNotShowPost}>Скрыть из моей ленты</span>}</li>
                        </ul>}
                    </div>
                </ClickAwayListener>} */}
               
            </div>
            <div className={s.title}>{props.post.title}</div>
            <div className={s.textBlock}>
                <input id={`readmore${props.id}`} type="checkbox" className={s.readmorechecker} />
                <div className={s.text} >
                    {formattedText}
                    {lines.length > 6 && <div className={s.textBottom} ></div>}
                    {/* { props.post.text.length > 300 && <div className={s.textBottom} ></div>} */}
                </div>
                {lines.length > 6 && <label htmlFor={`readmore${props.id}`} className={s.readmorebutton} ></label>}
                {/* {props.post.text.length > 300 && <label htmlFor={`readmore${props.id}`} className={s.readmorebutton} ></label>} */}
            </div>
            <ImageList variant='standart' cols={2} gap={2}>
                {props.post.pictures.map((photo, index) => {
                    return <ImageListItem sx={{ width: '100%' }} onClick={() => { handleClick(index) }} key={index} cols={index === 2 && props.post.pictures.length === 3 || index === 0 && props.post.pictures.length === 1 ? 2 : 1}>
                        <img className={s.img} src={photo} alt="" />
                    </ImageListItem>
                })}
            </ImageList>

        </div>
        <ReactionsBlock toggleComments={toggleComments} showAllComments={showAllComments} userId={userId} liked={liked} post={props.post} />
        <CommentBlock showAllComments={showAllComments} userName={userName} userId={userId} post={props.post} />
        <ModalGallery setActive={setModalGalleryActive} active={modalGalleryActive}>
            <Gallery index={currentImageIndex} setModalGalleryActive={setModalGalleryActive}
                images={images}
                handleNextImage={handleNextImage}
                handlePrevImage={handlePrevImage}
                currentImageIndex={currentImageIndex}
                handleClickonImage={handleClickonImage}
                isOwner={props.isOwner}
            />
        </ModalGallery>
    </div>


}

export default Post;