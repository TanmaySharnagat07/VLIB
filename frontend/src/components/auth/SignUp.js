import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../context/FlashMessageContext";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enrollmentNumber: "",
    dob: "",
    gender: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { setMessage } = useFlashMessage();

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const json = await response.json();

    if(json.success){
      localStorage.setItem("token", json.token);
      localStorage.setItem("role", json.user.role);
      setMessage(json.message, "success");
      navigate("/dashboard");
    }
    else{
      setMessage(json.message, "error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={credentials.firstName}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={credentials.lastName}
                onChange={onChange}
                required
              />
            </div>
          </div>
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
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={credentials.phone}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="enrollmentNumber">Enrollment Number</label>
            <input
              type="text"
              className="form-control"
              id="enrollmentNumber"
              name="enrollmentNumber"
              value={credentials.enrollmentNumber}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={credentials.dob}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              className="form-control"
              value={credentials.gender}
              onChange={onChange}
              required
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
