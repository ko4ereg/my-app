import { useForm } from "react-hook-form";
import s from './../Profile/ProfileDataForm/ProfileDataForm.module.css'
import { useAuthState } from 'react-firebase-hooks/auth';

const Registrate = (props) => {
  const { register, reset, handleSubmit, clearErrors, formState: { errors } } = useForm({ mode: 'onBlur', });
 
  const submit = data => {
  
    console.log(data);
   props.handleRegistre(data.email, data.password );
}

    return (
        <div >
            Login
             <form className={s.form} onSubmit={handleSubmit(submit)} >
             <input  type="text" name="email" {...register('email')} placeholder="Введите ваш E-mail"/>
            <input type="password" name="password" {...register('password')} placeholder="Введите ваш пароль" />
            <button>Зарегистрироваться</button>
             </form>
           
        </div>)
}

export default Registrate;