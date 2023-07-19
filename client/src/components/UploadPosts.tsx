import { ChangeEvent, FormEvent, MouseEvent, useContext, useState } from 'react';
import Button from '../components/Button';
import { AppProvider } from '../contexts/AppContext';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import config from '../utils/config';
import { headers } from '../utils/helper';

interface UploadPostsProps {
   cookies: { [key: string]: string };
}

export default function UploadPosts({ cookies }: UploadPostsProps) {
   const [photoDeleted, setPhotoDeleted] = useState(false);
   const [title, setTitle] = useState('');
   const [content, setContent] = useState<string>('');
   const [files, setFiles] = useState<File[]>([]);
   const { user } = useContext(AppProvider);

   const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
   };

   const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
   };

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const fileList = Array.from(e.target.files);
         setFiles(fileList);
      }
   };

   const handleSubmit = async (e: FormEvent<HTMLFormElement> | MouseEvent) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      if (files.length === 1) {
         formData.append('photo', files[0]);
      } else if (files.length > 1) {
         files.forEach(file => {
            formData.append(`photo`, file);
         });
      }

      try {
         const response = await axios.post(config.BASE_URL + 'posts', formData, {
            withCredentials: true,
            headers: headers(cookies),
         });
         console.log(response);
      } catch (error) {
         console.log(error);
      }
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
               <label htmlFor='title' className='home__upload--label'>
                  Add a title
               </label>
               <input
                  type='text'
                  name='title'
                  id='title'
                  className='home__upload--input'
                  onChange={handleTitleChange}
               />
            </div>
            <div className='home__upload--group'>
               <label className='home__upload--label' htmlFor='files'>
                  Choose your photos or just enter some text
               </label>
               <textarea id='files' className='home__upload--input' onChange={handleContentChange} />
            </div>
            <div className='home__upload--group'>
               <input
                  type='file'
                  className='home__upload--input'
                  name='photos'
                  id='photos'
                  multiple
                  readOnly
                  onChange={handleImageChange}
               />
            </div>
            <Button style='primary' text='Share' onClick={handleSubmit} />
         </div>
      </form>
   );
}
