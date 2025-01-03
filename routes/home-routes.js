const express = require('express');
const router = express.Router();
const {
    getIndex
} = require('../controllers/home-controller');


router.get('/', getIndex);


module.exports = router;