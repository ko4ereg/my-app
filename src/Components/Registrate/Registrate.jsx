import { useForm } from "react-hook-form";
import s from './../Profile/ProfileDataForm/ProfileDataForm.module.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import style from './Login.module.css';
import { NavLink } from "react-router-dom";
const Registrate = (props) => {
  const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm({ mode: 'onBlur', });
 
  const submit = data => {
  
    console.log(data);
   props.handleRegistre(data.email, data.password );
}

    return (
      <div className={style.wrapperRegistrate}>
            Регистрация
             <form autoComplete="off" className={s.form} onSubmit={handleSubmit(submit)} >
             <input   type="text" name="email" {...register('email')} placeholder="Введите ваш E-mail"/>
            <input type="password" name="password" {...register('password')} placeholder="Введите ваш пароль" />
            <button>Зарегистрироваться</button>
             </form>
             <NavLink to={"/login"}>Уже зарегистрированы? Вход здесь!</NavLink>
        </div>)
}

export default Registrate;