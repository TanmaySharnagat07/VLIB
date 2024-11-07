import React from "react";
import { Carousel } from "react-bootstrap";

function HeroCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://s3.scoopwhoop.com/anj2/5f33e95218ac8132ba8a7937/eea9a713-4c5f-4c9f-a617-8e0665518bc5.jpg"
          alt="First slide"
          style={{
            maxHeight: "85vh",
            objectFit: "cover",
          }}
        />
        <Carousel.Caption>
          <h3>Discover New Reads</h3>
          <p>Explore our collection of books, journals, and more.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i2-prod.mirror.co.uk/incoming/article13150515.ece/ALTERNATES/s1227b/0_PAY-Clock-over-door-to-Honby-library-Liverpool-central-library-Picton-reading-rooms.jpg"
          alt="Second slide"
          style={{
            maxHeight: "85vh",
            objectFit: "cover",
          }}
        />
        <Carousel.Caption>
          <h3>Manage Your Library</h3>
          <p>Track borrowing, returns, and reading history.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
