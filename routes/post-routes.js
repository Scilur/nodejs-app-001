import express from 'express'
import authRequest from '../middlewares/auth-request-middleware.js';
import { 
    getPost, 
    getEditPost, 
    editPost, 
    deletePost, 
    getPosts, 
    getAddPost, 
    addPost
} from '../controllers/post-controller.js';


const router = express.Router();
router.get('/posts', authRequest, getPosts);
router.get('/posts/:id', authRequest, getPost);
router.post('/add-post', authRequest, addPost);
router.get('/add-post', authRequest, getAddPost);
router.get('/edit/:id', authRequest, getEditPost);
router.put('/edit/:id', authRequest, editPost);
router.delete('/posts/:id', authRequest, deletePost);


export default router;