import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

export default function Error({ children }: PropsWithChildren) {
   const navigate = useNavigate();

   function handleError() {
      navigate('/');
   }
   return (
      <>
         <div className='error'>
            <h2 className='heading-secondary heading-secondary--main'>Uh oh! Something went very wrong! 🤯</h2>
            <div className='error-message'>{children}</div>
            <Button text='Home' style='primary' onClick={handleError} />
         </div>
      </>
   );
}
