import * as handler from '../utils/handleControllers';
import Comment from '../models/CommentModel';

export default class CommentController {
   /**
    * Create a comment with the global handler function
    */
   public createComment = handler.createOne(Comment);

   /**
    * Get all comment with the global handler function
    */
   public getAllComment = handler.getAll(Comment);

   /**
    * Get one comment with the global handler function
    */
   public getOneComment = handler.getOne(Comment);
}
