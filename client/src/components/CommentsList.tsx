import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../utils/config';
import IComment from '../interfaces/IComment';
import CommentItem from './CommentItem';

interface CommentsListProps {
   id: string;
}

export default function CommentsList({ id }: CommentsListProps) {
   const [comments, setComments] = useState<IComment[]>([]);
   useEffect(() => {
      const getComments = async () => {
         try {
            const res = await axios.get(config.BASE_URL + `posts/${id}/comment`);
            setComments(res.data.data);
         } catch (err) {
            console.log(err);
         }
      };
      getComments();
   }, [id]);

   return (
      <>
         {comments.map((comment: IComment) => (
            <CommentItem key={comment._id} comment={comment} />
         ))}
      </>
   );
}
