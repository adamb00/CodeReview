export default interface IUser {
   firstName?: string;
   lastName?: string;
   password?: string;
   passwordConfirm?: string;
   createdAt?: Date;
   email?: string;
   active?: boolean;
   photo?: File | string;
   id: string;
   favoritePosts: string[];
}
