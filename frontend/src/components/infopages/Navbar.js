import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileImg from "./profileImg.avif";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const [showDropdown, setShowDropdown] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const dropdownRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          background: "linear-gradient(135deg, #00c6ff, #0072ff)",
          padding: "1rem 2rem",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}
          >
            VLib
          </Link>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavbarCollapsed}
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
            style={{ border: "none", outline: "none" }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                backgroundImage:
                  "url(data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E)",
              }}
            ></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              isNavbarCollapsed ? "" : "show"
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                  style={{
                    color: location.pathname === "/" ? "#FFD600" : "#ffffff",
                    margin: "0 0.8rem",
                    fontSize: "1rem",
                  }}
                >
                  Home
                </Link>
              </li>
              {isLoggedIn && userRole && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname.startsWith("/dashboard") ? "active" : ""
                    }`}
                    to={`/dashboard/${userRole}`}
                    style={{
                      color: location.pathname.startsWith("/dashboard")
                        ? "#FFD600"
                        : "#ffffff",
                      margin: "0 0.8rem",
                      fontSize: "1rem",
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {isLoggedIn && userRole === "Admin" && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/addBook" ? "active" : ""
                    }`}
                    to="/addBook"
                    style={{
                      color:
                        location.pathname === "/addBook"
                          ? "#ffd700"
                          : "#ffffff",
                      margin: "0 0.8rem",
                      fontSize: "1rem",
                    }}
                  >
                    Add Book
                  </Link>
                </li>
              )}
              {isLoggedIn && userRole === "Admin" && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/deleteBook" ? "active" : ""
                    }`}
                    to="/deleteBook"
                    style={{
                      color:
                        location.pathname === "/deleteBook"
                          ? "#ffd700"
                          : "#ffffff",
                      margin: "0 0.8rem",
                      fontSize: "1rem",
                    }}
                  >
                    Delete Book
                  </Link>
                </li>
              )}
            </ul>

            {isLoggedIn && userRole === 'Student' && <div className="d-flex align-items-center">
              {/* Your Cart button */}
              <button
                onClick={() => navigate("/borrowBooks")}
                style={{
                  width: "45px",
                  height: "45px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  color: "#fff",
                  marginRight: "10px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2m0 0h13.4l1.3 6H6.4l-1.3-6zM6 10v10a1 1 0 001 1h10a1 1 0 001-1V10m-5 5h.01M10 15h.01"
                  />
                </svg>
              </button>
              </div>}

            {isLoggedIn ? (
              <>
                <div
                  className="dropdown"
                  ref={dropdownRef}
                  style={{ position: "relative", zIndex: "1000" }}
                >
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="rounded-circle"
                    onClick={toggleDropdown}
                    style={{
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      border: "2px solid #ffd700",
                      transition: "border 0.3s ease",
                    }}
                  />
                  {showDropdown && (
                    <ul
                      className="dropdown-menu dropdown-menu-end show"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        position: "absolute",
                        right: "0",
                        transform: "translateX(-10px)",
                        minWidth: "150px"
                      }}
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/profile"
                          style={{
                            color: "#333",
                            fontSize: "1rem",
                            padding: "0.8rem 1.2rem",
                          }}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/settings"
                          style={{
                            color: "#333",
                            fontSize: "1rem",
                            padding: "0.8rem 1.2rem",
                          }}
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <hr
                          className="dropdown-divider"
                          style={{ borderColor: "#0072ff" }}
                        />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                          style={{
                            color: "#333",
                            fontSize: "1rem",
                            padding: "0.8rem 1.2rem",
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div>
                <Link
                  className="btn btn-outline-light"
                  to="/login"
                  style={{
                    color: "#ffffff",
                    border: "2px solid #ffd700",
                    fontWeight: "600",
                    marginRight: "0.5rem",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffd700")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-light"
                  to="/signup"
                  style={{
                    color: "#ffffff",
                    border: "2px solid #ffd700",
                    fontWeight: "600",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ffd700")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;