import { BrowserRouter, HashRouter, Navigate, Route, Routes,   } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import HeaderContainer from './Components/Header/HeaderContainer';
import { Suspense, useEffect, useState } from 'react';
import Preloader from './Components/common/Preloader/Preloader';
import ProfileContainer from './Components/Profile/ProfileContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import LoginContainer from './Components/Login/LoginContainer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import RegistrateContainer from './Components/Registrate/RegistrateContainer';
import BlogContainer from './Components/Blog/BlogContainer';
import ResetPasswordContainer from './Components/Login/ResetPasswordContainer';
import MastersContainer from './Components/Masters/MastersContainer';
import SearchContainer from './Components/Masters/SearchContainer';


function App() {
  const auth = getAuth();
  const initialized = useSelector(state => state.app.initialized)
  const dispatch = useDispatch();

 
 
 
  const pathName = window.location.pathname;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(initializeApp());
        
      } else {
        dispatch(initializeApp());
       
      }
    });

    return () => {
      unsubscribe(); // Отписка от событий при размонтировании компонента
    };
  }, [auth, pathName]);

  if (!initialized) return <Preloader />;
 

  return (
    <BrowserRouter>
    
      
      <div className='app-wrapper'>
      {pathName !== '/login' && pathName !== '/registrate' && pathName !== '/resetpassword'   ?  <HeaderContainer /> : null}
      <Routes>
             
              
                <Route path="/login" element={<LoginContainer />} />
                <Route path="/registrate" element={<RegistrateContainer  />} />
                <Route path="/resetpassword" element={<ResetPasswordContainer  />} />
            
              </Routes>
        <div className='container'>
        {auth ?  <NavbarContainer className='navbar' /> : null}  
          <div className='app-wrapper-content'>
            <Suspense fallback={<Preloader />}>
              <Routes>
              <Route path="" element={<Navigate to="/blog" />} />
                <Route path="/profile/:userId?" element={<ProfileContainer />} />
                <Route path="/blog" element={<BlogContainer />} />
                <Route path="/masters" element={<MastersContainer />} />
                <Route path="/search*" element={<SearchContainer />} />
                <Route element={<Footer />}/>
              </Routes>
            </Suspense>
          </div>
        </div>
        {pathName !== '/login' && pathName !== '/resetpassword' && pathName !== '/registrate' ?  <Footer/> : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
