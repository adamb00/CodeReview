import Spinner from '../components/Spinner';

import { PropsWithChildren, useContext, useState } from 'react';
import AccountNavigation from '../components/AccountNavigation';
import { AppProvider } from '../contexts/AppContext';

interface AccountProps {
   isLoading: boolean;
}

export default function Account({ isLoading, children }: PropsWithChildren<AccountProps>) {
   const { user } = useContext(AppProvider);
   const [photoDeleted, setPhotoDeleted] = useState(false);
   if (!user) return <Spinner />;

   return (
      <main className='account'>
         <section className='account-view'>
            <figure className='account-view__image'>
               {isLoading ? (
                  <Spinner />
               ) : (
                  <img
                     className='account-view__photo'
                     src={`/${photoDeleted ? 'default.jpg' : user.photo}`}
                     alt={`Photo about ${user.firstName}`}
                     onError={() => setPhotoDeleted(true)}
                  />
               )}
               <figcaption className='account-view__welcome'>Welcome back, {user.firstName}!</figcaption>
            </figure>
         </section>
         <section className='account-content'>
            <AccountNavigation />
            {children}
         </section>
      </main>
   );
}
