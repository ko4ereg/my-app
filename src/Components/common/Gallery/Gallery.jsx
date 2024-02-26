import {ReactComponent as IconClose} from './../../../assets/icons/close.svg';
import leftIcon from './../../../assets/icons/left.svg';
import rightIcon from './../../../assets/icons/right.svg';
import deleteIcon from './../../../assets/icons/delete.svg';
import s from './Gallery.module.css';
 

const Gallery = (props) => {
 
   
    return (<div className={s.gallery}  onClick={ (e) => {e.stopPropagation()}}> 
     <IconClose onClick={() => props.setModalGalleryActive(false)} className={s.iconClose} /> 
    <div className={s.content} >
    {props.currentImageIndex > 0 && <div onClick={props.handlePrevImage} className={s.button} ><img src={leftIcon} alt="" /></div> } 
    <div onClick={(e) => props.handleClickonImage(e)} className={s.image} >
     <img  src={props.images[props.index]} alt="" />
     {props.isOwner && <div className={s.bottomGallery} >  <div onClick={props.handleDeleteImage} className={s.deleteButton} > Удалить фото <img src={deleteIcon} alt="" /></div>   </div>} </div>
    {props.currentImageIndex < props.images.length - 1 && <div onClick={props.handleNextImage} className={s.button}><img src={rightIcon} alt="" /></div>} 
    </div>
   
  
  
           </div>
        )
}


export default Gallery;