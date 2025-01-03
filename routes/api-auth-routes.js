import express from 'express'
import { 
    doToken, 
} from '../controllers/api-auth-controller.js';


const router = express.Router();
router.post('/login/token', doToken);


export default router;