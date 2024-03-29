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
import ModalGallery from '../../common/Modal/ModalGallery';
import MainPhotoGallery from '../../common/MainPhotoGallery/MainPhotoGallery';
import { saveMainPhoto } from '../../../redux/profile-reducer';
import { useDispatch } from 'react-redux';

const ProfileInfo = (props) => {
    // let services =  props.props.services;
    // for (let i = 0; i < services.length; i++) {
    //     services[i] = services[i].charAt(0).toUpperCase() + services[i].substr(1);
    // }
    const [modalActive, setModalActive] = useState(false);
    const [modalGalleryActive, setModalGalleryActive] = useState(false);
    const dispatch = useDispatch();

    const handleUpdate = (e) => {
        if (e.target.files.length) {
            const newPhoto = e.target.files[0];
            dispatch(saveMainPhoto(newPhoto, props.props.id));
        }
    }



    if (!props.props.services && !props.props.city && !props.props.aboutMe) {
        return (<div>
            <div className={s.profile}>

                {props.props.photo ? <div><img onClick={() => setModalGalleryActive(true)} className={s.userPhoto} src={props.props.photo} alt="" /></div>
                    : props.isOwner ? <div className={s.mainPhotoContainer}>  <label htmlFor="emptyPhotoInput"><input onChange={handleUpdate} className={s.emptyPhotoInput} type="file" id='emptyPhotoInput' />
                        <img className={s.userPhoto} src={noPhoto} alt="" />
                        <img className={s.overlay} src={crossIcon} alt="" /></label></div>
                        : <div style={{ cursor: 'default' }} className={s.mainPhotoContainer}>
                            <img style={{ cursor: 'default' }} className={s.userPhoto} src={noPhoto} alt="" />
                        </div>}
                <div className={s.emptyProfile} >{props.props.name} {props.isOwner && <button className={s.button} onClick={() => { setModalActive(true) }}>Заполнить профиль <img className={s.editIcon} src={editIcon} alt="" /> </button>} </div>
                <ModalGallery active={modalGalleryActive} setActive={setModalGalleryActive}>
                    <MainPhotoGallery handleUpdate={handleUpdate} isOwner={props.isOwner} mainPhoto={props.props.photo} setModalGalleryActive={setModalGalleryActive}
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
            {props.props.photo ? <div><img onClick={() => setModalGalleryActive(true)} className={s.userPhoto} src={props.props.photo} alt="" /></div>
                : <div className={s.mainPhotoContainer}>  <label htmlFor="emptyPhotoInput"> <input onChange={handleUpdate} className={s.emptyPhotoInput} type="file" id='emptyPhotoInput' />
                    <img className={s.userPhoto} src={noPhoto} alt="" />
                    <img className={s.overlay} src={crossIcon} alt="" />
                </label></div>}
            <ProfileData isOwner={props.isOwner} setActive={setModalActive} props={props.props} />
            <ModalGallery active={modalGalleryActive} setActive={setModalGalleryActive}>
                <MainPhotoGallery handleUpdate={handleUpdate} isOwner={props.isOwner} mainPhoto={props.props.photo} setModalGalleryActive={setModalGalleryActive}
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
        {props.isOwner && <div className={s.editProfile} onClick={() => { props.setActive(true) }} ><IconEdit className={s.icon} /></div>}
        <div>{props.props.name}</div>
        {props.props.services && <div className={s.location} > <div className={s.typeservice} >
            {props.props.services.join(', ')}

        </div>
            <div className={s.dot}></div>
            <div className={s.city} >
                {props.props.city}
            </div> </div>}

        <div className={s.aboutMe}> {props.props.aboutMe} </div>

        <div className={s.contacts}>
            {props.props.contacts.instagram && <div>  <NavLink target='_blank' to={`http://instagram.com/${props.props.contacts.instagram}`}> <img className={s.socials} src={instagram} alt="" />  </NavLink>
            </div>}
            {props.props.contacts.whatsapp && <div>  <NavLink target='_blank' to={`http://wa.me/${props.props.contacts.whatsapp}`}> <img className={s.socials} src={whatsapp} alt="" />  </NavLink>
            </div>}
            {props.props.contacts.telegram && <div>  <NavLink target='_blank' to={`http://t.me/${props.props.contacts.telegram}`}> <img className={s.socials} src={telegram} alt="" />  </NavLink>
            </div>}
            {props.props.contacts.tiktok && <div>   <NavLink target='_blank' to={`http://tiktok.com/${props.props.contacts.tiktok}`}> <img className={s.socials} src={tiktok} alt="" />  </NavLink>
            </div>}
            {props.props.contacts.vk && <div>  <NavLink target='_blank' to={`http://vk.com/${props.props.contacts.vk}`}> <img className={s.socials} src={vk} alt="" />  </NavLink>
            </div>}
        </div>
        {!props.isOwner && <div className={s.profileButtons} >
            <button onClick={() => alert('Пока недоступно')} className={s.writeButton} >Написать</button>
            <button onClick={() => alert('Пока недоступно')} className={s.recordButton}  >Записаться на услуги</button> </div>}
    </div>
}

export default ProfileInfo;



