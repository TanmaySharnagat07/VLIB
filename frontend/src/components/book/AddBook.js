import React, { useState, useContext } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import BookContext from "../../context/books/BookContext";

const AddBook = () => {
  const context = useContext(BookContext);
  const { addBook } = context;

  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publishedDate: "",
    copiesAvailable: 0,
    description: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookDetails = {
      ...book,
      genre: book.genre.split(",").map((g) => g.trim()),
    };

    addBook(bookDetails, coverImage);
    setBook({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      publishedDate: "",
      copiesAvailable: 0,
      description: "",
    });
    setCoverImage(null);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-80 mt-2">
      <style>
        {`
          .card {
            border-radius: 10px;
            border: none;
            height: auto;
            max-width: 1000px;
            display: flex;
            flex-direction: row;
            overflow: hidden;
          }
          .book-cover-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40%;
            max-height: 100%;
          }
          .book-cover-container img {
            max-height: 60%;
            width: auto;
            border-radius: 10px;
          }
          .form-container {
            flex: 1;
            padding: 10px; /* Reduced padding for more compact form */
          }
          .form-label {
            font-weight: 600;
            color: #555;
          }
          .form-control {
            border-radius: 5px;
            border: 1px solid #ccc;
            padding: 8px; /* Reduced padding for more compact form */
            font-size: 14px;
            transition: border-color 0.3s ease;
            margin-bottom: 0.5rem; /* Reduced margin to fit form within screen */
          }
          .form-control:focus {
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
          }
          .form-control::placeholder {
            color: #aaa;
          }
          .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            border-radius: 5px;
            padding: 8px 16px; /* Reduced padding for more compact button */
            font-size: 16px;
            transition: background-color 0.3s, transform 0.3s;
          }
          .btn-primary:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }
          .btn-primary:active {
            background-color: #004085;
            transform: translateY(0);
          }
          .mt-2 {
            color: #555;
            font-size: 14px;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .card {
              flex-direction: column;
              height: 100%;
            }
            .book-cover-container {
              display: none; /* Hide image for smaller screens */
            }
            .form-container {
              padding: 15px;
            }
          }
        `}
      </style>
      <div className="card">
        <div className="book-cover-container">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg"
            alt="Book Cover"
            style={{ height: "60%", width: "80%" }}
          />
        </div>
        <div className="form-container mt-4">
          <h2 className="text-center mb-3">Add a New Book</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="formTitle">
              <Form.Label column sm={4}>
                Title:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  placeholder="Enter book title"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAuthor">
              <Form.Label column sm={4}>
                Author:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  isInvalid={!!errors.author}
                  placeholder="Enter author name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.author}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formIsbn">
              <Form.Label column sm={4}>
                ISBN:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="isbn"
                  value={book.isbn}
                  onChange={handleChange}
                  isInvalid={!!errors.isbn}
                  placeholder="Enter ISBN number"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.isbn}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPublishedDate">
              <Form.Label column sm={4}>
                Published Date:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  name="publishedDate"
                  value={book.publishedDate}
                  onChange={handleChange}
                  isInvalid={!!errors.publishedDate}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.publishedDate}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formGenre">
              <Form.Label column sm={4}>
                Genre:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="genre"
                  value={book.genre}
                  onChange={handleChange}
                  isInvalid={!!errors.genre}
                  placeholder="Enter book genre (comma-separated)"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formQuantity">
              <Form.Label column sm={4}>
                Copies Available:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  name="copiesAvailable"
                  value={book.copiesAvailable}
                  onChange={handleChange}
                  isInvalid={!!errors.copiesAvailable}
                  min="0"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantity}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDescription">
              <Form.Label column sm={4}>
                Description:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={book.description}
                  onChange={handleChange}
                  isInvalid={!!errors.description}
                  placeholder="Enter book description"
                  maxLength="500"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCoverImage">
              <Form.Label column sm={4}>
                Cover Image:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {coverImage && (
                  <p className="mt-2">Selected file: {coverImage.name}</p>
                )}
              </Col>
            </Form.Group>

            <div className="text-center mt-3">
              <Button type="submit" variant="primary">
                Add Book
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default AddBook;
