import { FormEvent, MouseEvent, useContext, useState } from 'react';
import Button from '../components/Button';
import { AppProvider } from '../contexts/AppContext';
import { NavLink } from 'react-router-dom';

export default function UploadPosts() {
   const [photoDeleted, setPhotoDeleted] = useState(false);
   const { user } = useContext(AppProvider);
   const handleFormSubmit = async (e: FormEvent<HTMLFormElement> | MouseEvent) => {
      e.preventDefault();
      console.log(e);
   };

   return (
      <form className='home__upload'>
         <NavLink to='/account'>
            <img
               className='home__upload--photo'
               src={`/${photoDeleted ? 'default.jpg' : user.photo}`}
               alt={`Photo about ${user.firstName}`}
               onError={() => setPhotoDeleted(true)}
            />
         </NavLink>
         <div className='home__upload--container'>
            <div className='home__upload--group'>
               <label className='home__upload--label' htmlFor='files'>
                  Choose your photos or just enter some text
               </label>
               <textarea id='files' className='home__upload--input' />
            </div>
            <div className='home__upload--group'>
               <input type='file' className='home__upload--input' name='files' id='files' />
            </div>
            <Button style='primary' text='Share' onClick={e => handleFormSubmit(e)} />
         </div>
      </form>
   );
}
