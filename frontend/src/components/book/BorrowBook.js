import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../context/books/BookContext";

const BorrowBook = () => {
  const { borrowBook } = useContext(BookContext);
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState(() => {
    // Retrieve borrowed books from localStorage when component mounts
    const storedBooks = localStorage.getItem("borrowedBooks");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  // Function to increase the quantity of a borrowed book
  const increaseQuantity = (isbn) => {
    const updatedBorrowedBooks = borrowedBooks.map((book) =>
      book.isbn === isbn ? { ...book, quantity: book.quantity + 1 } : book
    );
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

  // Function to decrease the quantity of a borrowed book
  const decreaseQuantity = (isbn) => {
    const updatedBorrowedBooks = borrowedBooks
      .map((book) =>
        book.isbn === isbn && book.quantity > 1
          ? { ...book, quantity: book.quantity - 1 }
          : book
      )
      .filter((book) => book.quantity > 0);

    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

  // Function to remove a book from the borrowed list
  const removeBook = (isbn) => {
    const updatedBorrowedBooks = borrowedBooks.filter(
      (book) => book.isbn !== isbn
    );
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

  // Function to calculate the total number of items
  const calculateTotalItems = () => {
    return borrowedBooks.reduce((total, book) => total + book.quantity, 0);
  };

  // Function to handle borrowing books
  const handleBorrowBooks = async () => {
    try {
      // Ensure the borrowBook function expects the books with the quantity included
      await borrowBook(borrowedBooks); // Borrow the books using the context
      setBorrowedBooks([]); // Clear local state
      localStorage.removeItem("borrowedBooks");
    } catch (error) {
      console.error("Failed to borrow books:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Borrowed Books Section */}
        <div className="col-md-8">
          <h4 className="mb-4">Borrowed Books</h4>
          {borrowedBooks.length === 0 ? (
            <p>No books selected for borrowing.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Product Details</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map((book) => (
                    <tr key={book.isbn}>
                      <td>
                        <strong>{book.title || "Book Title"}</strong>
                        <p className="text-muted">ISBN: {book.isbn}</p>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => decreaseQuantity(book.isbn)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={book.quantity}
                            readOnly
                            className="form-control mx-2 text-center"
                            style={{ width: "50px" }}
                          />
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => increaseQuantity(book.isbn)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeBook(book.isbn)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/dashboard/Student")}
          >
            Continue Shopping
          </button>
        </div>

        {/* Borrow Summary Section */}
        <div className="col-md-4">
          <div className="card p-4">
            <h5 className="card-title">Borrow Summary</h5>
            <p className="mb-2">Items: {calculateTotalItems()}</p>
            <hr />
            <button
              className="btn btn-primary btn-block"
              onClick={handleBorrowBooks}
            >
              Borrow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
