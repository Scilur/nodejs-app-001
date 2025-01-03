import express from 'express';
import {
    getUserLogin,
    doUserLogin,
    getUserLogoff
} from '../controllers/auth-controller.js';


const router = express.Router();
router.get('/user-login', getUserLogin);
router.post('/user-login', doUserLogin);
router.get('/user-logoff', getUserLogoff);


export default router;