import s from './ProfilePrice.module.css';
import TitleBlock from './TitleBlock';
import PriceBlock from './PriceBlock';
import { useState } from 'react';

const ProfilePrice = (props) => {
    const [modalPriceActive, setModalPriceActive] = useState(false);
    return (<div className={s.profilePrice}>
        <TitleBlock pricing={props.props.pricing}  isOwner={props.isOwner} active={modalPriceActive} setModalActive={setModalPriceActive} />
        <PriceBlock isOwner={props.isOwner} name={props.props.name} setModalActive={setModalPriceActive} pricing={props.props.pricing} />
    </div>
    )
}


export default ProfilePrice;



