import { catchAsyncErrors } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Book } from "../models/bookSchema.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";
import { sendReturnReminder } from "../utils/emailService.js";

// Add New Book
export const addNewBook = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    author,
    isbn,
    publishedDate,
    genre,
    copiesAvailable,
    description,
  } = req.body;
  console.log(req.body);
  console.log(req.files);
  if (req.files) {
    const { coverImage } = req.files;
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/jpg",
    ];
    if (!allowedFormats.includes(coverImage.mimetype)) {
      return next(new ErrorHandler("Invalid file format", 400));
    }

    if (
      !author ||
      !isbn ||
      !title ||
      !publishedDate ||
      !genre ||
      !copiesAvailable ||
      !description
    ) {
      return next(
        new ErrorHandler("Please fill in all required fields 11", 400)
      );
    }

    let book = await Book.findOne({ isbn });
    if (book) {
      return next(new ErrorHandler("Book already exists", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      coverImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error",
        cloudinaryResponse.error || "Invalid cloudinary response"
      );
    }

    const newBook = await Book.create({
      title,
      author,
      isbn,
      publishedDate,
      genre,
      copiesAvailable,
      coverImage: cloudinaryResponse.secure_url,
      description,
    });
    return res.status(200).json({
      success: true,
      message: "Book added successfully",
    });
  } else {
    if (
      !author ||
      !isbn ||
      !title ||
      !publishedDate ||
      !genre ||
      !copiesAvailable ||
      !description
    ) {
      return next(
        new ErrorHandler("Please fill in all required fields 22", 400)
      );
    }

    let book = await Book.findOne({ isbn });
    if (book) {
      return next(new ErrorHandler("Book already exists", 400));
    }

    const newBook = await Book.create({
      title,
      author,
      isbn,
      publishedDate,
      genre,
      copiesAvailable,
      description,
    });
    return res.status(200).json({
      success: true,
      message: "Book added successfully",
    });
  }
});

// Get All Books
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();
  return res.status(200).json({
    success: true,
    books,
  });
});

export const deleteBookById = catchAsyncErrors(async (req, res, next) => {
  const { isbn } = req.body;
  const book = await Book.findOneAndDelete({ isbn });

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});

export const borrowBook = catchAsyncErrors(async (req, res, next) => {
  const { books } = req.body; // Expecting an array of { isbn, quantity } objects
  const userId = req.user._id;

  if (!books || books.length === 0) {
    return next(new ErrorHandler("No books specified for borrowing", 400));
  }

  // Initialize an array to hold the borrowed book details
  let borrowedBooks = [];

  for (let book of books) {
    const { title, isbn, quantity } = book;

    if (!isbn || !quantity || quantity <= 0) {
      return next(
        new ErrorHandler(`Invalid ISBN or quantity for book: ${isbn}`, 400)
      );
    }

    // Find and update the book
    const bookDoc = await Book.findOneAndUpdate(
      { isbn, copiesAvailable: { $gte: quantity } },
      { $inc: { copiesAvailable: -quantity } },
      { new: true }
    );

    if (!bookDoc) {
      return next(
        new ErrorHandler(
          `Book ${title} not found or not enough copies available`,
          404
        )
      );
    }

    // Check if the user is already in the borrowedBy array
    const userAlreadyBorrowed = bookDoc.borrowedBy.some(
      (borrow) => borrow.userId.toString() === userId.toString()
    );

    if (!userAlreadyBorrowed) {
      // Add the user to the borrowedBy array if not already present
      bookDoc.borrowedBy.push({
        userId: userId,
        borrowedDate: new Date(),
      });

      // Save the updated book document
      await bookDoc.save();
    }

    // Update or add the book in the user's booksBorrowed array
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const existingBorrowedBook = user.booksBorrowed.find(
      (borrowed) => borrowed.booksId.toString() === bookDoc._id.toString()
    );

    if (existingBorrowedBook) {
      // Update the quantity if the user has already borrowed this book
      existingBorrowedBook.quantity += quantity;
      existingBorrowedBook.date = new Date();
    } else {
      // Add a new entry if the user has not borrowed this book before
      user.booksBorrowed.push({
        booksId: bookDoc._id,
        quantity: quantity,
        date: new Date(),
      });
    }

    // Save the updated user document
    await user.save();

    // Add to borrowedBooks array for the response
    borrowedBooks.push({
      booksId: bookDoc._id,
      title: bookDoc.title,
      author: bookDoc.author,
      quantity,
      date: new Date(),
    });

    console.log("book borrowed");
  }
  console.log(borrowedBooks);
  return res.status(200).json({
    success: true,
    message: "Books borrowed successfully",
    borrowedBooks,
  });
});

export const getBookByID = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.bookID).populate(
    "borrowedBy.userId",
    "firstName lastName email enrollmentNumber dob gender"
  );

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  return res.status(200).json({
    success: true,
    book,
  });
});

export const returnBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { borrowId } = req.body;

  const book = await Book.findByIdAndUpdate(bookId);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  const bookRecord = book.borrowedBy.find(
    (borrow) => borrow._id.toString() === borrowId
  );
  if (!bookRecord) {
    return next(new ErrorHandler("Borrow record not found", 404));
  }

  book.borrowedBy = book.borrowedBy.filter(
    (borrow) => borrow._id.toString() !== borrowId
  );
  book.copiesAvailable += 1;
  await book.save();

  return res.status(200).json({
    success: true,
    message: "Book returned successfully",
  });
});
