import { useForm } from 'react-hook-form';
import s from './ProfileDataForm.module.css';
import { ReactComponent as IconClose } from './../../../assets/icons/close.svg';
import Selector from './Selector';
import { useEffect, useState } from 'react';
import { saveProfileData } from '../../../redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';

const ProfileDataForm = (props) => {

    const userProfile = useSelector(state => state.profilePage.profile);
    const selectedOptions = userProfile.services;
    const [value, setSelectedValue] = useState([]);
    const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: userProfile });
    const [clicked, setClicked] = useState(false);

    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.label);
        setSelectedValue(selectedValues);
    };

    useEffect( () => {
        setSelectedValue(selectedOptions || []);
     }, [selectedOptions])
//props.active
    const handleClose = () => {
        props.setActive(false);
        setClicked(false);
        clearErrors();
        setSelectedValue(selectedOptions);
    }

    const dispatch = useDispatch();


   

    const submit = data => {
        const services = value.map((value) => value);
        const updatedUser = { ...userProfile, ...data };
        if (value.length > 0) {
            dispatch(saveProfileData(updatedUser, services));
            props.setActive(false);
            clearErrors();
            reset();
        }
    }

    return (<div className={s.modal}>
        <div className={s.modalTitle}><span>Основная информация</span> <IconClose onClick={handleClose} className={s.icon} /> </div>
        <form id='editProfile' onSubmit={handleSubmit(submit)} className={s.form} >
            <div className={s.formItem} >
                <span>Имя</span>
                <input className={errors.name ? s.error : s.input} placeholder='можно даже с фамилией ;)' type="text" {...register('name', { required: true, maxLength: 100 })} /></div>
            <div className={s.formItem} >
                <span>Город</span>
                <input className={errors.city ? s.error : s.input} placeholder='ну, там, где живёшь и работаешь…' type="text" {...register('city', { required: true })} /></div>
            <div className={s.formItem} >
                <span>Специализация</span>
                <Selector clicked={clicked} setClicked={setClicked} active={props.active} handleSelectChange={handleSelectChange} value={value} selectedOptions={selectedOptions} />

            </div>
            <div className={s.formItem} >
                <span>Ссылка на онлайн-запись</span>
                <input name='online-record' placeholder='через yclients, dikidi, masters и т.п.' type="text" {...register('link')} /></div>
            <div className={s.formItem} >
                <span>О себе</span>
                <textarea name='aboutMe' className={errors.aboutMe ? s.error : s.input} placeholder='будем рады паре слов, хех'  {...register('aboutMe', { required: 'Поле обязательно к заполнению', maxLength: 200 })} aria-invalid={errors.aboutMe ? true : false} /></div>
            <div className={s.formItemContacts} >
                <span>Контакты</span>
                <div className={s.contacts}>
                    <input name='contacts.instagram' placeholder='instagram http://instagram.com/' type="text" {...register('contacts.instagram')} />
                    <input name='contacts.whatsapp' placeholder='whatsapp +7(XXX)-XX-XX-XXX' type="tel"   {...register('contacts.whatsapp')} />
                    <input name='contacts.telegram' placeholder='telegram @Ваше Имя' type="text" {...register('contacts.telegram')} />
                    <input name='contacts.tiktok' placeholder='tiktok' type="text" {...register('contacts.tiktok')} />
                    <input name='contacts.vk' placeholder='vk http://vk.com/id' type="text" {...register('contacts.vk')} />
                </div>
            </div>
        </form>
        <button type='submit' form='editProfile' className={s.button}>Сохранить</button>
    </div>)
}


export default ProfileDataForm;


//    <div className={s.contacts}>
//    <input name='instagram' placeholder='instagram' type="text" {...register('contacts.instagram')}/>
//    <input name='whatsapp' placeholder='whatsapp' type="text" {...register('contacts.whatsapp')}  />
//    <input name='telegram' placeholder='telegram' type="text" {...register('contacts.telegram' )}   />
//    <input name='tiktok' placeholder='tiktok' type="text" {...register('contacts.tiktok' )}  />
//    <input name='vk' placeholder='vk' type="text" {...register('contacts.vk')}  />
//    </div>