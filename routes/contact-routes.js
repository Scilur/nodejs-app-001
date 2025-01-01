const express = require('express');
const router = express.Router();
const authRequest = require('../middlewares/auth-request-middleware');
const {
    getContacts
} = require('../controllers/contact-controller');


router.get('/contacts', authRequest, getContacts);


module.exports = router;