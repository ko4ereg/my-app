import s from './ProfilePortfolio.module.css';
import {ReactComponent as IconCross} from './../../../assets/icons/crossgrey.svg';
 

const TitleBlock = (props) => {
    return (  <div className={s.titleBlock}>
          <div className={s.title} >Портфолио</div>
          <input multiple onChange={props.onPhotoPortfolioSelected} className={s.inputPhotoPortfolio} id='inputPhotoPortfolio' type="file" />
        {props.isOwner && props.portfolio && <label htmlFor="inputPhotoPortfolio"><div className={s.block} ><IconCross className={s.icon} />Пополнить</div></label>}
        </div>
    )
}
 

export default TitleBlock;


 
