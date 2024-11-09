import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookContext from "../../context/books/BookContext";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardAdmin = () => {
  const { books, fetchBooks } = useContext(BookContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booksWithUserDetails, setBooksWithUserDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userCache = {};
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        await fetchBooks();
      } catch (error) {
        setError("Failed to fetch books.");
        toast.error("Error fetching books", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  useEffect(() => {
    const fetchUserNames = async () => {
      const updatedBooks = await Promise.all(
        books.map(async (book) => {
          if (book.borrowedBy.length === 0) return null; // Filter out books that are not borrowed
          const updatedBorrowedBy = await Promise.all(
            book.borrowedBy.map(async (borrow) => {
              if (userCache[borrow.userId]) {
                return { ...borrow, userName: userCache[borrow.userId] };
              }
              try {
                const response = await fetch(
                  `http://localhost:4000/api/user/${borrow.userId}`
                );
                if (!response.ok) {
                  throw new Error("Failed to fetch user details");
                }
                const userData = await response.json();
                const fullName = `${userData.data.firstName} ${userData.data.lastName}`;
                userCache[borrow.userId] = fullName;
                return { ...borrow, userName: fullName };
              } catch (error) {
                return { ...borrow, userName: "Unknown User" };
              }
            })
          );
          return { ...book, borrowedBy: updatedBorrowedBy };
        })
      );
      // Filter out any null values (non-borrowed books)
      setBooksWithUserDetails(updatedBooks.filter((book) => book !== null));
    };

    if (books.length > 0) {
      fetchUserNames();
    }
  }, [books]);

  const handleViewBorrowedUsers = (bookId) => {
    navigate(`/BorrowedUsers/${bookId}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredBooks = booksWithUserDetails.filter((book) =>
    book.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container-fluid mt-3">
      <style jsx="true">{`
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 5;
          background-color: white;
          padding: 10px 5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .content-container {
          height: 75vh;
          overflow-x: hidden;
          margin-top: 1rem;
        }
        .row {
          height: 100%;
          padding: 0 5rem;
        }
        .card {
          border-radius: 15px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .card-img:hover {
          transform: scale(1.1);
        }

        .animated-button {
          background-color: #007bff;
          border: none;
          transition: background-color 0.3s, transform 0.3s;
        }

        .animated-button:hover {
          background-color: #0056b3;
          transform: translateY(-3px);
        }
      `}</style>
      <div className="sticky-header">
        <h2 className="mb-0">Borrowed Books</h2>
        <Form.Control
          type="text"
          placeholder="Search books by title..."
          className="w-50"
          onChange={handleSearch}
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
          No books have been borrowed yet.
        </div>
      ) : (
        <div className="content-container">
          <div className="row">
            {filteredBooks.map((book) => (
              <div className="col-md-6 mb-4 d-flex" key={book._id}>
                <div className="card h-100 w-100 d-flex flex-row align-items-center border-0 hover-effect">
                  <img
                    src={book.coverImage}
                    className="img-fluid rounded-end card-img"
                    alt={`${book.title}`}
                    style={{
                      maxWidth: "150px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary">{book.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Author: {book.author}
                    </h6>
                    <p className="card-text">
                      <strong>ISBN:</strong> {book.isbn}
                    </p>
                    <p className="card-text">
                      <strong>Copies Available:</strong> {book.copiesAvailable}
                    </p>
                    <Button
                      variant="primary"
                      className="animated-button"
                      onClick={() => handleViewBorrowedUsers(book._id)}
                    >
                      View Borrowed Users
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* ToastContainer to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default DashboardAdmin;
