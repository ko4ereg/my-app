import s from './ProfilePrice.module.css';
import TitleBlock from './TitleBlock';
import PriceBlock from './PriceBlock';
import { useState } from 'react';

const ProfilePrice = (props) => {
    const [modalPriceActive, setModalPriceActive] = useState(false);
    return (  <div className={s.profilePrice}>
          <TitleBlock active={modalPriceActive} setModalActive={setModalPriceActive} isAuth={props.isAuth} />
         
        <PriceBlock  isAuth={props.isAuth} setModalActive={setModalPriceActive} pricing={props.props.pricing} /> 
       
        </div>
    )
}
 

export default ProfilePrice;


 
