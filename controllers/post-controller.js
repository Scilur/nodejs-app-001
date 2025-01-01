const Post = require('../models/post');
const createPath = require('../helpers/create-path');
const handleError = require('../helpers/handle-error');


const getPosts = (req, res) => {
    const title = "Posts";
    const user = req.user;

    Post
        .find()
        .sort({ createdAt: -1})
        .then((posts) => res.render(createPath('posts'), { user, title, posts }))
        .catch((error) => handleError(res, error));
};


const getPost = (req, res) => {
    const title = "Post";
    const user = req.user;

    Post
        .findById(req.params.id)
        .then((post) => {
            console.log(post);
            res.render(createPath('post'), { user, title, post });
        })
        .catch((error) => handleError(res, error));
};


const getEditPost = (req, res) => {
    const title = "Edit Post";
    const user = req.user;

    Post
        .findById(req.params.id)
        .then((post) => {
            console.log(post);
            res.render(createPath('edit-post'), { user, title, post });
        })
        .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
    const { title, author, text } = req.body;
    const { id } = req.params;

    Post
        .findByIdAndUpdate(id, { title, author, text })
        .then((post) => res.redirect(`/posts/${id}`))
        .catch((error) => handleError(res, error));
};


const getAddPost = (req, res) => {
    const title = "Add Post";
    const user = req.user;

    res.render(createPath('add-post'), { user, title });
};

const addPost = (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text });
    post.save()
        .then((post) => res.redirect('/posts'))
        .catch((error) => handleError(res, error));
};


const deletePost = (req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then((result) => res.setStatus(200).redirect('/posts'))
        .catch((error) => handleError(res, error));
};


module.exports = {
    getPosts,
    getPost,
    getEditPost,
    editPost,
    getAddPost,
    addPost,
    deletePost
}