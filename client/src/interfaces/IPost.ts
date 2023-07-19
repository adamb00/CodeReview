import IUser from './IUser';

export default interface IPost {
   title: string;
   photo: string;
   content: string;
   user: IUser;
   createdAt: Date;
   _id: string;
}
