import s from './PortfolioItem.module.css';

const PortfolioItem = (props) => {
     
    return (<div onClick={() => {props.handleClick(props.index)}} className={s.item}>
           <img src={props.url} alt="" />
            
           </div>
        )
}

export default PortfolioItem;