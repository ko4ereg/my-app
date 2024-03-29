import s from './ProfilePrice.module.css';
import { useMemo } from 'react';
import PriceItem from './PriceItem/PriceItem';
import icon from './../../../assets/icons/cross.svg';
import iconWhite from './../../../assets/icons/crossWhite.svg';

const PriceBlock = (props) => {

    let priceElement = useMemo(() =>
        (props.pricing || []).map(item => <PriceItem title={item.title} key={item.title} price={item.price} />), [props.pricing]
    );
    // let priceElement = props.pricing.map((item, index) => <PriceItem key={item.id} title={item.title} price={item.price} />);
    if (!props.pricing || props.pricing.length === 0  ) {
        return <div className={s.pricingListEmptyContainer}>
            <span>Пока что пусто</span>
            {props.isOwner && <button onClick={() => props.setModalActive(true)} className={props.name ? s.button + ' ' + s.mainButton : s.button}>Добавить оказываемые услуги <img src={props.name? iconWhite : icon} alt="" /></button>}
        </div>
        
     }

    return (<div className={s.pricingListContainer}>
         <input id="readmore" type="checkbox" className={s.readmorechecker} />
       <div className={s.pricingList} >
        {priceElement}
        {props.pricing.length > 3 && <div className={s.pricingListBottom} ></div>}
        </div>
       
       {props.pricing.length > 3 && <label htmlFor="readmore" className={s.readmorebutton} ></label>} 
    </div>)
}


export default PriceBlock;

 