import { CallbackError, InferSchemaType, Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';

const userSchema: Schema = new Schema<IUser>({
   firstName: {
      type: String,
      required: [true, 'Please tell us your first name.'],
   },
   lastName: {
      type: String,
      required: [true, 'Please tell us your last name.'],
   },
   email: {
      unique: true,
      lowercase: true,
      type: String,
      required: [true, 'Please provide us your email.'],
      validate: [validator.isEmail, 'Please provid a valid email.'],
   },
   favoritePosts: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Post',
      },
   ],

   password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
   },
   passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
         validator: function (this: UserType, el: string): boolean {
            return el === this.password;
         },
         message: 'Passwords are not the same',
      },
   },
   passwordChangedAt: Date,
   passwordResetToken: String,
   passwordResetExpires: Date,
   active: { type: Boolean, default: true, select: false },
   photo: {
      type: String,
      default: 'default.jpg',
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

// Before save into the db hash the password
userSchema.pre<UserType>('save', async function (this: UserType, next: (err?: CallbackError) => void): Promise<void> {
   if (!this.isModified('password')) return next();

   // Hash password
   this.password = await bcrypt.hash(this.password, 12);

   // Set the confirmation pwd to undefined
   this.passwordConfirm = undefined;
   next();
});

// set passwordChangedAt index at userSchema after password changed
userSchema.pre<UserType>('save', function (this: UserType, next: (err?: CallbackError) => void): void {
   if (!this.isModified('password') || !this.isNew) return next();

   this.passwordChangedAt = Date.now() - 1000;
   next();
});

userSchema.methods.addFavorite = function (postId: string) {
   const index = this.favoritePosts.indexOf(postId);

   if (index === -1) {
      // Post is not favorited, add it to the array
      this.favoritePosts.push(postId);
   } else {
      // Post is already favorited, remove it from the array
      this.favoritePosts.splice(index, 1);
   }
};

const User = model<UserType>('User', userSchema);

export type UserType = InferSchemaType<typeof userSchema>;
export default User;
