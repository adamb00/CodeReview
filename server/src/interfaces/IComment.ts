import IUser from './IUser';
import IPost from './IPost';

export default interface IComment extends Document {
   content: string;
   createdAt: Date;
   user: IUser;
   post: IPost;
}
