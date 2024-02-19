import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import HeaderContainer from './Components/Header/HeaderContainer';
import { Suspense, useEffect } from 'react';
import Preloader from './Components/common/Preloader/Preloader';
import ProfileContainer from './Components/Profile/ProfileContainer';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import LoginContainer from './Components/Login/LoginContainer';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import RegistrateContainer from './Components/Registrate/RegistrateContainer';


function App() {
  const auth = getAuth();
  const initialized = useSelector(state => state.app.initialized)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(initializeApp())
      } else {
        dispatch(initializeApp())
      }
    });

    return () => {
      unsubscribe(); // Отписка от событий при размонтировании компонента
    };
  }, [auth]);

  if (!initialized) return <Preloader />;

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <HeaderContainer />
        <div className='container'>
          <NavbarContainer className='navbar' />
          <div className='app-wrapper-content'>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="/profile" element={<ProfileContainer />} />
                <Route path="dialogs" element={<DialogsContainer />} />
                <Route path="/login" element={<LoginContainer />} />
                <Route path="/registrate" element={<RegistrateContainer  />} />
              </Routes>
            </Suspense>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
