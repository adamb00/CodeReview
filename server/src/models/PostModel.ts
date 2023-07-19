import { Schema, model, InferSchemaType, CallbackError } from 'mongoose';

import IPost from '../interfaces/IPost';

const postSchema: Schema = new Schema<IPost>({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to a user.'],
   },
   title: {
      type: String,
      required: [true, 'Every post needs a title.'],
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },

   photo: {
      type: String,
      required: [true, 'Every post must belong to photo.'],
   },
   content: { type: String, required: [true, 'Every post must contains content.'] },
});

// Populate the user to a post
postSchema.pre<PostType>(/^find/, function (this: PostType, next: (err?: CallbackError) => void): void {
   this.select('-__v');
   this.populate({ path: 'user', select: 'email firstName lastName' });
   next();
});

const Post = model<PostType>('Post', postSchema);

export type PostType = InferSchemaType<typeof postSchema>;
export default Post;
