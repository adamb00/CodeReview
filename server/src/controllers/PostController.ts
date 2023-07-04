import * as handler from '../utils/handleControllers';
import Post from '../models/PostModel';

export default class PostController {
   /**
    * Create a post with the global handler function
    */
   public createPost = handler.createOne(Post);

   /**
    * Get all post with the global handler function
    */
   public getAllPost = handler.getAll(Post);

   /**
    * Get one post with the global handler function
    */
   public getOnePost = handler.getOne(Post);
}
