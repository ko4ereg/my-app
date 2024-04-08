import { useForm } from "react-hook-form";
import s from './Login.module.css';
import pictureBack from './../../assets/loginback.png';
import logo from './../../assets/logo.svg';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import smallPreloader from './../../assets/preloaderSmall.svg';

const ResetPassword = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', });
  const isFetchingStatus = useSelector(state => state.profilePage.isFetchingForm); 

  const submit = data => {
    const email = data.email.trim();
    props.handleReset(email);
  }
  
  return (
    <div className={s.wrapper}>
      <div className={s.picture}> <img src={pictureBack} alt="" /></div>
      <div className={s.loginBlock}>
        <img src={logo} alt="" />
        <span className={s.title}>Восстановление пароля</span>
      
        <form autoComplete="off" className={s.form} onSubmit={handleSubmit(submit)} >
          <input  className={errors.email ? s.error : s.input} type="text" name="email" {...register('email', {   required: 'Введите email' , pattern: { value: /^\S+@\S+$/i, message: 'Неправильный формат email' } })} placeholder="Введите ваш E-mail" />
          {errors?.email && <span className={s.errorSpan}>Введите email</span>}
         
          <button className={s.button}> {isFetchingStatus ?   <img src={smallPreloader} alt="" /> : "Готово"  }</button>
        </form>
        <div> <NavLink className={s.link} to={"/login"}>Назад</NavLink></div>
       
      </div>
    </div>)
}

export default ResetPassword;