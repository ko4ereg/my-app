import preloader from './../../../assets/preloader.svg';
import s from './PreloaderMasters.module.css';

const PreloaderMasters = (props) => {
    return <div> <img className={s.preloader} src={preloader} alt='loading icon' /> 
    </div>
}

export default PreloaderMasters;