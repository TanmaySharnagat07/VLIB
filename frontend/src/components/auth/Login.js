import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      }
    );

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.token);
      localStorage.setItem("role", json.user.role);
      navigate("/dashboard");
      toast.success("Login successful!", { position: "top-center" });
    } else {
      toast.error(json.message || "Invalid credentials", { position: "top-center" });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="login-container">
      <ToastContainer autoClose={3000} />
      <div className="login-card animate__animated animate__fadeInUp">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="form-control"
              name="role"
              value={credentials.role}
              onChange={onChange}
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block my-3">
            Login
          </button>
        </form>
      </div>

      {/* Inline styles */}
      <style jsx>{`
        .login-container {
          background-image: url("https://img.freepik.com/free-vector/world-book-day-background_23-2149323891.jpg?semt=ais_hybrid");
          background-size: cover;
          background-position: center;
          overflow: hidden !important;
          height: 89vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          color: #fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .login-card {
          position: relative;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 400px;
          animation-duration: 0.8s;
          animation-timing-function: ease-in-out;
          z-index: 1;
        }

        .login-card h2 {
          color: #007bff;
          font-weight: bold;
        }

        .form-group label {
          font-weight: bold;
          color: #333;
        }

        .form-control {
          border-radius: 5px;
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
        }

        .btn-primary {
          background-color: #28a745;
          border-color: #28a745;
          color: white;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 5px;
          width: 100%;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #218838;
          border-color: #1e7e34;
          transform: scale(1.05);
        }

        .animate__fadeInUp {
          opacity: 0;
          transform: translateY(20px);
          animation-fill-mode: forwards;
          animation-name: fadeInUp;
          animation-duration: 1s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-group select {
          background-color: #f8f9fa;
          color: #495057;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
