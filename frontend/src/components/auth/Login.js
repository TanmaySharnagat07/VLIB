import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../context/FlashMessageContext";
const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { setMessage } = useFlashMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.token);
      localStorage.setItem("role", json.user.role);
      navigate("/dashboard");
    } else {
      setMessage(json.message || "Invalid credentials");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
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
    </div>
  );
};

export default LoginPage;
