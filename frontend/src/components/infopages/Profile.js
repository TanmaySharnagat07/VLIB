


import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [userData, setUserData] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [bookDate, setBookDate] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Store userId in state
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  // Fetch user data when userId is set
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/user/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUserData(data);

          if (data && data.data && data.data.booksBorrowed) {
            const booksDataPromises = data.data.booksBorrowed.map(async (element) => {
              const bookid = element.booksId;

              // Get the book date
              const newBookDate = element.date; // Store the date here for each book
              const booksResponse = await fetch(`http://localhost:4000/api/books/${bookid}`);
              if (!booksResponse.ok) {
                throw new Error("Failed to fetch borrowed books");
              }
              const booksData = await booksResponse.json();
              
              return { bookData: booksData, bookDate: newBookDate }; // Return both book data and the date
            });

            // Wait for all promises to resolve
            const booksData = await Promise.all(booksDataPromises);

            // Now set the borrowed books and the corresponding dates
            setBorrowedBooks(booksData.map((book) => book.bookData)); // Only the book data
            setBookDate(booksData.map((book) => book.bookDate)); // Only the dates
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container emp-profile">
      <style>
        {`
          body {
            background: -webkit-linear-gradient(left, #3931af, #00c6ff);
          }
          .emp-profile {
            padding: 3%;
            margin-top: 3%;
            margin-bottom: 3%;
            border-radius: 0.5rem;
            background: #fff;
          }
          .profile-img {
            text-align: center;
          }
          .profile-img img {
            width: 70%;
            height: 100%;
          }
          .profile-img .file {
            position: relative;
            overflow: hidden;
            margin-top: -20%;
            width: 70%;
            border: none;
            border-radius: 0;
            font-size: 15px;
            background: #212529b8;
          }
          .profile-img .file input {
            position: absolute;
            opacity: 0;
            right: 0;
            top: 0;
          }
          .profile-head h5 {
            color: #333;
          }
          .profile-head h6 {
            color: #0062cc;
          }
          .profile-edit-btn {
            border: none;
            border-radius: 1.5rem;
            width: 70%;
            padding: 2%;
            font-weight: 600;
            color: #6c757d;
            cursor: pointer;
          }
          .proile-rating {
            font-size: 12px;
            color: #818182;
            margin-top: 5%;
          }
          .proile-rating span {
            color: #495057;
            font-size: 15px;
            font-weight: 600;
          }
          .profile-head .nav-tabs {
            margin-bottom: 5%;
          }
          .profile-head .nav-tabs .nav-link {
            font-weight: 600;
            border: none;
          }
          .profile-head .nav-tabs .nav-link.active {
            border: none;
            border-bottom: 2px solid #0062cc;
          }
          .profile-work {
            padding: 14%;
            margin-top: -15%;
          }
          .profile-work p {
            font-size: 12px;
            color: #818182;
            font-weight: 600;
            margin-top: 10%;
          }
          .profile-work a {
            text-decoration: none;
            color: #495057;
            font-weight: 600;
            font-size: 14px;
          }
          .profile-work ul {
            list-style: none;
          }
          .profile-tab label {
            font-weight: 600;
          }
          .profile-tab p {
            font-weight: 600;
            color: #0062cc;
          }
        `}
      </style>
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img
                src={
                  userData.profilePicture ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                }
                alt="Profile"
              />
              <div className="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>
                {userData.data.firstName} {userData.data.lastName}
              </h5>
              <h6>{userData.role}</h6>
              <p className="proile-rating">
                RANKINGS : <span>{userData.rank || "N/A"}</span>
              </p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${activeTab === "about" ? "active" : ""}`}
                    onClick={() => handleTabClick("about")}
                  >
                    About
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${activeTab === "booksBorrowed" ? "active" : ""}`}
                    onClick={() => handleTabClick("booksBorrowed")}
                  >
                    Books Borrowed
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8" style={{ marginLeft: "auto" }}>
            <div className="tab-content profile-tab" id="myTabContent">
              {/* About Tab */}
              <div
                className={`tab-pane fade ${activeTab === "about" ? "show active" : ""}`}
                id="about"
                role="tabpanel"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>User Id</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.data.enrollmentNumber}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {userData.data.firstName} {userData.data.lastName}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.data.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.data.phone}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Enrollment Number</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.data.enrollmentNumber}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Role</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.data.role}</p>
                  </div>
                </div>
              </div>

              {/* Books Borrowed Tab */}
              <div
                className={`tab-pane fade ${activeTab === "booksBorrowed" ? "show active" : ""}`}
                id="booksBorrowed"
                role="tabpanel"
              >
                <div style={{ display: "flex" }}>
                  <div>
                    {borrowedBooks.length === 0 ? (
                      <p>No books borrowed yet.</p>
                    ) : (
                      <ul>
                        {borrowedBooks.map((book, index) => (
                          <li key={index}>
                            <p>
                              {book.book.title} - {book.book.author} 
                              <br />
                              Borrowed on: {bookDate[index]} {/* Display the borrow date using index */}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;

