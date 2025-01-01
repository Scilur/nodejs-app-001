const express = require('express');
const router = express.Router();
const authRequest = require('../middlewares/auth-request-middleware');
const { 
    getPost, 
    getEditPost, 
    editPost, 
    deletePost, 
    getPosts, 
    getAddPost, 
    addPost
} = require('../controllers/post-controller');


router.get('/posts', authRequest, getPosts);
router.get('/posts/:id', authRequest, getPost);
router.post('/add-post', authRequest, addPost);
router.get('/add-post', authRequest, getAddPost);
router.get('/edit/:id', authRequest, getEditPost);
router.put('/edit/:id', authRequest, editPost);
router.delete('/posts/:id', authRequest, deletePost);


module.exports = router;