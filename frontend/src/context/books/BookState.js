import React, { useState } from "react";
import { toast } from "react-toastify";
import BookContext from "./BookContext";
import "react-toastify/dist/ReactToastify.css";

const BookState = (props) => {
  const initialBooks = [];
  const [books, setBooks] = useState(initialBooks);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books/getBooks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      setBooks(json.books);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Error fetching books.");
    }
  };

  const addBook = async (bookDetails, bookCover) => {
    const {
      title,
      author,
      isbn,
      publishedDate,
      genre,
      copiesAvailable,
      description,
    } = bookDetails;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("isbn", isbn);
    formData.append("publishedDate", publishedDate);
    formData.append("genre", JSON.stringify(genre));
    formData.append("copiesAvailable", copiesAvailable);
    formData.append("description", description);

    if (bookCover) {
      formData.append("coverImage", bookCover);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books/addBook`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const json = await response.json();
      if (json.success) {
        setBooks([...books, json.book]);
        toast.success(json.message || "Book added successfully!");
      } else {
        toast.error(json.message || "Failed to add book.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Error adding book.");
    }
  };


  const borrowBook = async (borrowedBooks) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/books/borrowBook`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ books: borrowedBooks }), // Wrap borrowedBooks in an object with the key "books"
      }
    );

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // setMessage(json.message, "success");
    } //else {
    //   setMessage(json.message, "error");
    // }
  };

  const deleteBook = async (isbn) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/books/deleteBook`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ isbn }),
        }
      );

      const json = await response.json();
      console.log(json);

      if (json.success) {
        setBooks(books.filter((book) => book.isbn !== isbn));
        // setMessage(json.message, "success");
      }// else {
      //   setMessage(json.message, "error");
      // }
    } catch (err) {
      console.error("Error deleting book:", err);
      // setMessage("Error deleting book.", "error");
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, fetchBooks, borrowBook, deleteBook }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
