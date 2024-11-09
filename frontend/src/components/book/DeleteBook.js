import React, { useContext, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import BookContext from "../../context/books/BookContext";

const DeleteBook = () => {
  const { books, fetchBooks, deleteBook } = useContext(BookContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (isbn) => {
    deleteBook(isbn);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Library Books</h2>
      <Row>
        {books.length > 0 ? (
          books.map((book) => (
            <Col key={book.isbn} sm={12} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm">
                {book.coverImage && (
                  <Card.Img
                    variant="top"
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {book.author}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>ISBN:</strong> {book.isbn} <br />
                    <strong>Genre:</strong> {book.genre} <br />
                    <strong>Copies Available:</strong> {book.copiesAvailable}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(book.isbn)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No books available.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DeleteBook;