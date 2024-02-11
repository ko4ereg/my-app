import { useEffect } from 'react';
import s from './Modal.module.css';

const Modal = ({active, setActive, children}) => {
    useEffect(()=>{
        if(active) {
            document.body.style.overflow = "hidden";
        }
        return() =>{
            document.body.style.overflow = "auto";  
        }
    }, [active])

    return (<div className={active ? s.active : s.modal } onClick={ () => {setActive(false)}}>
            <div className={s.modalContent}  onClick={ (e) => {e.stopPropagation()}} >
                {children }
            </div>
           </div>
        )
}


export default Modal;