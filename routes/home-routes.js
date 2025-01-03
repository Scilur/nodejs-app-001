import express from 'express';
import {
    getIndex
} from '../controllers/home-controller.js';


const router = express.Router();
router.get('/', getIndex);


export default router;