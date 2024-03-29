import { useForm } from "react-hook-form";
import s from './Registrate.module.css';
import pictureBack from './../../assets/loginback.png';
import logo from './../../assets/logo.svg';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import smallPreloader from './../../assets/preloaderSmall.svg';
import { useSelector } from "react-redux";

const Registrate = (props) => {

  const isFetchingStatus = useSelector(state => state.profilePage.isFetchingForm);


  const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm({ mode: 'onBlur', });
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 

   useEffect ( ()=> {
    if (props.errorMessage === "Firebase: Error (auth/email-already-in-use).") {
      return  setErrorMessageEmail('Такой пользователь уже зарегистрирован');
      }
  }, [props.errorMessage])

  const submit = data => {
 
    if (data.password === data.password_2) {
      props.handleRegistrate(data.email, data.password )
     }
     if (data.password.length < 6 && data.password_2.length < 6)
     {
      setErrorMessage('Пароль должен содержать не менее 6 символов');
     };
     if (data.password !== data.password_2 ) {
      setErrorMessage('Пароли не совпадают');
     };
    }
  
  
  
 

const handleEmailChange = () => {
  setErrorMessageEmail(null);
  clearErrors('email');
};

 
    return (
      <div className={s.wrapper}>
        <div className={s.picture}> <img src={pictureBack} alt="" /></div>
        <div className={s.loginBlock}>
          <img src={logo} alt="" />
          <span className={s.title}>Регистрация</span>
         
          <form autoComplete="off" className={s.form} onSubmit={handleSubmit(submit)} >
            <input onClick={handleEmailChange}   className={errors.email || errorMessageEmail ? s.error : s.input} type="text" name="email" {...register('email', { required: 'Введите email', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, message: 'Неправильный формат email' },  validate: value => value.trim() === value, })} placeholder="Введите ваш E-mail" />
            {errors?.email && <span className={s.errorSpan}>{errors.email.message}</span>}
            {errorMessageEmail && <span className={s.errorSpan}>{errorMessageEmail}</span>}
            <span className={s.errorSpan}>{errorMessage}</span>
            <input className={errors.password ? s.error : s.input} type="password" name="password" {...register('password', {  required: 'Введите пароль'})} placeholder="Введите ваш пароль" />
            {errors?.password && <span className={s.errorSpan}>{errorMessage}{errors.password.message}</span>}
            <span className={s.errorSpan}>{errorMessage}</span>
            <input className={errors.password ? s.error : s.input} type="password" name="password_2" {...register('password_2', { required: 'Подтвердите пароль', message: "Подтвердите пароль" })} placeholder="Подтвердите ваш пароль" />
            {errors?.password_2  && <span className={s.errorSpan}>{errors.password_2.message}</span>}
            <span className={s.errorSpan}>{errorMessage}</span>
            <button  disabled={isFetchingStatus} className={s.button}> {isFetchingStatus ?   <img src={smallPreloader} alt="" /> : "Зарегистрироваться"  }</button>
          </form>
          <div>Уже есть аккаунт? <NavLink className={s.link} to={"/login"}>Войти</NavLink></div>
  
        </div>
      </div>)
}

export default Registrate;