import IUser from './IUser';

export default interface Post extends Document {
   title: string;
   photo: string;
   content: string;
   user: IUser;
   createdAt: Date;
}
