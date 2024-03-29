import BlogHeaderLenta from "./BlogHeaderLenta";
import s from './BlogHeader.module.css';
import icon from './../../../assets/icons/crossWhite.svg';
import { useState } from "react";
import PostForm from "./PostForm/PostForm";
import Modal from "../../common/Modal/Modal";

const BlogHeader = (props) => {
    const [modalActive, setModalActive] = useState(false);
    return (
        <div className={s.blogHeader}>
         <BlogHeaderLenta
         setOpen={props.setOpen}
         isOpen={props.isOpen} 
         isAuth={props.isAuth}/>
        {props.isAuth &&  <div className={s.button} onClick={()=> setModalActive(true) }> <img src={icon} alt="" /> Новый пост</div>}
        <Modal active={modalActive} setActive={setModalActive}>
                    <PostForm active={modalActive} setActive={setModalActive} />
                </Modal>
        </div>)
}

export default BlogHeader;