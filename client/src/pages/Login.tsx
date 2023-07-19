import { FormEvent, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookieGetOptions } from 'universal-cookie';

import axios from 'axios';

import config from '../utils/config';
import Button from '../components/Button';
import Form from '../components/Form';
import { AppProvider } from '../contexts/AppContext';
import IAccountProps from '../interfaces/IAccountProps';
import { LoginProvider } from '../contexts/LoginContext';

interface LoginProps extends IAccountProps {
   setCookie: (name: string, value: string, options?: CookieGetOptions) => void;
}

export default function Login({ setCookie, setShowAlert, setAlertMessage, setAlertType }: LoginProps) {
   const navigate = useNavigate();
   const { user } = useContext(AppProvider);
   const { setIsLoggedIn } = useContext(LoginProvider);

   const handleForgotPassword = async () => {
      try {
         const res = await axios.post(config.BASE_URL + 'users/forgotPassword', { email: user.email });
         if (res.data.status === 'success') {
            console.log(res.data);
            setShowAlert(true);
            setAlertType(res.data.status);
            setAlertMessage(res.data.message);
         }
      } catch (err) {
         setShowAlert(true);
         setAlertType('error');
         setAlertMessage('Something went wrong! 🤯');
      }
   };

   const handleFormSubmit = async (e: FormEvent<HTMLFormElement> | MouseEvent) => {
      e.preventDefault();

      try {
         const res = await axios.post(
            config.BASE_URL + 'users/login',
            { email: user.email, password: user.password },
            {
               withCredentials: true,
               headers: {
                  'Content-Type': 'application/json',
               },
            }
         );

         if (res.data.status === 'success') {
            setCookie('jwt', res.data.token);
            setIsLoggedIn(true);
            navigate('/');
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <h1 className='heading-primary heading-primary--main'>Code Review</h1>
         <div className='login'>
            <Form
               className='login'
               links={true}
               email={true}
               password={true}
               handleForgotPassword={handleForgotPassword}
            >
               <Button text='Login' style='primary' onClick={e => handleFormSubmit(e)} />
            </Form>
         </div>
      </>
   );
}
