import { BrowserRouter, Navigate, Route, Routes,   } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import HeaderContainer from './Components/Header/HeaderContainer';
import { Suspense, useEffect } from 'react';
import Preloader from './Components/common/Preloader/Preloader';
import ProfileContainer from './Components/Profile/ProfileContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import LoginContainer from './Components/Login/LoginContainer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import RegistrateContainer from './Components/Registrate/RegistrateContainer';
import BlogContainer from './Components/Blog/BlogContainer';


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
      {pathName !== '/login' ?  <HeaderContainer/> : null}
        
        <div className='container'>
        {pathName !== '/login' ?  <NavbarContainer className='navbar' /> : null}  
          <div className='app-wrapper-content'>
            <Suspense fallback={<Preloader />}>
              <Routes>
              <Route path="/" element={<Navigate to="/profile/1" />} />
                <Route path="/profile/:userId?" element={<ProfileContainer />} />
                <Route path="/blog" element={<BlogContainer />} />
                <Route path="/login" element={<LoginContainer />} />
                <Route path="/registrate" element={<RegistrateContainer  />} />
                <Route element={<Footer />}/>
              </Routes>
            </Suspense>
          </div>
        </div>
        {pathName !== '/login' ?  <Footer/> : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
