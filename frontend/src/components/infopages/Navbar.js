import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profileImg from "./profileImg.avif"; 

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const [showDropdown, setShowDropdown] = useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

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

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          background: "linear-gradient(135deg, #00c6ff, #0072ff)",
          padding: "1rem 2rem",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
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
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                  style={{
                    color:
                      location.pathname === "/about" ? "#FFD600" : "#ffffff",
                    margin: "0 0.8rem",
                    fontSize: "1rem",
                  }}
                >
                  About
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
            </ul>

            {isLoggedIn ? (
              <>
                <div className="dropdown" style={{ position: "relative" }}>
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
                        minWidth: "150px",
                        zIndex: "1000",
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