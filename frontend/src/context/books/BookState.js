import React, { useState } from "react";
import BookContext from "./BookContext";
import { useFlashMessage } from "../FlashMessageContext";

const BookState = (props) => {
  const initialBooks = [];
  const [books, setBooks] = useState(initialBooks);
  const { setMessage } = useFlashMessage();

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/books/getBooks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      setBooks(json.books);
    } catch (error) {
      console.error("Error fetching books:", error);
      setMessage("Error fetching books.", "error");
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
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(bookDetails);
    console.log(bookCover);
    // Create a new FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("isbn", isbn);
    formData.append("publishedDate", publishedDate);
    formData.append("genre", JSON.stringify(genre)); // Convert genre array to string
    formData.append("copiesAvailable", copiesAvailable);
    formData.append("description", description);

    // Append the book cover image to the form data, or use default URL if no image is provided
    if (bookCover) {
      formData.append("coverImage", bookCover);
    }

    const response = await fetch("http://localhost:4000/api/books/addBook", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      setBooks([...books, json.book]);
      setMessage(json.message, "success");
    } else {
      setMessage(json.message, "error");
    }
  };

  const borrowBook = async (borrowedBooks) => {
    const response = await fetch("http://localhost:4000/api/books/borrowBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ books: borrowedBooks }), // Wrap borrowedBooks in an object with the key "books"
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      setMessage(json.message, "success");
    } else {
      setMessage(json.message, "error");
    }
  };

  const deleteBook = async (isbn) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/books/deleteBook",
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
        setMessage(json.message, "success");
      } else {
        setMessage(json.message, "error");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      setMessage("Error deleting book.", "error");
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook, fetchBooks, borrowBook, deleteBook }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
