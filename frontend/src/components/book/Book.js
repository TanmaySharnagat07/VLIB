import React from "react";

const Book = ({
  title,
  author,
  isbn,
  genre,
  description,
  copiesAvailable,
  publishedDate,
  coverImage,
}) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={coverImage || "https://via.placeholder.com/150"}
          className="card-img-top"
          alt={`${title} cover`}
          style={{ height: "200px", objectFit: "cover" }} // Ensure all images are the same height and cover the area
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Author: {author}</h6>
          <p className="card-text">
            <strong>ISBN:</strong> {isbn}
          </p>
          <p className="card-text">
            <strong>Genre:</strong> {genre}
          </p>
          <p className="card-text">
            <strong>Published Date:</strong> {publishedDate}
          </p>
          <p className="card-text">
            <strong>Copies Available:</strong> {copiesAvailable}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
