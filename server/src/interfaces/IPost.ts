import IUser from './IUser';

export default interface Post extends Document {
   title: string;
   content: [];
   user: IUser;
   createdAt: Date;
}
