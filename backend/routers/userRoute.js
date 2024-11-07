import express from 'express';
import { login, logoutAdmin, logoutUser, userRegister } from '../controllers/userController.js';
import { isAdminAuthenticated, isUserAuthenticated } from '../middlewares/authMiddleware.js';
const router = express.Router();


router.post('/register',userRegister);
router.post("/login",login);
router.post('/logoutUser',isUserAuthenticated,logoutUser);
router.post('/logoutAdmin',isAdminAuthenticated,logoutAdmin);

export default router; 