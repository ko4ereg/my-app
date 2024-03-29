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

const handleClick = (e) => {
    console.log(e.target);
    if (e.target.classList.contains(s.active) ) {
        setActive(false)
    }
   
}

    return (<div className={active ? s.active : s.modal } onClick={ (e) => {handleClick(e)}}>
            <div className={s.modalContent}    >
                {children }
            </div>
           </div>
        )
}


export default Modal;