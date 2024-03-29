import { useDispatch, useSelector } from 'react-redux';
import HeaderLogin from './HeaderLogin';
import { useEffect, useRef, useState } from 'react';
import { login, logout } from '../../../redux/auth-reducer';
import { Navigate } from 'react-router-dom';


const HeaderLoginContainer = (props) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const userPhoto = useSelector(state => state.auth.userPhoto);
  const [isOpen, setOpen] = useState(false);
  const externalRef = useRef(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (externalRef.current && !externalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickLogout = () => {
    dispatch(logout());
    window.location.replace('/blog');
      setTimeout(() => {
        return <Navigate to={'/blog'} replace={true} />
      }, 1000); 
  }
  

  return (
    <div ref={externalRef} onClick={() => { setOpen(!isOpen) }}>
      <HeaderLogin handleClickLogout={handleClickLogout}
        
        setOpen={setOpen}
        isOpen={isOpen} userPhoto={userPhoto} isAuth={isAuth} />
    </div>
  )
}

export default HeaderLoginContainer;