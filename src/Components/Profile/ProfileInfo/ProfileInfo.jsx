import { NavLink } from 'react-router-dom';
import s from './ProfileInfo.module.css';
import noPhoto from './../../../assets/icons/nopic.svg';
import crossIcon from './../../../assets/icons/crossgrey.svg';
import editIcon from './../../../assets/icons/editWhite.svg';
import vk from './../../../assets/icons/socials/vk.svg';
import instagram from './../../../assets/icons/socials/im.svg'
import telegram from './../../../assets/icons/socials/tg.svg'
import whatsapp from './../../../assets/icons/socials/wa.svg'
import tiktok from './../../../assets/icons/socials/tt.svg'
import { ReactComponent as IconEdit } from './../../../assets/icons/EditSquare.svg';
import Modal from '../../common/Modal/Modal';
import { useState } from 'react';
import ProfileDataForm from '../ProfileDataForm/ProfileDataForm';
import Gallery from '../../common/Gallery/Gallery';
import ModalGallery from '../../common/Modal/ModalGallery';
import MainPhotoGallery from '../../common/MainPhotoGallery/MainPhotoGallery';
import { updateMainPhoto } from '../../../redux/profile-reducer';
import { useDispatch } from 'react-redux';

const ProfileInfo = (props) => {
    const [modalActive, setModalActive] = useState(false);
    const [modalGalleryActive, setModalGalleryActive] = useState(false);
const dispatch = useDispatch();

 const handleUpdate  = ( e) => {
 
        if (e.target.files.length) {
            const newPhoto  =  URL.createObjectURL(e.target.files[0]);
            dispatch(updateMainPhoto(newPhoto));
        }
    }
  

    if (!props.props.services && !props.props.city && !props.props.aboutMe) {
        return (<div>
            <div className={s.profile}>
                
            {props.props.photo ? <div><img onClick={() => setModalGalleryActive(true)} className={s.userPhoto}  src={props.props.photo} alt="" /></div> 
                    : <div className={s.mainPhotoContainer}> <label htmlFor="emptyPhotoInput"><input onChange={handleUpdate} className={s.emptyPhotoInput} type="file" id='emptyPhotoInput' />
                    <img   className={s.userPhoto} src={  noPhoto} alt="" />
                    <img className={s.overlay} src={crossIcon} alt="" /></label></div>  }
                <div className={s.emptyProfile} >{props.props.name} <button onClick={() => { setModalActive(true) }}>Заполнить профиль <img className={s.editIcon} src={editIcon} alt="" /> </button></div>
                <ModalGallery active={modalGalleryActive} setActive={setModalGalleryActive}>
                 <MainPhotoGallery handleUpdate={handleUpdate} isAuth={props.isAuth} mainPhoto={props.props.photo} setModalGalleryActive={setModalGalleryActive}
                    />
                </ModalGallery>
                <Modal active={modalActive} setActive={setModalActive}>
                    <ProfileDataForm active={modalActive} setActive={setModalActive} />
                </Modal>
            </div>

        </div>)
    }

    return (<div>
        <div className={s.profile}>
        {props.props.photo ? <div><img onClick={() => setModalGalleryActive(true)} className={s.userPhoto}  src={props.props.photo} alt="" /></div> 
                    : <div className={s.mainPhotoContainer}>  <label htmlFor="emptyPhotoInput"> <input onChange={handleUpdate} className={s.emptyPhotoInput} type="file" id='emptyPhotoInput' />
                    <img   className={s.userPhoto} src={  noPhoto} alt="" />
                    <img className={s.overlay} src={crossIcon} alt="" />
                    </label></div>  }
            <ProfileData   isAuth={props.isAuth} setActive={setModalActive} props={props.props} />
            <ModalGallery active={modalGalleryActive} setActive={setModalGalleryActive}>
                    <MainPhotoGallery handleUpdate={handleUpdate} isAuth={props.isAuth} mainPhoto={props.props.photo} setModalGalleryActive={setModalGalleryActive}
                    />
                </ModalGallery>
            <Modal active={modalActive} setActive={setModalActive}>
                <ProfileDataForm active={modalActive} setActive={setModalActive} />
            </Modal>
        </div>

    </div>)
}

const ProfileData = (props) => {

    return <div className={s.info}>
        {props.isAuth && <div className={s.editProfile} onClick={() => { props.setActive(true) }} ><IconEdit className={s.icon} /></div>}
        <div>{props.props.name}</div>
        {props.props.services && <div className={s.location} > <div className={s.typeservice} > {props.props.services.join(', ')}</div>
            <div className={s.dot}></div>
            <div className={s.city} >{props.props.city}</div> </div>}

        <div className={s.aboutMe}> {props.props.aboutMe} </div>

        <div className={s.contacts}> {Object.entries(props.props.contacts).map(([title, value]) => {
            return <Contact key={title} contactTitle={title} contactValue={"http://" + value} />
        }
        )}   </div>
        {!props.isAuth && <div className={s.profileButtons} >
            <button className={s.writeButton} >Написать</button>
            <button className={s.recordButton}  >Записаться на услуги</button> </div>}
    </div>
}

const Contact = ({ contactTitle, contactValue }) => {

    const src = contactTitle === "vk"
        ? vk : contactTitle === "whatsapp"
            ? whatsapp : contactTitle === "instagram"
                ? instagram : contactTitle === "tiktok"
                    ? tiktok : contactTitle === "telegram"
                        ? telegram : contactTitle;
    if (contactValue) {
        return <div>  <NavLink to={contactValue}> <img className={s.socials} src={src} alt="" />  </NavLink>
        </div>
    }
}

export default ProfileInfo;



