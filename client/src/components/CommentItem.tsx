import { useContext } from 'react';
import IComment from '../interfaces/IComment';
import { AppProvider } from '../contexts/AppContext';

interface CommentItemProps {
   comment: IComment;
}

export default function CommentItem({ comment }: CommentItemProps) {
   const { user } = useContext(AppProvider);
   const formattedDate = new Date(comment.createdAt);
   return (
      <div className={comment.user._id === user._id ? 'comment__group current' : 'comment__group'}>
         <div className='comment__date'>{formattedDate.toLocaleString('hu-hu')}</div>
         <div className='comment__label'>
            <div className='comment__name'>
               {comment.user.firstName} &nbsp;
               {comment.user.lastName}
            </div>
         </div>
         <div id='content' className='comment__content'>
            {comment.content}
         </div>
      </div>
   );
}
