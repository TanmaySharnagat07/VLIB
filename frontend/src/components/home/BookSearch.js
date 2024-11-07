import React from "react";
import { Form, Button, Container } from "react-bootstrap";

function BookSearch() {
  return (
    <Container id="search" className="py-5">
      <h2 className="text-center text-dark mb-4">Find Your Next Read</h2>
      <Form className="d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Search by title, author, or genre"
          className="w-50 mr-2"
        />
        <Button variant="primary">Search</Button>
      </Form>
    </Container>
  );
}

export default BookSearch;
