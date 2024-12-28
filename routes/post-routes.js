const express = require('express');
const router = express.Router();
const { 
    getPost, 
    getEditPost, 
    editPost, 
    deletePost, 
    getPosts, 
    getAddPost, 
    addPost
} = require('../controllers/post-controller');


router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.post('/add-post', addPost);
router.get('/add-post', getAddPost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.delete('/posts/:id', deletePost);


module.exports = router;