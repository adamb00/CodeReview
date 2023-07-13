import { MouseEventHandler, useContext } from 'react';
import axios from 'axios';

import Button from './Button.tsx';
import Form from './Form.tsx';
import config from '../utils/config.ts';
import { AppProvider } from '../contexts/AppContext.tsx';
import UploadUserPhoto from './UploadUserPhoto.tsx';
import { headers } from '../utils/helper.ts';
import IAccountProps from '../interfaces/IAccountProps.ts';

export default function PersonalInformation({ setShowAlert, setAlertMessage, setAlertType, cookies }: IAccountProps) {
   const { user, setUser } = useContext(AppProvider);

   const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
      e.preventDefault();

      setShowAlert(true);
      if (!cookies) return null;

      try {
         const res = await axios.patch(config.BASE_URL + 'users/updateMe', user, {
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
         <h2 className='heading-tertiary heading-tertiary--main'>Personal information</h2>

         <Form className='account-content' email={true} name={true}>
            <Button style='primary' text='Save' onClick={handleFormSubmit} />
         </Form>
         <UploadUserPhoto
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            setAlertType={setAlertType}
            cookies={cookies}
         />
      </>
   );
}
