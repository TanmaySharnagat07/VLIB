import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const BorrowedUsers = () => {
  const { bookId } = useParams();
  const [borrowedUsers, setBorrowedUsers] = useState([]);
  const [bookName, setBookName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowedUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/books/${bookId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch borrowed users");
        }
        const data = await response.json();
        setBorrowedUsers(data.book.borrowedBy);
        setBookName(data.book.title);
      } catch (error) {
        toast.error("Error fetching borrowed users", {
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
    fetchBorrowedUsers();
  }, [bookId]);

  const handleReturnBook = async (borrowId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books/${bookId}/return`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ borrowId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to return the book");
      }

      // Update the UI by removing the returned user from the state
      setBorrowedUsers((prevBorrowedUsers) =>
        prevBorrowedUsers.filter((borrow) => borrow._id !== borrowId)
      );
      toast.success("Book returned successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error returning the book", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">
        Borrowed Users for Book:{" "}
        <span style={{ color: "#5ACFFF" }}>{bookName}</span>
      </h2>
      {loading ? (
        <div
          className="d-flex justify-content-center"
          style={{ height: "60vh" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : borrowedUsers.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No users have borrowed this book.
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Enrollment Number</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Borrowed Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowedUsers.map((borrow, index) => (
              <tr key={borrow._id}>
                <td>{index + 1}</td>
                <td>
                  {borrow.userId
                    ? `${borrow.userId.firstName} ${borrow.userId.lastName}`
                    : "N/A"}
                </td>
                <td>
                  {borrow.userId && borrow.userId.email
                    ? borrow.userId.email
                    : "N/A"}
                </td>
                <td>
                  {borrow.userId && borrow.userId.enrollmentNumber
                    ? borrow.userId.enrollmentNumber
                    : "N/A"}
                </td>
                <td>
                  {borrow.userId && borrow.userId.dob
                    ? new Date(borrow.userId.dob).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {borrow.userId && borrow.userId.gender
                    ? borrow.userId.gender
                    : "N/A"}
                </td>
                <td>{new Date(borrow.borrowedDate).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleReturnBook(borrow._id)}
                  >
                    Return
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {/* ToastContainer to show notifications */}
      <ToastContainer />
    </Container>
  );
};

export default BorrowedUsers;