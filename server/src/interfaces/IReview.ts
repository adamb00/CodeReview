import IUser from './IUser';
import IPost from './IPost';

export default interface IReview extends Document {
   rating: number;
   comment: string;
   createdAt: Date;
   user: IUser;
   post: IPost;
}
