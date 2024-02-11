import { useEffect } from 'react';
import s from './Modal.module.css';

const ModalGallery = ({active, setActive, children}) => {
    useEffect(()=>{
        if(active) {
            document.body.style.overflow = "hidden";
        }
        return() =>{
            document.body.style.overflow = "auto";  
        }
    }, [active])

    return (<div className={active ? s.activeGallery : s.modalGallery } >
            <div className={s.modalGalleryContent}  onClick={ () => {setActive(false)}} >
                {children } 
            </div>
           </div>
        )
}


export default ModalGallery;