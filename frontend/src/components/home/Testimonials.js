import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

function Testimonials() {
  const testimonials = [
    {
      quote:
        "A fantastic tool for keeping track of my reading and managing books efficiently.",
      name: "Alex",
    },
    {
      quote: "Very user-friendly, and the recommendations are always spot on!",
      name: "Jessica",
    },
  ];

  return (
    <Container className="py-5" id="testimonials">
      <h2 className="text-center text-dark mb-5">What Our Users Say</h2>
      <Row>
        {testimonials.map((testimonial, index) => (
          <Col md={6} key={index} className="mb-4">
            <Card className="border-light shadow-sm">
              <Card.Body>
                <Card.Text className="text-muted">
                  "{testimonial.quote}"
                </Card.Text>
                <Card.Footer className="text-right font-weight-bold text-dark">
                  - {testimonial.name}
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Testimonials;
