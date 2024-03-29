import s from './ProfilePrice.module.css';
import {ReactComponent as IconWritepen} from './../../../assets/icons/writepen.svg';
import Modal from '../../common/Modal/Modal';
import PriceBlockForm from './PriceBlockForm';

const TitleBlock = (props) => {
    

    return (  <div className={s.titleBlock}>
          <div className={s.title} >Услуги</div>
        {props.isOwner && props.pricing && <div className={s.block}  onClick={() => props.setModalActive(true)}><IconWritepen className={s.icon}/>Изменить</div>}
          <Modal active={props.active} setActive={props.setModalActive}>
         <PriceBlockForm active={props.active} setModalPriceActive={props.setModalActive}/>
             </Modal>
        </div>
    )
}
 

export default TitleBlock;


 
