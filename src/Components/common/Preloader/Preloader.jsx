import preloader from './../../../assets/preloader.svg';
import s from './Preloader.module.css';

const Preloader = (props) => {
    return <div> <img className={s.preloader} src={preloader} alt='loading icon' /> 
    </div>
}

export default Preloader;