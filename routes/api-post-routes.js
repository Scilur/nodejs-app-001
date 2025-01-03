import express from 'express'
import { 
    getPosts, 
    addPost, 
    getPost, 
    deletePost, 
    editPost
} from '../controllers/api-post-controller.js';
import jwtMiddleware from '../middlewares/auth-request-middleware.js';


const router = express.Router();
router.get('/api/posts', jwtMiddleware, getPosts);
router.post('/api/add-post', jwtMiddleware, addPost);
router.get('/api/posts/:id', jwtMiddleware, getPost);
router.delete('/api/posts/:id', jwtMiddleware, deletePost);
router.put('/api/edit/:id', jwtMiddleware, editPost);


export default router;