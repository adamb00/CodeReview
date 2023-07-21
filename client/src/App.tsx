import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import './scss/index.scss';

import { LoginProvider } from './contexts/LoginContext';
import useGetUser from './hooks/useGetUser';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Error from './components/Error';
import Account from './pages/Account';

import Alert from './components/Alert';
import Logout from './components/Logout';
import UserPosts from './components/UserPosts';
import StarredPost from './components/StarredPost';
import CommentPage from './pages/CommentPage';
import Navigation from './components/Navigation';
import PersonalInformation from './components/PersonalInformation';
import SecurityInformation from './components/SecurityInformation';

export default function App() {
   const { isLoggedIn } = useContext(LoginProvider);
   const {
      cookies,
      setCookie,
      removeCookie,
      showAlert,
      setShowAlert,
      alertMessage,
      setAlertMessage,
      alertType,
      setAlertType,
      isLoading,
   } = useGetUser();

   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      setTimeout(() => setShowAlert(false), 6000);
   }, [setShowAlert, showAlert]);

   if (!isLoggedIn) {
      return (
         <div>
            {showAlert && <Alert message={alertMessage} type={alertType} />}
            <BrowserRouter>
               <Routes>
                  <Route
                     path='/'
                     element={
                        <Login
                           setCookie={(_name: string, token: string) => setCookie('jwt', token)}
                           setShowAlert={setShowAlert}
                           setAlertMessage={setAlertMessage}
                           setAlertType={setAlertType}
                        />
                     }
                  />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/*' element={<Error>Page not found!</Error>} />
               </Routes>
            </BrowserRouter>
         </div>
      );
   }

   return (
      <>
         {showAlert && <Alert message={alertMessage} type={alertType} />}
         <BrowserRouter>
            <Navigation>
               <Logout
                  className={isMobile ? 'navigation__link' : 'header-nav__link'}
                  removeCookie={() => removeCookie('jwt')}
               />
            </Navigation>
            <Routes>
               <Route path='/' element={<Home cookies={cookies} />} />
               <Route path='/signup' element={<Error>You are already logged in.</Error>} />
               <Route path='comments' element={<CommentPage />} />

               <Route
                  path='account/*'
                  element={
                     <Account isLoading={isLoading}>
                        <Routes>
                           <Route
                              path='personal'
                              element={
                                 <PersonalInformation
                                    setShowAlert={setShowAlert}
                                    setAlertMessage={setAlertMessage}
                                    setAlertType={setAlertType}
                                    cookies={cookies}
                                 />
                              }
                           />
                           <Route
                              path='security'
                              element={
                                 <SecurityInformation
                                    setShowAlert={setShowAlert}
                                    setAlertMessage={setAlertMessage}
                                    setAlertType={setAlertType}
                                    cookies={cookies}
                                 />
                              }
                           />
                           <Route path='posts' element={<UserPosts />} />
                           <Route path='starred' element={<StarredPost />} />
                        </Routes>
                     </Account>
                  }
               />
               <Route path='/*' element={<Error>Page not found!</Error>} />
            </Routes>
         </BrowserRouter>
      </>
   );
}
