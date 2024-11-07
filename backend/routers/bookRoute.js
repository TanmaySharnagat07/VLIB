import express from 'express';
import { isAdminAuthenticated, isUserAuthenticated } from '../middlewares/authMiddleware.js';
import { addNewBook, borrowBook, deleteBookById, getAllBooks } from '../controllers/bookController.js';
const router = express.Router();


router.post('/addBook',isAdminAuthenticated,addNewBook);
router.get('/getBooks',getAllBooks);
router.delete('/deleteBook',isAdminAuthenticated,deleteBookById);
router.put('/borrowBook',isUserAuthenticated,borrowBook);


export default router; 
