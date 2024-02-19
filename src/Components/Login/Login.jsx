import { useForm } from "react-hook-form";
import s from './../Profile/ProfileDataForm/ProfileDataForm.module.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from "react-router-dom";

const Login = (props) => {
  const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm({ mode: 'onBlur', });
 
  const submit = data => {
  
    console.log(data);
   props.handleLogin(data.email, data.password );
}

    return (
        <div >
            Login
             <form className={s.form} onSubmit={handleSubmit(submit)} >
             <input  type="text" name="email" {...register('email')} placeholder="Введите ваш E-mail"/>
            <input type="password" name="password" {...register('password')} placeholder="Введите ваш пароль" />
            <button>Войти</button>
             </form>
           <NavLink to={"/registrate"}>Регистрация</NavLink>
        </div>)
}

export default Login;