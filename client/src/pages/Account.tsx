import axios from 'axios';
import { useEffect } from 'react';
import config from '../../config';

export default function Account() {
   const getUser = async () => {
      try {
         const res = await axios.get(config.BASE_URL + '/users/me');
         if (res.data.status === 'success') {
            console.log('success');
         }
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      getUser();
   }, []);
   return (
      <main className='account'>
         <section className='account-view'>
            <div className='account-view__image'>
               <img className='account-view__photo' alt='User photo' />
            </div>
         </section>
         <section className='account-content'>right</section>
      </main>
   );
}
