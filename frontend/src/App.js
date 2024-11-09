import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/infopages/Navbar";
import Home from "./components/home/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardAdmin from "./components/dashboard/DashboardAdmin";
import DashboardUser from "./components/dashboard/DashboardUser";
import "bootstrap/dist/css/bootstrap.min.css";
import BookState from "./context/books/BookState";
import BorrowBook from "./components/book/BorrowBook";
import AddBook from "./components/book/AddBook";
import BorrowedUsers from "./components/dashboard/BorrowedUsers";
import DeleteBook from "./components/book/DeleteBook";
import Profile from "./components/infopages/Profile";

function App() {
  return (
 
      <BookState>
        <Router>
          <Navbar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute
                  roleBasedRoutes={{
                    admin: <DashboardAdmin />,
                    student: <DashboardUser />,
                  }}
                />
              }
            />
            <Route
              path="/BorrowedUsers/:bookId"
              element={
                <ProtectedRoute
                  roleBasedRoutes={{
                    admin: <BorrowedUsers />
                  }}
                />
              }
            />

            <Route
              path="/borrowBooks"
              element={
                <ProtectedRoute
                  roleBasedRoutes={{
                    student: <BorrowBook />,
                  }}
                />
              }
            />
            <Route
              path="/addBook"
              element={
                <ProtectedRoute
                  roleBasedRoutes={{
                    admin: <AddBook />,
                    admin: <AddBook />,
                  }}
                />
              }
            />

            <Route path="/deleteBook" element={
              <ProtectedRoute
                roleBasedRoutes={{
                  admin: <DeleteBook />,
                }}
              />
            }/>

            <Route path="/profile" element={<ProtectedRoute
              roleBasedRoutes={{
                admin: <Profile />,
                student: <Profile />,
              }}
            />}/>
          </Routes>
        </Router>
      </BookState>
 
  );
}

export default App;
