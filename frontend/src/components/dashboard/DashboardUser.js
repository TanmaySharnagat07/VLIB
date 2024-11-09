import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookContext from "../../context/books/BookContext";
import { motion } from "framer-motion";
import { Fade, Zoom } from "react-awesome-reveal";
import "animate.css";

const DashboardUser = () => {
  const { books, fetchBooks } = useContext(BookContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState(() => {
    const storedBooks = localStorage.getItem("borrowedBooks");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [publishedDateFilter, setPublishedDateFilter] = useState("");
  const [copiesFilter, setCopiesFilter] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        await fetchBooks();
      } catch (error) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [fetchBooks]);

  const handleAddBook = (bookToAdd) => {
    const updatedBorrowedBooks = [...borrowedBooks];
    const bookIndex = updatedBorrowedBooks.findIndex(
      (book) => book.isbn === bookToAdd.isbn
    );

    if (bookIndex > -1) {
      updatedBorrowedBooks[bookIndex].quantity += 1;
    } else {
      updatedBorrowedBooks.push({ ...bookToAdd, quantity: 1 });
    }

    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));

    toast.success("Book added successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (authorFilter
        ? book.author.toLowerCase().includes(authorFilter.toLowerCase())
        : true) &&
      (genreFilter ? book.genre.includes(genreFilter) : true) &&
      (publishedDateFilter
        ? new Date(book.publishedDate).getFullYear() ===
          parseInt(publishedDateFilter)
        : true) &&
      (copiesFilter ? book.copiesAvailable >= parseInt(copiesFilter) : true)
  );

  return (
    <>
      <div
        className="container mt-4 d-flex"
        style={{ maxHeight: "85vh", overflowY: "hidden" }}
      >
        {/* Filter Section */}
        <style jsx="true">
          {`
            /* For the card container with animation */
            .card-container {
              transition: transform 0.3s ease-in-out;
            }

            /* When hovering over the card container */
            .card-container:hover {
              transform: translateY(-10px);
            }

            /* Styling for card */
            .card {
              border: none;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              transition: box-shadow 0.3s ease;
            }

            /* Hover effect for the card */
            .card:hover {
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            }

            /* For the card image */
            .card-img-top {
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              height: 200px;
              object-fit: cover;
            }

            /* Card body styling */
            .card-body {
              padding: 1.5rem;
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            /* Title styling */
            .card-title {
              font-size: 1.25rem;
              font-weight: bold;
              color: #333;
            }

            /* Subtitle styling */
            .card-subtitle {
              font-size: 1rem;
              color: #555;
              margin-bottom: 1rem;
            }

            /* Description and other text styling */
            .card-text {
              font-size: 0.9rem;
              color: #666;
            }

            /* Styling for the button */
            .btn {
              transition: background-color 0.3s ease;
              font-weight: bold;
              border-radius: 5px;
              padding: 0.5rem 1.5rem;
            }

            /* Button for available books */
            .btn-success {
              background-color: #28a745;
              color: white;
            }

            .btn-success:hover {
              background-color: #218838;
            }

            /* Button for unavailable books */
            .btn-secondary {
              background-color: #6c757d;
              color: white;
            }

            .btn-secondary:hover {
              background-color: #5a6268;
            }

            /* Animation for zoom effect */
            .zoom-effect {
              animation: zoomIn 0.5s ease-in-out;
            }

            @keyframes zoomIn {
              0% {
                transform: scale(0.8);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }

            /* Adjusting the hover effect scale */
            .card-container:hover .card {
              transform: scale(1.05);
            }

            /* Style for the search bar */
            input.form-control {
              width: 100%;
              max-width: 400px; /* Limit the width */
              margin-bottom: 20px; /* Space below the search bar */
              padding: 10px;
              font-size: 1rem;
              border-radius: 5px;
              border: 1px solid #ddd;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              transition: border-color 0.3s;
            }

            input.form-control:focus {
              border-color: #0066cc;
              box-shadow: 0 0 5px rgba(0, 102, 204, 0.5);
            }

            /* DashboardUser.css */

            .container {
              display: flex;
            }

            .filter-section {
              position: sticky;
              top: 0;
              height: 100vh; /* Ensure the filter section takes full height */
              overflow: auto; /* Allows content to be scrollable within the filter */
            }

            .book-list-section {
              flex-grow: 1;
              height: 100vh;
              overflow-y: auto; /* Makes the books section scrollable */
              padding-right: 15px;
            }
            .sticky-search-bar {
              position: sticky;
              top: 0;
              z-index: 10; /* Ensure it stays above other content */
              background-color: white; /* Ensure the search bar stays visible */
              padding-top: 1rem; /* Add some padding for a clean look */
              margin-bottom: 20px; /* Add some margin for spacing */
              box-shadow: 0 4px 2px -2px gray; /* Optional: add a shadow effect */
            }
            /* Add this to your DashboardUser.css */
            .book-list-section {
              max-height: 85vh;
              overflow-y: auto; /* Enable vertical scrolling */
            }

            /* Hide the scrollbar */
            .book-list-section::-webkit-scrollbar {
              display: none; /* Hide the scrollbar for Webkit browsers */
            }

            .book-list-section {
              -ms-overflow-style: none; /* For Internet Explorer 10+ */
              scrollbar-width: none; /* For Firefox */
            }
          `}
        </style>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="filter-section p-3 bg-light shadow"
          style={{
            minWidth: "250px",
            maxWidth: "250px",
            position: "sticky",
            top: "0",
          }}
        >
          <h4 className="mb-3">Filters</h4>
          <div className="mb-3">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by author"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Genre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by genre"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Published Year</label>
            <input
              type="number"
              className="form-control"
              placeholder="Filter by year"
              value={publishedDateFilter}
              onChange={(e) => setPublishedDateFilter(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Copies Available (Minimum)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Min copies available"
              value={copiesFilter}
              onChange={(e) => setCopiesFilter(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Books List Section */}
        <div className="book-list-section flex-grow-1 ms-4">
          <div className="mb-4 sticky-search-bar">
            <Fade>
              <h2 className="mb-4">Books List</h2>
            </Fade>

            <input
              type="text"
              className="form-control"
              placeholder="Search books by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No books available matching the search.
            </div>
          ) : (
            <div className="row">
              {filteredBooks.map((book, index) => (
                <motion.div
                  className="col-12 mb-4"
                  key={book.isbn}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <Zoom>
                    <div className="card h-auto shadow-lg d-flex flex-row">
                      <img
                        src={
                          book.coverImage || "https://via.placeholder.com/150"
                        }
                        className="card-img-left"
                        alt={`${book.title} cover`}
                        style={{
                          width: "250px",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-primary">
                          {book.title}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Author: {book.author}
                        </h6>
                        <p className="card-text mb-1">
                          <strong>ISBN:</strong> {book.isbn}
                        </p>
                        <p className="card-text mb-1">
                          <strong>Genre:</strong> {book.genre.join(", ")}
                        </p>
                        <p className="card-text mb-1">
                          <strong>Copies Available:</strong>{" "}
                          {book.copiesAvailable}
                        </p>
                        <p className="card-text mb-1">
                          <strong>Description:</strong> {book.description}
                        </p>
                        <button
                          className={`btn ${
                            book.copiesAvailable === 0
                              ? "btn-secondary"
                              : "btn-success"
                          } mt-auto`}
                          onClick={() => handleAddBook(book)}
                          disabled={book.copiesAvailable === 0}
                        >
                          {book.copiesAvailable === 0
                            ? "Out of Stock"
                            : "Add Book"}
                        </button>
                      </div>
                    </div>
                  </Zoom>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default DashboardUser;
