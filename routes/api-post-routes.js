const express = require('express');
const jwtMiddleware = require('../middlewares/auth-request-middleware');
const router = express.Router();
const { 
    getPosts, 
    addPost, 
    getPost, 
    deletePost, 
    editPost
} = require('../controllers/api-post-controller');


router.get('/api/posts', jwtMiddleware, getPosts);
router.post('/api/add-post', jwtMiddleware, addPost);
router.get('/api/posts/:id', jwtMiddleware, getPost);
router.delete('/api/posts/:id', jwtMiddleware, deletePost);
router.put('/api/edit/:id', jwtMiddleware, editPost);


module.exports = router;