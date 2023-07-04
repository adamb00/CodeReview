export default interface IUser extends Document {
   firstName: string;
   lastName: string;
   password: string;
   passwordConfirm: string;
   passwordChangedAt?: Date;
   passwordResetToken?: string;
   passwordResetExpires?: Date;
   createdAt: Date;
   email: string;
   active: boolean;
   photo: string;
   correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
   changedPassword(JWTTimestamp: number): Promise<boolean>;
}
