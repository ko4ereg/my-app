import {ReactComponent as IconClose} from './../../../assets/icons/close.svg';
import s from './MainPhotoGallery.module.css';
import noPhoto from './../../../assets/icons/nopic.svg';
import { useDispatch } from 'react-redux';
import { deleteMainPhoto } from '../../../redux/profile-reducer';
import { useState } from 'react';
import Preloader from '../Preloader/Preloader';

const MainPhotoGallery = (props) => {
    const dispatch = useDispatch();
   const handleDelete = () => {
        dispatch(deleteMainPhoto());
        props.setModalGalleryActive(false);
   } 
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    }
 
  
 
    return (<div className={s.gallery} onClick={ (e) => {e.stopPropagation()}}> 
     <IconClose onClick={() => props.setModalGalleryActive(false)} className={s.iconClose} /> 
    
    <div className={s.content} >
    <div   className={s.image} >
    <img  src={props.mainPhoto ? props.mainPhoto : noPhoto} alt="" /></div>
    </div>
    {props.isOwner && <div className={s.bottomGallery}> 
    <label  className={s.changeButton}  htmlFor="MainPhoto">
        <input onChange={(e) => props.handleUpdate(e)} id='MainPhoto' type="file" />
        Изменить 
    </label>
    <div onClick={handleDelete} className={s.deleteButton} > Удалить фото  </div>   </div>} 
  
  
           </div>
        )
}


export default MainPhotoGallery;