﻿# VLib: College Library Management System

Welcome to **VLib**, a comprehensive library management system designed for the VNIT library. VLib is a robust and scalable solution built using the MERN stack, which stands for MongoDB, Express.js, React.js, and Node.js. It provides an efficient way to manage books, users, and transactions within the library environment.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

**VLib** is designed to simplify the management of library operations for VNIT's library system. It offers a user-friendly interface for both administrators and students. Administrators can manage the book inventory, while students can register, borrow books, and keep track of their borrowed items.

## Features

### For Administrators

- **Dashboard**: A comprehensive admin dashboard to manage the library efficiently.
- **Add New Books**: Easily add new books to the library with details such as title, author, ISBN, published date, genre, and description.
- **Delete Books**: Remove books from the library when necessary.
- **Manage Users**: Oversee student registrations and manage user roles.

### For Students

- **Sign Up**: Register as a student with basic details such as name, email, phone number, and password.
- **Browse Books**: View the list of available books in the library.
- **Borrow Books**: Request to borrow books and keep track of borrowed items.
- **Return Books**: Return borrowed books to the library.

## Technology Stack

- **MongoDB**: NoSQL database to store data for books, users, and transactions.
- **Express.js**: Web framework for building the backend server and API endpoints.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime environment for server-side development.

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (Local or cloud instance)
- Git (for version control)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/vlib.git
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd vlib/backend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the backend directory with the following content:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   JWT_EXPIRES=your_jwt_expiration_time
   ```

5. **Run the Backend Server**

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend Application**

   ```bash
   npm start
   ```

## Usage

### Accessing the Application

- **Admin Dashboard**: Access the admin dashboard at `http://localhost:3000/admin` after starting the server.
- **Student Portal**: Access the student portal at `http://localhost:3000/` after starting the server.

### API Endpoints

- **Books**

  - `POST /api/books/add` - Add a new book
  - `GET /api/books` - Get all books
  - `DELETE /api/books/:id` - Delete a book by ID

- **Users**

  - `POST /api/users/signup` - Register a new student
  - `GET /api/users` - Get all users (Admin only)

- **Authentication**

  - `POST /api/auth/login` - User login
  - `POST /api/auth/logout` - User logout

## Contributing

We welcome contributions to VLib. If you'd like to contribute, please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**: `git checkout -b feature/your-feature`
3. **Commit Your Changes**: `git commit -am 'Add new feature'`
4. **Push to the Branch**: `git push origin feature/your-feature`
5. **Create a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact:

- **Email**: shreyanshmishra.4365@gmail.com 
- **GitHub**: [Coolsheru2526](https://github.com/Coolsheru2526)

---

Thank you for using VLib! We hope this system enhances your library management experience at VNIT.