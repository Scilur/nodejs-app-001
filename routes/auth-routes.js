const express = require('express');
const router = express.Router();
const {
    getUserLogin,
    doUserLogin,
    getUserLogoff
} = require('../controllers/auth-controller');


router.get('/user-login', getUserLogin);
router.post('/user-login', doUserLogin);
router.get('/user-logoff', getUserLogoff);


module.exports = router;