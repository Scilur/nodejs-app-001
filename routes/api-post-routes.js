const express = require('express');
const router = express.Router();
const { 
    getPosts, 
    addPost, 
    getPost, 
    deletePost, 
    editPost
} = require('../controllers/api-post-controller');


router.get('/api/posts', getPosts);
router.post('/api/add-post', addPost);
router.get('/api/posts/:id', getPost);
router.delete('/api/posts/:id', deletePost);
router.put('/api/edit/:id', editPost);


module.exports = router;