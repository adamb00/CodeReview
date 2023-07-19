import * as handler from '../utils/handleControllers';
import Post from '../models/PostModel';
import { upload } from '../middlewares/UploadPhoto';

export default class PostController {
   public uploadPostPhoto = upload.single('photo');
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
