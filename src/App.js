import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import HeaderContainer from './Components/Header/HeaderContainer';
import { Suspense } from 'react';
import Preloader from './Components/common/Preloader/Preloader';
import ProfileContainer from './Components/Profile/ProfileContainer';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';

function App() {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
      
        <HeaderContainer /> 
        <div className='container'>
          <NavbarContainer className='navbar'/>
          <div className='app-wrapper-content'>
      <Suspense fallback={<Preloader />}>
        <Routes>
        <Route path="profile" element={<ProfileContainer />} />
        <Route path="dialogs" element={<DialogsContainer />} />
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
