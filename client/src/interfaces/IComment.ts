import IUser from './IUser';

export default interface IComment {
   content: string;
   createdAt: Date;
   user: IUser;
   post: string;
   _id: string;
}
