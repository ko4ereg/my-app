import  Master  from './Master';
import s from './Masters.module.css';


const Masters = (props) => {
 
  return <div className={s.wrapper}>
    <span className={s.title}>Доступные специалисты</span>
      <div className={s.content}>
      {props.mastersData.map(u => <Master user={u}
       key={u.id} />
      )}
      </div>
  </div>
}


export default Masters;





 