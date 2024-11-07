import React, { useEffect, useState, useContext } from "react";
import BookContext from "../../context/books/BookContext";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardAdmin = () => {
  const { books, fetchBooks } = useContext(BookContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
  }, [fetchBooks]);

  // Filter books that have been borrowed
  const borrowedBooks = books.filter((book) => book.borrowedBy.length > 0);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Borrowed Books Dashboard</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : borrowedBooks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No books have been borrowed yet.
        </div>
      ) : (
        <div className="row">
          {borrowedBooks.map((book, index) => (
            <div className="col-md-6 mb-4" key={book._id}>
              <div className="card h-100 shadow-lg">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={book.coverImage}
                      className="img-fluid rounded-start"
                      alt={`${book.title} cover`}
                      style={{ maxHeight: "150px" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{book.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Author: {book.author}</h6>
                      <p className="card-text"><strong>ISBN:</strong> {book.isbn}</p>
                      <p className="card-text"><strong>Genre:</strong> {book.genre.join(", ")}</p>
                      <p className="card-text"><strong>Copies Available:</strong> {book.copiesAvailable}</p>
                      <div className="mt-3">
                        <h6>Borrowed By:</h6>
                        {book.borrowedBy.map((borrow, i) => (
                          <div key={i} className="border p-2 mb-2 rounded">
                            <p className="mb-1">
                              <strong>Name:</strong> {borrow.userId ? `${borrow.userId}` : "N/A"}
                            </p>
                            <p className="mb-1">
                              <strong>Borrowed Date:</strong> {new Date(borrow.borrowedDate).toLocaleDateString()}
                            </p>
                            <Button
                              variant="info"
                              className="btn-sm"
                              onClick={() => handleViewDetails(borrow.userId)}
                            >
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal for showing user details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <div>
              <p><strong>First Name:</strong> {selectedUser.firstName}</p>
              <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Enrollment Number:</strong> {selectedUser.enrollmentNumber}</p>
              <p><strong>Gender:</strong> {selectedUser.gender}</p>
              <p><strong>Date of Birth:</strong> {new Date(selectedUser.dob).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>No user details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ToastContainer to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default DashboardAdmin;