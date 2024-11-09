import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../context/books/BookContext";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BorrowBook = () => {
  const { borrowBook } = useContext(BookContext);
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState(() => {
    const storedBooks = localStorage.getItem("borrowedBooks");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const increaseQuantity = (isbn) => {
    const updatedBorrowedBooks = borrowedBooks.map((book) =>
      book.isbn === isbn ? { ...book, quantity: book.quantity + 1 } : book
    );
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

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

  const removeBook = (isbn) => {
    const updatedBorrowedBooks = borrowedBooks.filter(
      (book) => book.isbn !== isbn
    );
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));
  };

  const calculateTotalItems = () => {
    return borrowedBooks.reduce((total, book) => total + book.quantity, 0);
  };

  const handleBorrowBooks = async () => {
    try {
      await borrowBook(borrowedBooks);
      setBorrowedBooks([]);
      localStorage.removeItem("borrowedBooks");
      toast.success("Books successfully borrowed!");
    } catch (error) {
      console.error("Failed to borrow books:", error);
      toast.error("Failed to borrow books. Please try again.");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "1250px", height: "100vh" }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="row">
        <div style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 50px)",
          maxWidth: "100%",
          scrollbarWidth: "none",
        }}>
          <style>
            {`
              .scrollable-content::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          
          {borrowedBooks.length === 0 ? (
            <div className="text-center">
              <img
                src="https://chhotubookstall.com/assets/img/empty-cart.png"
                alt="Empty Cart"
                style={{ width: "400px", height: "400px" }}
              />
           
            </div>
          ) : (
             <>
             <h4 className="mb-4 text-center">Borrowed Books</h4>
             <motion.div
              className="table-responsive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%" }}
            >
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
                        <div className="d-flex align-items-center">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            style={{
                              width: "150px",
                              height: "200px",
                              objectFit: "cover",
                              marginRight: "15px",
                            }}
                          />
                          <div>
                            <strong>{book.title || "Book Title"}</strong>
                            <p className="text-muted">ISBN: {book.isbn}</p>
                          </div>
                        </div>
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
            </motion.div>
             </>
            
            
          )}
          <motion.button
            className="btn btn-primary mt-3"
           
            onClick={() => navigate("/dashboard/Student")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Shopping
          </motion.button>
        </div>

        <div
          className="col-md-4"
          style={{
            position: "fixed",
            top: "100px",
            right: "20px",
            height: "auto",
            width: "300px",
            zIndex: 1000,
          }}
        >
          <motion.div
            className="card p-4"
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ width: "100%" }}
          >
            <h5 className="card-title">Borrow Summary</h5>
            <p className="mb-2">Items: {calculateTotalItems()}</p>
            <hr />
            <motion.button
              className="btn btn-primary btn-block"
              onClick={handleBorrowBooks}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Borrow
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
