import { MouseEventHandler, useContext } from 'react';
import Button from './Button';
import Form from './Form';
import axios from 'axios';
import config from '../utils/config';
import { AppProvider } from '../contexts/AppContext';
import { headers } from '../utils/helper';
import IAccountProps from '../interfaces/IAccountProps';

export default function UploadUserPhoto({ setAlertMessage, setShowAlert, setAlertType, cookies }: IAccountProps) {
   const { user } = useContext(AppProvider);

   const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = async e => {
      e.preventDefault();
      setShowAlert(true);
      const formData: FormData = new FormData();
      if (user.photo) formData.append('photo', user.photo);
      if (!cookies) return null;
      try {
         const res = await axios.patch(config.BASE_URL + 'users/updateMe', formData, {
            withCredentials: true,
            headers: headers(cookies),
         });
         console.log(res);
         if (res.data.status === 'success') {
            setAlertMessage('Successfully updated! 🥳');
            setAlertType('success');
            setTimeout(() => location.reload(), 4000);
         }
      } catch (err) {
         setAlertMessage('Something went wrong! 🤯');
         setAlertType('error');
      }
   };
   return (
      <>
         <h2 className='heading-tertiary heading-tertiary--main'>Upload Your Photo</h2>
         <Form className='account-content' photo={true}>
            <Button style='primary' text='Upload' onClick={handleFormSubmit} />
         </Form>
      </>
   );
}
