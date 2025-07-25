import express from 'express';
import User from '../models/userModel.js';
import userController from '../controllers/userController.js';
const {registerUser} = userController
const router = express.Router();

router.post('/', registerUser) 

export default router;