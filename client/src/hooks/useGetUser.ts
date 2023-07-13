import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AppProvider } from '../contexts/AppContext';
import { LoginProvider } from '../contexts/LoginContext';
import config from '../utils/config';
import { useCookies } from 'react-cookie';

export default function useUserData() {
   const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
   const [showAlert, setShowAlert] = useState(false);
   const [alertMessage, setAlertMessage] = useState('');
   const [alertType, setAlertType] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const { setUser } = useContext(AppProvider);
   const { setIsLoggedIn } = useContext(LoginProvider);

   useEffect(() => {
      const getUser = async () => {
         try {
            setIsLoading(true);
            const res = await axios.get(config.BASE_URL + 'users/me', {
               headers: {
                  Authorization: `Bearer ${cookies.jwt}`,
               },
            });
            if (res.data.status === 'success') {
               setUser(res.data.data);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setIsLoading(false);
         }
      };

      if (cookies.jwt) {
         getUser();
         setIsLoggedIn(true);
      } else {
         setIsLoggedIn(false);
      }
   }, [cookies.jwt, setIsLoggedIn, setUser]);

   return {
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
      setIsLoading,
   };
}
