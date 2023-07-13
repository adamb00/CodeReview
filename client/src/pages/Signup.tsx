import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import config from '../utils/config';
import Button from '../components/Button';
import Form from '../components/Form';

export default function SingUp() {
   const navigate = useNavigate();

   const [email, setEmail] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');

   const handleFormSubmit = async (e: FormEvent<HTMLFormElement> | MouseEvent) => {
      e.preventDefault();

      try {
         const res = await axios.post(config.BASE_URL + 'users/signup', {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
         });
         console.log(res);
         if (res.data.status === 'success') {
            console.log('success');
            navigate('/');
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <h1 className='heading-primary heading-primary--main'>Code Review</h1>
         <div className='signup'>
            <Form
               className='signup'
               name={true}
               setFirstName={setFirstName}
               setLastName={setLastName}
               setEmail={setEmail}
               setPassword={setPassword}
               setPasswordConfirm={setPasswordConfirm}
               email={true}
               password={true}
               passwordConfirm={true}
            >
               <Button text='Back' style='back' onClick={() => navigate('/')} />
               <Button text='Sign up' style='primary' onClick={e => handleFormSubmit(e)} />
            </Form>
         </div>
      </>
   );
}
