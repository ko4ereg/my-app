import PortfolioItem from './PortfolioItem/PortfolioItem';
import s from './ProfilePortfolio.module.css';
import { useMemo } from 'react';
import icon from './../../../assets/icons/cross.svg';
import iconWhite from './../../../assets/icons/crossWhite.svg';
 
 

const PortfolioBlock = (props) => {
 
    let portfolioElement = useMemo(() =>
    (props.portfolio || []).map((item, index) => <PortfolioItem index={index} handleClick={props.handleClick}   key={index} url={item} />), [props.portfolio, props.handleClick]
);
    if (!props.portfolio || props.portfolio.length === 0) {
        return <div className={s.portfolioListEmptyContainer}>
            <span>Скоро здесь будет красиво!</span>
             {props.isOwner && <label htmlFor="inputPhotoPortfolio"> <div className={props.pricing ? s.addButton + ' ' + s.mainButton : s.addButton} >Добавить фото работ <img src={props.pricing? iconWhite : icon} alt="" /></div></label>} 
        </div>
        
     }
 
    return (<div className={s.portfolioContainer} >
         {portfolioElement}
    </div>)
}


export default PortfolioBlock;