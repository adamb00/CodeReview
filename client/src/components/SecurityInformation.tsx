import axios from 'axios';
import { MouseEventHandler, useContext, useState } from 'react';

import Form from './Form';
import Button from './Button.tsx';
import config from '../utils/config.ts';
import { AppProvider } from '../contexts/AppContext.tsx';
import { headers } from '../utils/helper.ts';
import IAccountProps from '../interfaces/IAccountProps.ts';

export default function SecurityInformation({ setShowAlert, setAlertMessage, setAlertType, cookies }: IAccountProps) {
   const { user, setUser } = useContext(AppProvider);
   const [newPassword, setNewPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');

   const data = { passwordCurrent: user.password, passwordConfirm, newPassword };

   const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
      e.preventDefault();
      setShowAlert(true);
      if (!cookies) return null;

      try {
         const res = await axios.patch(config.BASE_URL + 'users/updateMyPassword', data, {
            withCredentials: true,
            headers: headers(cookies),
         });
         if (res.data.status === 'success') {
            setUser(res.data.data);
            setAlertMessage('Successfully updated! 🥳');
            setAlertType('success');
         }
      } catch (err) {
         setAlertMessage('Something went wrong! 🤯');
         setAlertType('error');
      }
   };

   return (
      <>
         <h2 className='heading-tertiary heading-tertiary--main'>Security settings</h2>

         <Form
            className='account-content'
            password={true}
            passwordConfirm={true}
            newPassword={true}
            setNewPassword={setNewPassword}
            setPasswordConfirm={setPasswordConfirm}
         >
            <Button style='primary' text='Save' onClick={handleFormSubmit} />
         </Form>
      </>
   );
}
