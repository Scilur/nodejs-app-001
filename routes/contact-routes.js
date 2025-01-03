import express from 'express';
import authRequest from '../middlewares/auth-request-middleware.js';
import {
    getContacts
} from '../controllers/contact-controller.js';


const router = express.Router();
router.get('/contacts', authRequest, getContacts);


export default router;