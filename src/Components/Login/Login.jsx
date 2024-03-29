import { useForm } from "react-hook-form";
// import s from './../Profile/ProfileDataForm/ProfileDataForm.module.css';
import s from './Login.module.css';
import pictureBack from './../../assets/loginback.png';
import logo from './../../assets/logo.svg';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import smallPreloader from './../../assets/preloaderSmall.svg';

const Login = (props) => {
  const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm({ mode: 'onBlur', });
  const isFetchingStatus = useSelector(state => state.profilePage.isFetchingForm);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect ( ()=> {
    if (props.errorMessage === "Firebase: Error (auth/invalid-credential).") {
      return  setErrorMessage('Неправильный пароль или email');
      }
      
  }, [props.errorMessage])


  const submit = data => {
 
    const email = data.email.trim();
    props.handleLogin(email, data.password);
    
  }
 
  const handleEmailChange = () => {
    setErrorMessage(null);
    clearErrors('email');
  };
 
   

  return (
    <div className={s.wrapper}>
      <div className={s.picture}> <img src={pictureBack} alt="" /></div>
      <div className={s.loginBlock}>
        <img src={logo} alt="" />
        <span className={s.title}>Вход</span>
      
        <form autoComplete="off" className={s.form} onSubmit={handleSubmit(submit)} >
          <input onClick={handleEmailChange} className={errors.email ? s.error : s.input} type="text" name="email" {...register('email', {   required: 'Введите email' , pattern: { value: /^\S+@\S+$/i, message: 'Неправильный формат email' },  validate: value => value.trim() === value, })} placeholder="Введите ваш E-mail" />
          {errors?.email && <span className={s.errorSpan}>Введите email</span>}
          <span className={s.errorSpan}> {errorMessage}</span>
          <input className={errors.password ? s.error : s.input} type="password" name="password" {...register('password', { required: true })} placeholder="Введите ваш пароль" />
          {errors?.password && <span className={s.errorSpan}>Введите пароль</span>}
          <span className={s.errorSpan}> {errorMessage}</span>
          <button   disabled={isFetchingStatus} className={s.button}> {isFetchingStatus ?   <img src={smallPreloader} alt="" /> : "Войти"  }</button>
        </form>
        <div>Нет аккаунта? <NavLink className={s.link} to={"/registrate"}>Зарегистрироваться</NavLink></div>
        <div>Забыли пароль? <NavLink className={s.link} to={"/resetpassword"}>Восстановить</NavLink></div>
      </div>
    </div>)
}

export default Login;