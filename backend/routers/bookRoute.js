import express from 'express';
import { isAdminAuthenticated, isUserAuthenticated } from '../middlewares/authMiddleware.js';
import { addNewBook, borrowBook, deleteBookById, getAllBooks, getBookByID, returnBook } from '../controllers/bookController.js';
const router = express.Router();


router.post('/addBook',isAdminAuthenticated,addNewBook);
router.get('/getBooks',getAllBooks);
router.delete('/deleteBook',isAdminAuthenticated,deleteBookById);
router.post('/borrowBook',isUserAuthenticated,borrowBook);
router.get('/:bookID', getBookByID);
router.put('/:bookId/return', returnBook);


export default router; 
