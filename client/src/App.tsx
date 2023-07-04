import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import './scss/index.scss';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Error from './pages/Error';
import Navigation from './components/Navigation';
import Account from './pages/Account';

export default function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

   useEffect(() => {
      if (cookies.jwt) {
         setIsLoggedIn(true);
      } else {
         setIsLoggedIn(false);
      }
   }, [cookies.jwt]);

   return (
      <div>
         <BrowserRouter>
            {isLoggedIn && <Navigation setIsLoggedIn={setIsLoggedIn} removeCookie={() => removeCookie('jwt')} />}
            <Routes>
               {!isLoggedIn ? (
                  <Route
                     path='/'
                     element={
                        <Login
                           setIsLoggedIn={setIsLoggedIn}
                           setCookie={(_name: string, token: string) => setCookie('jwt', token)}
                        />
                     }
                  />
               ) : (
                  <Route path='/' element={<Home />} />
               )}
               {!isLoggedIn ? (
                  <Route path='/signup' element={<Signup />} />
               ) : (
                  <Route path='/signup' element={<Error>You are already logged in.</Error>} />
               )}
               {isLoggedIn && <Route path='/account' element={<Account></Account>} />}
               <Route path='/*' element={<Error>Page not found!</Error>} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}
