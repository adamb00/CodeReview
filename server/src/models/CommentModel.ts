import { Schema, model, InferSchemaType, CallbackError } from 'mongoose';

import IComment from '../interfaces/IComment';

const commentSchema: Schema = new Schema<IComment>({
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   content: { type: String, required: [true, 'Comment must contain any content.'] },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user.'],
      select: false,
   },
   post: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Post',
         required: [true, 'Comment must belong to a post.'],
      },
   ],
});

// Populate user and post to a comment
commentSchema.pre<CommentType>(/^find/, function (this: CommentType, next: (err?: CallbackError) => void): void {
   this.select('-__v');
   this.populate({ path: 'user', select: 'email firstName lastName' }).populate({
      path: 'post',
      select: 'title',
   });
   next();
});

const Comment = model<CommentType>('Comment', commentSchema);

export type CommentType = InferSchemaType<typeof commentSchema>;
export default Comment;
