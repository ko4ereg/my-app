import s from './PriceItem.module.css';

const PriceItem = (props) => {
    


    return (<div 
        className={s.item}>
           <div className={s.title}>  {props.title}</div>
           <div className={s.price}> {props.price}  </div>
           </div>
        )
}

export default PriceItem;