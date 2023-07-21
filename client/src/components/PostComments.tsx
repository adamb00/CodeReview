import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction } from 'react';
import Button from './Button';

interface PostCommentProps {
   handleSubmit: MouseEventHandler<HTMLButtonElement>;
   setContent: Dispatch<SetStateAction<string>>;
}

export default function PostComments({ handleSubmit, setContent }: PostCommentProps) {
   const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
   };

   return (
      <div className='post-item__comment'>
         <div className='post-item__group'>
            <label htmlFor='comment' className='post-item__label'></label>
            <input
               type='text'
               name='comment'
               id='comment'
               className='post-item__input'
               placeholder='Leave a comment'
               onChange={handleClick}
            />
         </div>
         <Button text='submit' style='primary' onClick={handleSubmit} />
      </div>
   );
}
