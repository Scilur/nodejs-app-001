const express = require('express');
const router = express.Router();
const { 
    doToken, 
} = require('../controllers/api-auth-controller');


router.post('/login/token', doToken);


module.exports = router;